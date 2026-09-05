import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Sprout, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../Context/LanguageContext";

const HowItHelps = () => {
  const { t } = useLanguage();

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // =========================================================
  // SCROLL ENTRY ANIMATION
  // =========================================================

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>{`
        @keyframes imageZoomIn {
          from {
            transform: scale(1.10);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes imageSlowMove {
          0% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.025) translate3d(-4px, -2px, 0);
          }

          100% {
            transform: scale(1) translate3d(0, 0, 0);
          }
        }

        @keyframes softFloat {
          0%, 100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: .25;
          }

          50% {
            opacity: .5;
          }
        }

        .how-image-entry {
          animation: imageZoomIn 1.8s cubic-bezier(.16,1,.3,1) forwards;
        }

        .how-image-float {
          animation: imageSlowMove 14s ease-in-out 1.8s infinite;
        }

        .how-sprout-float {
          animation: softFloat 4s ease-in-out infinite;
        }

        .how-glow {
          animation: glowPulse 5s ease-in-out infinite;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="
          group
          relative
          mx-auto
          flex
          min-h-screen
          w-[95%]
          items-center
          overflow-hidden
          border-y
          border-green-200

          dark:border-green-900/40
        "
      >

        {/* =====================================================
            BACKGROUND IMAGE
        ===================================================== */}

        <div className="absolute inset-0 overflow-hidden">

          <img
            src="https://i.ibb.co/pjWT8P07/Gemini-Generated-Image-1y8mkp1y8mkp1y8m.png"
            alt="Farmer working in agricultural field"
            className={`
              absolute
              inset-0
              h-full
              w-full
              object-cover
              object-center
              transition-opacity
              duration-1000

              ${
                isVisible
                  ? "opacity-100"
                  : "opacity-0"
              }

              ${isVisible ? "how-image-entry how-image-float" : ""}
            `}
          />

        </div>


        {/* =====================================================
            IMAGE DARK OVERLAY
        ===================================================== */}

        <div
          className={`
            absolute
            inset-0
            bg-black/45
            transition-opacity
            duration-[1800ms]

            ${
              isVisible
                ? "opacity-100"
                : "opacity-0"
            }
          `}
        />


        {/* =====================================================
            GREEN CINEMATIC GRADIENT
        ===================================================== */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-green-950/95
            via-green-950/75
            via-green-900/45
            to-transparent
          "
        />


        {/* =====================================================
            EXTRA BOTTOM DEPTH
        ===================================================== */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-64
            bg-gradient-to-t
            from-black/60
            via-black/20
            to-transparent
          "
        />


        {/* =====================================================
            SOFT GREEN LIGHT
        ===================================================== */}

        <div
          className={`
            how-glow
            pointer-events-none
            absolute
            -left-20
            top-1/3
            h-80
            w-80
            rounded-full
            bg-green-400/20
            blur-[100px]
            transition-opacity
            duration-1000

            ${
              isVisible
                ? "opacity-100"
                : "opacity-0"
            }
          `}
        />


        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 lg:px-16">

          <div className="max-w-3xl">

            {/* =================================================
                BADGE
            ================================================= */}

            <div
              className={`
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-white/20
                bg-white/10
                px-5
                py-2.5
                text-sm
                font-medium
                text-white
                shadow-lg
                backdrop-blur-md

                transition-all
                duration-1000
                ease-[cubic-bezier(.16,1,.3,1)]

                ${
                  isVisible
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-8 scale-95 opacity-0"
                }
              `}
            >
              <span
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  bg-green-500/20
                  text-green-300

                  how-sprout-float
                "
              >
                <Sprout size={17} />
              </span>

              <span>
                {t("smartAgriculture")}
              </span>

            </div>


            {/* =================================================
                HEADING
            ================================================= */}

            <h2
              className={`
                mt-7
                max-w-2xl
                text-5xl
                font-bold
                leading-[1.08]
                tracking-tight
                text-white

                sm:text-6xl
                md:text-7xl

                transition-all
                duration-[1100ms]
                ease-[cubic-bezier(.16,1,.3,1)]

                ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                }
              `}
              style={{
                transitionDelay: "180ms",
              }}
            >
              {t("howKisanSetuHelps")}
            </h2>


            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p
              className={`
                mt-7
                max-w-xl
                text-base
                leading-8
                text-gray-200

                sm:text-lg

                transition-all
                duration-1000
                ease-out

                ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }
              `}
              style={{
                transitionDelay: "380ms",
              }}
            >
              {t("howKisanSetuHelpsDescription")}
            </p>


            {/* =================================================
                BENEFITS
            ================================================= */}

            <div
              className="
                mt-9
                grid
                grid-cols-1
                gap-4

                sm:grid-cols-2
              "
            >

              {/* Sell */}

              <div
                className={`
                  flex
                  items-center
                  gap-3
                  text-sm
                  font-medium
                  text-white

                  sm:text-base

                  transition-all
                  duration-900
                  ease-out

                  ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-8 opacity-0"
                  }
                `}
                style={{
                  transitionDelay: "550ms",
                }}
              >
                <span
                  className="
                    flex
                    h-6
                    w-6
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-green-500/20
                    text-green-300
                  "
                >
                  <Check size={14} strokeWidth={3} />
                </span>

                <span>
                  {t("sellProduce")}
                </span>
              </div>


              {/* Buy */}

              <div
                className={`
                  flex
                  items-center
                  gap-3
                  text-sm
                  font-medium
                  text-white

                  sm:text-base

                  transition-all
                  duration-900
                  ease-out

                  ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0"
                  }
                `}
                style={{
                  transitionDelay: "650ms",
                }}
              >
                <span
                  className="
                    flex
                    h-6
                    w-6
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-green-500/20
                    text-green-300
                  "
                >
                  <Check size={14} strokeWidth={3} />
                </span>

                <span>
                  {t("buySeeds")}
                </span>
              </div>


              {/* Price */}

              <div
                className={`
                  flex
                  items-center
                  gap-3
                  text-sm
                  font-medium
                  text-white

                  sm:text-base

                  transition-all
                  duration-900
                  ease-out

                  ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-8 opacity-0"
                  }
                `}
                style={{
                  transitionDelay: "750ms",
                }}
              >
                <span
                  className="
                    flex
                    h-6
                    w-6
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-green-500/20
                    text-green-300
                  "
                >
                  <Check size={14} strokeWidth={3} />
                </span>

                <span>
                  {t("priceTrends")}
                </span>
              </div>

            </div>


            {/* =================================================
                CTA
            ================================================= */}

            <div
              className={`
                transition-all
                duration-1000
                ease-[cubic-bezier(.16,1,.3,1)]

                ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }
              `}
              style={{
                transitionDelay: "900ms",
              }}
            >

              <Link
                to="/more-to-know"
                className="
                  group/button
                  relative
                  mt-11
                  inline-flex
                  items-center
                  gap-4
                  overflow-hidden
                  rounded-xl
                  bg-green-600
                  px-7
                  py-3.5
                  font-semibold
                  text-white
                  shadow-[0_10px_30px_rgba(22,163,74,0.3)]
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:bg-green-500
                  hover:shadow-[0_15px_40px_rgba(22,163,74,0.4)]

                  active:translate-y-0
                "
              >

                {/* Button shine */}

                <span
                  className="
                    absolute
                    inset-y-0
                    -left-20
                    w-16
                    rotate-12
                    bg-white/20
                    blur-sm
                    transition-all
                    duration-700
                    group-hover/button:left-[120%]
                  "
                />

                <span className="relative">
                  {t("exploreMore")}
                </span>

                <ArrowRight
                  size={19}
                  className="
                    relative
                    transition-transform
                    duration-300
                    group-hover/button:translate-x-1.5
                  "
                />

              </Link>

            </div>

          </div>

        </div>


        {/* =====================================================
            BOTTOM DECORATIVE INDICATOR
        ===================================================== */}

        <div
          className={`
            absolute
            bottom-8
            left-1/2
            hidden
            -translate-x-1/2
            items-center
            gap-3
            text-xs
            font-medium
            tracking-[0.2em]
            text-white/50

            transition-all
            duration-1000

            md:flex

            ${
              isVisible
                ? "opacity-100"
                : "opacity-0"
            }
          `}
          style={{
            transitionDelay: "1100ms",
          }}
        >

          <span className="h-px w-10 bg-white/30" />

          <Sprout size={14} />

          <span>GROW • CONNECT • PROSPER</span>

          <span className="h-px w-10 bg-white/30" />

        </div>

      </section>
    </>
  );
};

export default HowItHelps;