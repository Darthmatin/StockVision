import { useEffect, useState } from "react";
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

  const fetchStock = async () => {
    try {
      setLoading(true);
      setError("");

      const [stockRes, historyRes, companyRes] = await Promise.all([
        api.get(`/stock/${ticker}`),
        api.get(`/history/${ticker}?period=${period}`),
        api.get(`/company/${ticker}`),
      ]);

      setStock(stockRes.data);
      setHistory(historyRes.data);
      setCompany(companyRes.data);
    } catch (err) {
      console.error(err);
      setError("Unable to fetch stock data.");
      setStock(null);
      setHistory([]);
      setCompany(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
  }, [period]);

  return (
    <>
      <Navbar />

      <div className="container">
        <SearchBar
          ticker={ticker}
          setTicker={setTicker}
          onSearch={fetchStock}
        />

        {loading && <h2>Loading...</h2>}

        {error && <h2>{error}</h2>}

        {stock && (
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

            <CompanyInfo company={company} />
          </>
        )}
      </div>
    </>
  );
}

export default App;