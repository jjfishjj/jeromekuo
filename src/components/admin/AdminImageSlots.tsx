import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Upload, Trash2, ImageIcon } from "lucide-react";
import { resizeImageIfNeeded, parseSize } from "@/utils/imageResize";

interface ImageSlot {
  id: string;
  content_key: string;
  page: string;
  section: string;
  media_url: string | null;
  content_value: string | null;
}

const IMAGE_SLOTS = [
  { key: "home.hero.profile", page: "home", section: "hero", label: "首頁 — 個人照片", size: "768 × 1024", ratio: "3:4" },
  { key: "memory.cover", page: "memory", section: "cover", label: "記憶頁 — 封面圖", size: "1920 × 1080", ratio: "16:9" },
  { key: "memory.style.visual", page: "memory", section: "styles", label: "記憶頁 — 視覺學習", size: "1200 × 800", ratio: "3:2" },
  { key: "memory.style.auditory", page: "memory", section: "styles", label: "記憶頁 — 聽覺學習", size: "1200 × 800", ratio: "3:2" },
  { key: "memory.style.kinesthetic", page: "memory", section: "styles", label: "記憶頁 — 動覺學習", size: "1200 × 800", ratio: "3:2" },
  { key: "memory.style.readwrite", page: "memory", section: "styles", label: "記憶頁 — 讀寫學習", size: "1200 × 800", ratio: "3:2" },
  { key: "memory.crosstraining.video", page: "memory", section: "crosstraining", label: "記憶頁 — 混合學習影片", size: "1920 × 1080", ratio: "16:9" },
  { key: "memory.personal.overview", page: "memory", section: "personal", label: "記憶頁 — 個人方法概覽", size: "1920 × 1080", ratio: "16:9" },
];

const AdminImageSlots = ({ userId }: { userId: string | undefined }) => {
  const [slots, setSlots] = useState<ImageSlot[]>([]);
  const [uploading, setUploading] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    initializeAndFetch();
  }, []);

  const initializeAndFetch = async () => {
    // Ensure all slots exist in site_content
    const { data: existing } = await supabase
      .from("site_content")
      .select("content_key")
      .in("content_key", IMAGE_SLOTS.map((s) => s.key));

    const existingKeys = new Set(existing?.map((e) => e.content_key) || []);
    const missing = IMAGE_SLOTS.filter((s) => !existingKeys.has(s.key));

    if (missing.length > 0) {
      await supabase.from("site_content").insert(
        missing.map((s) => ({
          content_key: s.key,
          page: s.page,
          section: s.section,
          content_type: "image",
          content_value: s.label,
        }))
      );
    }

    // Fetch all slots
    const { data } = await supabase
      .from("site_content")
      .select("*")
      .in("content_key", IMAGE_SLOTS.map((s) => s.key));

    if (data) setSlots(data);
  };

  const handleUpload = async (contentKey: string, file: File) => {
    setUploading(contentKey);

    const fileExt = file.name.split(".").pop();
    const filePath = `content/${contentKey.replace(/\./g, "-")}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(filePath, file);

    if (uploadError) {
      toast({ title: "上傳失敗", description: uploadError.message, variant: "destructive" });
      setUploading(null);
      return;
    }

    const { data: urlData } = supabase.storage.from("media").getPublicUrl(filePath);

    await supabase
      .from("site_content")
      .update({ media_url: urlData.publicUrl })
      .eq("content_key", contentKey);

    toast({ title: "圖片已更新" });
    setUploading(null);
    initializeAndFetch();
  };

  const handleRemoveImage = async (contentKey: string, mediaUrl: string) => {
    // Extract file path from URL
    const urlParts = mediaUrl.split("/media/");
    if (urlParts[1]) {
      await supabase.storage.from("media").remove([urlParts[1]]);
    }

    await supabase
      .from("site_content")
      .update({ media_url: null })
      .eq("content_key", contentKey);

    toast({ title: "圖片已移除" });
    initializeAndFetch();
  };

  const getLabel = (key: string) =>
    IMAGE_SLOTS.find((s) => s.key === key)?.label || key;

  return (
    <Card>
      <CardHeader>
        <CardTitle>📍 頁面圖片管理</CardTitle>
        <p className="text-sm text-muted-foreground">
          上傳圖片到對應的前台位置，圖片會自動顯示在網站上。
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {IMAGE_SLOTS.map((slotDef) => {
            const slot = slots.find((s) => s.content_key === slotDef.key);
            const hasImage = slot?.media_url;

            return (
              <div
                key={slotDef.key}
                className="rounded-lg border border-border p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {slotDef.label}
                  </span>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground font-mono block">
                      {slotDef.key}
                    </span>
                    <span className="text-xs text-primary font-medium">
                      建議尺寸: {slotDef.size} ({slotDef.ratio})
                    </span>
                  </div>
                </div>

                {hasImage ? (
                  <div className="relative group">
                    <img
                      src={slot.media_url!}
                      alt={slotDef.label}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center gap-2">
                      <label className="cursor-pointer">
                        <Input
                          type="file"
                          className="hidden"
                          accept="image/*,video/*"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleUpload(slotDef.key, f);
                          }}
                        />
                        <Button size="sm" variant="secondary" asChild>
                          <span><Upload className="h-3 w-3 mr-1" />替換</span>
                        </Button>
                      </label>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemoveImage(slotDef.key, slot.media_url!)}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />移除
                      </Button>
                    </div>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <Input
                      type="file"
                      className="hidden"
                      accept="image/*,video/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleUpload(slotDef.key, f);
                      }}
                    />
                    <div className="w-full h-32 rounded-md border-2 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors">
                      {uploading === slotDef.key ? (
                        <span className="text-sm text-muted-foreground">上傳中...</span>
                      ) : (
                        <>
                          <ImageIcon className="h-6 w-6 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">點擊上傳圖片</span>
                        </>
                      )}
                    </div>
                  </label>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminImageSlots;
