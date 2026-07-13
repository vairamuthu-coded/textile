const ResponsiveTabs = ({ data = [], activeIndex = 0, onChange, colorValue, foreValue }) => {
  return (
    <div className="container-fluid" style={{ borderBottom: `1px solid ${colorValue}`, backgroundImage: `url("../Images/Toolbar.bmp")` }}>
      {data.map((item, index) => (
        <div
          key={index}
          onClick={() => onChange(index, item.menunameid)}
          className={`btn${activeIndex === index ? "" : ""}`}
          style={{
            color: `${activeIndex === index ? foreValue : colorValue}`,
            backgroundColor: `${activeIndex === index ? colorValue : "transparent"}`,
            whiteSpace: "nowrap",
            border: "none",
            margin: "0px",

            flexShrink: 0,
            fontSize: "var(--bs-font)",
            width: "auto",
          }}
        >
          {item.menuname}
        </div>
      ))}
    </div>
  );
};

export default ResponsiveTabs;
