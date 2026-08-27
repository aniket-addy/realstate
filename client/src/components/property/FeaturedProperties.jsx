import SectionHeader from "../common/SectionHeader";
import LoadingCard from "../common/LoadingCard";
import EmptyState from "../common/EmptyState";

import PropertyCard from "./PropertyCard";

import useFeaturedProperties from "../../hooks/useFeaturedProperties";

function FeaturedProperties() {
  const {
    properties,
    loading,
    error,
  } = useFeaturedProperties();

  return (
    <section className="site-section bg-background-secondary">

      <div className="container-site">

        <SectionHeader
          title="Featured Properties"
          description="Handpicked properties that offer the best location, lifestyle and value."
          buttonText="View All Properties"
        />

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-lg border border-status-danger/20 bg-status-danger/5 px-4 py-3">
            <p className="text-sm text-status-danger">
              {error}
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {Array.from({ length: 4 }).map((_, index) => (
              <LoadingCard key={index} />
            ))}

          </div>
        )}

        {/* API Data */}
        {!loading && properties.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {properties.slice(0, 4).map((property) => (
              <PropertyCard
                key={property._id || property.id}
                property={property}
              />
            ))}

          </div>
        )}

        {/* Empty */}
        {!loading && !error && properties.length === 0 && (
          <EmptyState
            message="No featured properties available."
          />
        )}

      </div>

    </section>
  );
}

export default FeaturedProperties;