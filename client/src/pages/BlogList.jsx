
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import BlogCard from "../components/BlogCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

// Extended mock data for blog list
const blogListData = [
  // First 4 posts from FeaturedPosts plus additional posts
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
  },
  {
    id: "5",
    title: "The Psychology Behind Successful Marketing Campaigns",
    excerpt: "Understanding human behavior and decision-making processes can help create more effective marketing strategies.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3",
    category: "Marketing",
    readTime: 9,
    author: {
      id: "author5",
      name: "Jessica Thompson",
      avatar: "https://i.pravatar.cc/150?img=9"
    },
    likes: 87,
    comments: 14
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

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "technology", name: "Technology" },
    { id: "health", name: "Health & Wellness" },
    { id: "business", name: "Business" },
    { id: "lifestyle", name: "Lifestyle" },
    { id: "productivity", name: "Productivity" },
    { id: "marketing", name: "Marketing" }
  ];

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    // with proper pagination, filtering, etc.
    let filteredBlogs = [...blogListData];
    
    if (selectedCategory !== "all") {
      filteredBlogs = filteredBlogs.filter(
        blog => blog.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredBlogs = filteredBlogs.filter(
        blog => 
          blog.title.toLowerCase().includes(query) || 
          blog.excerpt.toLowerCase().includes(query) ||
          blog.category.toLowerCase().includes(query) ||
          blog.author.name.toLowerCase().includes(query)
      );
    }
    
    setBlogs(filteredBlogs);
  }, [searchQuery, selectedCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    // The useEffect will handle the filtering
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8">Blog Articles</h1>
        
        {/* Search and filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <form onSubmit={handleSearch} className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text" 
              placeholder="Search articles..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Blog list */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No articles found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
        
        {/* Pagination */}
        {blogs.length > 0 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </Layout>
  );
};

export default BlogList;
