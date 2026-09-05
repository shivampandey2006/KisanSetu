import React, { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  IndianRupee,
  Clock,
  Sprout,
  ArrowUpRight,
  BarChart3,
  Activity,
  Globe2,
  ChevronRight,
} from "lucide-react";

const mandiData = [
  {
    id: 1,
    crop: "Wheat",
    hindi: "गेहूं",
    mandi: "Bhopal Mandi",
    district: "Bhopal",
    state: "Madhya Pradesh",
    minPrice: 2200,
    maxPrice: 2450,
    modalPrice: 2325,
    change: 3.2,
  },
  {
    id: 2,
    crop: "Soybean",
    hindi: "सोयाबीन",
    mandi: "Indore Mandi",
    district: "Indore",
    state: "Madhya Pradesh",
    minPrice: 4300,
    maxPrice: 4700,
    modalPrice: 4520,
    change: 2.4,
  },
  {
    id: 3,
    crop: "Maize",
    hindi: "मक्का",
    mandi: "Sehore Mandi",
    district: "Sehore",
    state: "Madhya Pradesh",
    minPrice: 1800,
    maxPrice: 2100,
    modalPrice: 1950,
    change: -1.8,
  },
  {
    id: 4,
    crop: "Rice",
    hindi: "धान",
    mandi: "Hoshangabad Mandi",
    district: "Narmadapuram",
    state: "Madhya Pradesh",
    minPrice: 2800,
    maxPrice: 3200,
    modalPrice: 3000,
    change: 4.1,
  },
  {
    id: 5,
    crop: "Mustard",
    hindi: "सरसों",
    mandi: "Guna Mandi",
    district: "Guna",
    state: "Madhya Pradesh",
    minPrice: 5100,
    maxPrice: 5550,
    modalPrice: 5320,
    change: 1.6,
  },
  {
    id: 6,
    crop: "Gram",
    hindi: "चना",
    mandi: "Vidisha Mandi",
    district: "Vidisha",
    state: "Madhya Pradesh",
    minPrice: 5600,
    maxPrice: 6100,
    modalPrice: 5850,
    change: -2.2,
  },
  {
    id: 7,
    crop: "Cotton",
    hindi: "कपास",
    mandi: "Khandwa Mandi",
    district: "Khandwa",
    state: "Madhya Pradesh",
    minPrice: 6500,
    maxPrice: 7100,
    modalPrice: 6850,
    change: 2.9,
  },
  {
    id: 8,
    crop: "Onion",
    hindi: "प्याज",
    mandi: "Mandsaur Mandi",
    district: "Mandsaur",
    state: "Madhya Pradesh",
    minPrice: 1200,
    maxPrice: 1800,
    modalPrice: 1500,
    change: -3.5,
  },
];

const states = ["All States", "Madhya Pradesh"];

const LiveMandiPrice = () => {
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedMandi, setSelectedMandi] = useState("All Mandis");
  const [refreshing, setRefreshing] = useState(false);

  const mandis = useMemo(() => {
    const uniqueMandis = mandiData.map((item) => item.mandi);
    return ["All Mandis", ...uniqueMandis];
  }, []);

  const filteredData = useMemo(() => {
    return mandiData.filter((item) => {
      const query = search.toLowerCase().trim();

      const searchMatch =
        item.crop.toLowerCase().includes(query) ||
        item.hindi.includes(search) ||
        item.mandi.toLowerCase().includes(query);

      const stateMatch =
        selectedState === "All States" ||
        item.state === selectedState;

      const mandiMatch =
        selectedMandi === "All Mandis" ||
        item.mandi === selectedMandi;

      return searchMatch && stateMatch && mandiMatch;
    });
  }, [search, selectedState, selectedMandi]);

  const formatPrice = (price) => {
    return price.toLocaleString("en-IN");
  };

  const handleRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const totalMandis = new Set(mandiData.map((item) => item.mandi)).size;

  const risingMarkets = mandiData.filter(
    (item) => item.change > 0
  ).length;

  const averageModal = Math.round(
    mandiData.reduce((sum, item) => sum + item.modalPrice, 0) /
      mandiData.length
  );

  return (
    <div
      className="
        min-h-screen
        overflow-hidden
        bg-[#f6f8f5]
        text-slate-900
        transition-colors
        duration-500
        dark:bg-[#07110c]
        dark:text-white
      "
    >
      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="
            absolute
            -left-40
            top-20
            h-[420px]
            w-[420px]
            rounded-full
            bg-green-400/10
            blur-[120px]
            animate-[floatGlow_12s_ease-in-out_infinite]
            dark:bg-green-500/10
          "
        />

        <div
          className="
            absolute
            -right-40
            top-[45%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-emerald-400/10
            blur-[140px]
            animate-[floatGlow_16s_ease-in-out_infinite_reverse]
            dark:bg-emerald-500/10
          "
        />

        <div
          className="
            absolute
            left-[45%]
            bottom-[-200px]
            h-[400px]
            w-[400px]
            rounded-full
            bg-lime-300/10
            blur-[130px]
            dark:bg-lime-500/5
          "
        />
      </div>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          border-b
          border-white/10
          bg-gradient-to-br
          from-[#063b25]
          via-[#087443]
          to-[#0c9b5b]
          text-white
          dark:from-[#031d12]
          dark:via-[#063d25]
          dark:to-[#075c36]
        "
      >
        {/* Decorative circles */}

        <div
          className="
            absolute
            -right-24
            -top-32
            h-[430px]
            w-[430px]
            rounded-full
            border
            border-white/10
            animate-[slowSpin_25s_linear_infinite]
          "
        />

        <div
          className="
            absolute
            -right-5
            -top-12
            h-[300px]
            w-[300px]
            rounded-full
            border
            border-white/10
          "
        />

        <div
          className="
            absolute
            -bottom-48
            -left-32
            h-[500px]
            w-[500px]
            rounded-full
            border
            border-white/10
            animate-[slowSpin_30s_linear_infinite_reverse]
          "
        />

        {/* Small floating dots */}

        <div className="absolute left-[12%] top-24 h-2 w-2 animate-pulse rounded-full bg-green-200/60" />

        <div
          className="
            absolute
            left-[22%]
            top-[55%]
            h-1.5
            w-1.5
            animate-pulse
            rounded-full
            bg-white/40
          "
        />

        <div
          className="
            absolute
            right-[25%]
            top-32
            h-2
            w-2
            animate-bounce
            rounded-full
            bg-white/40
          "
        />

        <div
          className="
            absolute
            right-[15%]
            bottom-20
            h-1.5
            w-1.5
            animate-pulse
            rounded-full
            bg-green-200/50
          "
        />

        {/* Hero content */}

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-7xl
            px-4
            pb-14
            pt-14
            sm:px-6
            lg:px-8
            lg:pb-16
            lg:pt-16
          "
        >
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">

            {/* LEFT */}

            <div className="text-center lg:text-left">

              {/* Badge */}

              <div
                className="
                  mb-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/15
                  bg-white/10
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  shadow-lg
                  backdrop-blur-xl
                  animate-[fadeInUp_0.5s_ease-out]
                "
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-300" />
                </span>

                Live Market Intelligence

                <Activity size={15} className="text-green-200" />
              </div>

              {/* Heading */}

              <h1
                className="
                  animate-[fadeInUp_0.7s_ease-out]
                  text-4xl
                  font-black
                  leading-[0.95]
                  tracking-[-0.04em]
                  sm:text-5xl
                  md:text-6xl
                  lg:text-7xl
                "
              >
                Know the Market.
                <span
                  className="
                    block
                    bg-gradient-to-r
                    from-lime-200
                    via-green-200
                    to-emerald-100
                    bg-clip-text
                    text-transparent
                  "
                >
                  Sell Smarter.
                </span>
              </h1>

              <p
                className="
                  mx-auto
                  mt-6
                  max-w-2xl
                  animate-[fadeInUp_0.9s_ease-out]
                  text-base
                  leading-7
                  text-green-50/90
                  sm:text-lg
                  lg:mx-0
                "
              >
                Track mandi prices, compare markets and understand
                price movements before making your next selling decision.
              </p>

              {/* Hero stats */}

              <div
                className="
                  mt-8
                  grid
                  grid-cols-3
                  gap-3
                  animate-[fadeInUp_1s_ease-out]
                  sm:max-w-xl
                "
              >
                <HeroStat
                  icon={Globe2}
                  value={`${totalMandis}+`}
                  label="Mandis"
                />

                <HeroStat
                  icon={TrendingUp}
                  value={`${risingMarkets}`}
                  label="Rising"
                />

                <HeroStat
                  icon={IndianRupee}
                  value={`₹${averageModal}`}
                  label="Avg. Modal"
                />
              </div>
            </div>

            {/* RIGHT — SEARCH PANEL */}

            <div
              className="
                relative
                mx-auto
                w-full
                max-w-xl
                animate-[fadeInUp_0.8s_ease-out]
                lg:max-w-md
              "
            >
              {/* glow */}

              <div
                className="
                  absolute
                  -inset-5
                  rounded-[2rem]
                  bg-green-300/10
                  blur-3xl
                "
              />

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-white/15
                  bg-white/[0.10]
                  p-5
                  shadow-2xl
                  backdrop-blur-2xl
                "
              >
                {/* top */}

                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-green-100">
                      Market Explorer
                    </p>

                    <p className="mt-1 text-xs text-white/60">
                      Search crops or mandis
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <Search size={19} />
                  </div>
                </div>

                {/* Search */}

                <div
                  className="
                    group
                    flex
                    items-center
                    rounded-2xl
                    border
                    border-white/20
                    bg-white
                    p-2
                    shadow-xl
                    transition-all
                    duration-300
                    focus-within:border-green-300
                    focus-within:ring-4
                    focus-within:ring-green-300/10
                  "
                >
                  <Search
                    size={21}
                    className="
                      ml-3
                      shrink-0
                      text-slate-400
                      transition-transform
                      duration-300
                      group-focus-within:scale-110
                    "
                  />

                  <input
                    type="text"
                    placeholder="Wheat, Soybean, Bhopal..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="
                      w-full
                      bg-transparent
                      px-3
                      py-3.5
                      text-sm
                      font-medium
                      text-slate-800
                      outline-none
                      placeholder:text-slate-400
                    "
                  />

                  <div className="hidden rounded-xl bg-green-100 px-3 py-2 text-xs font-bold text-green-700 sm:block">
                    Search
                  </div>
                </div>

                {/* Quick chips */}

                <div className="mt-5">
                  <p className="mb-2 text-xs font-medium text-white/50">
                    Popular crops
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {["Wheat", "Soybean", "Rice", "Mustard"].map(
                      (crop) => (
                        <button
                          key={crop}
                          onClick={() => setSearch(crop)}
                          className="
                            rounded-full
                            border
                            border-white/10
                            bg-white/10
                            px-3
                            py-1.5
                            text-xs
                            font-medium
                            text-white/80
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                            hover:border-green-300/30
                            hover:bg-green-300/15
                            hover:text-white
                          "
                        >
                          {crop}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Bottom status */}

                <div
                  className="
                    mt-6
                    flex
                    items-center
                    justify-between
                    border-t
                    border-white/10
                    pt-4
                    text-xs
                  "
                >
                  <div className="flex items-center gap-2 text-green-100/70">
                    <Clock size={14} />
                    Updated today
                  </div>

                  <div className="flex items-center gap-1 font-semibold text-green-200">
                    Live data
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* bottom fade */}

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            h-20
            bg-gradient-to-t
            from-[#f6f8f5]
            to-transparent
            dark:from-[#07110c]
          "
        />
      </section>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-4
          py-10
          sm:px-6
          lg:px-8
          lg:py-14
        "
      >
        {/* ===================================================
            FILTER HEADER
        =================================================== */}

        <div
          className="
            mb-6
            overflow-hidden
            rounded-[1.5rem]
            border
            border-slate-200/80
            bg-white/80
            p-5
            shadow-[0_10px_40px_rgba(15,23,42,0.05)]
            backdrop-blur-xl
            transition-all
            duration-500
            hover:shadow-[0_15px_50px_rgba(22,163,74,0.10)]
            dark:border-white/10
            dark:bg-white/[0.04]
            dark:shadow-none
          "
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            {/* title */}

            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-green-100
                  text-green-600
                  shadow-inner
                  shadow-green-500/10
                  dark:bg-green-500/10
                  dark:text-green-400
                "
              >
                <Sprout size={23} />
              </div>

              <div>
                <h2 className="text-xl font-black tracking-tight">
                  Current Mandi Rates
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Prices shown per quintal
                </p>
              </div>
            </div>

            {/* filters */}

            <div className="flex flex-col gap-3 sm:flex-row">

              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedMandi("All Mandis");
                }}
                className="
                  min-w-[170px]
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-slate-700
                  outline-none
                  transition-all
                  hover:border-green-300
                  focus:border-green-500
                  focus:ring-4
                  focus:ring-green-500/10
                  dark:border-white/10
                  dark:bg-slate-800
                  dark:text-white
                "
              >
                {states.map((state) => (
                  <option key={state}>{state}</option>
                ))}
              </select>

              <select
                value={selectedMandi}
                onChange={(e) => setSelectedMandi(e.target.value)}
                className="
                  min-w-[190px]
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-slate-700
                  outline-none
                  transition-all
                  hover:border-green-300
                  focus:border-green-500
                  focus:ring-4
                  focus:ring-green-500/10
                  dark:border-white/10
                  dark:bg-slate-800
                  dark:text-white
                "
              >
                {mandis.map((mandi) => (
                  <option key={mandi}>{mandi}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ===================================================
            UPDATE BAR
        =================================================== */}

        <div
          className="
            mb-8
            flex
            flex-col
            gap-4
            rounded-2xl
            border
            border-green-200/80
            bg-gradient-to-r
            from-green-50
            via-emerald-50
            to-white
            p-4
            shadow-sm
            transition-all
            duration-300
            hover:shadow-md
            sm:flex-row
            sm:items-center
            sm:justify-between
            dark:border-green-500/10
            dark:from-green-950/30
            dark:via-emerald-950/20
            dark:to-slate-900
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-green-100
                dark:bg-green-500/10
              "
            >
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-50" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
              </span>
            </div>

            <div>
              <p className="text-sm font-bold text-green-800 dark:text-green-300">
                Market information is active
              </p>

              <p className="mt-0.5 text-xs text-green-700/70 dark:text-green-400/70">
                Last updated today at 10:30 AM
              </p>
            </div>
          </div>

          <button
            onClick={handleRefresh}
            className="
              group
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-green-600
              px-5
              py-3
              text-sm
              font-bold
              text-white
              shadow-[0_8px_25px_rgba(22,163,74,0.20)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-green-700
              hover:shadow-[0_12px_30px_rgba(22,163,74,0.30)]
              active:scale-95
            "
          >
            <RefreshCw
              size={16}
              className={`transition-transform duration-700 ${
                refreshing
                  ? "animate-spin"
                  : "group-hover:rotate-180"
              }`}
            />

            {refreshing ? "Refreshing..." : "Refresh Prices"}
          </button>
        </div>

        {/* ===================================================
            RESULT HEADER
        =================================================== */}

        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing{" "}
              <span className="font-bold text-slate-900 dark:text-white">
                {filteredData.length}
              </span>{" "}
              market records
            </p>
          </div>

          <div
            className="
              hidden
              items-center
              gap-2
              rounded-full
              border
              border-slate-200
              bg-white
              px-3
              py-1.5
              text-xs
              font-semibold
              text-slate-500
              sm:flex
              dark:border-white/10
              dark:bg-white/[0.04]
              dark:text-slate-400
            "
          >
            <BarChart3 size={14} className="text-green-500" />
            Live Market View
          </div>
        </div>

        {/* ===================================================
            DESKTOP TABLE
        =================================================== */}

        <div
          className="
            hidden
            overflow-hidden
            rounded-[1.5rem]
            border
            border-slate-200/80
            bg-white
            shadow-[0_15px_50px_rgba(15,23,42,0.06)]
            transition-all
            duration-500
            hover:shadow-[0_20px_60px_rgba(22,163,74,0.10)]
            md:block
            dark:border-white/10
            dark:bg-slate-900/70
            dark:shadow-none
          "
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">

              <thead>
                <tr
                  className="
                    border-b
                    border-slate-200
                    bg-slate-50
                    text-left
                    text-xs
                    uppercase
                    tracking-wider
                    text-slate-500
                    dark:border-white/10
                    dark:bg-white/[0.03]
                    dark:text-slate-400
                  "
                >
                  <th className="px-6 py-5 font-bold">Crop</th>
                  <th className="px-6 py-5 font-bold">Mandi</th>
                  <th className="px-6 py-5 font-bold">Min Price</th>
                  <th className="px-6 py-5 font-bold">Max Price</th>
                  <th className="px-6 py-5 font-bold">Modal Price</th>
                  <th className="px-6 py-5 font-bold">Change</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">

                {filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="
                      group
                      animate-[fadeInUp_0.5s_ease-out]
                      transition-all
                      duration-300
                      hover:bg-green-50/70
                      dark:hover:bg-green-950/20
                    "
                    style={{
                      animationDelay: `${index * 70}ms`,
                    }}
                  >

                    {/* crop */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">

                        <div
                          className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-green-100
                            text-green-600
                            transition-all
                            duration-300
                            group-hover:scale-110
                            group-hover:rotate-3
                            group-hover:bg-green-600
                            group-hover:text-white
                            dark:bg-green-500/10
                            dark:text-green-400
                            dark:group-hover:bg-green-500
                            dark:group-hover:text-white
                          "
                        >
                          <Sprout size={20} />
                        </div>

                        <div>
                          <p className="font-bold">
                            {item.crop}
                          </p>

                          <p className="mt-0.5 text-sm text-slate-400">
                            {item.hindi}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* mandi */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">

                        <MapPin
                          size={17}
                          className="
                            text-green-600
                            transition-transform
                            duration-300
                            group-hover:scale-110
                            dark:text-green-400
                          "
                        />

                        <div>
                          <p className="font-semibold">
                            {item.mandi}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-400">
                            {item.district}, {item.state}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* min */}

                    <td className="px-6 py-5">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        ₹{formatPrice(item.minPrice)}
                      </span>
                    </td>

                    {/* max */}

                    <td className="px-6 py-5">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        ₹{formatPrice(item.maxPrice)}
                      </span>
                    </td>

                    {/* modal */}

                    <td className="px-6 py-5">
                      <div
                        className="
                          inline-flex
                          items-center
                          gap-1
                          rounded-xl
                          border
                          border-green-200
                          bg-green-50
                          px-3
                          py-2
                          font-black
                          text-green-700
                          transition-all
                          duration-300
                          group-hover:-translate-y-0.5
                          group-hover:shadow-md
                          dark:border-green-500/10
                          dark:bg-green-500/10
                          dark:text-green-400
                        "
                      >
                        <IndianRupee size={14} />
                        {formatPrice(item.modalPrice)}
                      </div>
                    </td>

                    {/* change */}

                    <td className="px-6 py-5">
                      <ChangeBadge change={item.change} />
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>

        {/* ===================================================
            MOBILE CARDS
        =================================================== */}

        <div className="grid gap-4 md:hidden">

          {filteredData.map((item, index) => (
            <div
              key={item.id}
              className="
                group
                relative
                overflow-hidden
                rounded-[1.5rem]
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-green-300
                hover:shadow-xl
                dark:border-white/10
                dark:bg-slate-900/80
              "
              style={{
                animation: "fadeInUp 0.5s ease-out forwards",
                animationDelay: `${index * 70}ms`,
              }}
            >
              {/* hover glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-12
                  -top-12
                  h-28
                  w-28
                  rounded-full
                  bg-green-400/0
                  blur-3xl
                  transition-all
                  duration-500
                  group-hover:bg-green-400/15
                "
              />

              <div className="relative z-10">

                <div className="flex items-start justify-between">

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-green-100
                        text-green-600
                        transition-all
                        duration-300
                        group-hover:scale-110
                        dark:bg-green-500/10
                        dark:text-green-400
                      "
                    >
                      <Sprout size={20} />
                    </div>

                    <div>
                      <h3 className="text-lg font-black">
                        {item.crop}
                      </h3>

                      <p className="text-sm text-slate-400">
                        {item.hindi}
                      </p>
                    </div>
                  </div>

                  <ChangeBadge change={item.change} />
                </div>

                <div
                  className="
                    mt-4
                    flex
                    items-center
                    gap-2
                    border-b
                    border-slate-100
                    pb-4
                    text-sm
                    text-slate-600
                    dark:border-white/10
                    dark:text-slate-300
                  "
                >
                  <MapPin
                    size={16}
                    className="text-green-600 dark:text-green-400"
                  />

                  <span className="font-medium">
                    {item.mandi}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-4">

                  <PriceBox
                    label="Min"
                    value={`₹${formatPrice(item.minPrice)}`}
                  />

                  <PriceBox
                    label="Max"
                    value={`₹${formatPrice(item.maxPrice)}`}
                  />

                  <PriceBox
                    label="Modal"
                    value={`₹${formatPrice(item.modalPrice)}`}
                    highlight
                  />

                </div>
              </div>
            </div>
          ))}

        </div>

        {/* ===================================================
            NO RESULTS
        =================================================== */}

        {filteredData.length === 0 && (
          <div
            className="
              rounded-[1.5rem]
              border
              border-slate-200
              bg-white
              px-6
              py-20
              text-center
              shadow-sm
              dark:border-white/10
              dark:bg-slate-900
            "
          >
            <div
              className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-green-100
                text-green-600
                dark:bg-green-500/10
                dark:text-green-400
              "
            >
              <Search size={28} />
            </div>

            <h3 className="mt-5 text-xl font-black">
              No mandi prices found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
              Try searching for another crop, district or mandi.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setSelectedState("All States");
                setSelectedMandi("All Mandis");
              }}
              className="
                mt-6
                rounded-xl
                bg-green-600
                px-5
                py-2.5
                text-sm
                font-bold
                text-white
                transition-all
                hover:-translate-y-0.5
                hover:bg-green-700
              "
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* ===================================================
            INFORMATION CARDS
        =================================================== */}

        <section className="mt-12 grid gap-5 md:grid-cols-3">

          <FeatureCard
            icon={IndianRupee}
            title="Compare Prices"
            description="Compare mandi rates before deciding where to sell your produce."
            label="Smart Selling"
          />

          <FeatureCard
            icon={TrendingUp}
            title="Track Market Trends"
            description="Understand price movements and identify better selling opportunities."
            label="Market Intelligence"
          />

          <FeatureCard
            icon={MapPin}
            title="Find Nearby Mandis"
            description="Explore mandi locations and make informed market decisions."
            label="Explore Markets"
          />

        </section>
      </main>

      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatGlow {
          0%, 100% {
            transform: translate(0, 0);
          }

          50% {
            transform: translate(25px, -20px);
          }
        }

        @keyframes slowSpin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </div>
  );
};

/* =========================================================
   HERO STAT
========================================================= */

const HeroStat = ({ icon: Icon, value, label }) => {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/[0.08]
        p-3
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-white/[0.13]
      "
    >
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-green-200" />

        <span className="text-lg font-black">
          {value}
        </span>
      </div>

      <p className="mt-1 text-[11px] font-medium text-white/60">
        {label}
      </p>
    </div>
  );
};

/* =========================================================
   CHANGE BADGE
========================================================= */

const ChangeBadge = ({ change }) => {
  const positive = change >= 0;

  return (
    <div
      className={`
        inline-flex
        shrink-0
        items-center
        gap-1
        rounded-full
        px-3
        py-1.5
        text-xs
        font-black
        transition-all
        duration-300
        group-hover:scale-105
        ${
          positive
            ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
            : "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400"
        }
      `}
    >
      {positive ? (
        <TrendingUp size={14} />
      ) : (
        <TrendingDown size={14} />
      )}

      {change > 0 ? "+" : ""}
      {change}%
    </div>
  );
};

/* =========================================================
   PRICE BOX
========================================================= */

const PriceBox = ({ label, value, highlight }) => {
  return (
    <div
      className={`
        rounded-xl
        p-3
        ${
          highlight
            ? "bg-green-50 dark:bg-green-500/10"
            : "bg-slate-50 dark:bg-white/[0.04]"
        }
      `}
    >
      <p className="text-[11px] font-medium text-slate-400">
        {label}
      </p>

      <p
        className={`
          mt-1
          text-sm
          font-black
          ${
            highlight
              ? "text-green-700 dark:text-green-400"
              : "text-slate-800 dark:text-white"
          }
        `}
      >
        {value}
      </p>
    </div>
  );
};

/* =========================================================
   FEATURE CARD
========================================================= */

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  label,
}) => {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[1.5rem]
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-green-300
        hover:shadow-[0_20px_50px_rgba(22,163,74,0.12)]
        dark:border-white/10
        dark:bg-slate-900/70
        dark:hover:border-green-500/20
        dark:hover:bg-green-950/20
        dark:hover:shadow-[0_20px_50px_rgba(34,197,94,0.08)]
      "
    >
      {/* Glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-40
          w-40
          rounded-full
          bg-green-400/0
          blur-3xl
          transition-all
          duration-500
          group-hover:bg-green-400/15
        "
      />

      <div className="relative z-10">

        <div
          className="
            mb-5
            flex
            h-13
            w-13
            items-center
            justify-center
            rounded-2xl
            bg-green-100
            text-green-600
            transition-all
            duration-500
            group-hover:scale-110
            group-hover:rotate-6
            group-hover:bg-green-600
            group-hover:text-white
            dark:bg-green-500/10
            dark:text-green-400
            dark:group-hover:bg-green-500
            dark:group-hover:text-white
          "
        >
          <Icon size={22} />
        </div>

        <h3 className="text-lg font-black">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {description}
        </p>

        <div
          className="
            mt-5
            flex
            items-center
            gap-1.5
            text-sm
            font-bold
            text-green-600
            transition-all
            duration-300
            group-hover:translate-x-1
            dark:text-green-400
          "
        >
          {label}

          <ArrowUpRight
            size={16}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
              group-hover:-translate-y-0.5
            "
          />
        </div>

        {/* bottom line */}

        <div
          className="
            absolute
            bottom-0
            left-0
            h-[3px]
            w-0
            rounded-full
            bg-gradient-to-r
            from-green-400
            via-emerald-500
            to-green-600
            transition-all
            duration-500
            group-hover:w-full
          "
        />
      </div>
    </div>
  );
};

export default LiveMandiPrice;