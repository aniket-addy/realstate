import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";

import FeaturedProjects from "../components/projects/FeaturedProjects";
import NewProjects from "../components/projects/NewProjects";

import WhyChooseInvestorise from "../components/why-choose/WhyChooseInvestorise";
import AboutCompany from "../components/about/AboutCompany";
// import ServicesSection from "../components/services/ServicesSection";

// import LifestyleSection from "../components/lifestyle/LifestyleSection";
// import FeaturedProperties from "../components/property/FeaturedProperties";

// import Testimonials from "../components/testimonials/Testimonials";
import ContactSection from "../components/contact/ContactSection";

import FloatingActions from "../components/floating-actions/FloatingActions";
import Footer from "../components/footer/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-white">

      <Navbar />

      <main>
        <Hero />

        <FeaturedProjects />

        {/* <FeaturedProperties /> */}

        <NewProjects />

        <WhyChooseInvestorise />

        <AboutCompany />

        {/* <ServicesSection /> */}

        {/* <LifestyleSection /> */}

        {/* <Testimonials /> */}

        <ContactSection />
      </main>

      <FloatingActions />

      <Footer />

    </div>
  );
}

export default Home;