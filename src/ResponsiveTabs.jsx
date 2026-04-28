const ResponsiveTabs = ({ data = [], activeIndex = 0, onChange, colorValue, foreValue }) => {
  return (
    <div className="d-flex flex-nowrap flex-md-wrap justify-content-md-center gap-2 pb-2 overflow-auto" style={{ borderBottom: `1px solid ${colorValue}` }}>
      {data.map((item, index) => (
        <button
          key={index}
          onClick={() => onChange(index, item.menunameid)}
          className={`btn ${activeIndex === index ? "active-tabs" : "panel"}`}
          style={{
            color: `${activeIndex === index ? foreValue : colorValue}`,
            backgroundColor: `${activeIndex === index ? colorValue : "transparent"}`,
            whiteSpace: "nowrap",
            border: `1px solid ${colorValue}`,
            flexShrink: 0,
            fontSize: "var(--bs-font-sm)",
            width: "auto",
          }}
        >
          {item.menuname}
        </button>
      ))}
    </div>
    // <div className="d-flex flex-nowrap flex-md-wrap gap-2 pb-2 overflow-auto scroll-hide" style={{ borderBottom: `1px solid ${colorValue}` }}>
    //   {data.map((item, index) => (
    //     <button
    //       key={index}
    //       type="button"
    //       onClick={() => onChange(index, item.menunameid)}
    //       className={`btn ${activeIndex === index ? "active-tabs" : "panel"}`}
    //       style={{
    //         color: activeIndex === index ? foreValue : colorValue,
    //         backgroundColor: activeIndex === index ? colorValue : "transparent",
    //         border: `1px solid ${colorValue}`,
    //         whiteSpace: "nowrap",
    //         flexShrink: 0,
    //         fontSize: `${"var(--bs-font-sm)"}`,
    //         width: "auto",
    //       }}
    //     >
    //       {item.menuname}
    //     </button>
    //   ))}
    // </div>
  );
};

export default ResponsiveTabs;
