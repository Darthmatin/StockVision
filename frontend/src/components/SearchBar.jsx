function SearchBar({ ticker, setTicker, onSearch }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Enter Stock Ticker (e.g. AAPL)"
        value={ticker}
        onChange={(e) => setTicker(e.target.value.toUpperCase())}
        onKeyDown={handleKeyDown}
      />

      <button onClick={onSearch}>🔍 Search</button>
    </div>
  );
}

export default SearchBar;