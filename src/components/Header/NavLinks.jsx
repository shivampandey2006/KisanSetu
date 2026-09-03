import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

import { navItems } from "../../Data/Navigation";
import { useLanguage } from "../../Context/LanguageContext";


const NavLinks = () => {

  const { t } = useLanguage();


  return (
    <nav className="hidden items-center gap-1 lg:flex">

      {navItems.map((item) => (

        <div
          key={item.name}
          className="group relative"
        >

          <Link
            to={item.path}
            className="
              flex
              items-center
              gap-1
              rounded-lg
              px-3
              py-2
              text-sm
              font-medium
              text-gray-700
              transition
              hover:bg-green-50
              hover:text-green-700
              dark:text-gray-300
              dark:hover:bg-gray-900
              dark:hover:text-green-400
            "
          >

            {t(item.name)}

            {item.dropdown && (
              <ChevronDown
                size={15}
                className="
                  transition-transform
                  duration-200
                  group-hover:rotate-180
                "
              />
            )}

          </Link>


          {/* Dropdown */}
          {item.dropdown && (

            <div
              className="
                invisible
                absolute
                left-0
                top-full
                z-50
                mt-2
                w-56
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
                dark:border-gray-800
                dark:bg-gray-900
              "
            >

              {item.dropdown.map((subItem) => (

                <Link
                  key={subItem.name}
                  to={subItem.path}
                  className="
                    block
                    rounded-lg
                    px-3
                    py-2.5
                    text-sm
                    text-gray-600
                    transition
                    hover:bg-green-50
                    hover:text-green-700
                    dark:text-gray-300
                    dark:hover:bg-gray-800
                    dark:hover:text-green-400
                  "
                >
                  {t(subItem.name)}
                </Link>

              ))}

            </div>

          )}

        </div>

      ))}

    </nav>
  );
};

export default NavLinks;