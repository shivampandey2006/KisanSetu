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

const App = () => {
 const location = useLocation();

  const isLoginPage = location.pathname === "/login"
  const isMoreToKnowPage = location.pathname === "/more-to-know";
  

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
           <ScrollToTop />

      <ScrollProgress />

      {/* Header sirf Login page ke alawa */}
    
      {!isLoginPage && !isMoreToKnowPage && <Header />}
      {/* {!isLoginPage && <Header />} */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/more-to-know" element={<MoreToKnow />} />
      </Routes>

      {/* Footer sirf Login page ke alawa */}
      {!isLoginPage && <Footer />}

    </div>
  );
};

export default App;