function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        📈 <span>StockVision</span>
      </div>

      <div className="nav-links">
        <span>Dashboard</span>
        <span>Markets</span>
        <span>Watchlist</span>
        <span>Portfolio</span>
      </div>
    </nav>
  );
}

export default Navbar;