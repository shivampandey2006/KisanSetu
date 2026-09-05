const FALLBACK_MANDIS = [
  { name: "Karond Mandi", location: "Bhopal, Madhya Pradesh" },
  { name: "Bhopal Krishi Mandi", location: "Bhopal, Madhya Pradesh" },
  { name: "Sehore Mandi", location: "Sehore, Madhya Pradesh" },
];

function NearbyMandis({ mandis, onViewPrices }) {
  const list = mandis && mandis.length ? mandis : FALLBACK_MANDIS;

  return (
    <div className="mandi-list">
      {list.map((mandi) => (
        <div className="mandi-card" key={mandi.name}>
          <div className="mandi-icon">🏪</div>
          <div className="mandi-info">
            <h3>{mandi.name}</h3>
            <p>📍 {mandi.location}</p>
          </div>
          <div className="distance">
            <b>Live</b>
            <span>reporting</span>
          </div>
          <button onClick={() => onViewPrices && onViewPrices(mandi)}>
            View Prices →
          </button>
        </div>
      ))}
    </div>
  );
}

export default NearbyMandis;