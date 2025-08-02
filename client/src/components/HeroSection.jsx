
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Implementation would go here
    console.log("Searching for:", searchQuery);
  };

  return (
    <section className="relative py-20 overflow-hidden" style={{background: 'var(--gradient-hero)'}}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern-dots z-0"></div>
      </div>
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Discover Inspiring <span className="text-primary">Stories</span> & <span className="text-primary">Ideas</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community of writers and readers to explore thought-provoking content across various topics and perspectives.
          </p>
          
          <form onSubmit={handleSearch} className="flex w-full max-w-lg mx-auto mb-8 gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text" 
                placeholder="Search articles, topics or authors..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
          
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/category/technology">
              <Button variant="outline" size="sm">Technology</Button>
            </Link>
            <Link to="/category/health">
              <Button variant="outline" size="sm">Health</Button>
            </Link>
            <Link to="/category/business">
              <Button variant="outline" size="sm">Business</Button>
            </Link>
            <Link to="/category/lifestyle">
              <Button variant="outline" size="sm">Lifestyle</Button>
            </Link>
            <Link to="/category/science">
              <Button variant="outline" size="sm">Science</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
