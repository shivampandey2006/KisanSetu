import React, { useEffect, useRef, useState } from "react";
import {
  TrendingUp,
  CloudSun,
  Landmark,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import { useLanguage } from "../../Context/LanguageContext";

const MiddleSection = () => {
  const { t } = useLanguage();

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // ================= SCROLL ANIMATION =================

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // ================= MARKET DATA =================

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

  // ================= NEARBY MANDIS =================

  const nearbyMandis = [
    t("bhopal"),
    t("sehore"),
    t("raisen"),
  ];

  return (
    <section
      ref={sectionRef}
      className="
        relative
        flex
        min-h-screen
        w-full
        items-center
        overflow-hidden
        bg-white
        px-4
        py-14
        transition-colors
        duration-300
        dark:bg-gray-950

        sm:px-6
        sm:py-16

        lg:px-10
        lg:py-20

        xl:px-16
      "
    >
{/* // wheat img  */}






      {/* ================================================= */}
      {/* BACKGROUND DECORATION */}
      {/* ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-10
          h-72
          w-72
          rounded-full
          bg-green-100/40
          blur-3xl
          dark:bg-green-900/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-10
          h-80
          w-80
          rounded-full
          bg-green-100/30
          blur-3xl
          dark:bg-green-900/10
        "
      />

      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <div className="relative mx-auto w-full max-w-7xl">

        {/* ================================================= */}
        {/* HEADING */}
        {/* ================================================= */}

        <div
          className={`
            mx-auto
            mb-8
            max-w-2xl
            text-center

            sm:mb-10

            transition-all
            duration-1000
            ease-out

            ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }
          `}
        >
          {/* Small Label */}

          {/* <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-green-600 sm:text-sm">
            {t("smartAgriculture")}
          </p> */}

          {/* Heading */}

          <h2
            className="
              text-3xl
              font-bold
              tracking-tight
              text-gray-900

              sm:text-4xl

              dark:text-white
            "
          >
            {t("latestUpdates")}
          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-3
              max-w-xl
              text-sm
              leading-6
              text-gray-600

              sm:text-base

              dark:text-gray-400
            "
          >
            {t("farmerUpdates")}
          </p>
        </div>

        {/* ================================================= */}
        {/* TOP CARDS */}
        {/* ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-5

            lg:grid-cols-3
          "
        >

          {/* ================================================= */}
          {/* MANDI CARD */}
          {/* ================================================= */}

          <div
            className={`
              group
              rounded-3xl
              border
              border-gray-200
              bg-white
              p-5
              shadow-sm

              transition-all
              duration-700
              ease-out

              hover:-translate-y-2
              hover:shadow-xl

              sm:p-6

              dark:border-gray-800
              dark:bg-gray-900

              lg:col-span-2

              ${
                isVisible
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-10 scale-[0.97] opacity-0"
              }
            `}
            style={{
              transitionDelay: "150ms",
            }}
          >
            {/* Header */}

            <div className="flex items-start justify-between gap-3">

              <div className="flex min-w-0 items-center gap-3 sm:gap-4">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-green-50
                    text-green-600

                    transition-all
                    duration-300

                    group-hover:scale-110
                    group-hover:rotate-3

                    sm:h-12
                    sm:w-12

                    dark:bg-green-950/40
                    dark:text-green-400
                  "
                >
                  <TrendingUp size={21} />
                </div>

                <div className="min-w-0">

                  <h3 className="truncate font-semibold text-gray-900 dark:text-white">
                    {t("liveMandiPrices")}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {t("todayMarketOverview")}
                  </p>

                </div>

              </div>

              <button
                className="
                  group/link
                  flex
                  shrink-0
                  items-center
                  gap-1
                  text-xs
                  font-semibold
                  text-green-600
                  transition
                  hover:text-green-700

                  sm:text-sm
                "
              >
                {t("market")}

                <ArrowUpRight
                  size={16}
                  className="
                    transition-transform
                    duration-300

                    group-hover/link:-translate-y-1
                    group-hover/link:translate-x-1
                  "
                />
              </button>

            </div>

            {/* Prices */}

            <div className="mt-4 divide-y divide-gray-100 dark:divide-gray-800">

              {marketData.map((item, index) => (

                <div
                  key={item.crop}
                  className={`
                    flex
                    items-center
                    justify-between
                    gap-3
                    py-3.5

                    transition-all
                    duration-700

                    ${
                      isVisible
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-6 opacity-0"
                    }
                  `}
                  style={{
                    transitionDelay: `${350 + index * 120}ms`,
                  }}
                >

                  <div className="min-w-0">

                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.crop}
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                      {t("bhopalMandi")}
                    </p>

                  </div>

                  <div className="flex shrink-0 items-center gap-2 sm:gap-4">

                    <p className="text-sm font-semibold text-gray-900 sm:text-base dark:text-white">
                      {item.price}
                    </p>

                    <span
                      className={`
                        flex
                        items-center
                        gap-1
                        text-xs
                        font-semibold

                        ${
                          item.up
                            ? "text-green-600"
                            : "text-red-500"
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
          </div>

          {/* ================================================= */}
          {/* WEATHER CARD */}
          {/* ================================================= */}

          <div
            className={`
              group
              rounded-3xl
              border
              border-gray-200
              bg-white
              p-5
              shadow-sm

              transition-all
              duration-700
              ease-out

              hover:-translate-y-2
              hover:shadow-xl

              sm:p-6

              dark:border-gray-800
              dark:bg-gray-900

              ${
                isVisible
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-10 scale-[0.97] opacity-0"
              }
            `}
            style={{
              transitionDelay: "300ms",
            }}
          >

            <div className="flex items-center justify-between">

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  bg-green-50
                  text-green-600

                  transition-all
                  duration-300

                  group-hover:scale-110
                  group-hover:-rotate-3

                  sm:h-12
                  sm:w-12

                  dark:bg-green-950/40
                  dark:text-green-400
                "
              >
                <CloudSun size={22} />
              </div>

              <span
                className="
                  rounded-full
                  bg-green-50
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  text-green-700

                  dark:bg-green-950/40
                  dark:text-green-400
                "
              >
                {t("bhopal")}
              </span>

            </div>

            <div className="mt-5">

              <p className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
                28°
              </p>

              <p className="mt-2 font-medium text-gray-700 dark:text-gray-300">
                {t("partlyCloudy")}
              </p>

              <p className="mt-1.5 text-sm leading-6 text-gray-500 dark:text-gray-400">
                {t("goodFarmingConditions")}
              </p>

            </div>

            <button
              className="
                group/link
                mt-5
                flex
                items-center
                gap-1
                text-sm
                font-semibold
                text-green-600
              "
            >
              {t("weather")}

              <ArrowUpRight
                size={17}
                className="
                  transition-transform
                  duration-300

                  group-hover/link:-translate-y-1
                  group-hover/link:translate-x-1
                "
              />
            </button>

          </div>
        </div>

        {/* ================================================= */}
        {/* BOTTOM CARDS */}
        {/* ================================================= */}

        <div
          className="
            mt-5
            grid
            grid-cols-1
            gap-5

            md:grid-cols-2
          "
        >

          {/* ================================================= */}
          {/* GOVERNMENT SCHEMES */}
          {/* ================================================= */}

          <div
            className={`
              group
              rounded-3xl
              border
              border-gray-200
              bg-white
              p-5
              shadow-sm

              transition-all
              duration-700
              ease-out

              hover:-translate-y-2
              hover:shadow-xl

              sm:p-6

              dark:border-gray-800
              dark:bg-gray-900

              ${
                isVisible
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-10 scale-[0.97] opacity-0"
              }
            `}
            style={{
              transitionDelay: "450ms",
            }}
          >

            <div className="flex items-start justify-between">

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  bg-green-50
                  text-green-600

                  transition-all
                  duration-300

                  group-hover:scale-110

                  sm:h-12
                  sm:w-12

                  dark:bg-green-950/40
                  dark:text-green-400
                "
              >
                <Landmark size={21} />
              </div>

              <ArrowUpRight
                size={19}
                className="
                  text-gray-400
                  transition-all
                  duration-300

                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                  group-hover:text-green-600
                "
              />

            </div>

            <div className="mt-4">

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t("governmentSchemes")}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                {t("schemeDescription")}
              </p>

            </div>

            <div className="mt-3 flex items-center gap-2">

              <span className="text-2xl font-bold text-green-600 sm:text-3xl">
                25+
              </span>

              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t("schemesAvailable")}
              </span>

            </div>

          </div>

          {/* ================================================= */}
          {/* NEARBY MANDIS */}
          {/* ================================================= */}

          <div
            className={`
              group
              rounded-3xl
              border
              border-green-100
              bg-green-50/70
              p-5
              shadow-sm

              transition-all
              duration-700
              ease-out

              hover:-translate-y-2
              hover:shadow-xl

              sm:p-6

              dark:border-green-900/30
              dark:bg-green-950/20

              ${
                isVisible
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-10 scale-[0.97] opacity-0"
              }
            `}
            style={{
              transitionDelay: "600ms",
            }}
          >

            <div className="flex items-start justify-between">

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white
                  text-green-600
                  shadow-sm

                  transition-all
                  duration-300

                  group-hover:scale-110

                  sm:h-12
                  sm:w-12

                  dark:bg-gray-900
                  dark:text-green-400
                "
              >
                <MapPin size={21} />
              </div>

              <ArrowUpRight
                size={19}
                className="
                  text-gray-400
                  transition-all
                  duration-300

                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                  group-hover:text-green-600
                "
              />

            </div>

            <div className="mt-4">

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t("nearbyMandis")}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                {t("nearbyMandiDescription")}
              </p>

            </div>

            <div className="mt-4 flex flex-wrap gap-2">

              {nearbyMandis.map((mandi) => (

                <span
                  key={mandi}
                  className="
                    rounded-full
                    bg-white
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    text-gray-700
                    shadow-sm

                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:shadow-md

                    dark:bg-gray-900
                    dark:text-gray-300
                  "
                >
                  {mandi}
                </span>

              ))}

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default MiddleSection;