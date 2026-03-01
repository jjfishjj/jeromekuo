import { ImageIcon, Video } from "lucide-react";

interface MediaPlaceholderProps {
  type?: "image" | "video";
  aspectRatio?: "16/9" | "4/3" | "1/1" | "3/2";
  caption?: string;
  className?: string;
}

const MediaPlaceholder = ({
  type = "image",
  aspectRatio = "16/9",
  caption,
  className = "",
}: MediaPlaceholderProps) => {
  const Icon = type === "video" ? Video : ImageIcon;
  const label = type === "video" ? "影片區域" : "圖片區域";

  return (
    <figure className={`my-8 ${className}`}>
      <div
        className="relative w-full rounded-xl border-2 border-dashed border-border bg-muted/40 flex flex-col items-center justify-center gap-3 overflow-hidden transition-colors hover:border-accent/40 hover:bg-muted/60"
        style={{ aspectRatio }}
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-muted">
          <Icon className="h-6 w-6 text-muted-foreground" />
        </div>
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-xs text-muted-foreground/60">
          {type === "video" ? "上傳 MP4 / 嵌入連結" : "上傳 JPG / PNG / WebP"}
        </span>
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export { MediaPlaceholder };
