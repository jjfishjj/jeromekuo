import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Upload, LogOut, Image, FileText, MapPin, Type } from "lucide-react";
import AdminImageSlots from "@/components/admin/AdminImageSlots";
import AdminTextSlots from "@/components/admin/AdminTextSlots";

interface MediaItem {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number | null;
  alt_text: string | null;
  created_at: string;
}

interface ContentItem {
  id: string;
  page: string;
  section: string;
  content_key: string;
  content_value: string | null;
  content_type: string;
  media_url: string | null;
  sort_order: number | null;
}

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchMedia();
      fetchContent();
    }
  }, [isAdmin]);

  const fetchMedia = async () => {
    const { data } = await supabase
      .from("media")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setMedia(data);
  };

  const fetchContent = async () => {
    const { data } = await supabase
      .from("site_content")
      .select("*")
      .order("page, section, sort_order");
    if (data) setContent(data);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    for (const file of Array.from(files)) {
      const fileExt = file.name.split(".").pop();
      const filePath = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file);

      if (uploadError) {
        toast({ title: "上傳失敗", description: uploadError.message, variant: "destructive" });
        continue;
      }

      const { data: urlData } = supabase.storage.from("media").getPublicUrl(filePath);

      const fileType = file.type.startsWith("video/") ? "video" : "image";

      await supabase.from("media").insert({
        file_name: file.name,
        file_path: filePath,
        file_type: fileType,
        file_size: file.size,
        uploaded_by: user?.id,
      });
    }

    toast({ title: "上傳成功" });
    fetchMedia();
    setUploading(false);
    e.target.value = "";
  };

  const handleDeleteMedia = async (item: MediaItem) => {
    await supabase.storage.from("media").remove([item.file_path]);
    await supabase.from("media").delete().eq("id", item.id);
    toast({ title: "已刪除" });
    fetchMedia();
  };

  const getPublicUrl = (filePath: string) => {
    return supabase.storage.from("media").getPublicUrl(filePath).data.publicUrl;
  };

  const handleUpdateContent = async (id: string, field: string, value: string) => {
    await supabase
      .from("site_content")
      .update({ [field]: value })
      .eq("id", id);
    fetchContent();
  };

  const handleAddContent = async () => {
    await supabase.from("site_content").insert({
      page: "home",
      section: "hero",
      content_key: `new-${Date.now()}`,
      content_value: "",
      content_type: "text",
    });
    fetchContent();
  };

  const handleDeleteContent = async (id: string) => {
    await supabase.from("site_content").delete().eq("id", id);
    fetchContent();
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">載入中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">📋 管理面板</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{user?.email}</span>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-1" /> 登出
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <Tabs defaultValue="text">
          <TabsList className="mb-6">
            <TabsTrigger value="text" className="gap-1.5">
              <Type className="h-4 w-4" /> 前台文字
            </TabsTrigger>
            <TabsTrigger value="slots" className="gap-1.5">
              <MapPin className="h-4 w-4" /> 頁面圖片
            </TabsTrigger>
            <TabsTrigger value="media" className="gap-1.5">
              <Image className="h-4 w-4" /> 媒體庫
            </TabsTrigger>
            <TabsTrigger value="content" className="gap-1.5">
              <FileText className="h-4 w-4" /> 頁面內容
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text">
            <AdminTextSlots />
          </TabsContent>

          <TabsContent value="slots">
            <AdminImageSlots userId={user?.id} />
          </TabsContent>

          <TabsContent value="media">
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>媒體庫</CardTitle>
                <div>
                  <Input
                    type="file"
                    id="media-upload"
                    className="hidden"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleUpload}
                  />
                  <Button asChild disabled={uploading}>
                    <label htmlFor="media-upload" className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-1" />
                      {uploading ? "上傳中..." : "上傳檔案"}
                    </label>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {media.length === 0 ? (
                  <p className="text-center text-muted-foreground py-12">還沒有上傳任何媒體檔案</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {media.map((item) => (
                      <div key={item.id} className="group relative rounded-lg border border-border overflow-hidden bg-card">
                        {item.file_type === "video" ? (
                          <video
                            src={getPublicUrl(item.file_path)}
                            className="w-full aspect-square object-cover"
                            muted
                          />
                        ) : (
                          <img
                            src={getPublicUrl(item.file_path)}
                            alt={item.alt_text || item.file_name}
                            className="w-full aspect-square object-cover"
                          />
                        )}
                        <div className="p-2">
                          <p className="text-xs text-foreground truncate">{item.file_name}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(item.file_size)}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteMedia(item)}
                          className="absolute top-2 right-2 p-1.5 rounded-md bg-destructive/80 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>頁面內容</CardTitle>
                <Button onClick={handleAddContent} size="sm">
                  新增內容
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>頁面</TableHead>
                      <TableHead>區塊</TableHead>
                      <TableHead>Key</TableHead>
                      <TableHead>內容</TableHead>
                      <TableHead>類型</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {content.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Input
                            value={item.page}
                            onChange={(e) => handleUpdateContent(item.id, "page", e.target.value)}
                            className="h-8 text-xs"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.section}
                            onChange={(e) => handleUpdateContent(item.id, "section", e.target.value)}
                            className="h-8 text-xs"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.content_key}
                            onChange={(e) => handleUpdateContent(item.id, "content_key", e.target.value)}
                            className="h-8 text-xs"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.content_value || ""}
                            onChange={(e) => handleUpdateContent(item.id, "content_value", e.target.value)}
                            className="h-8 text-xs"
                          />
                        </TableCell>
                        <TableCell>
                          <span className="text-xs text-muted-foreground">{item.content_type}</span>
                        </TableCell>
                        <TableCell>
                          <button
                            onClick={() => handleDeleteContent(item.id)}
                            className="p-1 text-destructive hover:text-destructive/80"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
