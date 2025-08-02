
import { useState } from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // This would be an API call in a real application
      console.log("Submitting form:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions, feedback, or just want to say hello? We'd love to hear from you.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-muted p-6 rounded-lg flex flex-col items-center text-center">
            <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
              <Mail className="text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-2">Email Us</h3>
            <p className="text-muted-foreground mb-4">Our friendly team is here to help.</p>
            <a href="mailto:hello@devscribe.com" className="text-primary hover:underline">
              hello@devscribe.com
            </a>
          </div>
          
          <div className="bg-muted p-6 rounded-lg flex flex-col items-center text-center">
            <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
              <MapPin className="text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-2">Office</h3>
            <p className="text-muted-foreground mb-4">Come say hello at our office HQ.</p>
            <address className="not-italic">
              123 Writing Lane<br />
              San Francisco, CA 94107
            </address>
          </div>
          
          <div className="bg-muted p-6 rounded-lg flex flex-col items-center text-center">
            <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
              <Phone className="text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-2">Phone</h3>
            <p className="text-muted-foreground mb-4">Mon-Fri from 8am to 5pm.</p>
            <a href="tel:+15551234567" className="text-primary hover:underline">
              +1 (555) 123-4567
            </a>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this regarding?"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    rows={6}
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold mb-2">How do I create an account?</h3>
                <p className="text-muted-foreground">
                  You can create an account by clicking the "Sign Up" button in the top right corner of the page. Fill out the registration form with your details to get started.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Is it free to publish on DevScribe?</h3>
                <p className="text-muted-foreground">
                  Yes, publishing on DevScribe is completely free. We believe in providing a platform where developers can share their knowledge without any financial barriers.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">How do I become a featured writer?</h3>
                <p className="text-muted-foreground">
                  Our editorial team regularly reviews content on the platform and selects high-quality articles for featuring. Consistently publishing valuable content increases your chances of being featured.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Can I monetize my content?</h3>
                <p className="text-muted-foreground">
                  We're currently working on monetization features that will allow writers to earn from their content. Stay tuned for updates on this feature.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">What are your content guidelines?</h3>
                <p className="text-muted-foreground">
                  We encourage authentic, respectful, and thoughtful content. We don't allow plagiarism, hate speech, or content that violates our community guidelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
