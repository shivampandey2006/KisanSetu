import React from "react";
import FloatingLeaves from "../../components/Animations/FloatingLeaves";
import { useLanguage } from "../../Context/LanguageContext";

const Home = () => {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-white">

      <section className="relative min-h-screen overflow-hidden">

        <FloatingLeaves />

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
          <div className="max-w-4xl text-center">

            <p className="mb-4 text-lg font-semibold text-green-600">
              {t("smartAgriculture")}
            </p>

            <h1 className="text-5xl font-bold md:text-7xl">
              {t("heroTitle")}
              <br />
              <span className="text-green-600">
                {t("farmers")}
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              {t("heroDescription")}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">

              <button className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700">
                {t("marketplace")}
              </button>

              <button className="rounded-xl border border-green-600 px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950">
                {t("liveMandiPrices")}
              </button>

            </div>

          </div>
        </div>

      </section>

    </main>
  );
};

export default Home;