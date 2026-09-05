import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ScrollProgress from "./components/ScrollProgress";

import Home from "./Pages/Home/Homes";
import Login from "./Pages/Login/Login";
//import MarketPlace from "./Pages/MarketPlace/MarketPlace";
import MoreToKnow from "./components/HowItHelps/MoreToKnow";
import ScrollToTop from "./components/ScrollToTop";

import FarmerDashboard from "./Pages/FarmerDashboard/FarmerDash";
import BuyerDashboard from "./Pages/BuyerDashboard/BuyerDashboard";
import SellProduce from "./Pages/MarketPlace/SellProduce";
import Seeds from "./Pages/MarketPlace/Seeds";
import Equipment from "./Pages/MarketPlace/Equipment";
import Cart from "./Pages/MarketPlace/Cart";
import Fertilizers from "./Pages/MarketPlace/Fertilizers";
import LiveMandiPrices from "./Pages/Market/LiveMandiPrices";
import Weather from "./Pages/Weather/Weather";

const App = () => {
  const location = useLocation();

  // Pages where the public Header should NOT appear
  const hideHeader =
    location.pathname === "/login" ||
    location.pathname === "/more-to-know" ||
    location.pathname === "/farmer-dashboard" ||
    location.pathname === "/buyer-dashboard";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      <ScrollToTop />

      <ScrollProgress />

      {/* Public Header */}
      {!hideHeader && <Header />}

      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Home />} />
{/* 
        <Route
          path="/marketplace"
          element={<MarketPlace />}
        /> */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/more-to-know"
          element={<MoreToKnow />}
        />

        {/* Farmer Dashboard */}
        <Route
          path="/farmer-dashboard"
          element={<FarmerDashboard />}
        />

        {/* Buyer Dashboard */}
        <Route
          path="/buyer-dashboard"
          element={<BuyerDashboard />}
        />

        <Route
  path="/marketplace/cart"
  element={<Cart />}
/>

<Route
  path="/marketplace/sell"
  element={<SellProduce />}




/>





<Route
  path="/marketplace/seeds"
  element={<Seeds />}
/>



<Route
  path="/marketplace/equipment"
  element={<Equipment />}
/>




<Route
  path="/marketplace/fertilizers"
  element={<Fertilizers />}
/>

<Route
  path="/market/mandi-prices"
  element={<LiveMandiPrices />}
/>

<Route path="/weather" element={<Weather />} />


      </Routes>

      {/* Footer */}
      {location.pathname !== "/login" && <Footer />}

    </div>
  );
};

export default App;