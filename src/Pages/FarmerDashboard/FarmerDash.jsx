import React, { useEffect, useState } from "react";
import { useLanguage } from "../../Context/LanguageContext";
import { Sun, Moon } from "lucide-react";

const FarmerDashboard = () => {
  const { language, changeLanguage, t } = useLanguage();

  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  const [activeMenu, setActiveMenu] = useState("dashboard");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
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

  const menuItems = [
    { id: "dashboard", icon: "⌂", label: t("menuDashboard") },
    { id: "crops", icon: "🌱", label: t("menuMyCrops") },
    { id: "mandi", icon: "₹", label: t("menuMandiPrices") },
    { id: "weather", icon: "☁️", label: t("menuWeather") },
    { id: "schemes", icon: "🏛️", label: t("menuSchemes") },
    { id: "ai", icon: "✦", label: t("menuKisanAI") },
  ];

  const crops = [
    { name: t("wheat"), hindi: "गेहूं", progress: 72, statusKey: "cropGrowingWell", icon: "🌾" },
    { name: t("soybean"), hindi: "सोयाबीन", progress: 54, statusKey: "cropNeedsAttention", icon: "🌱" },
    { name: t("rice"), hindi: "धान", progress: 38, statusKey: "cropEarlyGrowth", icon: "🌿" },
  ];

  const mandiPrices = [
    { crop: t("wheat"), market: "Sehore Mandi", price: "₹2,450", change: "+3.2%" },
    { crop: t("soybean"), market: "Bhopal Mandi", price: "₹4,820", change: "+1.8%" },
    { crop: t("rice"), market: "Vidisha Mandi", price: "₹2,940", change: "-0.6%" },
  ];

  const quickActions = [
    { icon: "🌦️", title: t("qaWeatherTitle"), text: t("qaWeatherText") },
    { icon: "📈", title: t("qaMandiTitle"), text: t("qaMandiText") },
    { icon: "🌱", title: t("qaAdvisoryTitle"), text: t("qaAdvisoryText") },
    { icon: "🤖", title: t("qaAskAITitle"), text: t("qaAskAIText") },
  ];

  return (
    <div
      className="
        min-h-screen w-full
        bg-[#f4f8f1]
        text-gray-900
        transition-colors
        duration-500
        dark:bg-[#080d0a]
        dark:text-white
      "
    >
      {/* ANIMATION STYLE */}
      <style>{`
        @keyframes floatLeaf {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(7deg); }
        }
        @keyframes softPulse {
          0%, 100% { transform: scale(1); opacity: .75; }
          50% { transform: scale(1.08); opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes growBar {
          from { width: 0; }
        }
        @keyframes glowDrift {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: .5; }
          50% { transform: translate(20px, -15px) scale(1.15); opacity: .8; }
        }

        .dashboard-enter { animation: slideUp .65s ease-out both; }
        .dashboard-delay-1 { animation-delay: .08s; }
        .dashboard-delay-2 { animation-delay: .16s; }
        .dashboard-delay-3 { animation-delay: .24s; }

        .floating-leaf { animation: floatLeaf 5s ease-in-out infinite; }
        .soft-pulse { animation: softPulse 3s ease-in-out infinite; }
        .crop-bar { animation: growBar 1.2s ease-out; }
        .glow-drift { animation: glowDrift 9s ease-in-out infinite; }

        .glass-card { background: rgba(255,255,255,.82); backdrop-filter: blur(14px); }
        .dark .glass-card { background: rgba(18,27,21,.82); }

        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { scrollbar-width: none; }
      `}</style>

      {/* TOP NAVBAR */}
      <header
        className="
          sticky top-0 z-50
          border-b border-green-100/70
          bg-white/85
          backdrop-blur-xl
          dark:border-green-900/30
          dark:bg-[#0b120d]/90
          p-3
        "
      >
        <div className="mx-auto flex h-18 max-w-375 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="flex h-15 w-15 items-center justify-center rounded-xl text-xl shadow-lg shadow-green-700/20">
              <img
                src="https://i.pinimg.com/474x/86/ac/cb/86accbea31b719dea35425f4e260b2c3.jpg"
                alt="KisanSetu Logo"
                className="h-full w-full object-cover rounded-full"
              />
            </div>

            <div>
              <h1 className="text-[1.45rem] font-extrabold tracking-tight">
                Kisan<span className="text-green-600">Setu</span>
              </h1>

              <p className="hidden text-[14px] font-medium uppercase tracking-[2px] text-gray-400 sm:block">
                {t("dashTagline")}
              </p>
            </div>
          </div>

          {/* RIGHT CONTROLS */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden text-right lg:block">
              <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                {formattedDate}
              </p>
              <p className="text-[10px] text-gray-400">{t("dashCompanion")}</p>
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
                transition
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
                rounded-full
                border border-green-200
                bg-white text-gray-600
                transition-all duration-300
                hover:scale-105
                hover:bg-green-50
                hover:text-green-600
                dark:border-green-900
                dark:bg-[#111a14]
                dark:text-gray-300
                dark:hover:bg-green-950
                dark:hover:text-green-400
              "
              title="Toggle theme"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full bg-green-100
                font-bold text-green-800
                ring-2 ring-green-200
                dark:bg-green-900/40
                dark:text-green-300
                dark:ring-green-800
              "
            >
              K
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-375  ">
        {/* SIDEBAR */}
        <aside
          className="
            sticky top-18 hidden h-[calc(100vh-72px)]
            w-57 shrink-0
            border-r border-green-100
            bg-white/70 px-4 py-6
            dark:border-green-900/30
            dark:bg-[#0a100c]
            lg:block
          "
        >
          <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[2px] text-gray-400">
            {t("yourSpace")}
          </p>

          <nav className="space-y-1.5">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`
                  group flex w-full items-center gap-3
                  rounded-xl px-3 py-3
                  text-sm font-semibold
                  transition-all duration-300
                  ${
                    activeMenu === item.id
                      ? "bg-green-700 text-white shadow-lg shadow-green-700/20"
                      : "text-gray-600 hover:bg-green-50 hover:text-green-700 dark:text-gray-400 dark:hover:bg-green-950/40 dark:hover:text-green-300"
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-10 overflow-hidden rounded-2xl bg-green-50 p-4 dark:bg-green-950/30">
            <div className="floating-leaf mb-3 text-3xl">🌿</div>

            <h3 className="text-sm font-bold text-green-900 dark:text-green-300">
              {t("needFarmingHelp")}
            </h3>

            <p className="mt-1 text-xs leading-5 text-green-700/70 dark:text-green-400/70">
              {t("askKisanAnytime")}
            </p>

            <button className="mt-3 text-xs font-bold text-green-700 dark:text-green-400">
              {t("askNowArrow")}
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <main className="relative min-w-0 flex-1 min-h-screen w-full overflow-hidden">
          <img
            src="https://www.pixelstalk.net/wp-content/uploads/images1/Pictures-Farm-Download-free.jpg"
            className="h-full w-full absolute object-cover grayscale-75 mask-[linear-gradient(to_bottom,black_55%,transparent_100%)]"
            alt=""
          />

          {/* HERO / WELCOME */}
          <section
            className="
              dashboard-enter
              relative overflow-hidden
              rounded-[28px]
              bg-[#123524]
              border-2
              border-green-200
              mt-10 mx-10
              p-6 text-white
              shadow-2xl shadow-green-900/10
              sm:p-8 lg:p-10
            "
          >
            <div className="glow-drift absolute -right-20 -top-24 h-72 w-72 rounded-full bg-green-400/10 blur-2xl" />
            <div className="glow-drift absolute -bottom-28 right-28 h-56 w-56 rounded-full bg-lime-300/10 blur-3xl" />
            <img
              src="https://i.ibb.co/LDDRWgkp/Firefly-Remove-Background.png"
              className="absolute h-100 w-160 overflow-hidden right-0"
            />

            <div className="relative z-10 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="soft-pulse h-2.5 w-2.5 rounded-full bg-lime-300" />
                <span className="text-xs font-semibold uppercase tracking-[2px] text-green-200">
                  {t("dashboardBadge")}
                </span>
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight sm:text-3xl lg:text-5xl pt-4 pb-2">
                {t("namasteKisan")}
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-green-100 sm:text-base">
                {t("heroDashDescription")}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-green-800 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">
                  🌱 {t("viewMyCropsBtn")}
                </button>

                <button className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15">
                  ✦ {t("askKisanAIBtn")}
                </button>
              </div>
            </div>

            <div className="floating-leaf absolute bottom-4 right-8 hidden text-[100px] opacity-20 lg:block">
              🌾
            </div>
          </section>

          {/* IMPORTANT TODAY */}
          <section className="dashboard-enter dashboard-delay-1 mt-7">
            <div className="mb-4 flex items-end justify-between px-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[2px] text-green">
                  {t("todayLabel")}
                </p>
                <h2 className="mt-1 text-2xl font-bold text-green-800">
                  {t("whatMattersToday")}
                </h2>
              </div>

              <span className="hidden text-xs text-gray-400 sm:block">
                {t("updatedJustNow")}
              </span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 px-10">
              {/* WEATHER */}
              <div
                style={{ animationDelay: "0.05s" }}
                className="dashboard-enter glass-card group rounded-2xl border border-blue-100 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-blue-900/30"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-400">{t("weatherLabel")}</p>
                    <h3 className="mt-2 text-3xl font-extrabold">28°</h3>
                  </div>
                  <span className="text-4xl transition group-hover:scale-110">☀️</span>
                </div>

                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {t("bhopalClearSky")}
                </p>

                <div className="mt-4 flex justify-between text-xs">
                  <span>{t("humidityWord")} 61%</span>
                  <span>{t("rainWord")} 10%</span>
                </div>
              </div>

              {/* MANDI */}
              <div
                style={{ animationDelay: "0.1s" }}
                className="dashboard-enter glass-card group rounded-2xl border border-green-100 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-green-900/30"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-400">{t("wheatPriceLabel")}</p>
                    <h3 className="mt-2 text-2xl font-extrabold">₹2,450</h3>
                  </div>
                  <span className="rounded-lg bg-green-100 px-2 py-1 text-xs font-bold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                    ↑ 3.2%
                  </span>
                </div>

                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  {t("sehoreQuintal")}
                </p>
              </div>

              {/* CROP */}
              <div
                style={{ animationDelay: "0.15s" }}
                className="dashboard-enter glass-card group rounded-2xl border border-yellow-100 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-yellow-900/30"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-400">{t("cropHealthLabel")}</p>
                    <h3 className="mt-2 text-2xl font-extrabold">{t("cropHealthGood")}</h3>
                  </div>
                  <span className="text-3xl">🌱</span>
                </div>

                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  {t("cropsAttentionCount")}
                </p>
              </div>

              {/* ALERT */}
              <div
                style={{ animationDelay: "0.2s" }}
                className="dashboard-enter glass-card group rounded-2xl border border-orange-100 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-orange-900/30"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-400">{t("farmAlertLabel")}</p>
                    <h3 className="mt-2 text-lg font-extrabold">{t("irrigationWord")}</h3>
                  </div>
                  <span className="text-3xl">💧</span>
                </div>

                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  {t("soybeanNeedWater")}
                </p>
              </div>
            </div>
          </section>

          {/* TWO COLUMN AREA */}
          <section className="dashboard-enter dashboard-delay-2 mt-7 grid gap-6 xl:grid-cols-[1.4fr_.8fr]">
            {/* MY CROPS */}
            <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm dark:border-green-900/30 dark:bg-[#111a14] sm:p-6 mx-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[1.5px] text-green-600">
                    {t("yourFieldsLabel")}
                  </p>
                  <h2 className="mt-1 text-xl font-bold">{t("myCropsHeading")}</h2>
                </div>

                <button className="text-xs font-bold text-green-700 dark:text-green-400">
                  {t("viewAllArrow")}
                </button>
              </div>

              <div className="mt-6 space-y-5">
                {crops.map((crop) => (
                  <div key={crop.name}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-2xl dark:bg-green-950/40">
                          {crop.icon}
                        </div>

                        <div>
                          <h3 className="text-sm font-bold">{crop.name}</h3>
                          <p className="text-xs text-gray-400">
                            {crop.hindi} • {t(crop.statusKey)}
                          </p>
                        </div>
                      </div>

                      <span className="text-sm font-bold text-green-700 dark:text-green-400">
                        {crop.progress}%
                      </span>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                      <div
                        className="crop-bar h-full rounded-full bg-green-600"
                        style={{ width: `${crop.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MARKET */}
            <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm dark:border-green-900/30 dark:bg-[#111a14] sm:p-6 pr-10 mx-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[1.5px] text-green-600">
                    {t("nearbyMarketLabel")}
                  </p>
                  <h2 className="mt-1 text-xl font-bold">{t("mandiSnapshot")}</h2>
                </div>

                <span className="text-xl">📊</span>
              </div>

              <div className="mt-5 space-y-3">
                {mandiPrices.map((item) => (
                  <div
                    key={item.crop}
                    className="rounded-xl border border-gray-100 p-3 transition hover:border-green-200 hover:bg-green-50/50 dark:border-gray-800 dark:hover:border-green-900 dark:hover:bg-green-950/20"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold">{item.crop}</p>
                        <p className="mt-1 text-[11px] text-gray-400">{item.market}</p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-extrabold">{item.price}</p>
                        <p className="text-[11px] font-bold text-green-600">{item.change}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-4 w-full rounded-xl border border-green-200 py-2.5 text-xs font-bold text-green-700 transition hover:bg-green-50 dark:border-green-900 dark:text-green-400 dark:hover:bg-green-950/30">
                {t("exploreAllMandi")}
              </button>
            </div>
          </section>

          {/* QUICK ACTIONS */}
          <section className="dashboard-enter dashboard-delay-3 mt-7 px-10">
            {/* <span className="mb-4 ">
            
              <span className=" text-2xl  font-bold  bg-amber-50  mt-5 mb-10 py-3 px-6 rounded-2xl ">{t("whatDoYouNeedToday")}</span>
            </span> */}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action, i) => (
                <button
                  key={action.title}
                  style={{ animationDelay: `${i * 0.08}s` }}
                  className="dashboard-enter group rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl dark:border-gray-800 dark:bg-[#111a14] dark:hover:border-green-900"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl transition-transform duration-300 group-hover:scale-110 dark:bg-green-950/40">
                    {action.icon}
                  </div>

                  <h3 className="mt-4 text-sm font-bold">{action.title}</h3>

                  <p className="mt-1 text-xs leading-5 text-gray-400">{action.text}</p>

                  <span className="mt-4 block text-xs font-bold text-green-700 dark:text-green-400">
                    {t("openArrow")}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* SCHEME + ALERT */}
          <section className="mt-7 grid gap-6 md:grid-cols-2 px-10 mb-10">
            {/* SCHEME */}
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-green-800 to-green-950 p-6 text-white">
              <div className="absolute -right-10 -top-10 text-[120px] opacity-10">🏛️</div>

              <p className="text-xs font-bold uppercase tracking-[1.5px] text-green-200">
                {t("recommendedForYou")}
              </p>

              <h2 className="mt-3 text-xl font-extrabold">{t("govtSchemeHeading")}</h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-green-100">
                {t("govtSchemeDesc")}
              </p>

              <button className="mt-5 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-green-800 transition hover:scale-[1.02]">
                {t("exploreSchemesArrow")}
              </button>
            </div>

            {/* FARM TIP */}
            <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-6 dark:border-yellow-900/30 dark:bg-yellow-950/20">
              <div className="flex gap-4">
                <div className="text-3xl">💡</div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[1.5px] text-yellow-700 dark:text-yellow-400">
                    {t("farmTipLabel")}
                  </p>

                  <h2 className="mt-2 text-lg font-bold">{t("farmTipHeading")}</h2>

                  <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {t("farmTipDesc")}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="h-20 lg:hidden" />
        </main>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <nav
        className="
          fixed bottom-0 left-0 right-0 z-50
          border-t border-green-100
          bg-white/95 px-2 py-2
          backdrop-blur-xl
          dark:border-green-900/30
          dark:bg-[#0b120d]/95
          lg:hidden
        "
      >
        <div className="mx-auto flex max-w-lg justify-around">
          {menuItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`
                flex min-w-13
                flex-col items-center gap-1
                rounded-xl px-2 py-1.5
                text-[10px] font-semibold
                transition
                ${activeMenu === item.id ? "text-green-700 dark:text-green-400" : "text-gray-400"}
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