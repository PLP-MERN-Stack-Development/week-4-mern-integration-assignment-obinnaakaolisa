import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Eye, Send, Image, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { postsAPI, uploadAPI } from "@/services/api";

const PostEditor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    tags: [],
    status: "draft",
    coverImage: ""
  });
  const [newTag, setNewTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const categories = [
    "Technology", "React", "JavaScript", "CSS", "Design", 
    "Tutorial", "Opinion", "News", "Review"
  ];

  const handleInputChange = (field, value) => {
    setPost(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !post.tags.includes(newTag.trim())) {
      setPost(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = async (status = "draft") => {
    setIsLoading(true);
    
    try {
      const postData = {
        title: post.title,
        content: post.content,
        slug: post.title.toLowerCase().replace(/\s+/g, '-'),
        category: post.category,
        excerpt: post.excerpt,
        tags: post.tags,
        coverImage: post.coverImage,
        status
      };

      await postsAPI.create(postData);
      
      toast({
        title: status === "published" ? "Post published!" : "Draft saved",
        description: status === "published" 
          ? "Your post is now live." 
          : "Your changes have been saved.",
      });
      
      if (status === "published") {
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save post",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please select a valid image file",
        variant: "destructive",
      });
      return;
    }

    setUploadingImage(true);
    try {
      const result = await uploadAPI.uploadImage(file);
      handleInputChange('coverImage', result.imageUrl);
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handlePreview = () => {
    // Open preview in new tab/modal
    toast({
      title: "Preview",
      description: "Preview functionality coming soon!",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Create New Post</h1>
              <p className="text-muted-foreground">Write and publish your blog post</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleSave("draft")}
              disabled={isLoading}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button 
              onClick={() => handleSave("published")}
              disabled={isLoading || !post.title || !post.content}
            >
              <Send className="w-4 h-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter your post title..."
                    value={post.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Brief description of your post..."
                    value={post.excerpt}
                    onChange={(e) => handleInputChange("excerpt", e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Cover Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="coverImage">Cover Image</Label>
                  <div className="space-y-4">
                    {post.coverImage && (
                      <div className="relative">
                        <img 
                          src={post.coverImage} 
                          alt="Cover preview" 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => handleInputChange('coverImage', '')}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        disabled={uploadingImage}
                        onClick={() => document.getElementById('imageUpload')?.click()}
                      >
                        <Image className="h-4 w-4 mr-2" />
                        {uploadingImage ? "Uploading..." : "Upload Image"}
                      </Button>
                      <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your post content..."
                    value={post.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    rows={15}
                    className="min-h-[400px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select 
                    value={post.category} 
                    onValueChange={(value) => handleInputChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleAddTag}
                    >
                      Add
                    </Button>
                  </div>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {post.tags.map(tag => (
                        <Badge 
                          key={tag} 
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Publishing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status:</span>
                    <Badge variant={post.status === "published" ? "default" : "secondary"}>
                      {post.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Visibility:</span>
                    <span className="text-sm text-muted-foreground">Public</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Publish date:</span>
                    <span className="text-sm text-muted-foreground">Immediately</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostEditor;