import React from "react";
import FloatingLeaves from "../../components/Animations/FloatingLeaves";
import { useLanguage } from "../../Context/LanguageContext";
import MiddleSection from "../../components/MiddleSection/MiddleSection";
import HowItHelps from "../../components/HowItHelps/HowItHelps";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CloudSun,
  Sprout,
  TrendingUp,
  Users,
  Leaf,
  BarChart3,
  ChevronDown,
} from "lucide-react";

const Home = () => {
  const { t } = useLanguage();

  return (
    <main className="bg-white text-gray-900 transition-colors duration-500 dark:bg-gray-950 dark:text-white">

      {/* =====================================================
          HERO
          Header + Hero = 100vh
      ===================================================== */}

      <section
        className="
          relative
          h-[calc(100vh-116px)]
          min-h-[600px]
          w-full
          overflow-hidden
          bg-gray-100
          transition-colors
          duration-500
          dark:bg-[#020b08]
        "
      >

        {/* ===================================================
            BACKGROUND
        =================================================== */}

        <div className="absolute inset-0">

          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2400&q=90"
            alt="Agricultural farm"
            className="
              h-full
              w-full
              object-cover
              object-center
              scale-[1.03]
              transition-all
              duration-1000
              dark:saturate-[0.85]
            "
          />

          {/* ================= LIGHT MODE OVERLAY ================= */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-white/90
              via-white/55
              to-white/10
              opacity-100
              transition-opacity
              duration-700
              dark:opacity-0
            "
          />

          {/* ================= DARK MODE OVERLAY ================= */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-[#020b08]/95
              via-[#031712]/75
              to-[#031712]/25
              opacity-0
              transition-opacity
              duration-700
              dark:opacity-100
            "
          />

          {/* ================= LIGHT GREEN ATMOSPHERE ================= */}

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-[55%]
              bg-gradient-to-t
              from-green-700/35
              via-green-500/10
              to-transparent
              transition-all
              duration-700
              dark:from-green-950/90
              dark:via-green-950/40
            "
          />

          {/* ================= SUNLIGHT ================= */}

          <div
            className="
              absolute
              right-[18%]
              top-[12%]
              h-[360px]
              w-[360px]
              rounded-full
              bg-yellow-300/20
              blur-[120px]
              transition-all
              duration-700
              dark:bg-yellow-400/10
            "
          />

          {/* ================= GREEN GLOW ================= */}

          <div
            className="
              absolute
              right-[28%]
              bottom-[10%]
              h-[420px]
              w-[420px]
              rounded-full
              bg-green-500/20
              blur-[130px]
              transition-all
              duration-700
              dark:bg-green-500/20
            "
          />

        </div>


        {/* ===================================================
            DECORATIVE RINGS
        =================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            -left-48
            top-[8%]
            h-[620px]
            w-[620px]
            rounded-full
            border
            border-green-700/10
            dark:border-green-400/10
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -left-28
            top-[16%]
            h-[480px]
            w-[480px]
            rounded-full
            border
            border-green-700/10
            dark:border-green-400/10
          "
        />


        {/* ===================================================
            SMALL LIGHT PARTICLES
        =================================================== */}

        <div className="pointer-events-none absolute left-[18%] top-[18%] h-2 w-2 rounded-full bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)] dark:bg-green-400" />

        <div className="pointer-events-none absolute left-[31%] top-[27%] h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-300" />

        <div className="pointer-events-none absolute left-[38%] top-[14%] h-2 w-2 rounded-full bg-green-500 dark:bg-green-400" />

        <div className="pointer-events-none absolute left-[45%] top-[38%] h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-300" />


        {/* ===================================================
            FLOATING LEAVES
        =================================================== */}

        <FloatingLeaves />


        {/* ===================================================
            FARMER + BULL
        =================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-[-8px]
            right-[-12%]
            z-[4]
            w-[400px]
            sm:right-[-8%]
            sm:w-[500px]
            md:right-[-7%]
            md:w-[610px]
            lg:right-[-5%]
            lg:w-[730px]
            xl:right-[-3%]
            xl:w-[820px]
          "
        >

          {/* Golden glow */}

          <div
            className="
              absolute
              inset-0
              rounded-full
              bg-[radial-gradient(circle_at_55%_60%,rgba(234,179,8,0.40),rgba(234,179,8,0.08)_50%,transparent_75%)]
              blur-3xl
              transition-all
              duration-700
              dark:bg-[radial-gradient(circle_at_55%_60%,rgba(234,179,8,0.28),rgba(234,179,8,0.05)_50%,transparent_75%)]
            "
          />

          {/* Green glow */}

          <div
            className="
              absolute
              inset-0
              -translate-x-20
              translate-y-10
              rounded-full
              bg-[radial-gradient(circle_at_30%_70%,rgba(22,163,74,0.30),transparent_65%)]
              blur-3xl
            "
          />

          {/* <img
            src="https://i.ibb.co/BKcW4F7w/Gemini-Generated-Image-xt22hjxt22hjxt22-removebg-preview.png"
            alt="Indian farmer and bull"
            className="
              relative
              w-full
              drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)]
              saturate-[1.08]
              contrast-[1.05]
            "
          /> */}

          {/* Bottom blending */}

          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              h-24
              bg-gradient-to-t
              from-green-900/40
              via-transparent
              to-transparent
              dark:from-green-950/90
            "
          />

        </div>


        {/* ===================================================
            MAIN CONTENT
        =================================================== */}

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            h-full
            w-full
            max-w-[1600px]
            items-center
            px-6
            sm:px-10
            lg:px-14
            xl:px-20
          "
        >

          <div
            className="
              w-full
              max-w-[720px]
              pb-10
              lg:pb-4
            "
          >

            {/* =================================================
                BADGE
            ================================================= */}

            <div
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-green-600/30
                bg-white/60
                px-4
                py-2
                text-sm
                font-semibold
                text-green-700
                shadow-lg
                backdrop-blur-md
                transition-all
                duration-500
                dark:border-green-400/30
                dark:bg-green-950/40
                dark:text-green-300
              "
            >

              <Sprout size={17} />

              {t("smartAgriculture")}

              <span
                className="
                  h-1.5
                  w-1.5
                  animate-pulse
                  rounded-full
                  bg-green-500
                  dark:bg-green-400
                "
              />

            </div>


            {/* =================================================
                TITLE
            ================================================= */}

            <h1
              className="
                text-[3.2rem]
                font-black
                leading-[0.96]
                tracking-[-0.045em]
                text-gray-950
                transition-colors
                duration-500
                sm:text-[4.3rem]
                md:text-[5rem]
                lg:text-[5.6rem]
                xl:text-[6rem]
                dark:text-white
              "
            >

              {t("heroTitle")}

              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-green-600
                  via-emerald-500
                  to-green-700
                  bg-clip-text
                  text-transparent
                  transition-all
                  duration-500
                  dark:from-green-300
                  dark:via-green-400
                  dark:to-emerald-300
                "
              >
                {t("farmers")}
              </span>

            </h1>


            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p
              className="
                mt-6
                max-w-[650px]
                text-base
                font-medium
                leading-7
                text-gray-700
                transition-colors
                duration-500
                sm:text-lg
                sm:leading-8
                lg:text-xl
                dark:text-gray-200
              "
            >
              {t("heroDescription")}
            </p>


            {/* =================================================
                BUTTONS
            ================================================= */}

            <div className="mt-7 flex flex-wrap gap-3">

              {/* MANDI */}

              <Link
                to="/market/mandi-prices"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-green-600
                  px-6
                  py-3.5
                  font-bold
                  text-white
                  shadow-[0_10px_30px_rgba(22,163,74,0.35)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-green-500
                  hover:shadow-[0_15px_35px_rgba(22,163,74,0.5)]
                "
              >

                <TrendingUp size={19} />

                {t("liveMandiPrices")}

                <ArrowRight
                  size={18}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />

              </Link>


              {/* WEATHER */}

              <Link
                to="/weather"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-gray-400/50
                  bg-white/50
                  px-6
                  py-3.5
                  font-semibold
                  text-gray-900
                  shadow-lg
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/70
                  dark:border-white/20
                  dark:bg-white/10
                  dark:text-white
                  dark:hover:bg-white/20
                "
              >

                <CloudSun size={19} />

                Weather

                <ArrowRight
                  size={17}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />

              </Link>

            </div>

          </div>

        </div>


        {/* ===================================================
            RIGHT SIDE INFORMATION PANEL
        =================================================== */}
{/* ===================================================
    RIGHT SIDE INFO CARDS — DESKTOP
=================================================== */}

<div
  className="
    absolute
    right-6
    top-1/2
    z-[7]
    hidden
    w-[280px]
    -translate-y-1/2
    flex-col
    gap-4
    xl:flex
  "
>
  <InfoCard
    icon={BarChart3}
    number="500+"
    title="Mandis Covered"
    subtitle="Across India"
  />

  <InfoCard
    icon={Users}
    number="2M+"
    title="Farmers Connected"
    subtitle="Growing every day"
  />

  <InfoCard
    icon={Leaf}
    number="100+"
    title="Schemes Listed"
    subtitle="Government initiatives"
  />

  <InfoCard
    icon={CloudSun}
    number="LIVE"
    title="Weather Updates"
    subtitle="Accurate & reliable"
  />
</div>


{/* ===================================================
    TABLET INFO CARDS
=================================================== */}

<div
  className="
    absolute
    bottom-5
    left-1/2
    z-[8]
    hidden
    w-[92%]
    -translate-x-1/2
    grid-cols-4
    gap-3
    md:grid
    xl:hidden
  "
>
  <SmallInfoCard
    icon={BarChart3}
    number="500+"
    title="Mandis"
  />

  <SmallInfoCard
    icon={Users}
    number="2M+"
    title="Farmers"
  />

  <SmallInfoCard
    icon={Leaf}
    number="100+"
    title="Schemes"
  />

  <SmallInfoCard
    icon={CloudSun}
    number="LIVE"
    title="Weather"
  />
</div>


{/* ===================================================
    MOBILE INFO CARDS
=================================================== */}

<div
  className="
    absolute
    bottom-4
    left-1/2
    z-[8]
    flex
    w-[92%]
    -translate-x-1/2
    gap-3
    overflow-x-auto
    pb-1
    md:hidden
  "
>
  <SmallInfoCard
    icon={BarChart3}
    number="500+"
    title="Mandis"
  />

  <SmallInfoCard
    icon={Users}
    number="2M+"
    title="Farmers"
  />

  <SmallInfoCard
    icon={Leaf}
    number="100+"
    title="Schemes"
  />

  <SmallInfoCard
    icon={CloudSun}
    number="LIVE"
    title="Weather"
  />
</div>

        {/* ===================================================
            SCROLL INDICATOR
        =================================================== */}

        <div
          className="
            absolute
            bottom-3
            left-1/2
            z-[9]
            hidden
            -translate-x-1/2
            flex-col
            items-center
            md:flex
            xl:hidden
          "
        >

          <ChevronDown
            size={20}
            className="animate-bounce text-gray-700 dark:text-white/70"
          />

        </div>


        {/* ===================================================
            BOTTOM FADE
        =================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            left-0
            right-0
            z-[6]
            h-16
            bg-gradient-to-t
            from-black/10
            to-transparent
            dark:from-green-950/70
          "
        />

      </section>


      {/* =====================================================
          NEXT SECTIONS
      ===================================================== */}

      <MiddleSection />

      <HowItHelps />

    </main>
  );
};


/* ===========================================================
   DESKTOP INFO CARD
=========================================================== */

const InfoCard = ({
  icon: Icon,
  number,
  title,
  subtitle,
}) => {
  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-gray-300/50
        bg-white/55
        p-4
        shadow-xl
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-x-1
        hover:border-green-500/40
        hover:bg-white/70
        dark:border-white/10
        dark:bg-black/30
        dark:hover:border-green-400/30
        dark:hover:bg-black/40
      "
    >

      <div className="flex items-center gap-3">

        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-green-100
            text-green-700
            transition-all
            duration-300
            group-hover:scale-105
            dark:bg-green-950/70
            dark:text-green-400
          "
        >
          <Icon size={19} />
        </div>

        <div className="min-w-0">

          <p
            className="
              text-xl
              font-black
              leading-none
              text-gray-900
              dark:text-white
            "
          >
            {number}
          </p>

          <p
            className="
              mt-1
              truncate
              text-sm
              font-bold
              text-gray-800
              dark:text-white
            "
          >
            {title}
          </p>

          <p
            className="
              mt-0.5
              text-[10px]
              text-gray-600
              dark:text-gray-400
            "
          >
            {subtitle}
          </p>

        </div>

      </div>

    </div>
  );
};


/* ===========================================================
   SMALL CARD
=========================================================== */

const SmallInfoCard = ({
  icon: Icon,
  number,
  title,
}) => {
  return (
    <div
      className="
        min-w-[125px]
        flex-1
        rounded-xl
        border
        border-gray-300/40
        bg-white/60
        p-2.5
        shadow-lg
        backdrop-blur-xl
        dark:border-white/10
        dark:bg-black/35
      "
    >

      <div className="flex items-center gap-2">

        <div
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-green-100
            text-green-700
            dark:bg-green-950/70
            dark:text-green-400
          "
        >
          <Icon size={16} />
        </div>

        <div>

          <p className="text-sm font-black text-gray-900 dark:text-white">
            {number}
          </p>

          <p className="text-[10px] font-semibold text-gray-600 dark:text-gray-400">
            {title}
          </p>

        </div>

      </div>

    </div>
  );
};


export default Home;