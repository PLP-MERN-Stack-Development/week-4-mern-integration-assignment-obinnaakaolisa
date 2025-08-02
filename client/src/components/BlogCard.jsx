
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MessageSquare, ThumbsUp } from "lucide-react";

const BlogCard = ({ blog }) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md">
      <Link to={`/blog/${blog.id}`}>
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={blog.coverImage || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3"} 
            alt={blog.title} 
            className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
      </Link>
      <CardHeader className="p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">{blog.category}</span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {blog.readTime} min read
          </span>
        </div>
        <Link to={`/blog/${blog.id}`} className="hover:underline">
          <h3 className="font-bold text-lg line-clamp-2">{blog.title}</h3>
        </Link>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-muted-foreground line-clamp-3">{blog.excerpt}</p>
      </CardContent>
      <CardFooter className="p-4 border-t flex items-center justify-between">
        <Link to={`/author/${blog.author.id}`} className="flex items-center gap-2">
          <img 
            src={blog.author.avatar || "https://github.com/shadcn.png"} 
            alt={blog.author.name} 
            className="rounded-full w-6 h-6"
          />
          <span className="text-sm">{blog.author.name}</span>
        </Link>
        <div className="flex items-center gap-3 text-muted-foreground text-sm">
          <span className="flex items-center gap-1">
            <ThumbsUp size={14} />
            {blog.likes}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare size={14} />
            {blog.comments}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
