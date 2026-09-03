import {
  Search,
  Globe,
  Sun,
  Moon,
  Bell,
  UserRound,
  Check,
} from "lucide-react";

import { useLanguage } from "../../Context/LanguageContext";
import { languages } from "../../Data/Translations";
import { Link } from "react-router-dom";

const NavAction = ({ darkMode, setDarkMode }) => {

  const {
    language,
    changeLanguage,
    t,
  } = useLanguage();


  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };


  return (
    <div className="flex items-center gap-0.5">

      {/* Search */}
      <button
        className="
          rounded-full
          p-2
          text-gray-600
          transition
          hover:bg-gray-100
          hover:text-green-600
          dark:text-gray-300
          dark:hover:bg-gray-800
        "
        aria-label={t("search")}
      >
        <Search size={18} />
      </button>


      {/* Language */}
      <div className="group relative">

        <button
          className="
            hidden
            items-center
            gap-1
            rounded-lg
            px-2
            py-2
            text-sm
            font-medium
            text-gray-700
            transition
            hover:bg-gray-100
            dark:text-gray-300
            dark:hover:bg-gray-800
            sm:flex
          "
        >
          <Globe size={17} />

          <span>
            {
              languages.find(
                (item) => item.code === language
              )?.nativeName
            }
          </span>
        </button>


        {/* Language Dropdown */}
        <div
          className="
            invisible
            absolute
            right-0
            top-full
            z-50
            mt-2
            w-52
            translate-y-2
            rounded-xl
            border
            border-gray-200
            bg-white
            p-2
            opacity-0
            shadow-xl
            transition-all
            duration-200
            group-hover:visible
            group-hover:translate-y-0
            group-hover:opacity-100
            dark:border-gray-700
            dark:bg-gray-900
          "
        >

          <div className="px-3 py-2">

            <p className="
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-gray-400
            ">
              {t("language")}
            </p>

          </div>


          {languages.map((item) => (

            <button
              key={item.code}
              onClick={() => changeLanguage(item.code)}
              className="
                flex
                w-full
                items-center
                justify-between
                rounded-lg
                px-3
                py-2.5
                text-left
                text-sm
                text-gray-700
                transition
                hover:bg-green-50
                hover:text-green-700
                dark:text-gray-300
                dark:hover:bg-gray-800
                dark:hover:text-green-400
              "
            >

              <span>
                {item.nativeName}
              </span>

              {language === item.code && (
                <Check
                  size={16}
                  className="text-green-600"
                />
              )}

            </button>

          ))}

        </div>

      </div>


      {/* Dark / Light Mode */}
      <button
        onClick={toggleTheme}
        className="
          rounded-full
          p-2
          text-gray-600
          transition
          hover:bg-gray-100
          hover:text-green-600
          dark:text-gray-300
          dark:hover:bg-gray-800
        "
        aria-label="Toggle Theme"
      >
        {darkMode ? (
          <Sun size={18} />
        ) : (
          <Moon size={18} />
        )}
      </button>


      {/* Notification */}
      <button
        className="
          relative
          hidden
          rounded-full
          p-2
          text-gray-600
          transition
          hover:bg-gray-100
          hover:text-green-600
          dark:text-gray-300
          dark:hover:bg-gray-800
          sm:block
        "
        aria-label={t("notifications")}
      >
        <Bell size={18} />

        <span
          className="
            absolute
            right-1
            top-1
            h-1.5
            w-1.5
            rounded-full
            bg-red-500
          "
        />
      </button>


      {/* Login */}
      <button
        className="
          ml-1
          hidden
          items-center
          gap-1.5
          rounded-lg
          border
          border-green-600
          px-3
          py-2
          text-sm
          font-semibold
          text-green-700
          transition
          hover:bg-green-600
          hover:text-white
          dark:border-green-500
          dark:text-green-400
          dark:hover:bg-green-600
          dark:hover:text-white
          sm:flex
        "
      >
        <UserRound size={16} />

        <span>
        
<Link to="/login">
  {t("login")}
</Link>
        </span>

      </button>

    </div>
  );
};

export default NavAction;