
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import CommentSection from "../components/CommentSection";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { BookmarkPlus, ThumbsUp, MessageSquare, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import BlogCard from "../components/BlogCard";
import { postsAPI } from "@/services/api";

// Mock data for related posts (reusing some posts from our existing data)
const relatedPostsData = [
  {
    id: "2",
    title: "The Future of Artificial Intelligence: Opportunities and Challenges",
    excerpt: "As AI continues to evolve, it brings both exciting possibilities and important ethical questions that society must address.",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3",
    category: "Technology",
    readTime: 12,
    author: {
      id: "author2",
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    likes: 234,
    comments: 42
  },
  {
    id: "6",
    title: "Essential Cybersecurity Practices for Small Businesses",
    excerpt: "Small companies are increasingly targeted by hackers. Learn how to protect your business with these security measures.",
    coverImage: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3",
    category: "Technology",
    readTime: 11,
    author: {
      id: "author6",
      name: "Robert Garcia",
      avatar: "https://i.pravatar.cc/150?img=11"
    },
    likes: 131,
    comments: 19
  },
  {
    id: "8",
    title: "Emerging Trends in Data Science and Analytics",
    excerpt: "The field of data science continues to evolve rapidly. Stay up to date with these key trends shaping the industry.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3",
    category: "Technology",
    readTime: 14,
    author: {
      id: "author8",
      name: "Daniel Brown",
      avatar: "https://i.pravatar.cc/150?img=15"
    },
    likes: 198,
    comments: 27
  }
];

// Mock blog detail data
const blogDetailData = {
  id: "1",
  title: "10 Tips for Improving Your Productivity While Working Remotely",
  content: `
    <p class="lead">The COVID-19 pandemic has transformed the way we work, with many organizations adopting remote work policies. While working from home offers flexibility and eliminates commute time, it also presents unique challenges to productivity and work-life balance.</p>
    
    <p>In this article, we'll explore ten practical strategies to help you maintain productivity and well-being while working remotely.</p>
    
    <h2>1. Establish a Dedicated Workspace</h2>
    
    <p>Creating a designated area for work is crucial for productivity. This doesn't necessarily mean having a separate home office; even a specific corner of a room can work well. The key is to have a space that you associate with work and can leave behind at the end of the day.</p>
    
    <p>Your workspace should be comfortable, well-lit, and as free from distractions as possible. Invest in an ergonomic chair and ensure your computer monitor is at eye level to prevent physical discomfort during long work sessions.</p>
    
    <h2>2. Maintain Regular Hours</h2>
    
    <p>One of the biggest challenges of remote work is maintaining boundaries between work and personal life. Setting consistent working hours helps create structure in your day and prevents work from spilling into your personal time.</p>
    
    <p>Communicate your working hours to colleagues and clients to set expectations about your availability. Use calendar blocking to schedule focused work time, meetings, and breaks.</p>
    
    <h2>3. Dress for Success</h2>
    
    <p>While working in pajamas might seem like a perk of remote work, getting dressed as if you're going to the office can put you in a professional mindset. This doesn't mean wearing formal attire, but changing out of sleepwear signals to your brain that it's time to work.</p>
    
    <h2>4. Use the Pomodoro Technique</h2>
    
    <p>The Pomodoro Technique involves working in focused blocks of time (typically 25 minutes) followed by short breaks. This method helps maintain concentration and prevents burnout. There are many apps available that can help you implement this technique.</p>
    
    <h2>5. Minimize Distractions</h2>
    
    <p>Identify what typically distracts you and take steps to minimize these interruptions. This might mean turning off social media notifications, using website blockers during work hours, or establishing boundaries with family members or housemates.</p>
    
    <h2>6. Take Regular Breaks</h2>
    
    <p>Counterintuitively, taking breaks actually improves productivity. Short breaks help prevent mental fatigue and maintain focus. Try to step away from your screen regularly, stretch, or take a short walk to refresh your mind.</p>
    
    <h2>7. Stay Connected with Colleagues</h2>
    
    <p>Remote work can be isolating, which can affect both morale and productivity. Schedule regular check-ins with teammates, participate in virtual social events, and don't hesitate to reach out via chat or video call when you need to collaborate or simply connect.</p>
    
    <h2>8. Set Clear Goals</h2>
    
    <p>Without the structure of an office environment, it's helpful to set daily and weekly goals. Start each day by identifying your most important tasks and track your progress. This provides direction and a sense of accomplishment as you complete tasks.</p>
    
    <h2>9. Use Productivity Tools</h2>
    
    <p>There are numerous tools designed to enhance remote work productivity. Project management software like Asana or Trello helps track tasks, while time-tracking apps can provide insights into how you're spending your working hours. Find the tools that work best for your workflow.</p>
    
    <h2>10. Practice Self-Care</h2>
    
    <p>Finally, remember that your physical and mental wellbeing directly affects your productivity. Ensure you're getting enough sleep, eating well, exercising regularly, and taking time to relax and recharge. Remote work shouldn't mean always being "on" - make time for activities you enjoy outside of work.</p>
    
    <h2>Conclusion</h2>
    
    <p>Remote work offers flexibility but requires intentionality to maintain productivity. By implementing these strategies, you can create a work environment that promotes focus, efficiency, and wellbeing. Remember that finding the right approach may take time - be patient with yourself and willing to adjust your methods as needed.</p>
  `,
  publishDate: "2023-05-15",
  updatedDate: "2023-05-28",
  coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3",
  category: "Productivity",
  tags: ["Remote Work", "Productivity", "Work-Life Balance", "Home Office"],
  readTime: 8,
  author: {
    id: "author1",
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    bio: "Sarah is a productivity coach and remote work specialist with over 10 years of experience in helping professionals optimize their work habits and environments."
  },
  likes: 145,
  comments: [
    {
      id: "comment1",
      user: {
        id: "user1",
        name: "John Doe",
        avatar: "https://i.pravatar.cc/150?img=60"
      },
      content: "Great article! I've been struggling with maintaining a routine while working from home, and the Pomodoro Technique has been a game-changer for me.",
      date: "2023-05-16",
      likes: 8
    },
    {
      id: "comment2",
      user: {
        id: "user2",
        name: "Alice Smith",
        avatar: "https://i.pravatar.cc/150?img=44"
      },
      content: "I'd add that noise-cancelling headphones are essential for those sharing space with family members or roommates. They've helped me stay focused during important tasks.",
      date: "2023-05-17",
      likes: 12
    },
    {
      id: "comment3",
      user: {
        id: "user3",
        name: "Robert Johnson",
        avatar: "https://i.pravatar.cc/150?img=12"
      },
      content: "Setting boundaries with family has been my biggest challenge. Any specific advice on how to communicate the importance of uninterrupted work time without seeming dismissive?",
      date: "2023-05-20",
      likes: 5
    }
  ]
};

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [commentText, setCommentText] = useState("");
  
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await postsAPI.getById(id);
        setBlog(data);
      } catch (error) {
        // Fallback to mock data for demo
        setBlog(blogDetailData);
      }
    };

    fetchBlog();
    setRelatedPosts(relatedPostsData);
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    
    if (!isLiked) {
      toast({
        description: "Article added to your likes",
      });
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    
    if (!isSaved) {
      toast({
        description: "Article saved to your bookmarks",
      });
    } else {
      toast({
        description: "Article removed from your bookmarks",
      });
    }
  };

  const handleShare = (platform) => {
    toast({
      description: `Sharing article on ${platform}`,
    });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    
    if (commentText.trim()) {
      toast({
        description: "Your comment has been posted",
      });
      setCommentText("");
    }
  };

  if (!blog) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <p>Loading article...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="container py-8">
        {/* Article header */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link 
              to={`/category/${blog.category.toLowerCase()}`} 
              className="text-primary hover:underline"
            >
              {blog.category}
            </Link>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{blog.title}</h1>
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div>
                <Link to={`/author/${blog.author.id}`} className="font-medium hover:underline">
                  {blog.author.name}
                </Link>
                <div className="text-sm text-muted-foreground">
                  Published on {blog.publishDate} • {blog.readTime} min read
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleSave}
                className={isSaved ? "text-primary" : ""}
              >
                <BookmarkPlus size={20} />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Featured image */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="aspect-video overflow-hidden rounded-lg">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Article content */}
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
          
          {/* Tags */}
          <div className="my-8">
            <div className="flex flex-wrap gap-2">
              {blog.tags.map(tag => (
                <Link key={tag} to={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Button variant="outline" size="sm">#{tag}</Button>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Action bar */}
          <div className="flex flex-wrap justify-between items-center my-8 py-4 border-y">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                className={`flex items-center gap-2 ${isLiked ? "text-primary" : ""}`}
                onClick={handleLike}
              >
                <ThumbsUp size={18} />
                <span>{isLiked ? blog.likes + 1 : blog.likes}</span>
              </Button>
              
              <Button variant="ghost" className="flex items-center gap-2">
                <MessageSquare size={18} />
                <span>{blog.comments.length}</span>
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">Share:</span>
              <Button variant="ghost" size="icon" onClick={() => handleShare('Facebook')}>
                <Facebook size={18} />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleShare('Twitter')}>
                <Twitter size={18} />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleShare('LinkedIn')}>
                <Linkedin size={18} />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleShare('Copy Link')}>
                <Share2 size={18} />
              </Button>
            </div>
          </div>
          
          {/* Author bio */}
          <div className="bg-muted p-6 rounded-lg mb-12">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <Avatar className="w-20 h-20">
                <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div>
                <Link to={`/author/${blog.author.id}`} className="font-bold text-lg block mb-2 hover:underline">
                  About {blog.author.name}
                </Link>
                <p className="text-muted-foreground mb-4">{blog.author.bio}</p>
                <Button asChild variant="outline" size="sm">
                  <Link to={`/author/${blog.author.id}`}>View all articles</Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Comments section */}
          <CommentSection postId={blog.id} comments={blog.comments || []} />
        </div>
      </article>
      
      {/* Related articles */}
      <section className="bg-muted py-12">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <BlogCard key={post.id} blog={post} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogDetail;
