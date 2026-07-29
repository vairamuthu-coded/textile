import React from "react";

const TabNav = ({ tabs = [], onTabClick, colorValue, isActive }) => {
  const isTabActive = (tab) => {
    if (typeof isActive === "function") return isActive(tab);
    return false;
  };

  return (
    <ul
      className="nav nav-tabs overflow-auto"
      role="tablist"
      style={{
        backgroundColor: "rgba(110, 132, 134, 0.92)",
        borderRadius: "10px",
        padding: "3px",
        width: "100%",
        gap: "5px",
        alignItems: "center",
        whiteSpace: "nowrap",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
        backdropFilter: "blur(10px)",
      }}
    >
      {tabs.map((tab) => {
        const active = isTabActive(tab);
        return (
          <li className="nav-item" key={tab.id} style={{ minWidth: 130 }}>
            <button
              type="button"
              className={`nav-link ${active ? "active" : ""}`}
              role="tab"
              aria-selected={active}
              onClick={() => onTabClick(tab.id)}
              style={{
                backgroundColor: active ? "#ffffff" : "rgba(255,255,255,0.7)",
                border: active ? `1px solid ${colorValue}` : "1px solid transparent",
                borderRadius: "12px",
                minWidth: "100%",
                padding: "3px 5px",
                color: active ? colorValue : "var(--bs-dark)",
                fontWeight: 700,
                boxShadow: active ? `0 6px 18px rgba(0, 0, 0, 0.14)` : "0 1px 5px rgba(0, 0, 0, 0.08)",
                cursor: "pointer",
                whiteSpace: "normal",
                transition: "all 160ms ease-in-out",
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.transform = "none";
              }}
            >
              {tab.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default TabNav;
