import React from "react";
import FloatingLeaves from "../../components/Animations/FloatingLeaves";
import { useLanguage } from "../../Context/LanguageContext";
import MiddleSection from "../../components/MiddleSection/MiddleSection";
import HowItHelps from "../../components/HowItHelps/HowItHelps";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  const { t } = useLanguage();

  return (
    <main className="bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-white">


      {/* ================= HERO ================= */}
      <section className="relative h-[calc(100vh-116px)] overflow-hidden">
     <img src="https://static.vecteezy.com/system/resources/thumbnails/024/222/553/small/beautiful-and-photorealistic-palm-leaf-on-transparent-background-close-up-view-part-of-plant-cut-out-graphic-design-element-as-generative-ai-png.png" className=" absolute left-[65%] md:h-50 h-20 top-18"></img>
        {/* 🌄 Background Watermark */}
       <svg
  className="pointer-events-none absolute bottom-0 left-0 h-[55%] w-full opacity-[0.12] dark:opacity-[0.08]"
  viewBox="0 0 1200 500"
  preserveAspectRatio="none"
  xmlns="http://www.w3.org/2000/svg"
>

          {/* ☀️ Sun */}
          <circle
            cx="160"
            cy="190"
            r="110"
            fill="currentColor"
            className="text-yellow-500"
          />

          {/* ⛰️ Back Mountains */}
          <path
            d="
              M0 430
              L170 270
              L300 380
              L470 190
              L650 390
              L820 240
              L1000 380
              L1130 290
              L1200 360
              V500
              H0 Z
            "
            fill="currentColor"
            className="text-green-700"
          />

          {/* ⛰️ Front Mountains */}
          <path
            d="
              M0 450
              L220 320
              L390 420
              L570 270
              L760 420
              L930 310
              L1200 440
              V500
              H0 Z
            "
            fill="currentColor"
            className="text-green-900"
          />

          {/* 🌾 Fields */}
          <path
            d="
              M0 440
              Q300 390 600 450
              T1200 430
              V500
              H0 Z
            "
            fill="currentColor"
            className="text-green-600"
          />

        </svg>


        {/* 🍃 Floating Leaves */}
        <FloatingLeaves />

        {/* 🐂 Farmer with cow illustration */}
        {/* 🐂 Farmer with cow illustration — luxury glow treatment */}
<div className="pointer-events-none absolute bottom-0 right-0 z-0 w-90 lg:w-170 md:w-120 ">

  {/* Golden ambient glow behind the figure */}
  <div
    className="
      absolute inset-0
      translate-x-6 translate-y-6
      rounded-full
      bg-[radial-gradient(circle_at_60%_60%,rgba(234,179,8,0.35),rgba(234,179,8,0.08)_55%,transparent_75%)]
      blur-2xl
    "
  />

  {/* Secondary soft green glow for brand tie-in */}
  <div
    className="
      absolute inset-0
      -translate-x-8 translate-y-2
      rounded-full
      bg-[radial-gradient(circle_at_30%_70%,rgba(22,163,74,0.25),transparent_65%)]
      blur-3xl
    "
  />

  {/* The image itself */}
  <img
    src="https://i.ibb.co/BKcW4F7w/Gemini-Generated-Image-xt22hjxt22hjxt22-removebg-preview.png"
    alt=""
    className="
      relative w-full
      opacity-95
      mix-blend-screen dark:mix-blend-normal
      filter-[drop-shadow(0_18px_28px_rgba(0,0,0,0.25))_saturate(1.15)_contrast(1.08)_brightness(1.04)]
    "
  />

  {/* Bottom fade so it blends into the section below */}
  <div
    className="
      absolute inset-x-0 bottom-0 h-24
      bg-linear-to-t from-white via-white/0 to-transparent
      dark:from-gray-950 dark:via-gray-950/0
    "
  />
</div>

        {/* ================= HERO CONTENT ================= */}
        <div className="relative z-10 flex h-full items-center justify-center px-6">

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


      {/* ================= NEXT SECTION ================= */}
      {/*
       
      middle section 
      */}
    
    <MiddleSection />
    <HowItHelps />
   
    </main>
  );
};

export default Home;