import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function StockChart({
  history,
  period,
  setPeriod
}) {
  if (!history || history.length === 0) return null;

  return (
    <div className="chart-card">

      <div className="chart-header">

        <h2>📈 Price History</h2>

        <div className="period-buttons">

          <button
            className={period === "1mo" ? "active" : ""}
            onClick={() => setPeriod("1mo")}
          >
            1M
          </button>

          <button
            className={period === "6mo" ? "active" : ""}
            onClick={() => setPeriod("6mo")}
          >
            6M
          </button>

          <button
            className={period === "1y" ? "active" : ""}
            onClick={() => setPeriod("1y")}
          >
            1Y
          </button>

          <button
            className={period === "5y" ? "active" : ""}
            onClick={() => setPeriod("5y")}
          >
            5Y
          </button>

        </div>

      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={history}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date"/>

          <YAxis domain={["auto","auto"]}/>

          <Tooltip/>

          <Line
            dataKey="close"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default StockChart;