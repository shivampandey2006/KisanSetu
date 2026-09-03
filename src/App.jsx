import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ScrollProgress from "./components/ScrollProgress";

import Home from "./Pages/Home/Homes";
import Login from "./Pages/Login/Login";
import MarketPlace from "./Pages/MarketPlace/MarketPlace";
import MoreToKnow from "./components/HowItHelps/MoreToKnow";
import ScrollToTop from "./components/ScrollToTop";
import FarmerDashboard from "./Pages/FarmerDashboard/FarmerDash";

const App = () => {
  const location = useLocation();

  const hideHeader =
    location.pathname === "/login" ||
    location.pathname === "/more-to-know" ||
    location.pathname === "/farmer-dashboard";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      
      <ScrollToTop />

      <ScrollProgress />

      {/* Header hidden on Login, More To Know & Farmer Dashboard */}
      {!hideHeader && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/marketplace" element={<MarketPlace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/more-to-know" element={<MoreToKnow />} />

        <Route
          path="/farmer-dashboard"
          element={<FarmerDashboard />}
        />
      </Routes>

      {/* Footer hidden only on Login */}
      {location.pathname !== "/login" && <Footer />}

    </div>
  );
};

export default App;