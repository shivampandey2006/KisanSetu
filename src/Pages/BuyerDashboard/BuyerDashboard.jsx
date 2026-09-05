import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  ShoppingCart,
  MapPin,
  TrendingUp,
  Package,
  ArrowRight,
  Wheat,
  Leaf,
  Apple,
  Sprout,
  Check,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

import { useLanguage } from "../../Context/LanguageContext";
import { useCart } from "../../Context/CartContext";
import { products, categoryList } from "../../Data/Product";
import BuyerHeader from "../../components/Buyer/BuyerHeaders";

/* =========================================================
   ICON MAP
========================================================= */

const iconMap = {
  Leaf,
  Apple,
  Wheat,
  Sprout,
};

/* =========================================================
   MARKET DATA
========================================================= */

const marketPrices = [
  {
    nameKey: "prodWheatName",
    price: "₹2,450",
    unit: "/ quintal",
    change: "+4.2%",
  },
  {
    nameKey: "prodRiceName",
    price: "₹4,200",
    unit: "/ quintal",
    change: "+2.8%",
  },
  {
    nameKey: "prodTomatoName",
    price: "₹28",
    unit: "/ kg",
    change: "+6.1%",
  },
  {
    nameKey: "prodPotatoName",
    price: "₹24",
    unit: "/ kg",
    change: "-1.4%",
  },
];

/* =========================================================
   UNSPLASH IMAGES
========================================================= */

const productImages = {
  wheat:
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1000&q=90",

  rice:
    "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=1000&q=90",

  tomato:
    "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=1000&q=90",

  potato:
    "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1000&q=90",

  onion:
    "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=1000&q=90",

  vegetables:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=90",

  fruits:
    "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1000&q=90",

  maize:
    "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1000&q=90",
};

/* Premium farmer / field hero image */
const heroImage =
  "https://images.unsplash.com/photo-1500595046743-cd271d1c6942?auto=format&fit=crop&w=2200&q=90";

/* =========================================================
   GET PRODUCT IMAGE
========================================================= */

const getProductImage = (product) => {
  const text = `${product.nameKey || ""} ${
    product.categoryKey || ""
  }`.toLowerCase();

  if (text.includes("wheat")) return productImages.wheat;
  if (text.includes("rice")) return productImages.rice;
  if (text.includes("tomato")) return productImages.tomato;
  if (text.includes("potato")) return productImages.potato;
  if (text.includes("onion")) return productImages.onion;
  if (text.includes("maize") || text.includes("corn"))
    return productImages.maize;
  if (text.includes("fruit")) return productImages.fruits;
  if (text.includes("vegetable")) return productImages.vegetables;

  return productImages.vegetables;
};

/* =========================================================
   REVEAL ON SCROLL
========================================================= */

const Reveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const hiddenTransform =
    direction === "left"
      ? "-translate-x-10"
      : direction === "right"
      ? "translate-x-10"
      : "translate-y-10";

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`
        transition-all
        duration-1000
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          visible
            ? "translate-x-0 translate-y-0 scale-100 opacity-100"
            : `${hiddenTransform} scale-[0.97] opacity-0`
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
};

/* =========================================================
   BUYER DASHBOARD
========================================================= */

function BuyerDashboard() {
  const { t } = useLanguage();
  const { addToCart } = useCart();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [justAdded, setJustAdded] = useState(null);

  /* =======================================================
     FILTER PRODUCTS
  ======================================================= */

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const name = t(product.nameKey).toLowerCase();
      const category = t(product.categoryKey).toLowerCase();
      const query = search.toLowerCase();

      const matchesSearch =
        name.includes(query) || category.includes(query);

      const matchesCategory =
        selectedCategory === "All" ||
        product.categoryKey === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory, t]);

  /* =======================================================
     ADD TO CART
  ======================================================= */

  const handleAdd = (product) => {
    addToCart({
      id: product.id,
      name: t(product.nameKey),
      price: product.price,
      unit: product.unit,
      emoji: product.emoji,
    });

    setJustAdded(product.id);

    setTimeout(() => {
      setJustAdded(null);
    }, 1200);
  };

  return (
    <div
      className="
        min-h-screen
        overflow-hidden
        bg-[#f7faf7]
        text-slate-900
        transition-colors
        duration-500
        dark:bg-[#070c09]
        dark:text-white
      "
    >
      <BuyerHeader />

      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>{`
        @keyframes heroZoom {
          from {
            transform: scale(1.08);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes floatOne {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -18px, 0);
          }
        }

        @keyframes floatTwo {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(12px, -12px, 0) rotate(8deg);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(120%);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: .35;
            transform: scale(1);
          }
          50% {
            opacity: .7;
            transform: scale(1.08);
          }
        }

        @keyframes cartPop {
          0% {
            transform: scale(.7);
          }
          60% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1);
          }
        }

        .hero-image {
          animation: heroZoom 1.8s cubic-bezier(.22,1,.36,1) forwards;
        }

        .float-one {
          animation: floatOne 6s ease-in-out infinite;
        }

        .float-two {
          animation: floatTwo 7s ease-in-out infinite;
        }

        .pulse-glow {
          animation: pulseGlow 4s ease-in-out infinite;
        }

        .cart-pop {
          animation: cartPop .35s ease-out;
        }

        .shimmer-effect {
          animation: shimmer 2.8s ease-in-out infinite;
        }
      `}</style>

      <main className="mx-auto w-[94%] max-w-7xl px-1 py-7 sm:px-2 md:py-10">

        {/* =================================================
            HERO
        ================================================= */}

        <section
          className="
            group
            relative
            min-h-[440px]
            overflow-hidden
            rounded-[30px]
            border
            border-green-900/10
            bg-green-950
            shadow-[0_25px_70px_rgba(20,83,45,0.18)]
            sm:min-h-[500px]
          "
        >
          {/* Background Image */}

          <img
            src={heroImage}
            alt="Farmer working in field"
            className="
              hero-image
              absolute
              inset-0
              h-full
              w-full
              object-cover
              object-center
            "
          />

          {/* Dark overlay */}

          <div
            className="
              absolute
              inset-0
              bg-black/45
            "
          />

          {/* Green cinematic gradient */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-green-950/95
              via-green-950/75
              to-green-950/10
            "
          />

          {/* Bottom gradient */}

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-48
              bg-gradient-to-t
              from-black/50
              to-transparent
            "
          />

          {/* Floating circles */}

          <div
            className="
              pulse-glow
              absolute
              -right-20
              -top-20
              h-72
              w-72
              rounded-full
              border
              border-white/10
              bg-green-400/10
              blur-2xl
            "
          />

          <div
            className="
              float-one
              absolute
              right-[12%]
              top-[18%]
              hidden
              h-24
              w-24
              rounded-full
              border
              border-white/15
              bg-white/5
              backdrop-blur-sm
              lg:block
            "
          />

          <div
            className="
              float-two
              absolute
              bottom-16
              right-[28%]
              hidden
              h-12
              w-12
              rounded-full
              border
              border-green-200/20
              bg-green-300/10
              lg:block
            "
          />

          {/* Content */}

          <div
            className="
              relative
              z-10
              flex
              min-h-[440px]
              items-center
              px-6
              py-12
              sm:min-h-[500px]
              sm:px-10
              lg:px-14
            "
          >
            <div className="max-w-2xl">

              {/* Badge */}

              <div
                className="
                  mb-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/20
                  bg-white/10
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  text-white
                  shadow-lg
                  backdrop-blur-xl
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:bg-white/15
                "
              >
                <Sparkles size={15} className="text-lime-300" />

                {t("marketplaceLabel")}
              </div>

              {/* Heading */}

              <h1
                className="
                  max-w-2xl
                  text-4xl
                  font-extrabold
                  leading-[1.08]
                  tracking-tight
                  text-white
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                {t("heroTitle1")}
                <br />

                <span className="text-green-300">
                  {t("heroTitle2")}
                </span>
              </h1>

              {/* Description */}

              <p
                className="
                  mt-5
                  max-w-xl
                  text-sm
                  leading-7
                  text-green-50/90
                  sm:text-base
                "
              >
                {t("heroBuyerDesc")}
              </p>

              {/* Search */}

              <div
                className="
                  mt-7
                  flex
                  w-full
                  max-w-2xl
                  items-center
                  rounded-2xl
                  border
                  border-white/20
                  bg-white
                  p-1.5
                  shadow-2xl
                  transition-all
                  duration-300
                  focus-within:scale-[1.015]
                  focus-within:ring-4
                  focus-within:ring-green-400/20
                "
              >
                <Search
                  size={21}
                  className="ml-3 shrink-0 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t("searchPlaceholderBuyer")}
                  className="
                    min-w-0
                    flex-1
                    bg-transparent
                    px-3
                    py-3
                    text-sm
                    text-slate-800
                    outline-none
                  "
                />

                <button
                  className="
                    hidden
                    rounded-xl
                    bg-green-700
                    px-5
                    py-3
                    text-sm
                    font-bold
                    text-white
                    shadow-md
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-green-800
                    hover:shadow-lg
                    sm:block
                  "
                >
                  {t("searchButton")}
                </button>
              </div>

              {/* Tiny trust points */}

              <div
                className="
                  mt-5
                  flex
                  flex-wrap
                  gap-x-5
                  gap-y-2
                  text-xs
                  font-medium
                  text-green-100
                "
              >
                <span>✓ Quality Products</span>
                <span>✓ Farmer Connected</span>
                <span>✓ Fair Prices</span>
              </div>
            </div>
          </div>

          {/* Shine */}

          <div
            className="
              shimmer-effect
              pointer-events-none
              absolute
              inset-y-0
              left-0
              z-20
              w-1/3
              skew-x-[-18deg]
              bg-gradient-to-r
              from-transparent
              via-white/10
              to-transparent
            "
          />
        </section>

        {/* =================================================
            CATEGORIES
        ================================================= */}

        <Reveal className="mt-12" direction="up">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[2px] text-green-600">
                Explore
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
                {t("browseCategoriesTitle")}
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {t("findWhatYouNeed")}
              </p>
            </div>

            <button
              onClick={() => setSelectedCategory("All")}
              className="
                hidden
                items-center
                gap-1
                text-sm
                font-bold
                text-green-600
                transition-all
                hover:gap-2
                hover:text-green-700
                sm:flex
              "
            >
              {t("viewAllBtn")}
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {categoryList.map((category, index) => {
              const Icon = iconMap[category.icon];

              const active =
                selectedCategory === category.key;

              return (
                <button
                  key={category.key}
                  onClick={() =>
                    setSelectedCategory(category.key)
                  }
                  style={{
                    transitionDelay: `${index * 70}ms`,
                  }}
                  className={`
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    p-4
                    text-left
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:shadow-xl

                    ${
                      active
                        ? `
                          border-green-400
                          bg-green-50
                          shadow-lg
                          shadow-green-500/10
                          dark:bg-green-950/40
                        `
                        : `
                          border-slate-200
                          bg-white
                          hover:border-green-200
                          dark:border-slate-800
                          dark:bg-slate-900
                          dark:hover:border-green-900
                        `
                    }
                  `}
                >
                  {/* Hover glow */}

                  <div
                    className="
                      absolute
                      -right-8
                      -top-8
                      h-20
                      w-20
                      rounded-full
                      bg-green-400/10
                      blur-xl
                      transition-transform
                      duration-500
                      group-hover:scale-150
                    "
                  />

                  <div
                    className={`
                      relative
                      mb-3
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      transition-all
                      duration-500
                      group-hover:rotate-3
                      group-hover:scale-110

                      ${
                        active
                          ? "bg-green-600 text-white"
                          : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                      }
                    `}
                  >
                    <Icon size={21} />
                  </div>

                  <h3 className="relative font-semibold text-slate-800 dark:text-white">
                    {t(category.key)}
                  </h3>

                  <p className="relative mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    {t("exploreProducts")}
                  </p>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* =================================================
            PRODUCTS
        ================================================= */}

        <Reveal className="mt-12">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[2px] text-green-600">
                Fresh Collection
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
                {t("freshFromFarmersTitle")}
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {t("qualityFairPrices")}
              </p>
            </div>

            <div className="hidden items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700 dark:bg-green-950/40 dark:text-green-400 sm:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              Fresh Listings
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div
              className="
                rounded-3xl
                border
                border-dashed
                border-slate-300
                bg-white
                py-16
                text-center
                dark:border-slate-700
                dark:bg-slate-900
              "
            >
              <Package
                size={42}
                className="mx-auto text-slate-400"
              />

              <h3 className="mt-4 font-semibold text-slate-700 dark:text-slate-200">
                {t("noProductsFound")}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {t("tryAnotherCrop")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                  className="
                    group
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-slate-200
                    bg-white
                    shadow-sm
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:border-green-200
                    hover:shadow-[0_20px_45px_rgba(22,101,52,0.14)]
                    dark:border-slate-800
                    dark:bg-slate-900
                    dark:hover:border-green-900
                  "
                >
                  {/* IMAGE */}

                  <div
                    className="
                      relative
                      h-48
                      overflow-hidden
                      bg-green-50
                      dark:bg-green-950/30
                    "
                  >
                    <img
                      src={getProductImage(product)}
                      alt={t(product.nameKey)}
                      loading="lazy"
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-110
                      "
                    />

                    {/* Image overlay */}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/40
                        via-transparent
                        to-transparent
                        opacity-60
                      "
                    />

                    {/* Category */}

                    <span
                      className="
                        absolute
                        right-3
                        top-3
                        rounded-full
                        border
                        border-white/30
                        bg-white/90
                        px-3
                        py-1.5
                        text-[11px]
                        font-bold
                        text-green-700
                        shadow-lg
                        backdrop-blur-md
                        dark:bg-slate-900/90
                        dark:text-green-400
                      "
                    >
                      {t(product.categoryKey)}
                    </span>

                    {/* Location */}

                    <div
                      className="
                        absolute
                        bottom-3
                        left-3
                        flex
                        items-center
                        gap-1
                        rounded-full
                        bg-black/40
                        px-2.5
                        py-1.5
                        text-[10px]
                        font-medium
                        text-white
                        backdrop-blur-md
                      "
                    >
                      <MapPin size={12} />
                      {product.location}
                    </div>
                  </div>

                  {/* CONTENT */}

                  <div className="p-5">
                    <div>
                      <h3
                        className="
                          font-bold
                          text-slate-800
                          transition-colors
                          duration-300
                          group-hover:text-green-700
                          dark:text-white
                          dark:group-hover:text-green-400
                        "
                      >
                        {t(product.nameKey)}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {product.farmer}
                      </p>
                    </div>

                    <div className="mt-5 flex items-end justify-between">
                      <div>
                        <p className="text-[11px] text-slate-400">
                          {t("startingFrom")}
                        </p>

                        <p className="mt-1 text-xl font-extrabold text-green-700 dark:text-green-400">
                          ₹{product.price}

                          <span className="ml-1 text-xs font-normal text-slate-500">
                            / {product.unit}
                          </span>
                        </p>
                      </div>

                      <button
                        onClick={() => handleAdd(product)}
                        aria-label={`Add ${t(product.nameKey)} to cart`}
                        className={`
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          rounded-xl
                          text-white
                          shadow-md
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:scale-105
                          hover:shadow-lg

                          ${
                            justAdded === product.id
                              ? "cart-pop bg-green-500"
                              : "bg-green-700 hover:bg-green-800"
                          }
                        `}
                      >
                        {justAdded === product.id ? (
                          <Check size={19} />
                        ) : (
                          <ShoppingCart size={19} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Reveal>

        {/* =================================================
            SMALL FARMER VISUAL STRIP
        ================================================= */}

        <Reveal className="mt-12" direction="up">
          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[26px]
              bg-green-950
              shadow-xl
            "
          >
            <img
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1800&q=90"
              alt="Fresh agricultural field"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                opacity-40
                transition-transform
                duration-1000
                group-hover:scale-105
              "
            />

            <div className="absolute inset-0 bg-gradient-to-r from-green-950 via-green-950/80 to-green-950/20" />

            <div className="relative z-10 px-6 py-8 sm:px-10">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-green-300">
                  <Sprout size={15} />
                  KisanSetu Marketplace
                </div>

                <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  Better products. Better prices. Better farming.
                </h2>

                <p className="mt-2 text-sm leading-6 text-green-100/80">
                  Discover quality agricultural products connected with the
                  farming community.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* =================================================
            MARKET PRICES
        ================================================= */}

        <Reveal className="mt-12">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[2px] text-green-600">
                Live Market
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
                {t("todaysMarketPricesTitle")}
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {t("keepTrackPrices")}
              </p>
            </div>

            <TrendingUp
              size={25}
              className="text-green-600"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {marketPrices.map((item, index) => {
              const isNegative = item.change.startsWith("-");

              return (
                <div
                  key={item.nameKey}
                  style={{
                    transitionDelay: `${index * 80}ms`,
                  }}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-5
                    shadow-sm
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:shadow-xl
                    dark:border-slate-800
                    dark:bg-slate-900
                  "
                >
                  {/* Hover glow */}

                  <div
                    className="
                      absolute
                      -right-12
                      -top-12
                      h-28
                      w-28
                      rounded-full
                      bg-green-400/10
                      blur-2xl
                      transition-transform
                      duration-700
                      group-hover:scale-150
                    "
                  />

                  <div className="relative flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-slate-700 dark:text-slate-200">
                        {t(item.nameKey)}
                      </p>

                      <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                        {item.price}
                      </p>

                      <p className="text-xs text-slate-400">
                        {item.unit}
                      </p>
                    </div>

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-green-50
                        text-green-600
                        transition-all
                        duration-500
                        group-hover:rotate-6
                        group-hover:scale-110
                        dark:bg-green-950/40
                        dark:text-green-400
                      "
                    >
                      {isNegative ? (
                        <TrendingUp
                          size={20}
                          className="rotate-90"
                        />
                      ) : (
                        <TrendingUp size={20} />
                      )}
                    </div>
                  </div>

                  <div className="relative mt-4 flex items-center justify-between">
                    <p
                      className={`
                        text-xs
                        font-bold
                        ${
                          isNegative
                            ? "text-red-500"
                            : "text-green-600"
                        }
                      `}
                    >
                      {item.change} {t("todayWord")}
                    </p>

                    <ArrowUpRight
                      size={15}
                      className="
                        text-slate-300
                        transition-all
                        duration-300
                        group-hover:-translate-y-1
                        group-hover:translate-x-1
                        group-hover:text-green-600
                      "
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Bottom spacing */}

        <div className="h-10" />
      </main>
    </div>
  );
}

export default BuyerDashboard;