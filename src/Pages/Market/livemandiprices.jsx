function LivePriceCard({ data }) {
  const isPositive = data.change?.includes("+"); // safe-check — AGMARKNET API se "change" nahi milta

  return (
    <div className="price-card">
      <div className="price-card-top">
        <span className="crop-icon">{data.emoji}</span>

        {data.change && (
          <span className={isPositive ? "positive" : "negative"}>
            {data.change}
          </span>
        )}
      </div>

      <h3>{data.crop}</h3>

      <p className="mandi-name">📍 {data.mandi}</p>

      <div className="modal-price">
        ₹{data.modal}
        <span>/ quintal</span>
      </div>

      <div className="price-range">
        <span>
          Min
          <b>₹{data.min}</b>
        </span>

        <span>
          Max
          <b>₹{data.max}</b>
        </span>
      </div>
    </div>
  );
}

export default LivePriceCard;