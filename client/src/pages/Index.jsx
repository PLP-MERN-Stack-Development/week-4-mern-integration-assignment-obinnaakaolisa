
import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import FeaturedPosts from "../components/FeaturedPosts";
import NewsletterSignup from "../components/NewsletterSignup";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedPosts />
      <NewsletterSignup />
    </Layout>
  );
};

export default Index;
