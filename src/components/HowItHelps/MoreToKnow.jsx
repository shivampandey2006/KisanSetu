import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../Context/LanguageContext";
import React, { useRef, useState, useEffect } from "react";
import {
  ArrowLeft,
  Sprout,
  ShoppingCart,
  TrendingUp,
  CloudSun,
  Landmark,
  Bot,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

const featureIcons = [
  Sprout,
  ShoppingCart,
  TrendingUp,
  CloudSun,
  Landmark,
  Bot,
  ShieldCheck,
  Smartphone,
];

/* ------------------------------------------------------------------ */
/* 3D tilt wrapper — tracks the pointer and applies a real perspective */
/* rotation + elevation to whatever is inside it.                     */
/* ------------------------------------------------------------------ */
const TiltCard = ({ children, className = "", maxTilt = 10, lift = 22 }) => {
  const ref = useRef(null);
  const [style, setStyle] = useState({
    transform:
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
  });
  const [glow, setGlow] = useState({ opacity: 0, x: "50%", y: "50%" });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - py) * maxTilt;
    const rotateY = (px - 0.5) * maxTilt;
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${lift}px)`,
    });
    setGlow({ opacity: 1, x: `${px * 100}%`, y: `${py * 100}%` });
  };

  const handleLeave = () => {
    setStyle({
      transform:
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
    });
    setGlow((g) => ({ ...g, opacity: 0 }));
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ ...style, transformStyle: "preserve-3d" }}
      className={`tilt-card relative ${className}`}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: glow.opacity,
          background: `radial-gradient(160px circle at ${glow.x} ${glow.y}, rgba(22,163,74,0.16), transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Small floating leaf SVG used as ambient decoration throughout page */
/* ------------------------------------------------------------------ */
const FloatingLeaf = ({
  top,
  left,
  right,
  bottom,
  size = 46,
  delay = "0s",
  duration = "9s",
  rotate = 0,
  flip = false,
  className = "",
}) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={`leaf-3d pointer-events-none absolute opacity-70 ${className}`}
    style={{
      top,
      left,
      right,
      bottom,
      animationDelay: delay,
      animationDuration: duration,
      transform: `rotate(${rotate}deg) ${flip ? "scaleX(-1)" : ""}`,
    }}
  >
    <path
      d="M32 4C14 10 6 26 10 46c14 6 32 0 40-14 6-11 2-24-8-30-3 8-9 12-16 14 2-4 4-8 6-12z"
      fill="url(#leafGrad)"
    />
    <path
      d="M14 44C22 34 28 24 34 10"
      stroke="rgba(255,255,255,0.55)"
      strokeWidth="1.4"
      fill="none"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4ade80" />
        <stop offset="100%" stopColor="#15803d" />
      </linearGradient>
    </defs>
  </svg>
);

/* ------------------------------------------------------------------ */
/* Hero illustration — a small stylised farmer standing in a field,   */
/* built as flat-shape SVG so it stays crisp and lightweight.         */
/* ------------------------------------------------------------------ */
const FarmerIllustration = () => (
  <div className="farmer-scene relative mx-auto h-72 w-72 md:h-80 md:w-80">
    <svg viewBox="0 0 320 320" className="h-full w-full">
      <defs>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>
        <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bbf7d0" />
          <stop offset="100%" stopColor="#86efac" />
        </linearGradient>
        <linearGradient id="shirtGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
      </defs>

      {/* sun */}
      <circle className="sun-pulse" cx="248" cy="66" r="34" fill="url(#sunGlow)" />

      {/* ground */}
      <ellipse cx="160" cy="272" rx="128" ry="30" fill="url(#groundGrad)" opacity="0.7" />
      <g stroke="#4d7c0f" strokeWidth="3" opacity="0.5" strokeLinecap="round">
        <path d="M50 268 Q160 292 270 268" fill="none" />
        <path d="M56 254 Q160 276 264 254" fill="none" />
      </g>

      {/* farmer group — gentle sway animation applied via CSS class */}
      <g className="farmer-sway" style={{ transformOrigin: "160px 260px" }}>
        {/* shadow */}
        <ellipse cx="160" cy="266" rx="46" ry="9" fill="#166534" opacity="0.25" />

        {/* legs */}
        <rect x="140" y="196" width="14" height="60" rx="6" fill="#78350f" />
        <rect x="166" y="196" width="14" height="60" rx="6" fill="#92400e" />

        {/* body */}
        <path
          d="M124 150c0-22 16-38 36-38s36 16 36 38v46a10 10 0 0 1-10 10h-52a10 10 0 0 1-10-10z"
          fill="url(#shirtGrad)"
        />

        {/* arm holding sprout */}
        <path
          d="M124 160c-16 2-26 14-26 30"
          stroke="#166534"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          className="farmer-arm"
          style={{ transformOrigin: "124px 160px" }}
        />
        <path
          d="M196 160c14 4 22 16 20 32"
          stroke="#15803d"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />

        {/* head */}
        <circle cx="160" cy="98" r="26" fill="#fbbf24" />
        {/* hat */}
        <path d="M126 90c8-20 60-20 68 0z" fill="#a16207" />
        <rect x="120" y="88" width="80" height="10" rx="5" fill="#854d0e" />

        {/* little sprout in raised hand */}
        <g className="sprout-grow" style={{ transformOrigin: "94px 188px" }}>
          <rect x="90" y="186" width="6" height="18" rx="3" fill="#84cc16" />
          <path
            d="M93 186c-10-4-14-14-10-22 10 2 16 12 14 22z"
            fill="#4ade80"
          />
          <path
            d="M93 186c10-2 16-10 14-20-10 0-18 8-18 18z"
            fill="#22c55e"
          />
        </g>
      </g>
    </svg>

    {/* orbiting leaves around the illustration for extra depth */}
    <FloatingLeaf top="6%" left="-4%" size={30} delay="0.4s" duration="7s" rotate={-20} />
    <FloatingLeaf bottom="4%" right="-6%" size={26} delay="1.6s" duration="8s" rotate={35} flip />
  </div>
);

const MoreToKnow = () => {
  const { t } = useLanguage();
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    { icon: featureIcons[0], title: t("feature1Title"), description: t("feature1Desc") },
    { icon: featureIcons[1], title: t("feature2Title"), description: t("feature2Desc") },
    { icon: featureIcons[2], title: t("cropPrices"), description: t("feature3Desc") },
    { icon: featureIcons[3], title: t("weatherUpdates"), description: t("feature4Desc") },
    { icon: featureIcons[4], title: t("governmentSchemes"), description: t("feature5Desc") },
    { icon: featureIcons[5], title: t("feature6Title"), description: t("feature6Desc") },
    { icon: featureIcons[6], title: t("feature7Title"), description: t("feature7Desc") },
    { icon: featureIcons[7], title: t("feature8Title"), description: t("feature8Desc") },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white text-gray-800 dark:bg-gray-950 dark:text-gray-100">
      <style>{`
        @keyframes blobFloatA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -40px) scale(1.08); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes blobFloatB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-35px, 30px) scale(1.1); }
        }
        @keyframes blobFloatC {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(25px, 25px) scale(0.92); }
          70% { transform: translate(-15px, -20px) scale(1.05); }
        }
        @keyframes leafDrift {
          0%, 100% { transform: translateY(0) rotate(-8deg); }
          50% { transform: translateY(-14px) rotate(4deg); }
        }
        @keyframes dashFlow {
          to { stroke-dashoffset: -24; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(1.05); }
        }

        /* ---------- new 3D / motion additions ---------- */

        .perspective-wrap { perspective: 1200px; }

        .tilt-card {
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }

        @keyframes leaf3d {
          0%   { transform: translateY(0) rotateY(0deg) rotate(var(--r, 0deg)); }
          25%  { transform: translateY(-10px) rotateY(60deg) rotate(calc(var(--r, 0deg) + 4deg)); }
          50%  { transform: translateY(0px) rotateY(140deg) rotate(var(--r, 0deg)); }
          75%  { transform: translateY(10px) rotateY(220deg) rotate(calc(var(--r, 0deg) - 4deg)); }
          100% { transform: translateY(0) rotateY(360deg) rotate(var(--r, 0deg)); }
        }
        .leaf-3d {
          animation-name: leaf3d;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          transform-style: preserve-3d;
          filter: drop-shadow(0 6px 8px rgba(21, 128, 61, 0.25));
        }

        @keyframes sunPulse {
          0%, 100% { filter: drop-shadow(0 0 0px rgba(245,158,11,0.5)); transform: scale(1); }
          50% { filter: drop-shadow(0 0 18px rgba(245,158,11,0.55)); transform: scale(1.05); }
        }
        .sun-pulse { animation: sunPulse 4s ease-in-out infinite; transform-origin: 248px 66px; }

        @keyframes farmerSway {
          0%, 100% { transform: rotate(-1.2deg); }
          50% { transform: rotate(1.2deg); }
        }
        .farmer-sway { animation: farmerSway 5s ease-in-out infinite; }

        @keyframes armWave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-10deg); }
        }
        .farmer-arm { animation: armWave 3.4s ease-in-out infinite; }

        @keyframes sproutGrow {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.12) translateY(-2px); }
        }
        .sprout-grow { animation: sproutGrow 2.6s ease-in-out infinite; }

        @keyframes iconPop {
          0% { transform: translateZ(0) rotateY(0deg) scale(1); }
          100% { transform: translateZ(26px) rotateY(-14deg) scale(1.08); }
        }
        .feature-icon-3d {
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease;
          transform-style: preserve-3d;
        }
        .group:hover .feature-icon-3d {
          transform: translateZ(26px) rotateY(-14deg) scale(1.08);
          box-shadow: 0 14px 22px -8px rgba(22, 163, 74, 0.45);
        }

        @keyframes badgeSpin {
          0% { transform: translateZ(0) rotateY(0deg); }
          60% { transform: translateZ(14px) rotateY(360deg); }
          100% { transform: translateZ(0) rotateY(360deg); }
        }
        .step-badge { transform-style: preserve-3d; transition: transform 0.3s ease; }
        .step-card:hover .step-badge { animation: badgeSpin 0.9s ease; }

        @keyframes ringRotate {
          to { transform: rotate(360deg); }
        }
        .cta-ring {
          background: conic-gradient(from 0deg, rgba(255,255,255,0.0), rgba(255,255,255,0.35), rgba(255,255,255,0.0) 40%);
          animation: ringRotate 6s linear infinite;
        }

        .cta-btn-3d {
          transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.25s ease;
          box-shadow: 0 10px 0 0 #b45309, 0 16px 24px -6px rgba(0,0,0,0.35);
        }
        .cta-btn-3d:hover {
          transform: translateY(-4px) translateZ(10px) scale(1.04);
          box-shadow: 0 14px 0 0 #b45309, 0 22px 30px -6px rgba(0,0,0,0.4);
        }
        .cta-btn-3d:active {
          transform: translateY(2px) scale(0.98);
          box-shadow: 0 4px 0 0 #b45309, 0 8px 14px -6px rgba(0,0,0,0.35);
        }

        @keyframes cardFloatIn {
          0% { opacity: 0; transform: translateY(18px) rotateX(8deg); }
          100% { opacity: 1; transform: translateY(0) rotateX(0deg); }
        }
        .card-float-in {
          animation: cardFloatIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .blob-a, .blob-b, .blob-c, .leaf-drift, .flow-line, .pulse-glow,
          .leaf-3d, .sun-pulse, .farmer-sway, .farmer-arm, .sprout-grow,
          .tilt-card, .cta-ring, .cta-btn-3d, .card-float-in, .step-badge {
            animation: none !important;
            transition: none !important;
            transform: none !important;
          }
        }

        .blob-a { animation: blobFloatA 18s ease-in-out infinite; }
        .blob-b { animation: blobFloatB 22s ease-in-out infinite; }
        .blob-c { animation: blobFloatC 26s ease-in-out infinite; }
        .leaf-drift { animation: leafDrift 7s ease-in-out infinite; }
        .flow-line { stroke-dasharray: 6 6; animation: dashFlow 2.4s linear infinite; }
        .pulse-glow { animation: pulseGlow 5s ease-in-out infinite; }
      `}</style>

      {/* Hero */}
      <section className="relative overflow-hidden px-5 py-16 md:px-10 lg:px-20">
        <div className="blob-a pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-green-300/30 blur-3xl dark:bg-green-700/20" />
        <div className="blob-b pointer-events-none absolute -right-16 top-10 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl dark:bg-amber-600/10" />

        <svg
          className="pointer-events-none absolute inset-0 mx-auto h-full w-full max-w-6xl opacity-[0.06]"
          viewBox="0 0 800 500"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M50 460 C 150 400, 120 300, 220 260 C 320 220, 300 120, 400 80"
            stroke="#16a34a"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M750 460 C 650 400, 680 300, 580 260 C 480 220, 500 120, 400 80"
            stroke="#16a34a"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="400" cy="70" r="6" fill="#16a34a" />
        </svg>

        <FloatingLeaf top="14%" left="6%" size={40} delay="0s" duration="8s" rotate={-15} />
        <FloatingLeaf top="60%" right="8%" size={34} delay="1.2s" duration="9.5s" rotate={20} flip />
        <FloatingLeaf bottom="6%" left="14%" size={26} delay="2.1s" duration="7.5s" rotate={10} />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div className="text-center md:text-left">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
              <span className="leaf-drift inline-block">
                <Sprout size={18} />
              </span>
              {t("moreKnowBadge")}
            </div>

            <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              {t("moreHeroTitleLine1")}
              <span className="block text-green-600">{t("moreHeroTitleLine2")}</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-300 md:mx-0 md:text-lg">
              {t("moreHeroDescription")}
            </p>
          </div>

          <FarmerIllustration />
        </div>
      </section>

      {/* What is KisanSetu */}
      <section className="relative px-5 py-12 md:px-10 lg:px-20">
        <FloatingLeaf top="8%" right="4%" size={32} delay="0.6s" duration="8.4s" rotate={-25} />

        <div className="perspective-wrap mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-2 font-semibold text-green-600">{t("aboutLabel")}</p>

            <h2 className="text-3xl font-bold md:text-4xl">{t("aboutTitle")}</h2>

            <p className="mt-5 leading-7 text-gray-600 dark:text-gray-300">{t("aboutPara1")}</p>
            <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">{t("aboutPara2")}</p>
          </div>

          <TiltCard
            maxTilt={8}
            lift={16}
            className="rounded-3xl border border-green-100 bg-green-50 p-8 shadow-lg shadow-green-900/5 dark:border-green-900/40 dark:bg-green-950/20"
          >
            <svg
              className="pointer-events-none absolute -bottom-6 -right-6 h-40 w-40 opacity-20"
              viewBox="0 0 200 200"
            >
              <circle cx="150" cy="50" r="24" fill="#f59e0b" />
              <path
                d="M0 180 Q 50 140 100 170 T 200 150"
                stroke="#16a34a"
                strokeWidth="3"
                fill="none"
              />
            </svg>

            <Sprout className="relative mb-5 text-green-600" size={48} style={{ transform: "translateZ(20px)" }} />

            <h3 className="relative text-2xl font-bold" style={{ transform: "translateZ(16px)" }}>
              {t("aboutCardTitle")}
            </h3>

            <p
              className="relative mt-3 leading-7 text-gray-600 dark:text-gray-300"
              style={{ transform: "translateZ(10px)" }}
            >
              {t("aboutCardDescription")}
            </p>
          </TiltCard>
        </div>
      </section>

      {/* Features */}
      <section className="relative overflow-hidden bg-gray-50 px-5 py-16 dark:bg-gray-900/50 md:px-10 lg:px-20">
        <div className="blob-c pointer-events-none absolute -left-10 bottom-0 h-64 w-64 rounded-full bg-green-200/30 blur-3xl dark:bg-green-800/10" />
        <FloatingLeaf top="4%" right="6%" size={30} delay="0.3s" duration="8s" rotate={18} />
        <FloatingLeaf bottom="10%" left="4%" size={26} delay="1.8s" duration="9s" rotate={-12} flip />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="font-semibold text-green-600">{t("featuresLabel")}</p>

            <h2 className="mt-2 text-3xl font-bold md:text-4xl">{t("featuresTitle")}</h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-300">
              {t("featuresSubtitle")}
            </p>
          </div>

          <div className="perspective-wrap grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <TiltCard
                  key={index}
                  maxTilt={12}
                  lift={20}
                  className="card-float-in group rounded-2xl border border-gray-200 bg-white p-6 shadow-md shadow-gray-900/5 dark:border-gray-800 dark:bg-gray-950"
                >
                  <div
                    style={{ animationDelay: `${index * 90}ms` }}
                    className="contents"
                  >
                    <div className="feature-icon-3d mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                      <Icon size={25} />
                    </div>

                    <h3 className="text-lg font-bold">{feature.title}</h3>

                    <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative px-5 py-16 md:px-10 lg:px-20">
        <div className="perspective-wrap mx-auto max-w-5xl text-center">
          <p className="font-semibold text-green-600">{t("howItWorksLabel")}</p>

          <h2 className="mt-2 text-3xl font-bold md:text-4xl">{t("howItWorksTitle")}</h2>

          <div className="relative mt-10 grid gap-6 md:grid-cols-3">
            <svg
              className="pointer-events-none absolute left-0 top-6 hidden h-4 w-full md:block"
              viewBox="0 0 600 20"
              preserveAspectRatio="none"
            >
              <line
                x1="100"
                y1="10"
                x2="500"
                y2="10"
                stroke="#16a34a"
                strokeWidth="2"
                className="flow-line"
              />
            </svg>

            {[
              { n: 1, title: t("step1Title"), desc: t("step1Desc") },
              { n: 2, title: t("step2Title"), desc: t("step2Desc") },
              { n: 3, title: t("step3Title"), desc: t("step3Desc") },
            ].map((step) => (
              <TiltCard
                key={step.n}
                maxTilt={9}
                lift={14}
                className="step-card relative rounded-2xl border bg-white p-6 shadow-md shadow-gray-900/5 dark:border-gray-800 dark:bg-gray-950"
              >
                <div className="step-badge relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-600 font-bold text-white shadow-lg shadow-green-600/40">
                  {step.n}
                </div>

                <h3 className="mt-5 text-xl font-bold">{step.title}</h3>

                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {step.desc}
                </p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-5 pb-16 md:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl bg-green-600 px-6 py-12 text-center text-white md:px-12">
            <div className="pulse-glow pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full blur-3xl" />
            <div className="pulse-glow pointer-events-none absolute -left-10 -bottom-10 h-56 w-56 rounded-full blur-3xl" />
            <FloatingLeaf top="10%" right="10%" size={30} delay="0.5s" duration="7.5s" rotate={20} className="opacity-40" />
            <FloatingLeaf bottom="12%" left="8%" size={24} delay="1.4s" duration="8.5s" rotate={-15} flip className="opacity-40" />

            <h2 className="relative text-3xl font-bold md:text-4xl">{t("ctaTitle")}</h2>

            <p className="relative mx-auto mt-4 max-w-2xl text-green-50">
              {t("ctaDescription")}
            </p>

            <Link
              to="/"
              className=" hover:animate-bounce mt-7 inline-flex items-center gap-2 overflow-hidden rounded-xl bg-green-600 px-3 py-4  font-semibold text-white border-2 border-white"
            >
              <span className="cta-ring pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100" />
              <ArrowLeft size={18} />
              {t("backToHome")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MoreToKnow;