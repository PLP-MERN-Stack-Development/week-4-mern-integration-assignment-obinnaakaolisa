import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import BlogCard from "../components/BlogCard";
import { Badge } from "@/components/ui/badge";

// Mock data for category-specific posts
const categoryPostsData = {
  technology: [
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
    }
  ],
  health: [
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
    }
  ],
  business: [
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
  ],
  lifestyle: [
    {
      id: "7",
      title: "The Rise of Sustainable Fashion: Trends and Innovations",
      excerpt: "The fashion industry is evolving to address environmental concerns. Discover the latest sustainable practices and brands.",
      coverImage: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3",
      category: "Lifestyle",
      readTime: 7,
      author: {
        id: "author7",
        name: "Sophia Lee",
        avatar: "https://i.pravatar.cc/150?img=13"
      },
      likes: 164,
      comments: 31
    }
  ],
  science: [
    {
      id: "8",
      title: "Emerging Trends in Data Science and Analytics",
      excerpt: "The field of data science continues to evolve rapidly. Stay up to date with these key trends shaping the industry.",
      coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3",
      category: "Science",
      readTime: 14,
      author: {
        id: "author8",
        name: "Daniel Brown",
        avatar: "https://i.pravatar.cc/150?img=15"
      },
      likes: 198,
      comments: 27
    }
  ]
};

const categoryInfo = {
  technology: {
    title: "Technology",
    description: "Explore the latest in tech, programming, AI, and digital innovation",
    icon: "💻"
  },
  health: {
    title: "Health & Wellness",
    description: "Discover insights on mental health, fitness, nutrition, and well-being",
    icon: "🧘"
  },
  business: {
    title: "Business",
    description: "Learn about entrepreneurship, leadership, strategy, and industry trends",
    icon: "💼"
  },
  lifestyle: {
    title: "Lifestyle",
    description: "Tips and inspiration for living your best life",
    icon: "🏡"
  },
  science: {
    title: "Science",
    description: "Scientific breakthroughs, research, and discoveries",
    icon: "🔬"
  }
};

const CategoryPage = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState(null);

  useEffect(() => {
    // In a real app, you would fetch category-specific posts from an API
    const categoryPosts = categoryPostsData[category] || [];
    const details = categoryInfo[category];
    
    setPosts(categoryPosts);
    setCategoryDetails(details);
  }, [category]);

  if (!categoryDetails) {
    return (
      <Layout>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <p className="text-muted-foreground">
            The category you're looking for doesn't exist.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Category Header */}
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">{categoryDetails.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold">{categoryDetails.title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {categoryDetails.description}
          </p>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'}
          </Badge>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} blog={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No articles yet</h3>
            <p className="text-muted-foreground">
              Be the first to write about {categoryDetails.title.toLowerCase()}!
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;