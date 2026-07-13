function formatVolume(volume) {
  if (volume >= 1000000000) {
    return (volume / 1000000000).toFixed(2) + "B";
  }

  if (volume >= 1000000) {
    return (volume / 1000000).toFixed(2) + "M";
  }

  if (volume >= 1000) {
    return (volume / 1000).toFixed(2) + "K";
  }

  return volume;
}

function StockCard({ stock }) {
  if (!stock) return null;

  const change =
    stock.previous_close !== null
      ? stock.current_price - stock.previous_close
      : 0;

  const percent =
    stock.previous_close !== null
      ? (change / stock.previous_close) * 100
      : 0;

  const positive = change >= 0;

  return (
    <div className="stock-card">

      <h2>{stock.ticker}</h2>

      <h1>${stock.current_price}</h1>

      <h3
        style={{
          color: positive ? "#22c55e" : "#ef4444",
        }}
      >
        {positive ? "▲" : "▼"} {change.toFixed(2)} (
        {percent.toFixed(2)}%)
      </h3>

      <div className="stock-grid">

        <div>
          <h4>Day High</h4>
          <p>${stock.day_high}</p>
        </div>

        <div>
          <h4>Day Low</h4>
          <p>${stock.day_low}</p>
        </div>

        <div>
          <h4>Volume</h4>
          <p>{formatVolume(stock.volume)}</p>
        </div>

        <div>
          <h4>Previous Close</h4>
          <p>${stock.previous_close}</p>
        </div>

      </div>

    </div>
  );
}

export default StockCard;