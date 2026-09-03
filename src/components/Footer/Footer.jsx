import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../Context/LanguageContext";



const Footer = () => {
      const { t } = useLanguage();
  
  return (
    <footer className="relative   overflow-hidden  border-b  bg-[#f6fbf4]border-t  dark:bg-[#09090bea]  py-20 ">

      <div className="pointer-events-none absolute -left-8 top-8 text-5xl opacity-10 rotate-[-25deg]">
        🍃
      </div>

      <div className="pointer-events-none absolute right-10 bottom-10 text-6xl opacity-10 rotate-45">
        🌿
      </div>

      <div className="mx-auto w-[90%] max-w-7xl py-12">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-bold text-green-700 dark:text-green-400">
                Kisan<span className="text-green-900 dark:text-green-200">Setu</span>
              </h2>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-600 dark:text-gray-400">
              {t("footerDescription")}
            </p>

            <div className="mt-5 flex gap-3">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition hover:-translate-y-1 hover:bg-green-600 hover:text-white dark:bg-[#0f120f] dark:text-gray-300">f</a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition hover:-translate-y-1 hover:bg-green-600 hover:text-white dark:bg-[#111311] dark:text-gray-300">in</a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition hover:-translate-y-1 hover:bg-green-600 hover:text-white dark:bg-[#0e100f] dark:text-gray-300">X</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
              {t("quickLinks")}
            </h3>

            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li><Link to="/" className="transition hover:ml-1 hover:text-green-600">{t("home")}</Link></li>
              <li><Link to="/marketplace" className="transition hover:ml-1 hover:text-green-600">{t("marketplace")}</Link></li>
              <li><Link to="/schemes" className="transition hover:ml-1 hover:text-green-600">{t("governmentSchemes")}</Link></li>
              <li><Link to="/crop-prices" className="transition hover:ml-1 hover:text-green-600">{t("cropPrices")}</Link></li>
            </ul>
          </div>

          {/* Farmer Services */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
              {t("farmerServices")}
            </h3>

            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li><Link to="/marketplace" className="transition hover:ml-1 hover:text-green-600">{t("sellYourCrop")}</Link></li>
              <li><Link to="/crop-prices" className="transition hover:ml-1 hover:text-green-600">{t("marketPrices")}</Link></li>
              <li><Link to="/schemes" className="transition hover:ml-1 hover:text-green-600">{t("govtSchemes")}</Link></li>
              <li><Link to="/weather" className="transition hover:ml-1 hover:text-green-600">{t("weatherUpdates")}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
              {t("getInTouch")}
            </h3>

            <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex gap-3">
                <span className="text-lg">📍</span>
                <span>{t("addressLine")}</span>
              </li>
              <li className="flex gap-3">
                <span className="text-lg">📧</span>
                <span>support@kisansetu.in</span>
              </li>
              <li className="flex gap-3">
                <span className="text-lg">📞</span>
                <span>{t("farmerSupport")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-8 h-px bg-green-200 dark:bg-green-900" />

        <div className="flex flex-col items-center justify-between gap-3 text-center text-sm text-gray-500 md:flex-row dark:text-gray-500">
          <p>© {new Date().getFullYear()} KisanSetu. {t("allRightsReserved")}</p>

          <div className="flex gap-5">
            <a href="#" className="transition hover:text-green-600">{t("privacyPolicy")}</a>
            <a href="#" className="transition hover:text-green-600">{t("termsConditions")}</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;