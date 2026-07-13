function formatMarketCap(value) {
  if (!value) return "N/A";

  if (value >= 1_000_000_000_000) {
    return (value / 1_000_000_000_000).toFixed(2) + "T";
  }

  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(2) + "B";
  }

  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(2) + "M";
  }

  return value;
}

function CompanyInfo({ company }) {
  if (!company) return null;

  return (
    <div className="company-card">

      <h2>🏢 Company Information</h2>

      <div className="company-grid">

        <div>
          <h4>Name</h4>
          <p>{company.name}</p>
        </div>

        <div>
          <h4>Sector</h4>
          <p>{company.sector}</p>
        </div>

        <div>
          <h4>Industry</h4>
          <p>{company.industry}</p>
        </div>

        <div>
          <h4>Country</h4>
          <p>{company.country}</p>
        </div>

        <div>
          <h4>Market Cap</h4>
          <p>{formatMarketCap(company.market_cap)}</p>
        </div>

        <div>
          <h4>Website</h4>
          <a
            href={company.website}
            target="_blank"
            rel="noreferrer"
          >
            Visit Website
          </a>
        </div>

      </div>

    </div>
  );
}

export default CompanyInfo;