import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Sun, Moon, Menu, X } from "lucide-react";
import { useLanguage } from "../../Context/LanguageContext";
import { useCart } from "../../Context/CartContext";
import { languages } from "../../Data/Translations";

const BuyerHeader = () => {
  const { t, language, changeLanguage } = useLanguage();
  const { cartCount } = useCart();
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(document.documentElement.classList.contains("dark"));
  };

  return (
    <header className="sticky top-0 p-3 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex h-16 w-[94%] max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link to="/buyer-dashboard" className="flex items-center gap-2.5">
          <img
            src="https://i.pinimg.com/474x/86/ac/cb/86accbea31b719dea35425f4e260b2c3.jpg"
            alt="KisanSetu"
            className="h-12 w-12 rounded-full object-cover ring-2 ring-green-500/40"
          />
          <span className="text-xl font-bold text-slate-900 dark:text-white">
            Kisan<span className="text-green-600">Setu</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          <Link
            to="/marketplace"
            className="text-sm font-medium text-slate-600 transition hover:text-green-600 dark:text-slate-300 dark:hover:text-green-400"
          >
            {t("navMarketplace")}
          </Link>
          <Link
            to="/weather"
            className="text-sm font-medium text-slate-600 transition hover:text-green-600 dark:text-slate-300 dark:hover:text-green-400"
          >
            {t("navWeather")}
          </Link>
          <Link
            to="/buyer-orders"
            className="text-sm font-medium text-slate-600 transition hover:text-green-600 dark:text-slate-300 dark:hover:text-green-400"
          >
            {t("navMyOrders")}
          </Link>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language */}
          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="hidden cursor-pointer rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none transition hover:border-green-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 sm:block"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName}
              </option>
            ))}
          </select>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:scale-105 hover:bg-green-50 hover:text-green-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-green-950/40 dark:hover:text-green-400"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Cart */}
          <Link
            to="/buyer-cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:scale-105 hover:bg-green-50 hover:text-green-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-green-950/40 dark:hover:text-green-400"
          >
            <ShoppingCart size={19} />
            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Profile */}
          <Link
            to="/buyer-profile"
            className="hidden h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:scale-105 hover:bg-green-50 hover:text-green-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-green-950/40 dark:hover:text-green-400 sm:flex"
          >
            <User size={19} />
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 md:hidden"
          >
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-[3%] py-4 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <nav className="flex flex-col gap-3">
            <Link to="/marketplace" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-slate-600 dark:text-slate-300">
              {t("navMarketplace")}
            </Link>
            <Link to="/weather" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-slate-600 dark:text-slate-300">
              {t("navWeather")}
            </Link>
            <Link to="/buyer-orders" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-slate-600 dark:text-slate-300">
              {t("navMyOrders")}
            </Link>
            <Link to="/buyer-profile" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-slate-600 dark:text-slate-300">
              {t("navMyOrders") === t("navMyOrders") ? "Profile" : ""}
            </Link>

            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="mt-2 w-fit rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName}
                </option>
              ))}
            </select>
          </nav>
        </div>
      )}
    </header>
  );
};

export default BuyerHeader;