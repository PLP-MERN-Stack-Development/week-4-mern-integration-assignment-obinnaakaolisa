
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MessageSquare, Eye } from "lucide-react";

const BlogCard = ({ blog }) => {
  const authorName = blog.author ? blog.author.name : 'Anonymous';
  const categoryName = blog.category ? blog.category.name : 'Uncategorized';

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md">
      <Link to={`/blog/${blog.slug}`}>
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={blog.featuredImage || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3"}
            alt={blog.title}
            className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
      </Link>
      <CardHeader className="p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
            {categoryName}
          </span>
        </div>
        <Link to={`/blog/${blog.slug}`} className="hover:underline">
          <h3 className="font-bold text-lg line-clamp-2">{blog.title}</h3>
        </Link>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-muted-foreground line-clamp-3">{blog.excerpt}</p>
      </CardContent>
      <CardFooter className="p-4 border-t flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={`https://i.pravatar.cc/150?u=${blog.author?._id}`}
            alt={authorName}
            className="rounded-full w-6 h-6"
          />
          <span className="text-sm">{authorName}</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground text-sm">
          <span className="flex items-center gap-1">
            <Eye size={14} />
            {blog.viewCount || 0}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare size={14} />
            {blog.comments?.length || 0}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
