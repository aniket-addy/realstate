// import {
//   ArrowRight,
//   Bath,
//   BedDouble,
//   Heart,
//   MapPin,
//   Maximize,
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";

// import { getProperties } from "../../services/propertyService";

// function PropertyCard({ property }) {
//   const [liked, setLiked] = useState(false);

//   const propertySlug =
//     property.slug ||
//     property._id ||
//     property.id;

//   const propertyTitle =
//     property.title ||
//     property.name ||
//     "Untitled Property";

//   const propertyLocation =
//     property.location ||
//     property.address ||
//     property.city ||
//     "Location not available";

//   const propertyImage =
//     property.image ||
//     property.coverImage ||
//     property.thumbnail ||
//     property.images?.[0] ||
//     "";

//   const propertyPrice =
//     property.price ||
//     property.startingPrice ||
//     property.startingFrom ||
//     "Price on Request";

//   const beds =
//     property.beds ??
//     property.bedrooms ??
//     property.bhk ??
//     "-";

//   const baths =
//     property.baths ??
//     property.bathrooms ??
//     "-";

//   const area =
//     property.area ||
//     property.size ||
//     property.carpetArea ||
//     property.builtUpArea ||
//     "-";

//   return (
//     <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10">

//       {/* =====================================================
//           IMAGE
//       ====================================================== */}

//       <div className="relative aspect-[1.55/1] overflow-hidden">

//         <Link to={`/properties/${propertySlug}`}>

//           {propertyImage ? (
//             <img
//               src={propertyImage}
//               alt={propertyTitle}
//               loading="lazy"
//               className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
//             />
//           ) : (
//             <div className="flex h-full w-full items-center justify-center bg-slate-100">
//               <span className="text-xs font-medium text-slate-400">
//                 No Image Available
//               </span>
//             </div>
//           )}

//         </Link>

//         {/* Overlay */}
//         <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

//         {/* Featured Badge */}
//         <span className="absolute left-3 top-3 rounded-md bg-white px-2.5 py-1.5 text-[9px] font-extrabold uppercase tracking-wide text-slate-800 shadow-sm">
//           Featured
//         </span>

//         {/* Heart */}
//         <button
//           type="button"
//           aria-label={
//             liked
//               ? "Remove from favorites"
//               : "Add to favorites"
//           }
//           onClick={() => setLiked((prev) => !prev)}
//           className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition ${
//             liked
//               ? "bg-white text-red-500"
//               : "bg-black/20 text-white hover:bg-white hover:text-slate-900"
//           }`}
//         >
//           <Heart
//             size={16}
//             className={liked ? "fill-current" : ""}
//           />
//         </button>

//         {/* Price */}
//         <div className="absolute bottom-3 left-3">
//           <p className="text-[9px] text-white/80">
//             Starting From
//           </p>

//           <p className="text-sm font-extrabold text-white">
//             {propertyPrice}
//           </p>
//         </div>

//       </div>

//       {/* =====================================================
//           CONTENT
//       ====================================================== */}

//       <div className="p-4">

//         {/* Title */}
//         <Link to={`/properties/${propertySlug}`}>
//           <h3 className="text-[16px] font-bold text-slate-900 transition-colors group-hover:text-[#b88b32]">
//             {propertyTitle}
//           </h3>
//         </Link>

//         {/* Location */}
//         <div className="mt-2 flex items-center gap-1.5">

//           <MapPin
//             size={13}
//             className="shrink-0 text-slate-400"
//           />

//           <span className="truncate text-[11px] font-medium text-slate-500">
//             {propertyLocation}
//           </span>

//         </div>

//         {/* Details */}
//         <div className="mt-4 grid grid-cols-3 divide-x divide-slate-100 border-y border-slate-100 py-3">

//           {/* Beds */}
//           <div className="flex items-center justify-center gap-1.5">

//             <BedDouble
//               size={14}
//               className="text-[#b88b32]"
//             />

//             <span className="text-[10px] font-semibold text-slate-600">
//               {beds} Beds
//             </span>

//           </div>

//           {/* Baths */}
//           <div className="flex items-center justify-center gap-1.5">

//             <Bath
//               size={14}
//               className="text-[#b88b32]"
//             />

//             <span className="text-[10px] font-semibold text-slate-600">
//               {baths} Baths
//             </span>

//           </div>

//           {/* Area */}
//           <div className="flex items-center justify-center gap-1.5">

//             <Maximize
//               size={14}
//               className="text-[#b88b32]"
//             />

//             <span className="truncate text-[10px] font-semibold text-slate-600">
//               {area}
//             </span>

//           </div>

//         </div>

//         {/* CTA */}
//         <Link
//           to={`/properties/${propertySlug}`}
//           className="mt-4 flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2.5 text-[11px] font-bold text-slate-700 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white"
//         >
//           <span>View Property</span>

//           <ArrowRight size={14} />
//         </Link>

//       </div>
//     </article>
//   );
// }

// function FeaturedProperties() {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let mounted = true;

//     async function fetchFeaturedProperties() {
//       try {
//         setLoading(true);
//         setError("");

//         const response = await getProperties();

//         if (!mounted) return;

//         /*
//          * API response ko different possible formats se handle
//          * kiya gaya hai.
//          */
//         const data =
//           response?.data?.properties ||
//           response?.data?.data ||
//           response?.data ||
//           response?.properties ||
//           response ||
//           [];

//         const propertyList = Array.isArray(data)
//           ? data
//           : [];

//         /*
//          * Sirf wahi properties show hongi jo admin ne
//          * Featured Property ke liye select ki hain.
//          */
//         const featured = propertyList.filter((property) => {
//           return (
//             property?.isFeatured === true ||
//             property?.featured === true ||
//             property?.featuredProperty === true ||
//             property?.homepageSections?.includes(
//               "featured-properties"
//             )
//           );
//         });

//         setProperties(featured);
//       } catch (err) {
//         console.error(
//           "Failed to fetch featured properties:",
//           err
//         );

//         if (mounted) {
//           setError(
//             "Unable to load featured properties."
//           );
//           setProperties([]);
//         }
//       } finally {
//         if (mounted) {
//           setLoading(false);
//         }
//       }
//     }

//     fetchFeaturedProperties();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   return (
//     <section className="bg-white py-16 sm:py-20 lg:py-24">

//       <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">

//         {/* =====================================================
//             HEADER
//         ====================================================== */}

//         <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

//           <div>

//             <div className="mb-2 flex items-center gap-2">

//               <span className="h-px w-7 bg-[#d6a84f]" />

//               <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#b88b32]">
//                 Featured Properties
//               </span>

//             </div>

//             <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-slate-900 sm:text-4xl">

//               Properties Worth

//               <span className="text-[#b88b32]">
//                 {" "}Exploring
//               </span>

//             </h2>

//             <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
//               Discover handpicked homes and investment
//               properties in sought-after locations.
//             </p>

//           </div>

//           <Link
//             to="/properties"
//             className="group inline-flex items-center gap-2 self-start text-xs font-bold text-slate-700 transition hover:text-[#b88b32] sm:self-auto"
//           >
//             View All Properties

//             <ArrowRight
//               size={14}
//               className="transition-transform group-hover:translate-x-1"
//             />
//           </Link>

//         </div>

//         {/* =====================================================
//             LOADING
//         ====================================================== */}

//         {loading && (
//           <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

//             {[1, 2, 3].map((item) => (
//               <div
//                 key={item}
//                 className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
//               >
//                 <div className="aspect-[1.55/1] animate-pulse bg-slate-100" />

//                 <div className="space-y-3 p-4">

//                   <div className="h-5 w-2/3 animate-pulse rounded bg-slate-100" />

//                   <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />

//                   <div className="h-12 w-full animate-pulse rounded bg-slate-100" />

//                   <div className="h-10 w-full animate-pulse rounded bg-slate-100" />

//                 </div>
//               </div>
//             ))}

//           </div>
//         )}

//         {/* =====================================================
//             ERROR
//         ====================================================== */}

//         {!loading && error && (
//           <div className="mt-10 rounded-xl border border-red-100 bg-red-50 px-5 py-4 text-center text-sm font-medium text-red-600">
//             {error}
//           </div>
//         )}

//         {/* =====================================================
//             EMPTY STATE
//         ====================================================== */}

//         {!loading &&
//           !error &&
//           properties.length === 0 && (
//             <div className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-14 text-center">

//               <h3 className="text-sm font-bold text-slate-800">
//                 No Featured Properties
//               </h3>

//               <p className="mt-1 text-xs text-slate-500">
//                 Featured properties selected from the admin
//                 panel will appear here.
//               </p>

//             </div>
//           )}

//         {/* =====================================================
//             PROPERTY GRID
//         ====================================================== */}

//         {!loading &&
//           !error &&
//           properties.length > 0 && (
//             <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

//               {properties.map((property) => (
//                 <PropertyCard
//                   key={
//                     property._id ||
//                     property.id ||
//                     property.slug
//                   }
//                   property={property}
//                 />
//               ))}

//             </div>
//           )}

//       </div>
//     </section>
//   );
// }

// export default FeaturedProperties;