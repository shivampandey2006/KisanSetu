// import React from "react";
// import { ArrowRight, Sprout } from "lucide-react";

// import { useLanguage } from "../../Context/LanguageContext";

// const HowItHelps = () => {
//   const { t } = useLanguage();

//   return (
//     <section className="relative flex min-h-screen items-center overflow-hidden">

//       {/* Background Image */}
//     <img src="https://i.ibb.co/pjWT8P07/Gemini-Generated-Image-1y8mkp1y8mkp1y8m.png" alt="." border="0"
       
//         className="absolute inset-0 h-full w-full object-cover"
//       />

//       {/* Dark + Green Overlay */}
//       <div className="absolute inset-0 bg-black/50" />

//       <div className="absolute inset-0 bg-gradient-to-r from-green-950/80 via-green-900/45 to-transparent" />


//       {/* Content */}
//       <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-16">

//         <div className="max-w-3xl">

//           {/* Small Label */}
//           <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">

//             <Sprout size={17} />

//             {t("smartAgriculture")}

//           </div>


//           {/* Heading */}
//           <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">

//             {t("howKisanSetuHelps")}

//           </h2>


//           {/* Description */}
//           <p className="mt-7 max-w-2xl text-base leading-8 text-gray-200 sm:text-lg">

//             {t("howKisanSetuHelpsDescription")}

//           </p>


//           {/* Benefits */}
//           <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-white sm:text-base">

//             <span>✓ {t("sellProduce")}</span>

//             <span>✓ {t("buySeeds")}</span>

//             <span>✓ {t("priceTrends")}</span>

//           </div>


//           {/* CTA */}
//           <button className="group mt-10 inline-flex items-center gap-3 rounded-xl bg-green-600 px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-green-500 hover:shadow-xl">

//             {t("exploreMore")}

//             <ArrowRight
//               size={19}
//               className="transition-transform duration-300 group-hover:translate-x-1"
//             />

//           </button>

//         </div>

//       </div>


//       {/* Bottom Gradient */}
//       <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-black/40 to-transparent" />

//     </section>
//   );
// };

// export default HowItHelps;




import React from "react";
import { ArrowRight, Sprout } from "lucide-react";

import { useLanguage } from "../../Context/LanguageContext";

const HowItHelps = () => {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden border-t border-green-200 border-b md:w-[80%0] mx-auto w-[95%]  ">

      {/* Background Image */}
      <img
        src="https://i.ibb.co/pjWT8P07/Gemini-Generated-Image-1y8mkp1y8mkp1y8m.png"
        alt="Farmer working in agricultural field"
        className="absolute inset-0 h-50% w-full object-cover border-green-200"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Green Gradient */}
      <div className="absolute inset-0 bg-linear-to-r from-green-950/90 via-green-900/55 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 lg:px-16">

        <div className="max-w-3xl">

          {/* Small Label */}
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md">
            <Sprout size={18} />

            <span>{t("smartAgriculture")}</span>
          </div>


          {/* Heading */}
          <h2 className="max-w-2xl text-5xl font-bold leading-[1.12] tracking-tight text-white sm:text-6xl md:text-7xl">
            {t("howKisanSetuHelps")}
          </h2>


          {/* Description */}
          <p className="mt-8 max-w-xl text-base leading-8 text-gray-200 sm:text-lg">
            {t("howKisanSetuHelpsDescription")}
          </p>


          {/* Benefits */}
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-5 text-sm font-medium text-white sm:text-base">

            <span className="transition-transform duration-300 hover:translate-x-1">
              ✓ {t("sellProduce")}
            </span>

            <span className="transition-transform duration-300 hover:translate-x-1">
              ✓ {t("buySeeds")}
            </span>

            <span className="transition-transform duration-300 hover:translate-x-1">
              ✓ {t("priceTrends")}
            </span>

          </div>


          {/* CTA */}
          <button className="group mt-12 inline-flex items-center gap-4 rounded-xl bg-green-600 px-7 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-green-500 hover:shadow-xl">

            <span>{t("exploreMore")}</span>

            <ArrowRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />

          </button>

        </div>

      </div>


      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 h-40 w-full bg-linear-to-t from-black/50 to-transparent" />

    </section>
  );
};

export default HowItHelps;