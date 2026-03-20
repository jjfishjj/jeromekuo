import { ImageIcon, Video } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

interface MediaPlaceholderProps {
  type?: "image" | "video";
  aspectRatio?: "16/9" | "4/3" | "1/1" | "3/2" | "3/4" | "2/3";
  caption?: string;
  className?: string;
  contentKey?: string;
}

const MediaPlaceholder = ({
  type = "image",
  aspectRatio = "16/9",
  caption,
  className = "",
  contentKey,
}: MediaPlaceholderProps) => {
  const { media, loading } = useSiteContent(contentKey);
  const Icon = type === "video" ? Video : ImageIcon;
  const label = type === "video" ? "影片區域" : "圖片區域";

  const hasMedia = media?.media_url;

  return (
    <figure className={`my-8 ${className}`}>
      {hasMedia ? (
        <div
          className="relative w-full rounded-xl overflow-hidden"
          style={{ aspectRatio }}
        >
          {type === "video" ? (
            <video
              src={media.media_url!}
              className="w-full h-full object-cover"
              controls
              muted
            />
          ) : (
            <img
              src={media.media_url!}
              alt={caption || ""}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
        </div>
      ) : (
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
      )}
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export { MediaPlaceholder };
