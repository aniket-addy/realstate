import { ShieldCheck } from "lucide-react";

import HeroSearch from "./HeroSearch";
import heroImage from "../../assets/images/hero/hero-home.png";

function Hero() {
  return (
    <section
      className="
        relative
        min-h-[590px]
        overflow-visible
        bg-cover
        bg-center
        bg-no-repeat

        /* =========================================
           MOBILE
        ========================================= */

        max-[639px]:min-h-[585px]
        max-[639px]:bg-[position:72%_center]

        /* =========================================
           SMALL TABLET
        ========================================= */

        sm:min-h-[620px]
        sm:bg-[position:65%_center]

        /* =========================================
           TABLET
        ========================================= */

        md:min-h-[640px]
        md:bg-[position:62%_center]

        /* =========================================
           DESKTOP
        ========================================= */

        lg:min-h-[620px]
        lg:bg-center
      "
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >

      {/* =====================================================
          IMAGE OVERLAY
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-black/10

          max-[639px]:bg-black/15
        "
      />


      {/* =====================================================
          LEFT READABILITY GRADIENT
      ===================================================== */}

      <div
        className="
          absolute
          inset-y-0
          left-0
          w-[55%]
          bg-gradient-to-r
          from-black/35
          via-black/10
          to-transparent

          max-[639px]:w-[85%]
          max-[639px]:bg-gradient-to-r
          max-[639px]:from-black/50
          max-[639px]:via-black/20
          max-[639px]:to-transparent

          sm:w-[65%]

          lg:w-[55%]
          lg:from-black/35
          lg:via-black/10
          lg:to-transparent
        "
      />


      {/* =====================================================
          HERO CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10

          pt-[92px]
          pb-[60px]

          max-[639px]:pt-[82px]
          max-[639px]:pb-[35px]

          sm:pt-[100px]
          sm:pb-[60px]

          lg:pt-[115px]
          lg:pb-[60px]
        "
      >

        <div className="container-site">

          {/* =================================================
              HERO TEXT
          ================================================= */}

          <div
            className="
              max-w-[560px]

              max-[639px]:max-w-[300px]

              sm:max-w-[480px]

              lg:max-w-[560px]
            "
          >

            {/* GOLD LINE */}

            <div
              className="
                mb-4
                h-[2px]
                w-12
                bg-secondary

                max-[639px]:mb-4
                max-[639px]:w-10

                sm:mb-5
              "
            />


            {/* =================================================
                HEADING
            ================================================= */}

            <h1
              className="
                font-serif
                font-semibold
                leading-[1.04]
                tracking-[-0.02em]
                text-white

                text-[30px]

                max-[380px]:text-[28px]

                sm:text-[40px]

                lg:text-[52px]
              "
            >

              Find More Than a Property.

              <br />

              Find{" "}

              <span className="text-secondary">
                Your Place.
              </span>

            </h1>


            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p
              className="
                mt-3
                max-w-[500px]
                text-[11px]
                leading-[1.5]
                text-white

                max-[639px]:max-w-[300px]

                sm:text-[13px]

                lg:mt-4
                lg:text-[14px]
                lg:leading-6
              "
            >
              Discover verified properties, new projects and
              perfect spaces that match your lifestyle.
            </p>


            {/* =================================================
                TRUSTED CUSTOMERS
            ================================================= */}

            <div
              className="
                mt-3
                flex
                items-center
                gap-2
                text-[10px]
                font-medium
                text-white

                sm:text-[12px]

                lg:mt-4
              "
            >

              <ShieldCheck
                size={18}
                strokeWidth={1.8}
                className="
                  shrink-0
                  text-secondary

                  max-[639px]:h-[16px]
                  max-[639px]:w-[16px]
                "
              />

              <span>
                Trusted by 12,500+ happy customers
              </span>

            </div>

          </div>


          {/* =================================================
              SEARCH
          ================================================= */}

          <div
            className="
              relative
              z-30
              mt-7

              max-[639px]:mt-6

              sm:mt-7

              lg:mt-8
            "
          >

            <HeroSearch />

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;