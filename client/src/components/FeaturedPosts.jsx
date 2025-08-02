
import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";

// Mock data for featured posts
const featuredPostsData = [
  {
    id: "1",
    title: "10 Tips for Improving Your Productivity While Working Remotely",
    excerpt: "Working from home has become the new normal for many of us. Here are some strategies to stay productive and maintain work-life balance.",
    coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3",
    category: "Productivity",
    readTime: 8,
    author: {
      id: "author1",
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    likes: 145,
    comments: 28
  },
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
    id: "3",
    title: "How Mindfulness Meditation Can Reduce Stress and Anxiety",
    excerpt: "Regular meditation practice has been shown to have numerous benefits for mental health. Here's how to get started.",
    coverImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3",
    category: "Health",
    readTime: 6,
    author: {
      id: "author3",
      name: "Emily Parker",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    likes: 189,
    comments: 17
  },
  {
    id: "4",
    title: "Sustainable Business Practices That Also Boost Profitability",
    excerpt: "More companies are discovering that environmental responsibility and financial success can go hand in hand.",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3",
    category: "Business",
    readTime: 10,
    author: {
      id: "author4",
      name: "David Wilson",
      avatar: "https://i.pravatar.cc/150?img=7"
    },
    likes: 102,
    comments: 23
  }
];

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    setFeaturedPosts(featuredPostsData);
  }, []);

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Posts</h2>
          <a href="/blogs" className="text-primary hover:underline">View All</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPosts.map((post) => (
            <BlogCard key={post.id} blog={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
