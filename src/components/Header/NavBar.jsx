import { Menu } from "lucide-react";
import NavLinks from "./NavLinks";
import NavAction from "./NavAction";

const NavBar = ({
  darkMode,
  setDarkMode,
  setIsMobileMenuOpen,
}) => {
  return (
    <div
      className="
        w-full
        border-b border-gray-200
        bg-white
        dark:border-gray-800
        dark:bg-gray-950
      "
    >
      <div
        className="
          mx-auto
          flex
          h-20
          w-[94%]
          max-w-7xl
          items-center
          justify-between
          gap-3
        "
      >

{/* Logo */}
<div className="flex shrink-0 items-center gap-2.5">

  {/* Circular Logo */}
  <div className="
    h-15 w-15
    shrink-0
    overflow-hidden
    rounded-full
    border-2
    border-green-600
    bg-white
    shadow-sm
  ">
    <img
      src="https://i.pinimg.com/474x/86/ac/cb/86accbea31b719dea35425f4e260b2c3.jpg"
      alt="KisanSetu Logo"
      className="h-full w-full object-cover"
    />
  </div>

  {/* Website Name */}
  <div className="leading-tight">
    <h1 className="
      text-lg
      font-bold
      tracking-tight
      text-gray-900
      dark:text-white
      sm:text-xl
    ">
      Kisan<span className="text-green-600">Setu</span>
    </h1>

    <p className="
      hidden
      text-[9px]
      font-medium
      uppercase
      tracking-wider
      text-gray-400
      sm:block
    ">
      Empowering Farmers
    </p>
  </div>

</div>


        {/* ================= DESKTOP NAVIGATION ================= */}
        <NavLinks />


        {/* ================= RIGHT SIDE ================= */}
        <div className="flex shrink-0 items-center">

          <NavAction
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />


          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="
              ml-1
              rounded-lg
              p-2
              text-gray-700
              transition
              hover:bg-gray-100
              dark:text-gray-300
              dark:hover:bg-gray-800
              lg:hidden
            "
            aria-label="Open Menu"
          >
            <Menu size={22} />
          </button>

        </div>

      </div>
    </div>
  );
};

export default NavBar;