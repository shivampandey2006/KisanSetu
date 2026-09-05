import React, { useEffect, useState } from "react";
import { useLanguage } from "../../Context/LanguageContext";
import { useNavigate } from "react-router-dom";
import {
  Sun,
  Moon,
  ArrowUpRight,
  TrendingUp,
  CloudSun,
  Sprout,
  Droplets,
  MapPin,
  ChevronRight,
  Wheat,
  Landmark,
} from "lucide-react";

const FarmerDashboard = () => {
  const { language, changeLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  const [activeMenu, setActiveMenu] = useState("dashboard");

  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");

    setDarkMode(document.documentElement.classList.contains("dark"));
  };

  const today = new Date();

  const formattedDate = today.toLocaleDateString(language || "en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // =========================================================
  // NAVIGATION
  // =========================================================

  const menuItems = [
    {
      id: "dashboard",
      icon: "⌂",
      label: t("menuDashboard"),
    },
    {
      id: "crops",
      icon: "🌱",
      label: t("menuMyCrops"),
    },
    {
      id: "mandi",
      icon: "₹",
      label: t("menuMandiPrices"),
    },
    {
      id: "weather",
      icon: "☁️",
      label: t("menuWeather"),
    },
    {
      id: "schemes",
      icon: "🏛️",
      label: t("menuSchemes"),
    },
    {
      id: "ai",
      icon: "✦",
      label: t("menuKisanAI"),
    },
  ];

  // =========================================================
  // DATA
  // =========================================================

  const crops = [
    {
      name: t("wheat"),
      hindi: "गेहूं",
      progress: 72,
      statusKey: "cropGrowingWell",
      icon: "🌾",
    },
    {
      name: t("soybean"),
      hindi: "सोयाबीन",
      progress: 54,
      statusKey: "cropNeedsAttention",
      icon: "🌱",
    },
    {
      name: t("rice"),
      hindi: "धान",
      progress: 38,
      statusKey: "cropEarlyGrowth",
      icon: "🌿",
    },
  ];

  const mandiPrices = [
    {
      crop: t("wheat"),
      market: "Sehore Mandi",
      price: "₹2,450",
      change: "+3.2%",
      positive: true,
    },
    {
      crop: t("soybean"),
      market: "Bhopal Mandi",
      price: "₹4,820",
      change: "+1.8%",
      positive: true,
    },
    {
      crop: t("rice"),
      market: "Vidisha Mandi",
      price: "₹2,940",
      change: "-0.6%",
      positive: false,
    },
  ];

  // =========================================================
  // MENU ACTION
  // =========================================================

  const handleMenuClick = (id) => {
    setActiveMenu(id);

    if (id === "mandi") {
      navigate("/market/mandi-prices");
    }

    if (id === "weather") {
      navigate("/weather");
    }

    if (id === "schemes") {
      navigate("/schemes/government");
    }
  };

  return (
    <div
      className="
        min-h-screen w-full
        overflow-x-hidden
        bg-[#f5f8f3]
        text-gray-900
        transition-colors duration-500
        dark:bg-[#070d09]
        dark:text-white
      "
    >
      {/* ===================================================== */}
      {/* ANIMATIONS */}
      {/* ===================================================== */}

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeRight {
          from {
            opacity: 0;
            transform: translateX(-25px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(.94);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes floating {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: .35;
            transform: scale(1);
          }
          50% {
            opacity: .65;
            transform: scale(1.12);
          }
        }

        @keyframes growProgress {
          from {
            width: 0;
          }
        }

        .fade-up {
          animation: fadeUp .75s cubic-bezier(.22,1,.36,1) both;
        }

        .fade-right {
          animation: fadeRight .7s cubic-bezier(.22,1,.36,1) both;
        }

        .scale-in {
          animation: scaleIn .7s cubic-bezier(.22,1,.36,1) both;
        }

        .floating {
          animation: floating 5s ease-in-out infinite;
        }

        .pulse-glow {
          animation: pulseGlow 4s ease-in-out infinite;
        }

        .progress-grow {
          animation: growProgress 1.3s cubic-bezier(.22,1,.36,1);
        }

        .dashboard-card {
          transition:
            transform .4s cubic-bezier(.22,1,.36,1),
            box-shadow .4s ease,
            border-color .3s ease;
        }

        .dashboard-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 22px 50px rgba(20, 80, 45, .12);
        }

        .image-zoom {
          transition: transform 1s cubic-bezier(.22,1,.36,1);
        }

        .image-wrapper:hover .image-zoom {
          transform: scale(1.07);
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          scrollbar-width: none;
        }
      `}</style>

      {/* ===================================================== */}
      {/* NAVBAR */}
      {/* ===================================================== */}

      <header
        className="
          sticky top-0 z-50
          border-b border-green-100/70
          bg-white/85
          backdrop-blur-2xl
          dark:border-green-900/30
          dark:bg-[#0b120d]/90
        "
      >
        <div
          className="
            mx-auto flex h-[74px] max-w-[1500px]
            items-center justify-between
            px-4 sm:px-6 lg:px-8
          "
        >
          {/* LOGO */}

          <div className="flex items-center gap-3">
            <div
              className="
                h-11 w-11 overflow-hidden rounded-full
                ring-2 ring-green-200
                shadow-lg shadow-green-900/10
                dark:ring-green-800
              "
            >
              <img
                src="https://i.pinimg.com/474x/86/ac/cb/86accbea31b719dea35425f4e260b2c3.jpg"
                alt="KisanSetu"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl">
                Kisan<span className="text-green-600">Setu</span>
              </h1>

              <p className="hidden text-[10px] font-semibold uppercase tracking-[2px] text-gray-400 sm:block">
                {t("dashTagline")}
              </p>
            </div>
          </div>

          {/* CONTROLS */}

          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className="
                hidden rounded-xl border border-green-100
                bg-green-50/70 px-4 py-2
                text-xs font-semibold text-green-700
                lg:block
                dark:border-green-900/40
                dark:bg-green-950/30
                dark:text-green-300
              "
            >
              {formattedDate}
            </div>

            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="
                cursor-pointer rounded-full
                border border-green-200
                bg-white px-3 py-2
                text-xs font-semibold
                text-gray-700 outline-none
                transition-all
                hover:border-green-500
                dark:border-green-900
                dark:bg-[#111a14]
                dark:text-gray-200
              "
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="mr">मराठी</option>
              <option value="gu">ગુજરાતી</option>
              <option value="pa">ਪੰਜਾਬੀ</option>
              <option value="bn">বাংলা</option>
              <option value="ta">தமிழ்</option>
              <option value="te">తెలుగు</option>
            </select>

            <button
              onClick={toggleTheme}
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full border border-green-200
                bg-white text-gray-600
                transition-all duration-300
                hover:scale-110
                hover:bg-green-50
                hover:text-green-600
                dark:border-green-900
                dark:bg-[#111a14]
                dark:text-gray-300
                dark:hover:bg-green-950
              "
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full bg-green-700
                font-bold text-white
                shadow-lg shadow-green-700/20
              "
            >
              K
            </div>
          </div>
        </div>
      </header>

      {/* ===================================================== */}
      {/* PAGE */}
      {/* ===================================================== */}

      <div className="mx-auto flex w-full max-w-[1500px]">

        {/* ===================================================== */}
        {/* SIDEBAR */}
        {/* ===================================================== */}

        <aside
          className="
            sticky top-[74px]
            hidden h-[calc(100vh-74px)]
            w-[230px] shrink-0
            border-r border-green-100
            bg-white/60 px-4 py-7
            lg:block
            dark:border-green-900/30
            dark:bg-[#0a100c]
          "
        >
          <p
            className="
              mb-4 px-3
              text-[10px] font-bold uppercase
              tracking-[2px] text-gray-400
            "
          >
            {t("yourSpace")}
          </p>

          <nav className="space-y-1.5">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`
                  group flex w-full items-center gap-3
                  rounded-xl px-3 py-3
                  text-sm font-semibold
                  transition-all duration-300

                  ${
                    activeMenu === item.id
                      ? `
                        bg-green-700 text-white
                        shadow-lg shadow-green-700/20
                        translate-x-1
                      `
                      : `
                        text-gray-600
                        hover:bg-green-50
                        hover:text-green-700
                        hover:translate-x-1
                        dark:text-gray-400
                        dark:hover:bg-green-950/40
                        dark:hover:text-green-300
                      `
                  }
                `}
              >
                <span
                  className="
                    text-lg
                    transition-transform duration-300
                    group-hover:scale-110
                  "
                >
                  {item.icon}
                </span>

                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* ===================================================== */}
        {/* MAIN */}
        {/* ===================================================== */}

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">

          {/* ===================================================== */}
          {/* HERO */}
          {/* ===================================================== */}

          <section
            className="
              fade-up
              relative min-h-[330px]
              overflow-hidden rounded-[30px]
              border border-green-900/20
              bg-[#123b27]
              shadow-2xl shadow-green-900/10
              sm:min-h-[360px]
            "
          >
            {/* IMAGE */}

            <div className="image-wrapper absolute inset-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=85"
                alt=""
                className="
                  image-zoom h-full w-full object-cover
                  opacity-45
                "
              />
            </div>

            {/* OVERLAYS */}

            <div
              className="
                absolute inset-0
                bg-gradient-to-r
                from-[#082817]/95
                via-[#0d3824]/80
                to-[#0d3824]/25
              "
            />

            <div
              className="
                pulse-glow
                absolute -right-20 -top-24
                h-72 w-72 rounded-full
                bg-green-300/20 blur-3xl
              "
            />

            <div
              className="
                pulse-glow
                absolute -bottom-24 right-1/3
                h-56 w-56 rounded-full
                bg-lime-300/10 blur-3xl
              "
            />

            {/* CONTENT */}

            <div className="relative z-10 flex min-h-[330px] items-center p-6 sm:p-9 lg:p-12">
              <div className="max-w-2xl">

                <div
                  className="
                    fade-right
                    inline-flex items-center gap-2
                    rounded-full border border-white/20
                    bg-white/10 px-4 py-2
                    text-xs font-semibold
                    text-green-100 backdrop-blur-md
                  "
                >
                  <span className="h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_12px_#bef264]" />

                  {t("dashboardBadge")}
                </div>

                <h2
                  className="
                    fade-up
                    mt-5
                    text-3xl font-extrabold
                    leading-tight tracking-tight
                    text-white
                    sm:text-4xl
                    lg:text-5xl
                  "
                  style={{ animationDelay: "120ms" }}
                >
                  {t("namasteKisan")}
                </h2>

                <p
                  className="
                    fade-up
                    mt-4 max-w-xl
                    text-sm leading-7
                    text-green-50/90
                    sm:text-base
                  "
                  style={{ animationDelay: "220ms" }}
                >
                  {t("heroDashDescription")}
                </p>

                <div
                  className="fade-up mt-7 flex flex-wrap gap-3"
                  style={{ animationDelay: "320ms" }}
                >
                  <button
                    onClick={() => navigate("/market/mandi-prices")}
                    className="
                      group flex items-center gap-2
                      rounded-xl bg-white
                      px-5 py-3
                      text-sm font-bold text-green-800
                      shadow-xl
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:shadow-2xl
                    "
                  >
                    {t("menuMandiPrices")}

                    <ArrowUpRight
                      size={17}
                      className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </button>

                  <button
                    onClick={() => navigate("/weather")}
                    className="
                      flex items-center gap-2
                      rounded-xl
                      border border-white/20
                      bg-white/10
                      px-5 py-3
                      text-sm font-bold text-white
                      backdrop-blur-md
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:bg-white/15
                    "
                  >
                    <CloudSun size={17} />

                    {t("menuWeather")}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ===================================================== */}
          {/* TODAY */}
          {/* ===================================================== */}

          <section
            className="fade-up mt-8"
            style={{ animationDelay: "180ms" }}
          >
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[2px] text-green-600">
                  {t("todayLabel")}
                </p>

                <h2 className="mt-1 text-2xl font-bold tracking-tight">
                  {t("whatMattersToday")}
                </h2>
              </div>

              <span className="hidden text-xs text-gray-400 sm:block">
                {t("updatedJustNow")}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              {/* WEATHER */}

              <button
                onClick={() => navigate("/weather")}
                className="
                  dashboard-card
                  group rounded-2xl
                  border border-blue-100
                  bg-white p-5 text-left
                  shadow-sm
                  dark:border-blue-900/30
                  dark:bg-[#111a14]
                "
              >
                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-xs font-semibold text-gray-400">
                      {t("weatherLabel")}
                    </p>

                    <h3 className="mt-2 text-3xl font-extrabold">
                      28°
                    </h3>
                  </div>

                  <div
                    className="
                      flex h-11 w-11
                      items-center justify-center
                      rounded-xl bg-blue-50
                      text-blue-500
                      transition-transform duration-500
                      group-hover:rotate-12
                      group-hover:scale-110
                      dark:bg-blue-950/40
                    "
                  >
                    <Sun size={23} />
                  </div>
                </div>

                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  {t("bhopalClearSky")}
                </p>

                <div className="mt-4 flex items-center justify-between text-xs">
                  <span>
                    {t("humidityWord")} 61%
                  </span>

                  <span>
                    {t("rainWord")} 10%
                  </span>
                </div>

                <div
                  className="
                    mt-4 flex items-center gap-1
                    text-xs font-bold text-blue-600
                    opacity-70 transition-all
                    group-hover:opacity-100
                  "
                >
                  {t("weather")} <ChevronRight size={14} />
                </div>
              </button>

              {/* MANDI */}

              <button
                onClick={() => navigate("/market/mandi-prices")}
                className="
                  dashboard-card
                  group rounded-2xl
                  border border-green-100
                  bg-white p-5 text-left
                  shadow-sm
                  dark:border-green-900/30
                  dark:bg-[#111a14]
                "
              >
                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-xs font-semibold text-gray-400">
                      {t("wheatPriceLabel")}
                    </p>

                    <h3 className="mt-2 text-2xl font-extrabold">
                      ₹2,450
                    </h3>
                  </div>

                  <div
                    className="
                      flex h-11 w-11
                      items-center justify-center
                      rounded-xl bg-green-50
                      text-green-600
                      transition-transform duration-500
                      group-hover:scale-110
                      dark:bg-green-950/40
                    "
                  >
                    <TrendingUp size={22} />
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t("sehoreQuintal")}
                  </p>

                  <span
                    className="
                      rounded-full bg-green-100
                      px-2 py-1
                      text-[10px] font-bold text-green-700
                      dark:bg-green-900/40
                      dark:text-green-300
                    "
                  >
                    ↑ 3.2%
                  </span>
                </div>

                <div
                  className="
                    mt-4 flex items-center gap-1
                    text-xs font-bold text-green-600
                    opacity-70 transition-all
                    group-hover:opacity-100
                  "
                >
                  {t("menuMandiPrices")}
                  <ChevronRight size={14} />
                </div>
              </button>

              {/* CROP HEALTH */}

              <button
                onClick={() => setActiveMenu("crops")}
                className="
                  dashboard-card
                  group rounded-2xl
                  border border-yellow-100
                  bg-white p-5 text-left
                  shadow-sm
                  dark:border-yellow-900/30
                  dark:bg-[#111a14]
                "
              >
                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-xs font-semibold text-gray-400">
                      {t("cropHealthLabel")}
                    </p>

                    <h3 className="mt-2 text-2xl font-extrabold">
                      {t("cropHealthGood")}
                    </h3>
                  </div>

                  <div
                    className="
                      flex h-11 w-11
                      items-center justify-center
                      rounded-xl bg-yellow-50
                      text-2xl
                      transition-transform duration-500
                      group-hover:-rotate-6
                      group-hover:scale-110
                      dark:bg-yellow-950/30
                    "
                  >
                    🌱
                  </div>
                </div>

                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  {t("cropsAttentionCount")}
                </p>

                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-green-600">
                  {t("menuMyCrops")}
                  <ChevronRight size={14} />
                </div>
              </button>

              {/* ALERT */}

              <button
                onClick={() => setActiveMenu("crops")}
                className="
                  dashboard-card
                  group rounded-2xl
                  border border-orange-100
                  bg-white p-5 text-left
                  shadow-sm
                  dark:border-orange-900/30
                  dark:bg-[#111a14]
                "
              >
                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-xs font-semibold text-gray-400">
                      {t("farmAlertLabel")}
                    </p>

                    <h3 className="mt-2 text-lg font-extrabold">
                      {t("irrigationWord")}
                    </h3>
                  </div>

                  <div
                    className="
                      flex h-11 w-11
                      items-center justify-center
                      rounded-xl bg-orange-50
                      text-orange-500
                      transition-transform duration-500
                      group-hover:scale-110
                      dark:bg-orange-950/30
                    "
                  >
                    <Droplets size={22} />
                  </div>
                </div>

                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  {t("soybeanNeedWater")}
                </p>

                <div className="mt-4 text-xs font-bold text-orange-600">
                  View alert →
                </div>
              </button>
            </div>
          </section>

          {/* ===================================================== */}
          {/* CROPS + MANDI */}
          {/* ===================================================== */}

          <section className="mt-8 grid gap-5 xl:grid-cols-[1.35fr_.85fr]">

            {/* ================================================= */}
            {/* MY CROPS */}
            {/* ================================================= */}

            <div
              className="
                dashboard-card
                fade-up
                overflow-hidden
                rounded-3xl
                border border-green-100
                bg-white
                shadow-sm
                dark:border-green-900/30
                dark:bg-[#111a14]
              "
              style={{ animationDelay: "300ms" }}
            >

              {/* IMAGE HEADER */}

              <div className="image-wrapper relative h-32 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?auto=format&fit=crop&w=1200&q=80"
                  alt=""
                  className="
                    image-zoom h-full w-full object-cover
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-r from-green-950/85 to-transparent" />

                <div className="absolute bottom-5 left-5 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[2px] text-green-200">
                    {t("yourFieldsLabel")}
                  </p>

                  <h2 className="mt-1 text-xl font-bold">
                    {t("myCropsHeading")}
                  </h2>
                </div>
              </div>

              <div className="p-5 sm:p-6">

                <div className="space-y-5">
                  {crops.map((crop, index) => (
                    <div
                      key={crop.name}
                      className="fade-right"
                      style={{
                        animationDelay: `${500 + index * 100}ms`,
                      }}
                    >
                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">

                          <div
                            className="
                              flex h-11 w-11
                              items-center justify-center
                              rounded-xl
                              bg-green-50
                              text-2xl
                              transition-transform duration-300
                              hover:scale-110
                              dark:bg-green-950/40
                            "
                          >
                            {crop.icon}
                          </div>

                          <div>
                            <h3 className="text-sm font-bold">
                              {crop.name}
                            </h3>

                            <p className="text-xs text-gray-400">
                              {crop.hindi} • {t(crop.statusKey)}
                            </p>
                          </div>
                        </div>

                        <span className="text-sm font-extrabold text-green-700 dark:text-green-400">
                          {crop.progress}%
                        </span>
                      </div>

                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                        <div
                          className="
                            progress-grow
                            h-full rounded-full
                            bg-gradient-to-r
                            from-green-500 to-lime-400
                          "
                          style={{
                            width: `${crop.progress}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActiveMenu("crops")}
                  className="
                    mt-6 flex items-center gap-1
                    text-xs font-bold
                    text-green-700
                    transition-all
                    hover:gap-2
                    dark:text-green-400
                  "
                >
                  {t("viewAllArrow")}
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>

            {/* ================================================= */}
            {/* MANDI */}
            {/* ================================================= */}

            <div
              className="
                dashboard-card
                fade-up
                overflow-hidden
                rounded-3xl
                border border-green-100
                bg-white
                shadow-sm
                dark:border-green-900/30
                dark:bg-[#111a14]
              "
              style={{ animationDelay: "420ms" }}
            >

              <div className="image-wrapper relative h-32 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80"
                  alt=""
                  className="image-zoom h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-green-950/90 to-green-900/20" />

                <div className="absolute bottom-5 left-5 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[2px] text-green-200">
                    {t("nearbyMarketLabel")}
                  </p>

                  <h2 className="mt-1 text-xl font-bold">
                    {t("mandiSnapshot")}
                  </h2>
                </div>
              </div>

              <div className="p-5">

                <div className="space-y-3">
                  {mandiPrices.map((item, index) => (
                    <div
                      key={item.crop}
                      className="
                        group
                        rounded-xl
                        border border-gray-100
                        p-3.5
                        transition-all duration-300
                        hover:-translate-y-1
                        hover:border-green-200
                        hover:bg-green-50/50
                        dark:border-gray-800
                        dark:hover:border-green-900
                        dark:hover:bg-green-950/20
                      "
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">

                          <div
                            className="
                              flex h-9 w-9
                              items-center justify-center
                              rounded-lg
                              bg-green-50
                              text-green-600
                              dark:bg-green-950/40
                              dark:text-green-400
                            "
                          >
                            <Wheat size={17} />
                          </div>

                          <div>
                            <p className="text-sm font-bold">
                              {item.crop}
                            </p>

                            <p className="mt-1 text-[11px] text-gray-400">
                              {item.market}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-extrabold">
                            {item.price}
                          </p>

                          <p
                            className={`text-[11px] font-bold ${
                              item.positive
                                ? "text-green-600"
                                : "text-red-500"
                            }`}
                          >
                            {item.change}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => navigate("/market/mandi-prices")}
                  className="
                    mt-5 flex w-full
                    items-center justify-center gap-2
                    rounded-xl
                    border border-green-200
                    py-3
                    text-xs font-bold
                    text-green-700
                    transition-all duration-300
                    hover:bg-green-50
                    hover:shadow-md
                    dark:border-green-900
                    dark:text-green-400
                    dark:hover:bg-green-950/30
                  "
                >
                  {t("exploreAllMandi")}

                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </section>

          {/* ===================================================== */}
          {/* SCHEME + FARM TIP */}
          {/* ===================================================== */}

          <section className="mt-8 grid gap-5 md:grid-cols-2">

            {/* SCHEME */}

            <button
              onClick={() => navigate("/schemes/government")}
              className="
                dashboard-card
                image-wrapper
                group
                relative min-h-[230px]
                overflow-hidden rounded-3xl
                text-left text-white
              "
            >
              <img
                src="https://images.unsplash.com/photo-1524666041070-9c876415f7e0?auto=format&fit=crop&w=1200&q=80"
                alt=""
                className="
                  image-zoom absolute inset-0
                  h-full w-full object-cover
                "
              />

              <div className="absolute inset-0 bg-gradient-to-r from-green-950/95 via-green-900/75 to-transparent" />

              <div className="relative z-10 flex h-full flex-col justify-between p-6">

                <div>
                  <div
                    className="
                      flex h-11 w-11
                      items-center justify-center
                      rounded-xl
                      bg-white/10
                      backdrop-blur-md
                    "
                  >
                    <Landmark size={21} />
                  </div>

                  <p className="mt-5 text-[10px] font-bold uppercase tracking-[2px] text-green-200">
                    {t("recommendedForYou")}
                  </p>

                  <h2 className="mt-2 text-xl font-extrabold">
                    {t("govtSchemeHeading")}
                  </h2>

                  <p className="mt-2 max-w-md text-sm leading-6 text-green-50/80">
                    {t("govtSchemeDesc")}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-2 text-sm font-bold">
                  {t("exploreSchemesArrow")}

                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </div>
              </div>
            </button>

            {/* FARM TIP */}

            <div
              className="
                dashboard-card
                relative overflow-hidden
                rounded-3xl
                border border-yellow-100
                bg-gradient-to-br
                from-yellow-50 to-white
                p-6
                dark:border-yellow-900/30
                dark:from-yellow-950/30
                dark:to-[#111a14]
              "
            >
              <div
                className="
                  pulse-glow
                  absolute -right-12 -top-12
                  h-40 w-40 rounded-full
                  bg-yellow-300/20 blur-3xl
                "
              />

              <div className="relative z-10 flex gap-4">

                <div
                  className="
                    floating
                    flex h-12 w-12 shrink-0
                    items-center justify-center
                    rounded-2xl
                    bg-yellow-100
                    text-2xl
                    dark:bg-yellow-900/30
                  "
                >
                  💡
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[2px] text-yellow-700 dark:text-yellow-400">
                    {t("farmTipLabel")}
                  </p>

                  <h2 className="mt-2 text-lg font-bold">
                    {t("farmTipHeading")}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {t("farmTipDesc")}
                  </p>

                  <button
                    onClick={() => navigate("/weather")}
                    className="
                      mt-5 flex items-center gap-1
                      text-xs font-bold
                      text-green-700
                      transition-all
                      hover:gap-2
                      dark:text-green-400
                    "
                  >
                    {t("menuWeather")}
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          <div className="h-20 lg:hidden" />
        </main>
      </div>

      {/* ===================================================== */}
      {/* MOBILE NAV */}
      {/* ===================================================== */}

      <nav
        className="
          fixed bottom-0 left-0 right-0 z-50
          border-t border-green-100
          bg-white/95 px-2 py-2
          backdrop-blur-2xl
          dark:border-green-900/30
          dark:bg-[#0b120d]/95
          lg:hidden
        "
      >
        <div className="mx-auto flex max-w-lg justify-around">
          {menuItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`
                flex min-w-[52px]
                flex-col items-center gap-1
                rounded-xl px-2 py-1.5
                text-[10px] font-semibold
                transition-all duration-300

                ${
                  activeMenu === item.id
                    ? "scale-105 text-green-700 dark:text-green-400"
                    : "text-gray-400"
                }
              `}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default FarmerDashboard;