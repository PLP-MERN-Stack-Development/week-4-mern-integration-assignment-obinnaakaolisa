import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Eye, BarChart3, Users, BookOpen, TrendingUp, Calendar, Clock, Heart, MessageCircle, Share } from "lucide-react";
import Layout from "@/components/Layout";
import CategoryManager from "@/components/CategoryManager";
import { toast } from "@/hooks/use-toast";
import { postsAPI } from "@/services/api";

const Dashboard = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Getting Started with React Hooks: A Complete Guide",
      status: "published",
      views: 12547,
      likes: 189,
      comments: 23,
      publishedAt: "2024-01-15",
      category: "React",
      readTime: "8 min read",
      excerpt: "Learn how to use React hooks effectively in your applications with practical examples and best practices."
    },
    {
      id: 2,
      title: "Building Responsive Layouts with Tailwind CSS",
      status: "draft",
      views: 0,
      likes: 0,
      comments: 0,
      publishedAt: null,
      category: "CSS",
      readTime: "6 min read",
      excerpt: "Master responsive design with Tailwind CSS utility classes and breakpoint system."
    },
    {
      id: 3,
      title: "State Management in Modern React Applications",
      status: "published",
      views: 8563,
      likes: 157,
      comments: 34,
      publishedAt: "2024-01-10",
      category: "React",
      readTime: "12 min read",
      excerpt: "Explore different state management solutions for React applications including Context API, Redux, and Zustand."
    },
    {
      id: 4,
      title: "JavaScript Performance Optimization Techniques",
      status: "scheduled",
      views: 0,
      likes: 0,
      comments: 0,
      publishedAt: "2024-01-25",
      category: "JavaScript",
      readTime: "10 min read",
      excerpt: "Learn advanced techniques to optimize your JavaScript code for better performance and user experience."
    },
    {
      id: 5,
      title: "Introduction to TypeScript for React Developers",
      status: "published",
      views: 15234,
      likes: 267,
      comments: 45,
      publishedAt: "2024-01-05",
      category: "TypeScript",
      readTime: "15 min read",
      excerpt: "Get started with TypeScript in React projects and improve your development experience with static typing."
    }
  ]);

  const stats = {
    totalPosts: posts.length,
    publishedPosts: posts.filter(p => p.status === "published").length,
    draftPosts: posts.filter(p => p.status === "draft").length,
    scheduledPosts: posts.filter(p => p.status === "scheduled").length,
    totalViews: posts.reduce((sum, post) => sum + post.views, 0),
    totalLikes: posts.reduce((sum, post) => sum + post.likes, 0),
    totalComments: posts.reduce((sum, post) => sum + post.comments, 0),
    avgEngagement: posts.filter(p => p.views > 0).length > 0 ? 
      (posts.reduce((sum, post) => sum + (post.likes + post.comments), 0) / 
       posts.reduce((sum, post) => sum + post.views, 0) * 100).toFixed(2) : 0
  };

  const getStatusBadge = (status) => {
    const variants = {
      published: "default",
      draft: "secondary",
      scheduled: "outline"
    };
    const colors = {
      published: "text-green-600 bg-green-50 border-green-200",
      draft: "text-yellow-600 bg-yellow-50 border-yellow-200", 
      scheduled: "text-blue-600 bg-blue-50 border-blue-200"
    };
    return <Badge variant={variants[status]} className={colors[status]}>{status}</Badge>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not published";
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleDeletePost = async (postId) => {
    try {
      await postsAPI.delete(postId);
      setPosts(prev => prev.filter(post => post.id !== postId));
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Manage your blog content</p>
          </div>
          <Link to="/dashboard/posts/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPosts}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-2">
                <div className="flex items-center gap-4">
                  <span className="text-green-600">{stats.publishedPosts} published</span>
                  <span className="text-yellow-600">{stats.draftPosts} drafts</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Across all published posts
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalLikes + stats.totalComments}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-2">
                <span>{stats.totalLikes} likes • {stats.totalComments} comments</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgEngagement}%</div>
              <p className="text-xs text-muted-foreground mt-2">
                Engagement rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="posts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Posts</CardTitle>
                    <CardDescription>
                      Manage and track your blog posts
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{stats.totalPosts} total</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-lg line-clamp-1">{post.title}</h3>
                          {getStatusBadge(post.status)}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 max-w-2xl">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{post.readTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(post.publishedAt)}</span>
                          </div>
                        </div>
                        {post.status === "published" && (
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>{post.views.toLocaleString()} views</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              <span>{post.likes} likes</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" />
                              <span>{post.comments} comments</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="ghost" size="sm" title="View post">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Edit post">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Share post">
                          <Share className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          title="Delete post" 
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <CategoryManager />
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  Track your blog performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Blog Settings</CardTitle>
                <CardDescription>
                  Configure your blog preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;