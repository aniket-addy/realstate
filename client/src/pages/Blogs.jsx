import Navbar from "../components/navbar/Navbar";
import LatestBlogs from "../components/blogs/LatestBlogs";
import FloatingActions from "../components/floating-actions/FloatingActions";
import Footer from "../components/footer/Footer";

function Blogs() {
  return (
    <div className="min-h-screen bg-white">

      <Navbar variant="light" />

      <main>

        {/* =====================================================
            HERO / BANNER
        ===================================================== */}
        <section className="relative overflow-hidden bg-[#0b1f3a]">

          {/* Gold Glow */}
          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_80%_20%,rgba(200,160,70,0.18),transparent_35%)]
            "
          />

          <div
            className="
              relative
              mx-auto
              max-w-[1240px]
              px-4
              py-20
              sm:px-6
              lg:px-8
              lg:py-28
            "
          >

            <div className="max-w-3xl">

              {/* Small Label */}
              {/* <div className="mb-5 flex items-center gap-3">

                <span className="h-px w-10 bg-[#d6a84f]" />

                <span
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#d6a84f]
                  "
                >
                  Investorise Insights
                </span>

              </div> */}

              {/* Heading */}
              <h1
                className="
                  mt-8
                  max-w-4xl
                  text-4xl
                  font-extrabold
                  leading-[1.05]
                  tracking-[-0.04em]
                  !text-white
                  sm:text-5xl
                  lg:text-6xl
                  xl:text-[68px]
                "
              >
                <span className="!text-white">
                  Real Estate
                </span>

                <span className="block !text-[#d6a84f]">
                  Insights & Updates.
                </span>
              </h1>

              {/* Description */}
              <p
                className="
                  mt-6
                  max-w-2xl
                  text-sm
                  leading-7
                  text-white/70
                  sm:text-base
                "
              >
                Explore expert insights, market trends, investment
                opportunities and the latest updates from the world
                of real estate.
              </p>

            </div>

          </div>

        </section>


        {/* =====================================================
            BLOGS
        ===================================================== */}
        <LatestBlogs />

      </main>

      <FloatingActions />

      <Footer />

    </div>
  );
}

export default Blogs;