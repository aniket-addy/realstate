import {
  ArrowRight,
  CalendarDays,
  Clock3,
} from "lucide-react";
import { Link } from "react-router-dom";

const blogs = [
  {
    id: 1,
    title: "Why Yamuna Expressway Is Becoming a Major Investment Destination",
    category: "Investment",
    date: "18 Aug 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
    slug: "yamuna-expressway-investment",
  },
  {
    id: 2,
    title: "Dholera Smart City: Understanding the Future Growth Story",
    category: "Market Insights",
    date: "12 Aug 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=85",
    slug: "dholera-smart-city-growth",
  },
  {
    id: 3,
    title: "5 Things To Check Before Buying a Property",
    category: "Guide",
    date: "05 Aug 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=85",
    slug: "things-to-check-before-buying-property",
  },
];

function LatestBlogs() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">

      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>

            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-7 bg-[#d6a84f]" />

              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#b88b32]">
                Insights & Updates
              </span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-slate-900 sm:text-4xl">
              Latest From
              <span className="text-[#b88b32]"> Investorise</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
              Market insights, investment guides and the latest updates from
              the world of real estate.
            </p>

          </div>

          <Link
            to="/blogs"
            className="group inline-flex items-center gap-2 self-start text-xs font-bold text-slate-700 transition hover:text-[#b88b32] sm:self-auto"
          >
            View All Blogs

            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

        </div>

        {/* Blog cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">

          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
            >

              <Link
                to={`/blogs/${blog.slug}`}
                className="relative block aspect-[1.65/1] overflow-hidden"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />

                <span className="absolute left-3 top-3 rounded-md bg-white px-2.5 py-1.5 text-[9px] font-extrabold uppercase tracking-wide text-slate-800">
                  {blog.category}
                </span>
              </Link>

              <div className="p-5">

                <div className="flex items-center gap-3 text-[9px] font-medium text-slate-400">

                  <span className="flex items-center gap-1">
                    <CalendarDays size={12} />
                    {blog.date}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock3 size={12} />
                    {blog.readTime}
                  </span>

                </div>

                <Link to={`/blogs/${blog.slug}`}>
                  <h3 className="mt-3 line-clamp-2 text-[15px] font-bold leading-6 text-slate-900 transition-colors group-hover:text-[#b88b32]">
                    {blog.title}
                  </h3>
                </Link>

                <Link
                  to={`/blogs/${blog.slug}`}
                  className="group/link mt-5 inline-flex items-center gap-2 text-[10px] font-extrabold text-slate-700"
                >
                  Read Article

                  <ArrowRight
                    size={13}
                    className="transition-transform group-hover/link:translate-x-1"
                  />
                </Link>

              </div>
            </article>
          ))}

        </div>

      </div>
    </section>
  );
}

export default LatestBlogs;