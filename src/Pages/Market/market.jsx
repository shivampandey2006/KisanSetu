import { useState, useEffect, useMemo, useRef } from "react";
import LivePriceCard from "./components/livemandiprices";
import NearbyMandis from "./components/nearbymandis";
import PriceTrendChart from "./components/pricetrends";
import { fetchMandiPrices } from "../../services/ksmarket";
import "./components/styles/Market.css";

function Market() {
  const [search, setSearch] = useState("");
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mandiFilter, setMandiFilter] = useState(null); // { name, district } | null
 
  const livePricesRef = useRef(null);
 
  useEffect(() => {
    async function loadPrices() {
      try {
        setLoading(true);
        const data = await fetchMandiPrices({ state: "Madhya Pradesh", limit: 50 });
        setPrices(data);
      } catch (err) {
        console.error(err);
        setError("Live prices load nahi ho paayi. Baad mein try karein.");
      } finally {
        setLoading(false);
      }
    }
    loadPrices();
  }, []);
 
  // unique crop names actually present in the live data — feeds the trend dropdown
  const availableCommodities = useMemo(
    () => [...new Set(prices.map((p) => p.crop))].sort(),
    [prices]
  );
 
  // derive "Nearby Mandis" from markets that actually reported data today,
  // so "View Prices" always finds a match instead of pointing at a fixed
  // city (Bhopal/Sehore) that may not have reported anything today.
  const nearbyMandis = useMemo(() => {
    const seen = new Map();
    prices.forEach((p) => {
      if (!seen.has(p.mandi)) {
        seen.set(p.mandi, { name: p.mandi, location: `${p.district}, ${p.state}` });
      }
    });
    return [...seen.values()].slice(0, 4);
  }, [prices]);
 
  const filteredPrices = useMemo(() => {
    return prices.filter((item) => {
      const matchesSearch = item.crop.toLowerCase().includes(search.toLowerCase());
      const matchesMandi = !mandiFilter
        || item.district?.toLowerCase().includes(mandiFilter.district.toLowerCase())
        || item.mandi?.toLowerCase().includes(mandiFilter.district.toLowerCase());
      return matchesSearch && matchesMandi;
    });
  }, [prices, search, mandiFilter]);
 
  function handleViewPrices(mandi) {
    // mandi.location looks like "Bhopal, Madhya Pradesh" — take the city/district part
    const district = mandi.location.split(",")[0].trim();
    setMandiFilter({ name: mandi.name, district });
    setSearch("");
    livePricesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
 
  function clearMandiFilter() {
    setMandiFilter(null);
  }
 
  return (
    <main className="market-page">
      {/* Header */}
      <section className="market-hero">
        <div>
          <p className="market-tag">🌾 AGRICULTURE MARKET</p>
          <h1>Live Mandi Market</h1>
          <p>Check latest crop prices, nearby mandis and market trends.</p>
        </div>
 
        <input
          className="market-search"
          type="text"
          placeholder="Search crop..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (mandiFilter) setMandiFilter(null);
          }}
        />
      </section>
 
      {/* Live Prices */}
      <section className="market-section" ref={livePricesRef}>
        <div className="section-title">
          <div>
            <h2>🔴 Live Mandi Prices</h2>
            <p>
              {mandiFilter
                ? <>Showing prices near <b>{mandiFilter.name}</b> — <a href="#" onClick={(e) => { e.preventDefault(); clearMandiFilter(); }}>clear filter</a></>
                : "Latest prices from agricultural markets"}
            </p>
          </div>
 
          <span className="live-badge">
            <span className="live-dot"></span>
            LIVE
          </span>
        </div>
 
        {loading && <p>Loading live prices…</p>}
        {error && <p style={{ color: "#d32f2f" }}>{error}</p>}
 
        {!loading && !error && filteredPrices.length === 0 && (
          <p style={{ color: "#777" }}>
            Is filter ke liye koi price nahi mila — <a href="#" onClick={(e) => { e.preventDefault(); clearMandiFilter(); setSearch(""); }}>reset karein</a>.
          </p>
        )}
 
        {!loading && !error && filteredPrices.length > 0 && (
          <div className="price-grid">
            {filteredPrices.map((item, i) => (
              <LivePriceCard key={`${item.crop}-${item.mandi}-${i}`} data={item} />
            ))}
          </div>
        )}
      </section>
 
      {/* Nearby Mandis */}
      <section className="market-section">
        <div className="section-title">
          <div>
            <h2>📍 Nearby Mandis</h2>
            <p>Find agricultural markets near you</p>
          </div>
        </div>
 
        <NearbyMandis mandis={nearbyMandis} onViewPrices={handleViewPrices} />
      </section>
 
      {/* Price Trends */}
      <section className="market-section">
        <div className="section-title">
          <div>
            <h2>📈 Price Trends</h2>
            <p>Track how crop prices are changing</p>
          </div>
        </div>
 
        <PriceTrendChart commodities={availableCommodities} />
      </section>
    </main>
  );
}
 
export default Market;