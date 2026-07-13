import { useState, useEffect } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import StockCard from "./components/StockCard";
import StockChart from "./components/StockChart";
import CompanyInfo from "./components/CompanyInfo";

import api from "./services/api";

function App() {
  const [ticker, setTicker] = useState("AAPL");

  const [stock, setStock] = useState(null);
  const [history, setHistory] = useState([]);
  const [company, setCompany] = useState(null);

  const [period, setPeriod] = useState("1y");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const fetchStock = async (symbol = ticker) => {
  try {
    setLoading(true);
    setError("");

    const stockRes = await api.get(`/stock/${symbol}`);
    setStock(stockRes.data);

    const historyRes = await api.get(
      `/history/${symbol}?period=${period}`
    );
    setHistory(historyRes.data);

    const companyRes = await api.get(`/company/${symbol}`);
    setCompany(companyRes.data);

  } catch (err) {
    console.error(err);

    setError(
      err.response?.data?.detail ||
      err.message ||
      "Unable to fetch stock data."
    );

    setStock(null);
    setHistory([]);
    setCompany(null);

  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchStock(ticker);
  }, [period]);

  return (
    <>
      <Navbar />

      <div className="container">
        <SearchBar
          ticker={ticker}
          setTicker={setTicker}
          onSearch={() => fetchStock(ticker)}
        />

        {loading && <h2>Loading...</h2>}

        {error && (
          <h2 style={{ color: "red", marginTop: "20px" }}>
            {error}
          </h2>
        )}

        {!loading && stock && (
          <>
            <div className="dashboard">
              <div className="left-panel">
                <StockCard stock={stock} />
              </div>

              <div className="right-panel">
                <StockChart
                  history={history}
                  period={period}
                  setPeriod={setPeriod}
                />
              </div>
            </div>

            {company && <CompanyInfo company={company} />}
          </>
        )}
      </div>
    </>
  );
}

export default App;