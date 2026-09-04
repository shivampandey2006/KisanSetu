import React, { useMemo, useRef, useState } from "react";
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
} from "lucide-react";
import { useLanguage } from "../../Context/LanguageContext";
import { useCart } from "../../Context/CartContext";
import { products, categoryList } from "../../Data/Product";
import BuyerHeader from "../../components/Buyer/BuyerHeaders";

const iconMap = { Leaf, Apple, Wheat, Sprout };

const marketPrices = [
  { nameKey: "prodWheatName", price: "₹2,450", unit: "/ quintal", change: "+4.2%" },
  { nameKey: "prodRiceName", price: "₹4,200", unit: "/ quintal", change: "+2.8%" },
  { nameKey: "prodTomatoName", price: "₹28", unit: "/ kg", change: "+6.1%" },
  { nameKey: "prodPotatoName", price: "₹24", unit: "/ kg", change: "-1.4%" },
];

const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(700px) rotateX(${-y * 8}deg) rotateY(${x * 10}deg) translateY(-4px)`,
    });
  };

  const handleLeave = () => setStyle({ transform: "perspective(700px) rotateX(0) rotateY(0)" });

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: "transform 0.25s ease-out", ...style }}
      className={className}
    >
      {children}
    </div>
  );
};

function BuyerDashboard() {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [justAdded, setJustAdded] = useState(null);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const name = t(product.nameKey).toLowerCase();
      const category = t(product.categoryKey).toLowerCase();
      const query = search.toLowerCase();

      const matchesSearch = name.includes(query) || category.includes(query);
      const matchesCategory =
        selectedCategory === "All" || product.categoryKey === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory, t]);

  const handleAdd = (product) => {
    addToCart({
      id: product.id,
      name: t(product.nameKey),
      price: product.price,
      unit: product.unit,
      emoji: product.emoji,
    });
    setJustAdded(product.id);
    setTimeout(() => setJustAdded(null), 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-slate-950">
      <BuyerHeader />
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .float-slow { animation: floatSlow 6s ease-in-out infinite; }
        .fade-in { animation: fadeSlideUp 0.5s ease-out both; }
      `}</style>

      <main className="mx-auto w-[94%] max-w-7xl px-2 py-8 md:px-4">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-green-700 px-6 py-10 text-white shadow-lg md:px-10 md:py-14">
          <img src="https://i.ibb.co/vxKhrQ6M/Gemini-Generated-Image-x2yeefx2yeefx2ye-1.png" className="absolute right-20 h-20 w-30 md:h-100 md:w-160 md:bottom-0 bottom-20 " ></img>
          <div className="relative z-10 max-w-2xl">
            
            <p className="mb-3 text-sm font-medium text-green-100">
              {t("marketplaceLabel")}
            </p>

            <h1 className="text-3xl font-bold leading-tight md:text-5xl">
              {t("heroTitle1")}
              <br />
              {t("heroTitle2")}
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-green-50 md:text-base">
              {t("heroBuyerDesc")}
            </p>

            <div className="mt-7 flex w-full max-w-xl items-center rounded-2xl bg-white p-2 shadow-xl">
              <Search size={21} className="ml-3 shrink-0 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("searchPlaceholderBuyer")}
                className="w-full bg-transparent px-3 py-3 text-sm text-slate-800 outline-none"
              />
              <button className="hidden rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white sm:block">
                {t("searchButton")}
              </button>
            </div>
          </div>

          <div className="float-slow absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 right-20 h-72 w-72 rounded-full bg-white/5" />
        </section>

        {/* Categories */}
        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white md:text-2xl">
                {t("browseCategoriesTitle")}
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {t("findWhatYouNeed")}
              </p>
            </div>

            <button
              onClick={() => setSelectedCategory("All")}
              className="text-sm font-semibold text-green-600 hover:text-green-700"
            >
              {t("viewAllBtn")}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {categoryList.map((category) => {
              const Icon = iconMap[category.icon];
              const active = selectedCategory === category.key;

              return (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`group rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-1 ${
                    active
                      ? "border-green-500 bg-green-50 shadow-lg shadow-green-500/10 dark:bg-green-950/40"
                      : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
                  }`}
                >
                  <div
                    className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${
                      active
                        ? "bg-green-600 text-white"
                        : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                    }`}
                  >
                    <Icon size={22} />
                  </div>

                  <h3 className="font-semibold text-slate-800 dark:text-white">
                    {t(category.key)}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {t("exploreProducts")}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Products */}
        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white md:text-2xl">
                {t("freshFromFarmersTitle")}
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {t("qualityFairPrices")}
              </p>
            </div>

            <button className="flex items-center gap-1 text-sm font-semibold text-green-600">
              {t("viewAllBtn")}
              <ArrowRight size={16} />
            </button>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-14 text-center dark:border-slate-700 dark:bg-slate-900">
              <Package size={40} className="mx-auto text-slate-400" />
              <h3 className="mt-4 font-semibold text-slate-700 dark:text-slate-200">
                {t("noProductsFound")}
              </h3>
              <p className="mt-1 text-sm text-slate-500">{t("tryAnotherCrop")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <TiltCard
                  key={product.id}
                  className="fade-in overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex h-40 items-center justify-center bg-green-50 text-7xl dark:bg-green-950/30">
                    {product.emoji}
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-slate-800 dark:text-white">
                          {t(product.nameKey)}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {product.farmer}
                        </p>
                      </div>

                      <span className="rounded-lg bg-green-100 px-2 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-400">
                        {t(product.categoryKey)}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <MapPin size={14} />
                      {product.location}
                    </div>

                    <div className="mt-5 flex items-end justify-between">
                      <div>
                        <p className="text-xs text-slate-500">{t("startingFrom")}</p>
                        <p className="text-xl font-bold text-green-700 dark:text-green-400">
                          ₹{product.price}
                          <span className="ml-1 text-xs font-normal text-slate-500">
                            / {product.unit}
                          </span>
                        </p>
                      </div>

                      <button
                        onClick={() => handleAdd(product)}
                        className={`flex h-10 w-10 items-center justify-center rounded-xl text-white transition ${
                          justAdded === product.id ? "bg-green-500" : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {justAdded === product.id ? <Check size={18} /> : <ShoppingCart size={18} />}
                      </button>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          )}
        </section>

        {/* Market Prices */}
        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white md:text-2xl">
              {t("todaysMarketPricesTitle")}
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {t("keepTrackPrices")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {marketPrices.map((item) => (
              <div
                key={item.nameKey}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-white">
                      {t(item.nameKey)}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                      {item.price}
                    </p>
                    <p className="text-xs text-slate-500">{item.unit}</p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/40">
                    <TrendingUp size={20} />
                  </div>
                </div>

                <p className="mt-4 text-xs font-semibold text-green-600">
                  {item.change} {t("todayWord")}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default BuyerDashboard;