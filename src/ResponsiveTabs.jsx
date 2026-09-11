const ResponsiveTabs = ({ data = [], activeIndex = 0, onChange, colorValue, foreValue }) => {
  return (
    <nav className="container-fluid" style={{ backgroundImage: `url("../Images/Toolbar.bmp")` }}>
      <div className="nav nav-pills nav-scroll" role="tablist" style={{ borderBottom: `1px solid ${colorValue}`, padding: "6px 0", width: "100%" }}>
        {data.map((item, index) => (
          <button
            key={index}
            onClick={() => onChange(index, item.menunameid)}
            className={`nav-link ${activeIndex === index ? "active" : ""}`}
            style={{
              color: `${activeIndex === index ? foreValue : colorValue}`,
              backgroundColor: `${activeIndex === index ? colorValue : "transparent"}`,
              whiteSpace: "nowrap",
              margin: "3px 3px",
              borderRadius: "999px",
              padding: "3px 7px",
              fontWeight: "bolder",
              border: "none",
              flexShrink: 0,
              fontSize: "var(--bs-font-sm)",
              width: "auto",
            }}
            aria-pressed={activeIndex === index}
          >
            {item.menuname}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default ResponsiveTabs;
