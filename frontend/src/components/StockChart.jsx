import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function formatVolume(value) {
  if (value >= 1000000000) return (value / 1000000000).toFixed(2) + "B";
  if (value >= 1000000) return (value / 1000000).toFixed(2) + "M";
  if (value >= 1000) return (value / 1000).toFixed(2) + "K";
  return value;
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;

  return (
    <div className="custom-tooltip">
      <h4>{data.date}</h4>

      <p>Open: ${data.open}</p>
      <p>High: ${data.high}</p>
      <p>Low: ${data.low}</p>
      <p>Close: ${data.close}</p>
      <p>Volume: {formatVolume(data.volume)}</p>
    </div>
  );
}

function StockChart({ history, period, setPeriod }) {
  if (!history || history.length === 0) return null;

  const first = history[0].close;
  const last = history[history.length - 1].close;

  const positive = last >= first;

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

      <ResponsiveContainer width="100%" height={420}>

        <LineChart
          data={history}
          margin={{
            top: 10,
            right: 30,
            left: 10,
            bottom: 10,
          }}
        >

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
          />

          <XAxis
            dataKey="date"
            tick={{ fill: "#cbd5e1", fontSize: 11 }}
            minTickGap={40}
          />

          <YAxis
            tick={{ fill: "#cbd5e1" }}
            domain={["auto", "auto"]}
          />

          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="close"
            stroke={positive ? "#22c55e" : "#ef4444"}
            strokeWidth={3}
            dot={false}
            animationDuration={1200}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default StockChart;