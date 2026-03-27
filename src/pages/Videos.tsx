import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  Upload,
  Link as LinkIcon,
  Play,
  Trash2,
  Filter,
  Video as VideoIcon,
} from "lucide-react";
import { Label } from "@/components/ui/label";

interface VideoItem {
  id: string;
  title: string;
  description: string | null;
  category: string;
  video_type: string;
  video_url: string | null;
  file_path: string | null;
  thumbnail_url: string | null;
  created_at: string;
}

const DEFAULT_CATEGORIES = ["未分類", "教學", "學習", "記憶", "語言", "系統思維", "其他"];

const extractYouTubeId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

const getYouTubeThumbnail = (url: string): string | null => {
  const id = extractYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null;
};

const Videos = () => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<VideoItem | null>(null);

  // Form state
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "未分類",
    videoType: "youtube" as "youtube" | "upload",
    youtubeUrl: "",
  });
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const { data } = await supabase
      .from("videos")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setVideos(data);
    setLoading(false);
  };

  const categories = useMemo(() => {
    const fromVideos = videos.map((v) => v.category);
    return [...new Set([...DEFAULT_CATEGORIES, ...fromVideos])];
  }, [videos]);

  const filtered = useMemo(() => {
    return videos.filter((v) => {
      const matchSearch =
        !search ||
        v.title.toLowerCase().includes(search.toLowerCase()) ||
        v.description?.toLowerCase().includes(search.toLowerCase());
      const matchCategory = categoryFilter === "all" || v.category === categoryFilter;
      return matchSearch && matchCategory;
    });
  }, [videos, search, categoryFilter]);

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      toast({ title: "請輸入影片標題", variant: "destructive" });
      return;
    }

    setSubmitting(true);

    let videoUrl = "";
    let filePath = "";
    let thumbnailUrl = "";

    if (form.videoType === "youtube") {
      if (!form.youtubeUrl.trim()) {
        toast({ title: "請輸入 YouTube 連結", variant: "destructive" });
        setSubmitting(false);
        return;
      }
      videoUrl = form.youtubeUrl.trim();
      thumbnailUrl = getYouTubeThumbnail(videoUrl) || "";
    } else {
      if (!uploadFile) {
        toast({ title: "請選擇影片檔案", variant: "destructive" });
        setSubmitting(false);
        return;
      }

      const fileExt = uploadFile.name.split(".").pop();
      const path = `videos/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage.from("media").upload(path, uploadFile);
      if (uploadError) {
        toast({ title: "上傳失敗", description: uploadError.message, variant: "destructive" });
        setSubmitting(false);
        return;
      }

      filePath = path;
      videoUrl = supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
    }

    const { error } = await supabase.from("videos").insert({
      title: form.title.trim(),
      description: form.description.trim() || null,
      category: form.category,
      video_type: form.videoType,
      video_url: videoUrl,
      file_path: filePath || null,
      thumbnail_url: thumbnailUrl || null,
    });

    if (error) {
      toast({ title: "新增失敗", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "影片已新增" });
      setForm({ title: "", description: "", category: "未分類", videoType: "youtube", youtubeUrl: "" });
      setUploadFile(null);
      setDialogOpen(false);
      fetchVideos();
    }
    setSubmitting(false);
  };

  const handleDelete = async (video: VideoItem) => {
    if (video.file_path) {
      await supabase.storage.from("media").remove([video.file_path]);
    }
    await supabase.from("videos").delete().eq("id", video.id);
    toast({ title: "已刪除" });
    fetchVideos();
  };

  const renderThumbnail = (video: VideoItem) => {
    if (video.thumbnail_url) {
      return (
        <img
          src={video.thumbnail_url}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      );
    }
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center">
        <VideoIcon className="h-10 w-10 text-muted-foreground/40" />
      </div>
    );
  };

  const renderPlayer = (video: VideoItem) => {
    if (video.video_type === "youtube" && video.video_url) {
      const ytId = extractYouTubeId(video.video_url);
      if (ytId) {
        return (
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
            className="w-full aspect-video rounded-lg"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        );
      }
    }
    if (video.video_url) {
      return (
        <video src={video.video_url} controls autoPlay className="w-full aspect-video rounded-lg" />
      );
    }
    return null;
  };

  return (
    <Layout>
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="section-container">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">🎬 影片資源</h1>
              <p className="text-muted-foreground mt-1">探索學習相關的精選影片</p>
            </div>
            {isAdmin && (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-1.5">
                    <Plus className="h-4 w-4" /> 新增影片
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>新增影片</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-2">
                    <div>
                      <Label>影片標題 *</Label>
                      <Input
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        placeholder="輸入影片標題"
                      />
                    </div>
                    <div>
                      <Label>說明</Label>
                      <Textarea
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        placeholder="影片簡述（選填）"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label>分類</Label>
                      <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>影片來源</Label>
                      <div className="flex gap-2 mt-1">
                        <Button
                          type="button"
                          variant={form.videoType === "youtube" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setForm({ ...form, videoType: "youtube" })}
                          className="gap-1.5"
                        >
                          <LinkIcon className="h-3.5 w-3.5" /> YouTube 連結
                        </Button>
                        <Button
                          type="button"
                          variant={form.videoType === "upload" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setForm({ ...form, videoType: "upload" })}
                          className="gap-1.5"
                        >
                          <Upload className="h-3.5 w-3.5" /> 上傳檔案
                        </Button>
                      </div>
                    </div>
                    {form.videoType === "youtube" ? (
                      <div>
                        <Label>YouTube 連結</Label>
                        <Input
                          value={form.youtubeUrl}
                          onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
                          placeholder="https://www.youtube.com/watch?v=..."
                        />
                      </div>
                    ) : (
                      <div>
                        <Label>影片檔案</Label>
                        <Input
                          type="file"
                          accept="video/*"
                          onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                        />
                        <p className="text-xs text-muted-foreground mt-1">支援 MP4、MOV、WebM 等格式</p>
                      </div>
                    )}
                    <Button onClick={handleSubmit} disabled={submitting} className="w-full">
                      {submitting ? "新增中..." : "新增影片"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜尋影片..."
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-1.5 text-muted-foreground" />
                <SelectValue placeholder="全部分類" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部分類</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Video Grid */}
          {loading ? (
            <p className="text-center text-muted-foreground py-16">載入中...</p>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <VideoIcon className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground">
                {search || categoryFilter !== "all" ? "沒有符合條件的影片" : "尚無影片"}
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((video) => (
                <Card
                  key={video.id}
                  className="group overflow-hidden border-border/50 hover:border-border transition-colors cursor-pointer"
                  onClick={() => setPlayingVideo(video)}
                >
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    {renderThumbnail(video)}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                        <Play className="h-5 w-5 text-primary-foreground ml-0.5" />
                      </div>
                    </div>
                    {isAdmin && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(video);
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-md bg-destructive/80 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-foreground line-clamp-2 text-sm">
                        {video.title}
                      </h3>
                      <Badge variant="secondary" className="shrink-0 text-xs">
                        {video.category}
                      </Badge>
                    </div>
                    {video.description && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                        {video.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Player Dialog */}
          <Dialog open={!!playingVideo} onOpenChange={() => setPlayingVideo(null)}>
            <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
              {playingVideo && (
                <div>
                  <div className="bg-black">{renderPlayer(playingVideo)}</div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="text-lg font-semibold text-foreground">{playingVideo.title}</h2>
                      <Badge variant="secondary">{playingVideo.category}</Badge>
                    </div>
                    {playingVideo.description && (
                      <p className="text-sm text-muted-foreground mt-2">{playingVideo.description}</p>
                    )}
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </Layout>
  );
};

export default Videos;
