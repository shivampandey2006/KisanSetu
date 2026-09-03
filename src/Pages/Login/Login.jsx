import React, { useState } from "react";
import { Link } from "react-router-dom";
import { languages } from "../../Data/Translations";
import { useLanguage } from "../../Context/LanguageContext";

const EyeIcon = ({ open }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    {open ? (
      <>
        <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M3 3l18 18" />
        <path d="M10.6 5.1A10.9 10.9 0 0 1 12 5c7 0 10.5 7 10.5 7a13.6 13.6 0 0 1-3.1 4M6.5 6.8C3.4 8.7 1.5 12 1.5 12s3.5 7 10.5 7c1.4 0 2.6-.2 3.7-.6" />
        <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
      </>
    )}
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.5 12.3c0-.8-.1-1.6-.2-2.4H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.7z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.1-4 1.1-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.3 21.3 7.3 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.4 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3V6.6H1.4A11.9 11.9 0 0 0 0 12c0 1.9.5 3.8 1.4 5.4l4-3.1z"
    />
    <path
      fill="#EA4335"
      d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.3 0 3.3 2.7 1.4 6.6l4 3.1c.9-2.8 3.5-4.9 6.6-4.9z"
    />
  </svg>
);

const Login = () => {
  const { t, language, changeLanguage } = useLanguage();

  const [mode, setMode] = useState("login");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const isLogin = mode === "login";

  return (
    <div className="flex min-h-80% w-[80%] pt-20 mx-auto flex-col bg-[#f6fbf4] dark:bg-[#09090bea] md:flex-row">
      
      <style>{`
        @keyframes leafDrift {
          0%, 100% {
            transform: translateY(0) rotate(-8deg);
          }

          50% {
            transform: translateY(-14px) rotate(4deg);
          }
        }

        .leaf-drift {
          animation: leafDrift 7s ease-in-out infinite;
        }

        .font-display {
          font-family: "Fraunces", serif;
        }
      `}</style>

      {/* LEFT BRAND PANEL */}
      <div className="relative hidden overflow-hidden bg-[#123524] px-12 py-14 text-[#f6fbf4] md:flex md:w-[46%] md:flex-col md:justify-between">

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
          viewBox="0 0 400 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M40 0 C 120 120, 40 240, 140 340 C 240 440, 120 560, 200 680 C 260 760, 200 800, 200 800"
            stroke="#f6fbf4"
            strokeWidth="2"
            fill="none"
          />

          <path
            d="M360 40 C 280 160, 360 280, 260 380 C 180 460, 300 600, 220 760"
            stroke="#f6fbf4"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        <Link
          to="/"
          className="relative z-10 w-fit text-2xl font-bold"
        >
          Kisan<span className="text-[#a7d7b3]">Setu</span>
        </Link>

        <div className="relative z-10 max-w-sm">
          <span className="leaf-drift inline-block text-5xl">
            🌿
          </span>

          <h1 className="font-display mt-6 text-4xl font-semibold leading-[1.15] sm:text-5xl">
            {t("heroTagline")}
          </h1>
        </div>

        <p className="relative z-10 text-sm text-[#a7d7b3]">
          © {new Date().getFullYear()} KisanSetu
        </p>
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="flex flex-1 flex-col px-6 py-8 sm:px-12 md:px-16 lg:px-24 md:justify-center">

        {/* MOBILE LOGO + LANGUAGE */}
        <div className="mb-10 flex items-center justify-between md:absolute md:right-10 md:top-8 md:mb-0">

          <Link
            to="/"
            className="text-xl font-bold text-green-700 dark:text-green-400 md:hidden"
          >
            Kisan<span className="text-green-900 dark:text-green-200">
              Setu
            </span>
          </Link>

          <div className="relative ml-auto">
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="appearance-none rounded-full border border-green-200 bg-white px-4 py-2 pr-8 text-sm font-medium text-gray-700 shadow-sm outline-none transition hover:border-green-400 dark:border-green-900 dark:bg-[#111311] dark:text-gray-200"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md">

          {/* LOGIN / SIGNUP TOGGLE */}
          <div className="relative mb-10 grid grid-cols-2 rounded-full bg-green-50 p-1 text-sm font-medium dark:bg-[#111311]">

            <span
              className="absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-white shadow-sm transition-transform duration-300 ease-out dark:bg-[#1c211d]"
              style={{
                transform: isLogin
                  ? "translateX(4px)"
                  : "translateX(calc(100% + 4px))",
              }}
            />

            <button
              type="button"
              onClick={() => setMode("login")}
              className={`relative z-10 rounded-full py-2.5 transition-colors ${
                isLogin
                  ? "text-green-800 dark:text-green-300"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {t("logInNow")}
            </button>

            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`relative z-10 rounded-full py-2.5 transition-colors ${
                !isLogin
                  ? "text-green-800 dark:text-green-300"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {t("signUpNow")}
            </button>
          </div>

          {/* HEADING */}
          <h2 className="font-display text-3xl font-semibold text-gray-900 dark:text-white">
            {isLogin ? t("loginWelcome") : t("signupWelcome")}
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
            {isLogin ? t("loginSubtitle") : t("signupSubtitle")}
          </p>

          {/* FORM */}
          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >

            {/* FULL NAME */}
            {!isLogin && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("fullName")}
                </label>

                <input
                  type="text"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-gray-800 dark:bg-[#111311] dark:text-white dark:focus:ring-green-900"
                />
              </div>
            )}

            {/* EMAIL */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("emailAddress")}
              </label>

              <input
                type="email"
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-gray-800 dark:bg-[#111311] dark:text-white dark:focus:ring-green-900"
              />
            </div>

            {/* PHONE */}
            {!isLogin && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("phoneNumber")}
                </label>

                <input
                  type="tel"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-gray-800 dark:bg-[#111311] dark:text-white dark:focus:ring-green-900"
                />
              </div>
            )}

            {/* PASSWORD */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("password")}
              </label>

              <div className="relative">

                <input
                  type={showPass ? "text" : "password"}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-11 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-gray-800 dark:bg-[#111311] dark:text-white dark:focus:ring-green-900"
                />

                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600"
                >
                  <EyeIcon open={showPass} />
                </button>

              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            {!isLogin && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("confirmPassword")}
                </label>

                <div className="relative">

                  <input
                    type={showConfirm ? "text" : "password"}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-11 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-gray-800 dark:bg-[#111311] dark:text-white dark:focus:ring-green-900"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600"
                  >
                    <EyeIcon open={showConfirm} />
                  </button>

                </div>
              </div>
            )}

            {/* REMEMBER + FORGOT */}
            {isLogin && (
              <div className="flex items-center justify-between text-sm">

                <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />

                  {t("rememberMe")}
                </label>

                <button
                  type="button"
                  className="font-medium text-green-700 hover:text-green-800 dark:text-green-400"
                >
                  {t("forgotPassword")}
                </button>

              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full rounded-xl bg-green-700 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 active:scale-[0.99]"
            >
              {isLogin ? t("loginButton") : t("signupButton")}
            </button>

          </form>

          {/* DIVIDER */}
          <div className="my-7 flex items-center gap-4 text-xs text-gray-400">
            <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />

            {t("orContinueWith")}

            <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* GOOGLE */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-gray-800 dark:bg-[#111311] dark:text-gray-200"
          >
            <GoogleIcon />
            {t("continueWithGoogle")}
          </button>

          {/* SWITCH LOGIN/SIGNUP */}
          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">

            {isLogin
              ? t("noAccountYet")
              : t("alreadyHaveAccount")}{" "}

            <button
              type="button"
              onClick={() => setMode(isLogin ? "signup" : "login")}
              className="font-semibold text-green-700 hover:text-green-800 dark:text-green-400"
            >
              {isLogin ? t("signUpNow") : t("logInNow")}
            </button>

          </p>

          {/* TERMS */}
          <p className="mt-4 text-center text-xs leading-5 text-gray-400 dark:text-gray-600">
            {t("termsAgreement")}
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;