import { useEffect, useState } from "react";

import TopBar from "./TopBar";
import NavBar from "./NavBar";
import MobileMenu from "./MobileMenu";

const Header = () => {

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Apply theme
  useEffect(() => {

    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

  }, [darkMode]);


  return (
    <header className="sticky top-0 z-50">

      <TopBar />

      <NavBar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />

    </header>
  );
};

export default Header;