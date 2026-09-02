import Navbar from "../components/navbar/Navbar";
import LatestBlogs from "../components/blogs/LatestBlogs";
import FloatingActions from "../components/floating-actions/FloatingActions";
import Footer from "../components/footer/Footer";

function Blogs() {
  return (
    <div className="min-h-screen bg-white">

      <Navbar />

      <main>
        <LatestBlogs />
      </main>

      <FloatingActions />

      <Footer />

    </div>
  );
}

export default Blogs;