
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, PenSquare, User, Settings } from "lucide-react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="text-2xl font-bold">DevScribe</Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground/70 hover:text-foreground transition-colors">Home</Link>
            <Link to="/blogs" className="text-foreground/70 hover:text-foreground transition-colors">Blogs</Link>
            <Link to="/about" className="text-foreground/70 hover:text-foreground transition-colors">About</Link>
            <Link to="/contact" className="text-foreground/70 hover:text-foreground transition-colors">Contact</Link>
            <Link to="/dashboard" className="text-foreground/70 hover:text-foreground transition-colors">Dashboard</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/dashboard/posts/new">
              <Button variant="outline">
                <PenSquare className="w-4 h-4 mr-2" />
                Write
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">DevScribe</h3>
              <p className="text-muted-foreground">A Medium-style blog platform for developers and tech enthusiasts.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-foreground/70 hover:text-foreground transition-colors">Home</Link></li>
                <li><Link to="/blogs" className="text-foreground/70 hover:text-foreground transition-colors">Blogs</Link></li>
                <li><Link to="/about" className="text-foreground/70 hover:text-foreground transition-colors">About</Link></li>
                <li><Link to="/contact" className="text-foreground/70 hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-foreground/70 hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-foreground/70 hover:text-foreground transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex gap-4">
                <a href="#" className="text-foreground/70 hover:text-foreground transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></a>
                <a href="#" className="text-foreground/70 hover:text-foreground transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                <a href="#" className="text-foreground/70 hover:text-foreground transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg></a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DevScribe. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Mobile navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
        <div className="grid grid-cols-4 h-16">
          <Link to="/" className="flex flex-col items-center justify-center">
            <Home size={20} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/blogs" className="flex flex-col items-center justify-center">
            <PenSquare size={20} />
            <span className="text-xs mt-1">Blogs</span>
          </Link>
          <Link to="/dashboard" className="flex flex-col items-center justify-center">
            <User size={20} />
            <span className="text-xs mt-1">Dashboard</span>
          </Link>
          <Link to="/dashboard/posts/new" className="flex flex-col items-center justify-center">
            <PenSquare size={20} />
            <span className="text-xs mt-1">Write</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Layout;
