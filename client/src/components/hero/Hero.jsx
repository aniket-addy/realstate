import { useEffect, useState } from "react";
import {
  ArrowRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const heroSlides = [
  {
    id: 1,
    eyebrow: "FIND. INVEST. GROW.",
    title: "Premium Projects.",
    titleLine2: "Promising Returns.",
    titleLine3: "Stronger Tomorrow.",
    description:
      "Discover verified real estate projects in prime locations and invest with confidence.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=85",
    location: "Noida, Greater Noida",
  },
  {
    id: 2,
    eyebrow: "SMART INVESTMENTS.",
    title: "Invest In Growth.",
    titleLine2: "Build Your Future.",
    titleLine3: "Own The Opportunity.",
    description:
      "Explore high-potential residential and commercial projects selected for smart investors.",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2200&q=85",
    location: "Yamuna Expressway",
  },
  {
    id: 3,
    eyebrow: "VERIFIED PROJECTS.",
    title: "Right Location.",
    titleLine2: "Right Property.",
    titleLine3: "Right Investment.",
    description:
      "From authority projects to premium builder developments, find opportunities that fit your goals.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2200&q=85",
    location: "Delhi NCR & Beyond",
  },
];

const stats = [
  {
    icon: Users,
    value: "10K+",
    label: "Happy Clients",
  },
  {
    icon: Building2,
    value: "50+",
    label: "Premium Projects",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Verified Listings",
  },
  {
    icon: Sparkles,
    value: "Expert",
    label: "Investment Support",
  },
];

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const [searchData, setSearchData] = useState({
    location: "",
    propertyType: "",
    budget: "",
  });

  const currentSlide = heroSlides[activeSlide];

  /* =========================================================
     AUTO SLIDER
  ========================================================== */

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  /* =========================================================
     SLIDER CONTROLS
  ========================================================== */

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const previousSlide = () => {
    setActiveSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  /* =========================================================
     SEARCH HANDLER
  ========================================================== */

  const handleSearchChange = (field, value) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = (event) => {
    event.preventDefault();

    console.log("Hero Search:", searchData);

    // Future:
    // Navigate to property/project listing page
    // with searchData as query parameters.
  };

  return (
    <section className="relative overflow-hidden bg-slate-950">

      {/* =====================================================
          HERO IMAGE
      ====================================================== */}

      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
            />
          </div>
        ))}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-slate-950/65" />

        {/* Left gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/20" />

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950/80 to-transparent" />
      </div>

      {/* =====================================================
          HERO CONTENT
      ====================================================== */}

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">

        <div className="flex min-h-[680px] items-center pb-28 pt-16 sm:min-h-[700px] lg:min-h-[730px]">

          <div className="w-full max-w-[700px]">

            {/* Eyebrow */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d6a84f]/40 bg-[#d6a84f]/10 px-4 py-2 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e0b65c]" />

              <span className="text-[10px] font-bold tracking-[0.2em] text-[#f0c96d] sm:text-[11px]">
                {currentSlide.eyebrow}
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-[720px] text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-[68px]">

              <span className="block">
                {currentSlide.title}
              </span>

              <span className="block">
                {currentSlide.titleLine2}
              </span>

              <span className="block text-[#e0b65c]">
                {currentSlide.titleLine3}
              </span>

            </h1>

            {/* Description */}
            <p className="mt-6 max-w-[560px] text-sm leading-7 text-slate-200 sm:text-base">
              {currentSlide.description}
            </p>

            {/* =================================================
                LOCATION BADGE
            ================================================== */}

            <div className="mt-5 flex items-center gap-2 text-xs font-medium text-slate-300">
              <MapPin
                size={15}
                className="text-[#e0b65c]"
              />

              <span>{currentSlide.location}</span>
            </div>

          </div>
        </div>

        {/* =====================================================
            SEARCH BOX
        ====================================================== */}

        <div className="absolute bottom-[92px] left-4 right-4 z-20 sm:left-6 sm:right-6 lg:left-10 lg:right-10">

          <form
            onSubmit={handleSearch}
            className="mx-auto max-w-[1120px] rounded-2xl border border-white/30 bg-white p-2 shadow-2xl shadow-black/30"
          >

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_auto]">

              {/* Location */}
              <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3 lg:border-b-0 lg:border-r">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f7f0e2]">
                  <MapPin
                    size={17}
                    className="text-[#b88b32]"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Location
                  </label>

                  <input
                    type="text"
                    value={searchData.location}
                    onChange={(e) =>
                      handleSearchChange(
                        "location",
                        e.target.value
                      )
                    }
                    placeholder="Enter location"
                    className="mt-0.5 w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Property Type */}
              <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3 lg:border-b-0 lg:border-r">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f7f0e2]">
                  <Building2
                    size={17}
                    className="text-[#b88b32]"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Property Type
                  </label>

                  <select
                    value={searchData.propertyType}
                    onChange={(e) =>
                      handleSearchChange(
                        "propertyType",
                        e.target.value
                      )
                    }
                    className="mt-0.5 w-full cursor-pointer bg-transparent text-sm font-semibold text-slate-800 outline-none"
                  >
                    <option value="">Select type</option>
                    <option value="residential">
                      Residential
                    </option>
                    <option value="commercial">
                      Commercial
                    </option>
                    <option value="plot">
                      Plots
                    </option>
                    <option value="villa">
                      Villas
                    </option>
                  </select>
                </div>
              </div>

              {/* Budget */}
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f7f0e2]">
                  <span className="text-sm font-bold text-[#b88b32]">
                    ₹
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Budget
                  </label>

                  <select
                    value={searchData.budget}
                    onChange={(e) =>
                      handleSearchChange(
                        "budget",
                        e.target.value
                      )
                    }
                    className="mt-0.5 w-full cursor-pointer bg-transparent text-sm font-semibold text-slate-800 outline-none"
                  >
                    <option value="">Select budget</option>
                    <option value="under-50-lakh">
                      Under ₹50 Lakh
                    </option>
                    <option value="50-lakh-1-crore">
                      ₹50 Lakh - ₹1 Cr
                    </option>
                    <option value="1-2-crore">
                      ₹1 Cr - ₹2 Cr
                    </option>
                    <option value="2-5-crore">
                      ₹2 Cr - ₹5 Cr
                    </option>
                    <option value="above-5-crore">
                      ₹5 Cr+
                    </option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 text-sm font-bold text-white transition hover:bg-slate-800 active:scale-[0.98]"
              >
                <Search size={17} />

                <span>Search Projects</span>
              </button>

            </div>
          </form>
        </div>

        {/* =====================================================
            TRUST STATS
        ====================================================== */}

        <div className="absolute bottom-4 left-4 right-4 z-10 sm:left-6 sm:right-6 lg:left-10 lg:right-10">

          <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-hide">

            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="flex min-w-[145px] items-center gap-2.5"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md">
                    <Icon
                      size={15}
                      className="text-[#e0b65c]"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-white">
                      {stat.value}
                    </p>

                    <p className="whitespace-nowrap text-[10px] text-slate-300">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>
        </div>

        {/* =====================================================
            SLIDER LEFT BUTTON
        ====================================================== */}

        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:flex lg:left-5"
        >
          <ChevronLeft size={21} />
        </button>

        {/* =====================================================
            SLIDER RIGHT BUTTON
        ====================================================== */}

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:flex lg:right-5"
        >
          <ChevronRight size={21} />
        </button>

        {/* =====================================================
            SLIDER DOTS
        ====================================================== */}

        <div className="absolute bottom-[76px] left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 sm:flex">

          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setActiveSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeSlide
                  ? "w-8 bg-[#e0b65c]"
                  : "w-5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}

        </div>

      </div>

      {/* =====================================================
          MOBILE SLIDER DOTS
      ====================================================== */}

      <div className="absolute bottom-[72px] left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:hidden">

        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setActiveSlide(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === activeSlide
                ? "w-7 bg-[#e0b65c]"
                : "w-4 bg-white/50"
            }`}
          />
        ))}

      </div>

      {/* =====================================================
          BOTTOM TRANSITION
      ====================================================== */}

      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white/5 to-transparent" />
    </section>
  );
}

export default Hero;