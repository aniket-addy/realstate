import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";

import LifestyleSection from "../components/lifestyle/LifestyleSection";
import FeaturedProperties from "../components/property/FeaturedProperties";
import NewProjects from "../components/projects/NewProjects";

import Footer from "../components/footer/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-background">

      <Navbar />

      <main>

        {/* Hero */}
        <Hero />

        {/* 1. Explore by Lifestyle */}
        <LifestyleSection />

        {/* 2. Featured Properties */}
        <FeaturedProperties />

        {/* 3. New Projects */}
        <NewProjects />

      </main>

      <Footer />

    </div>
  );
}

export default Home;