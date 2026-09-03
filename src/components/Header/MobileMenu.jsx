import { X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { navItems } from "../../Data/Navigation";

const MobileMenu = ({ isOpen, setIsOpen }) => {

  if (!isOpen) return null;

  return (
    <div className="lg:hidden border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">

      <div className="mx-auto w-[92%] py-4">

        {/* Close */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-500">
            Navigation
          </span>

          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Links */}
        <div className="space-y-1">

          {navItems.map((item) => (
            <div key={item.name}>

              <Link
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-green-400"
              >
                <span>{item.name}</span>

                {item.dropdown && (
                  <ChevronDown size={16} />
                )}
              </Link>

              {/* Mobile Submenu */}
              {item.dropdown && (
                <div className="ml-4 border-l border-gray-200 pl-2 dark:border-gray-700">

                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.path}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-green-50 hover:text-green-700 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                      {subItem.name}
                    </Link>
                  ))}

                </div>
              )}

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default MobileMenu;