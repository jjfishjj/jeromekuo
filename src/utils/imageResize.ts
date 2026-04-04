/**
 * Resize an image file to fit within target dimensions while maintaining aspect ratio.
 * Returns the original file if it's already within acceptable bounds.
 */
export interface ResizeResult {
  file: File;
  wasResized: boolean;
  originalWidth: number;
  originalHeight: number;
  newWidth: number;
  newHeight: number;
}

export function parseSize(sizeStr: string): { width: number; height: number } {
  const [w, h] = sizeStr.split("×").map((s) => parseInt(s.trim(), 10));
  return { width: w, height: h };
}

export async function resizeImageIfNeeded(
  file: File,
  targetWidth: number,
  targetHeight: number,
  quality = 0.9
): Promise<ResizeResult> {
  return new Promise((resolve, reject) => {
    // Only process image files
    if (!file.type.startsWith("image/")) {
      resolve({
        file,
        wasResized: false,
        originalWidth: 0,
        originalHeight: 0,
        newWidth: 0,
        newHeight: 0,
      });
      return;
    }

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      const origW = img.naturalWidth;
      const origH = img.naturalHeight;

      // If image is within 10% of target size, skip resizing
      const widthRatio = origW / targetWidth;
      const heightRatio = origH / targetHeight;
      const isCloseEnough =
        widthRatio >= 0.9 && widthRatio <= 1.1 &&
        heightRatio >= 0.9 && heightRatio <= 1.1;

      if (isCloseEnough) {
        resolve({
          file,
          wasResized: false,
          originalWidth: origW,
          originalHeight: origH,
          newWidth: origW,
          newHeight: origH,
        });
        return;
      }

      // Calculate new dimensions: cover the target area then crop to exact size
      const scale = Math.max(targetWidth / origW, targetHeight / origH);
      const scaledW = Math.round(origW * scale);
      const scaledH = Math.round(origH * scale);

      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d")!;

      // Draw centered & cropped
      const offsetX = (targetWidth - scaledW) / 2;
      const offsetY = (targetHeight - scaledH) / 2;
      ctx.drawImage(img, offsetX, offsetY, scaledW, scaledH);

      // Determine output type
      const outputType = file.type === "image/png" ? "image/png" : "image/jpeg";
      const ext = outputType === "image/png" ? ".png" : ".jpg";

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas toBlob failed"));
            return;
          }
          const baseName = file.name.replace(/\.[^.]+$/, "");
          const newFile = new File([blob], `${baseName}_resized${ext}`, {
            type: outputType,
          });
          resolve({
            file: newFile,
            wasResized: true,
            originalWidth: origW,
            originalHeight: origH,
            newWidth: targetWidth,
            newHeight: targetHeight,
          });
        },
        outputType,
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
}
