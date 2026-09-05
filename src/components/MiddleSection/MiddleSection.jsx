import React, { useEffect, useRef, useState } from "react";
import {
  TrendingUp,
  CloudSun,
  Landmark,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
  Sprout,
  Activity,
  Sparkles,
  Sun,
} from "lucide-react";

import { useLanguage } from "../../Context/LanguageContext";

const MiddleSection = () => {
  const { t } = useLanguage();

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // =========================================================
  // SCROLL REVEAL
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
        threshold: 0.12,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // =========================================================
  // MARKET DATA
  // =========================================================

  const marketData = [
    {
      crop: t("wheat"),
      price: "₹2,450/q",
      change: "+2.4%",
      up: true,
    },
    {
      crop: t("soybean"),
      price: "₹4,890/q",
      change: "+1.8%",
      up: true,
    },
    {
      crop: t("rice"),
      price: "₹3,120/q",
      change: "-0.6%",
      up: false,
    },
  ];

  // =========================================================
  // NEARBY MANDIS
  // =========================================================

  const nearbyMandis = [
    t("bhopal"),
    t("sehore"),
    t("raisen"),
  ];

  return (
    <>
      {/* =====================================================
          CUSTOM ANIMATIONS
      ===================================================== */}

      <style>{`
        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-18px) translateX(8px);
          }
        }

        @keyframes floatReverse {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(15px);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: .25;
            transform: scale(1);
          }
          50% {
            opacity: .55;
            transform: scale(1.15);
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-120%) skewX(-15deg);
          }
          100% {
            transform: translateX(220%) skewX(-15deg);
          }
        }

        @keyframes lineMove {
          0% {
            stroke-dashoffset: 180;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes iconFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes dotPulse {
          0%, 100% {
            transform: scale(.7);
            opacity: .3;
          }
          50% {
            transform: scale(1.3);
            opacity: .8;
          }
        }

        .middle-float {
          animation: floatSlow 7s ease-in-out infinite;
        }

        .middle-float-reverse {
          animation: floatReverse 8s ease-in-out infinite;
        }

        .middle-glow {
          animation: pulseGlow 5s ease-in-out infinite;
        }

        .middle-icon-float {
          animation: iconFloat 3s ease-in-out infinite;
        }

        .market-line {
          stroke-dasharray: 180;
          animation: lineMove 2s ease-out forwards;
        }

        .card-shine::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 35%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,.18),
            transparent
          );
          transform: translateX(-120%) skewX(-15deg);
          pointer-events: none;
        }

        .card-shine:hover::after {
          animation: shine .9s ease forwards;
        }

        .dot-pulse {
          animation: dotPulse 3s ease-in-out infinite;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="
          relative
          min-h-screen
          w-full
          overflow-hidden
          bg-white
          px-4
          py-20
          transition-colors
          duration-500
          dark:bg-gray-950

          sm:px-6
          sm:py-24

          lg:px-10
          lg:py-28

          xl:px-16
        "
      >

        {/* =====================================================
            BACKGROUND ATMOSPHERE
        ===================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            -left-40
            top-10
            h-96
            w-96
            rounded-full
            bg-green-200/30
            blur-3xl
            middle-glow

            dark:bg-green-900/10
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-40
            top-1/3
            h-[450px]
            w-[450px]
            rounded-full
            bg-emerald-200/20
            blur-3xl
            middle-glow

            dark:bg-emerald-900/10
          "
          style={{
            animationDelay: "1.5s",
          }}
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            left-1/3
            h-72
            w-72
            rounded-full
            bg-lime-100/20
            blur-3xl
            dark:bg-lime-900/5
          "
        />

        {/* =====================================================
            FLOATING DECORATIVE DOTS
        ===================================================== */}

        <span
          className="
            pointer-events-none
            absolute
            left-[8%]
            top-[20%]
            h-2
            w-2
            rounded-full
            bg-green-500/40
            dot-pulse
          "
        />

        <span
          className="
            pointer-events-none
            absolute
            right-[13%]
            top-[25%]
            h-3
            w-3
            rounded-full
            bg-emerald-400/30
            dot-pulse
          "
          style={{ animationDelay: "1s" }}
        />

        <span
          className="
            pointer-events-none
            absolute
            bottom-[20%]
            left-[18%]
            h-2
            w-2
            rounded-full
            bg-green-600/30
            dot-pulse
          "
          style={{ animationDelay: "2s" }}
        />

        {/* =====================================================
            FLOATING SPROUT
        ===================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            right-[5%]
            top-[12%]
            hidden
            text-green-500/10
            middle-float

            lg:block
          "
        >
          <Sprout size={120} strokeWidth={1} />
        </div>


        {/* =====================================================
            MAIN CONTAINER
        ===================================================== */}

        <div className="relative z-10 mx-auto w-full max-w-7xl">

          {/* ===================================================
              SECTION HEADING
          =================================================== */}

          <div
            className={`
              mx-auto
              mb-12
              max-w-3xl
              text-center
              transition-all
              duration-1000
              ease-out

              ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }
            `}
          >

            {/* Small badge */}

            <div
              className="
                mb-4
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-green-200
                bg-green-50
                px-4
                py-2
                text-xs
                font-semibold
                text-green-700
                shadow-sm

                dark:border-green-900/50
                dark:bg-green-950/30
                dark:text-green-400
              "
            >
              <Sparkles size={14} />

              <span>
                {t("smartAgriculture")}
              </span>

              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-green-500
                  animate-pulse
                "
              />
            </div>


            <h2
              className="
                text-4xl
                font-bold
                tracking-tight
                text-gray-900

                sm:text-5xl

                dark:text-white
              "
            >
              {t("latestUpdates")}
            </h2>


            <p
              className="
                mx-auto
                mt-4
                max-w-2xl
                text-sm
                leading-7
                text-gray-600

                sm:text-base

                dark:text-gray-400
              "
            >
              {t("farmerUpdates")}
            </p>

          </div>


          {/* ===================================================
              MAIN FEATURE GRID
          =================================================== */}

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

            {/* =================================================
                LIVE MANDI CARD
            ================================================= */}

            <div
              className={`
                card-shine
                group
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-gray-200
                bg-white
                p-6
                shadow-[0_15px_45px_rgba(0,0,0,0.06)]
                transition-all
                duration-700
                hover:-translate-y-3
                hover:shadow-[0_25px_60px_rgba(22,163,74,0.15)]

                lg:col-span-2

                dark:border-gray-800
                dark:bg-gray-900

                ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-16 opacity-0"
                }
              `}
              style={{
                transitionDelay: "150ms",
              }}
            >

              {/* Green glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-16
                  -top-16
                  h-40
                  w-40
                  rounded-full
                  bg-green-400/10
                  blur-2xl
                  transition-all
                  duration-500
                  group-hover:scale-150
                "
              />

              {/* Header */}

              <div className="relative flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div
                    className="
                      middle-icon-float
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-green-50
                      text-green-600
                      shadow-sm
                      transition-all
                      duration-500
                      group-hover:scale-110
                      group-hover:rotate-3

                      dark:bg-green-950/40
                      dark:text-green-400
                    "
                  >
                    <TrendingUp size={25} />
                  </div>

                  <div>

                    <div className="flex items-center gap-2">

                      <h3
                        className="
                          text-lg
                          font-bold
                          text-gray-900
                          dark:text-white
                        "
                      >
                        {t("liveMandiPrices")}
                      </h3>

                      <span
                        className="
                          flex
                          items-center
                          gap-1
                          rounded-full
                          bg-green-100
                          px-2
                          py-1
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-wide
                          text-green-700

                          dark:bg-green-950/50
                          dark:text-green-400
                        "
                      >
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                        Live
                      </span>

                    </div>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-gray-500
                        dark:text-gray-400
                      "
                    >
                      {t("todayMarketOverview")}
                    </p>

                  </div>

                </div>


                <button
                  className="
                    hidden
                    items-center
                    gap-1
                    rounded-full
                    border
                    border-gray-200
                    px-3
                    py-2
                    text-xs
                    font-semibold
                    text-green-600
                    transition-all
                    duration-300
                    hover:border-green-300
                    hover:bg-green-50
                    hover:text-green-700

                    sm:flex

                    dark:border-gray-700
                    dark:hover:bg-green-950/30
                  "
                >
                  {t("market")}

                  <ArrowUpRight
                    size={15}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                      group-hover:-translate-y-1
                    "
                  />
                </button>

              </div>


              {/* Market rows */}

              <div className="relative mt-6">

                {marketData.map((item, index) => (

                  <div
                    key={item.crop}
                    className={`
                      group/row
                      relative
                      flex
                      items-center
                      justify-between
                      overflow-hidden
                      rounded-2xl
                      px-3
                      py-4
                      transition-all
                      duration-500
                      hover:bg-green-50/70

                      dark:hover:bg-green-950/20

                      ${
                        isVisible
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-8 opacity-0"
                      }
                    `}
                    style={{
                      transitionDelay: `${350 + index * 120}ms`,
                    }}
                  >

                    {/* Hover indicator */}

                    <div
                      className="
                        absolute
                        left-0
                        top-1/2
                        h-0
                        w-1
                        -translate-y-1/2
                        rounded-full
                        bg-green-500
                        transition-all
                        duration-300
                        group-hover/row:h-10
                      "
                    />


                    <div className="flex items-center gap-3">

                      <div
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-xl
                          bg-gray-100
                          text-gray-500
                          transition-all
                          duration-300
                          group-hover/row:scale-110
                          group-hover/row:bg-green-100
                          group-hover/row:text-green-600

                          dark:bg-gray-800
                          dark:text-gray-400
                          dark:group-hover/row:bg-green-950/40
                          dark:group-hover/row:text-green-400
                        "
                      >
                        <Sprout size={17} />
                      </div>

                      <div>

                        <p
                          className="
                            font-semibold
                            text-gray-900
                            dark:text-white
                          "
                        >
                          {item.crop}
                        </p>

                        <p
                          className="
                            mt-0.5
                            text-xs
                            text-gray-500
                            dark:text-gray-400
                          "
                        >
                          {t("bhopalMandi")}
                        </p>

                      </div>

                    </div>


                    <div className="flex items-center gap-4">

                      <p
                        className="
                          text-sm
                          font-bold
                          text-gray-900
                          sm:text-base
                          dark:text-white
                        "
                      >
                        {item.price}
                      </p>

                      <span
                        className={`
                          flex
                          items-center
                          gap-1
                          rounded-full
                          px-2
                          py-1
                          text-xs
                          font-bold

                          ${
                            item.up
                              ? "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400"
                              : "bg-red-50 text-red-500 dark:bg-red-950/30 dark:text-red-400"
                          }
                        `}
                      >

                        {item.up ? (
                          <ArrowUpRight size={13} />
                        ) : (
                          <ArrowDownRight size={13} />
                        )}

                        {item.change}

                      </span>

                    </div>

                  </div>

                ))}

              </div>


              {/* Mini graph */}

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-3
                  right-5
                  hidden
                  opacity-20
                  transition-opacity
                  duration-500
                  group-hover:opacity-40

                  sm:block
                "
              >
                <svg
                  width="150"
                  height="55"
                  viewBox="0 0 150 55"
                  fill="none"
                >
                  <path
                    d="M2 48 C20 42, 28 45, 42 31 C58 15, 67 38, 82 25 C98 12, 108 22, 120 10 C132 2, 140 8, 148 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-green-500 market-line"
                  />
                </svg>
              </div>

            </div>


            {/* =================================================
                WEATHER CARD
            ================================================= */}

            <div
              className={`
                card-shine
                group
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-gray-200
                bg-gradient-to-br
                from-white
                to-green-50/60
                p-6
                shadow-[0_15px_45px_rgba(0,0,0,0.06)]
                transition-all
                duration-700
                hover:-translate-y-3
                hover:shadow-[0_25px_60px_rgba(34,197,94,0.14)]

                dark:border-gray-800
                dark:from-gray-900
                dark:to-green-950/20

                ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-16 opacity-0"
                }
              `}
              style={{
                transitionDelay: "300ms",
              }}
            >

              {/* Animated sun */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-10
                  -top-10
                  h-32
                  w-32
                  rounded-full
                  bg-yellow-300/20
                  blur-2xl
                  transition-all
                  duration-700
                  group-hover:scale-150
                "
              />

              <div className="relative flex items-center justify-between">

                <div
                  className="
                    middle-icon-float
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-white
                    text-green-600
                    shadow-md
                    transition-all
                    duration-500
                    group-hover:scale-110

                    dark:bg-gray-800
                    dark:text-green-400
                  "
                >
                  <CloudSun size={27} />
                </div>


                <div
                  className="
                    flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-white/80
                    px-3
                    py-2
                    text-xs
                    font-semibold
                    text-green-700
                    shadow-sm
                    backdrop-blur

                    dark:bg-gray-800/80
                    dark:text-green-400
                  "
                >
                  <MapPin size={13} />
                  {t("bhopal")}
                </div>

              </div>


              <div className="relative mt-7">

                <div className="flex items-end gap-2">

                  <p
                    className="
                      text-6xl
                      font-bold
                      tracking-tight
                      text-gray-900
                      transition-transform
                      duration-500
                      group-hover:scale-105
                      origin-left

                      dark:text-white
                    "
                  >
                    28°
                  </p>

                  <Sun
                    size={25}
                    className="
                      mb-2
                      text-yellow-500
                      transition-transform
                      duration-700
                      group-hover:rotate-90
                    "
                  />

                </div>


                <p
                  className="
                    mt-2
                    text-base
                    font-semibold
                    text-gray-800
                    dark:text-gray-200
                  "
                >
                  {t("partlyCloudy")}
                </p>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  {t("goodFarmingConditions")}
                </p>

              </div>


              {/* Weather bottom */}

              <div
                className="
                  mt-6
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  bg-white/80
                  px-4
                  py-3
                  backdrop-blur
                  transition-all
                  duration-300
                  group-hover:bg-white

                  dark:bg-gray-800/70
                  dark:group-hover:bg-gray-800
                "
              >

                <div className="text-center">

                  <p className="text-xs text-gray-400">
                    Humidity
                  </p>

                  <p className="mt-1 text-sm font-bold text-gray-800 dark:text-white">
                    62%
                  </p>

                </div>

                <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />

                <div className="text-center">

                  <p className="text-xs text-gray-400">
                    Wind
                  </p>

                  <p className="mt-1 text-sm font-bold text-gray-800 dark:text-white">
                    12 km/h
                  </p>

                </div>

                <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />

                <div className="text-center">

                  <p className="text-xs text-gray-400">
                    Rain
                  </p>

                  <p className="mt-1 text-sm font-bold text-gray-800 dark:text-white">
                    10%
                  </p>

                </div>

              </div>


              <button
                className="
                  group/weather
                  mt-5
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-bold
                  text-green-600
                  transition-all
                  duration-300
                  hover:gap-3
                "
              >
                {t("weather")}

                <ArrowUpRight
                  size={17}
                  className="
                    transition-transform
                    duration-300
                    group-hover/weather:-translate-y-1
                    group-hover/weather:translate-x-1
                  "
                />
              </button>

            </div>

          </div>


          {/* ===================================================
              BOTTOM FEATURE CARDS
          =================================================== */}

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* =================================================
                GOVERNMENT SCHEMES
            ================================================= */}

            <div
              className={`
                card-shine
                group
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-gray-200
                bg-white
                p-6
                shadow-[0_15px_45px_rgba(0,0,0,0.05)]
                transition-all
                duration-700
                hover:-translate-y-3
                hover:shadow-[0_25px_60px_rgba(22,163,74,0.12)]

                dark:border-gray-800
                dark:bg-gray-900

                ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-16 opacity-0"
                }
              `}
              style={{
                transitionDelay: "450ms",
              }}
            >

              <div
                className="
                  absolute
                  -right-20
                  -top-20
                  h-44
                  w-44
                  rounded-full
                  bg-green-100/50
                  blur-3xl
                  transition-all
                  duration-700
                  group-hover:scale-150

                  dark:bg-green-900/10
                "
              />

              <div className="relative flex items-start justify-between">

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-green-50
                    text-green-600
                    transition-all
                    duration-500
                    group-hover:scale-110
                    group-hover:rotate-6

                    dark:bg-green-950/40
                    dark:text-green-400
                  "
                >
                  <Landmark size={25} />
                </div>


                <ArrowUpRight
                  size={21}
                  className="
                    text-gray-300
                    transition-all
                    duration-500
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                    group-hover:text-green-600
                  "
                />

              </div>


              <div className="relative mt-6">

                <h3
                  className="
                    text-xl
                    font-bold
                    text-gray-900
                    dark:text-white
                  "
                >
                  {t("governmentSchemes")}
                </h3>

                <p
                  className="
                    mt-2
                    max-w-xl
                    text-sm
                    leading-7
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  {t("schemeDescription")}
                </p>


                <div className="mt-5 flex items-center gap-4">

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-green-600
                      text-white
                      shadow-lg
                      shadow-green-600/20
                      transition-all
                      duration-500
                      group-hover:scale-110
                    "
                  >
                    <span className="text-sm font-bold">
                      25+
                    </span>
                  </div>

                  <div>

                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {t("schemesAvailable")}
                    </p>

                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Farmer support programs
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                NEARBY MANDIS
            ================================================= */}

            <div
              className={`
                card-shine
                group
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-green-100
                bg-gradient-to-br
                from-green-50
                via-white
                to-emerald-50
                p-6
                shadow-[0_15px_45px_rgba(22,163,74,0.08)]
                transition-all
                duration-700
                hover:-translate-y-3
                hover:shadow-[0_25px_60px_rgba(22,163,74,0.16)]

                dark:border-green-900/30
                dark:from-green-950/30
                dark:via-gray-900
                dark:to-emerald-950/20

                ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-16 opacity-0"
                }
              `}
              style={{
                transitionDelay: "600ms",
              }}
            >

              {/* Background map rings */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-8
                  -bottom-10
                  h-48
                  w-48
                  rounded-full
                  border
                  border-green-300/30
                  transition-all
                  duration-700
                  group-hover:scale-125

                  dark:border-green-700/20
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-1
                  bottom-0
                  h-32
                  w-32
                  rounded-full
                  border
                  border-green-300/20
                  transition-all
                  duration-700
                  group-hover:scale-125

                  dark:border-green-700/20
                "
              />


              <div className="relative flex items-start justify-between">

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-white
                    text-green-600
                    shadow-md
                    transition-all
                    duration-500
                    group-hover:scale-110
                    group-hover:-rotate-6

                    dark:bg-gray-900
                    dark:text-green-400
                  "
                >
                  <MapPin size={25} />
                </div>


                <div
                  className="
                    flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-white/80
                    px-3
                    py-2
                    text-xs
                    font-semibold
                    text-green-700
                    shadow-sm
                    backdrop-blur

                    dark:bg-gray-900/80
                    dark:text-green-400
                  "
                >
                  <Activity size={13} />
                  Nearby
                </div>

              </div>


              <div className="relative mt-6">

                <h3
                  className="
                    text-xl
                    font-bold
                    text-gray-900
                    dark:text-white
                  "
                >
                  {t("nearbyMandis")}
                </h3>

                <p
                  className="
                    mt-2
                    max-w-xl
                    text-sm
                    leading-7
                    text-gray-600
                    dark:text-gray-400
                  "
                >
                  {t("nearbyMandiDescription")}
                </p>


                <div className="mt-5 flex flex-wrap gap-2.5">

                  {nearbyMandis.map((mandi, index) => (

                    <span
                      key={mandi}
                      className="
                        group/mandi
                        flex
                        cursor-pointer
                        items-center
                        gap-1.5
                        rounded-full
                        border
                        border-white
                        bg-white
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        text-gray-700
                        shadow-sm
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-green-200
                        hover:bg-green-600
                        hover:text-white
                        hover:shadow-lg
                        hover:shadow-green-600/20

                        dark:border-gray-800
                        dark:bg-gray-900
                        dark:text-gray-300
                        dark:hover:border-green-700
                        dark:hover:bg-green-600
                      "
                      style={{
                        transitionDelay: `${index * 60}ms`,
                      }}
                    >
                      <MapPin
                        size={12}
                        className="
                          transition-transform
                          duration-300
                          group-hover/mandi:scale-110
                        "
                      />

                      {mandi}

                    </span>

                  ))}

                </div>

              </div>

            </div>

          </div>


          {/* ===================================================
              BOTTOM DECORATIVE LINE
          =================================================== */}

          <div
            className={`
              mx-auto
              mt-14
              flex
              items-center
              justify-center
              gap-3
              transition-all
              duration-1000

              ${
                isVisible
                  ? "opacity-100"
                  : "opacity-0"
              }
            `}
            style={{
              transitionDelay: "900ms",
            }}
          >

            <span className="h-px w-16 bg-gradient-to-r from-transparent to-green-300 dark:to-green-800" />

            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-green-50
                text-green-600
                shadow-sm

                dark:bg-green-950/30
                dark:text-green-400
              "
            >
              <Sprout size={17} />
            </div>

            <span className="h-px w-16 bg-gradient-to-l from-transparent to-green-300 dark:to-green-800" />

          </div>

        </div>

      </section>
    </>
  );
};

export default MiddleSection;