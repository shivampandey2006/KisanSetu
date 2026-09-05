import { useState, useEffect } from "react";
import { fetchPriceTrend } from "../../../services/ksmarket";

function PriceTrendChart({ commodities = [] }) {
  const [selectedCrop, setSelectedCrop] = useState(commodities[0] || "Wheat");
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // if the live prices list loads after this component mounts, pick a real crop
  useEffect(() => {
    if (commodities.length && !commodities.includes(selectedCrop)) {
      setSelectedCrop(commodities[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commodities]);

  useEffect(() => {
    if (!selectedCrop) return;
    let cancelled = false;

    async function loadTrend() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPriceTrend({ commodity: selectedCrop });
        if (!cancelled) setTrendData(data);
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("Trend load nahi ho paaya.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadTrend();
    return () => { cancelled = true; };
  }, [selectedCrop]);

  const maxPrice = trendData.length ? Math.max(...trendData.map((d) => d.price)) : 1;

  return (
    <div className="trend-container">
      <div className="trend-header">
        <h3>{selectedCrop} Price Trend</h3>

        <select value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)}>
          {(commodities.length ? commodities : [selectedCrop]).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {loading && <p style={{ marginTop: "20px", color: "#777" }}>Loading trend…</p>}
      {error && <p style={{ marginTop: "20px", color: "#d32f2f" }}>{error}</p>}

      {!loading && !error && trendData.length === 0 && (
        <p style={{ marginTop: "20px", color: "#777" }}>
          Pichle 7 din mein is crop ka koi reported price nahi mila is mandi mein.
        </p>
      )}

      {/* Only one day of data reported — a single-bar "chart" is meaningless,
          so show today's price as a clean stat instead. */}
      {!loading && !error && trendData.length === 1 && (
        <div
          style={{
            marginTop: "24px",
            display: "flex",
            alignItems: "baseline",
            gap: "14px",
            padding: "18px 22px",
            background: "#F4F8F1",
            borderRadius: "14px",
          }}
        >
          <span style={{ fontSize: "34px", fontWeight: 700, color: "#2E7D32" }}>
            ₹{trendData[0].price}
          </span>
          <span style={{ fontSize: "13px", color: "#777" }}>
            / quintal · reported on {trendData[0].day}
          </span>
        </div>
      )}
      {!loading && !error && trendData.length === 1 && (
        <p style={{ marginTop: "10px", fontSize: "12.5px", color: "#999" }}>
          Sirf ek din ka data mila — AGMARKNET history nahi rakhta, isliye trend line abhi nahi ban sakti.
        </p>
      )}

      {!loading && !error && trendData.length > 1 && (
        <div
          className="chart"
          style={trendData.length <= 3 ? { justifyContent: "flex-start", gap: "40px" } : undefined}
        >
          {trendData.map((item, i) => (
            <div className="bar-item" key={`${item.day}-${i}`}>
              <span className="bar-price">₹{item.price}</span>
              <div
                className="bar"
                style={{ height: `${(item.price / maxPrice) * 200}px` }}
              ></div>
              <span>{item.day}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PriceTrendChart;