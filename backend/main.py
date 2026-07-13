from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Welcome to StockVision API!"
    }


@app.get("/stock/{ticker}")
def get_stock(ticker: str):

    stock = yf.Ticker(ticker)

    history = stock.history(period="2d")

    if history.empty:
        return {
            "error": "Stock not found"
        }

    latest = history.iloc[-1]

    previous_close = None

    if len(history) > 1:
        previous_close = round(float(history.iloc[-2]["Close"]), 2)

    return {
        "ticker": ticker.upper(),
        "current_price": round(float(latest["Close"]), 2),
        "day_high": round(float(latest["High"]), 2),
        "day_low": round(float(latest["Low"]), 2),
        "volume": int(latest["Volume"]),
        "previous_close": previous_close
    }


@app.get("/history/{ticker}")
def get_history(
    ticker: str,
    period: str = "1y"
):

    stock = yf.Ticker(ticker)

    history = stock.history(period=period)

    if history.empty:
        return []

    data = []

    for index, row in history.iterrows():
        data.append({
            "date": index.strftime("%Y-%m-%d"),
            "open": round(float(row["Open"]), 2),
            "high": round(float(row["High"]), 2),
            "low": round(float(row["Low"]), 2),
            "close": round(float(row["Close"]), 2),
            "volume": int(row["Volume"])
        })

    return data


@app.get("/company/{ticker}")
def get_company(ticker: str):

    stock = yf.Ticker(ticker)

    info = stock.info

    return {
        "ticker": ticker.upper(),
        "name": info.get("longName"),
        "sector": info.get("sector"),
        "industry": info.get("industry"),
        "country": info.get("country"),
        "website": info.get("website"),
        "market_cap": info.get("marketCap")
    }