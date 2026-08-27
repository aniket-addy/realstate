import SectionHeader from "../common/SectionHeader";
import LoadingCard from "../common/LoadingCard";
import EmptyState from "../common/EmptyState";

import LifestyleCard from "./LifestyleCard";

import useLifestyle from "../../hooks/useLifestyle";

function LifestyleSection() {
  const {
    lifestyles,
    loading,
    error,
  } = useLifestyle();

  return (
    <section className="site-section bg-background">

      <div className="container-site">

        <SectionHeader
          title="Explore by Lifestyle"
          description="Because every home tells a different story."
          buttonText="View All Categories"
        />

        {/* API Error */}
        {error && (
          <div className="mb-4 rounded-lg border border-status-danger/20 bg-status-danger/5 px-4 py-3">
            <p className="text-sm text-status-danger">
              {error}
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

            {Array.from({ length: 6 }).map((_, index) => (
              <LoadingCard key={index} />
            ))}

          </div>
        )}

        {/* API Data */}
        {!loading && lifestyles.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

            {lifestyles.slice(0, 6).map((lifestyle) => (
              <LifestyleCard
                key={lifestyle._id || lifestyle.id}
                lifestyle={lifestyle}
              />
            ))}

          </div>
        )}

        {/* Empty */}
        {!loading && !error && lifestyles.length === 0 && (
          <EmptyState
            message="No lifestyle categories available."
          />
        )}

      </div>

    </section>
  );
}

export default LifestyleSection;