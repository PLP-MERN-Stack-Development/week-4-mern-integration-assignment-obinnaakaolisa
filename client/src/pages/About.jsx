
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Layout>
      <div className="container py-12">
        {/* Hero section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About DevScribe</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're building the premier platform for developers, designers, and tech enthusiasts to share knowledge, learn from each other, and grow together.
          </p>
        </div>
        
        {/* Our story section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg mb-4">
              DevScribe was founded in 2020 with a simple yet powerful vision: to create a space where developers and tech professionals could share their knowledge and readers could discover content that advances their careers.
            </p>
            <p className="text-lg mb-4">
              What started as a small passion project has grown into a vibrant community of developers, designers, and tech enthusiasts. We believe that sharing knowledge drives innovation and growth.
            </p>
            <p className="text-lg">
              Our platform is built on the principles of quality content, technical accuracy, and community-driven learning. We're committed to fostering meaningful discussions and providing tools that empower creators.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden aspect-video">
            <img
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3"
              alt="Team working together"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Mission & Values */}
        <div className="bg-muted rounded-lg p-8 mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're guided by core principles that inform everything we do at DevScribe.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="8"></line></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Technical Excellence</h3>
              <p>We prioritize high-quality, well-researched technical content that provides real value to developers and advances the tech community.</p>
            </div>
            
            <div className="bg-background p-6 rounded-lg">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Knowledge Sharing</h3>
              <p>We celebrate diverse technical perspectives and experiences. Our community includes voices from all levels, from beginners to experts.</p>
            </div>
            
            <div className="bg-background p-6 rounded-lg">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m22 8-6 4 6 4V8Z"></path><rect width="14" height="12" x="2" y="6" rx="2"></rect><path d="M6 12h4"></path><path d="M8 10v4"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Developer Growth</h3>
              <p>We're committed to building tools and features that help developers share knowledge, learn new skills, and advance their careers.</p>
            </div>
          </div>
        </div>
        
        {/* Team section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind DevScribe working to create the best platform for developers and tech professionals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              { name: "Alex Johnson", role: "Founder & CEO", image: "https://i.pravatar.cc/300?img=60" },
              { name: "Michelle Lee", role: "Chief Editor", image: "https://i.pravatar.cc/300?img=48" },
              { name: "David Chen", role: "Head of Product", image: "https://i.pravatar.cc/300?img=12" },
              { name: "Sarah Williams", role: "Community Manager", image: "https://i.pravatar.cc/300?img=25" }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Join us section */}
        <div className="bg-primary/5 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Whether you're an established writer looking for a new platform or just starting your writing journey, we'd love to have you as part of our community.
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <Button asChild size="lg">
              <Link to="/register">Sign Up Today</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
