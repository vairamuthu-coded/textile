import React, { useMemo, useState } from "react";

const SortableTable = ({ columns = [], rows = [], colorValue, foreValue, bgValue, maxHeight, id, id1, reverseRows = true, noDataComponent }) => {
  const [sortConfig, setSortConfig] = useState({ field: "", order: "asc" });

  const visibleColumnCount = columns.filter((col) => `${col.HeaderVisible}` === "visible").length || 1;

  const sortedRows = useMemo(() => {
    if (!sortConfig.field || !Array.isArray(rows)) return rows || [];

    const colIndex = columns.findIndex((col) => col.field === sortConfig.field);
    if (colIndex === -1) return rows || [];

    return [...rows].sort((a, b) => {
      const aValue = String(a[colIndex]?.value ?? "").toLowerCase();
      const bValue = String(b[colIndex]?.value ?? "").toLowerCase();
      if (aValue < bValue) return sortConfig.order === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.order === "asc" ? 1 : -1;
      return 0;
    });
  }, [rows, columns, sortConfig]);

  const toggleTableSort = (field) => {
    setSortConfig((prev) => ({
      field,
      order: prev.field === field ? (prev.order === "asc" ? "desc" : "asc") : "asc",
    }));
  };

  const renderEmptyState = () => (
    <tr>
      <td colSpan={visibleColumnCount} style={{ padding: "16px 8px", textAlign: "center" }}>
        {noDataComponent ? noDataComponent : "No data available"}
      </td>
    </tr>
  );

  return (
    <div className="table-responsive" style={{ maxHeight, backgroundColor: bgValue, border: `1px solid ${bgValue}`, borderRadius: "0.1em", padding: "0.5%" }}>
      <table className="table table-striped" id={id} tabIndex="0" style={{ minWidth: "100%", marginBottom: 0, borderCollapse: "separate" }}>
        <thead>
          <tr>
            {columns.map((h, index) => {
              if (`${h.HeaderVisible}` !== "visible") return null;
              const isActive = sortConfig.field === h.field;
              const sortArrow = isActive ? (sortConfig.order === "asc" ? " ▲" : " ▼") : "";
              return (
                <th
                  key={index}
                  width={h.widths}
                  onClick={() => toggleTableSort(h.field)}
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 0,
                    backgroundColor: `${colorValue}`,
                    color: `${foreValue}`,
                    margin: "0",
                    padding: "6px 8px",
                    borderLeft: `1px solid ${colorValue}`,
                    textAlign: "left",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  name={h.field}
                >
                  {h.field.toUpperCase()}
                  {sortArrow}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody id={`${id}1`}>
          {!sortedRows || sortedRows.length < 1
            ? renderEmptyState()
            : (reverseRows ? [...sortedRows].reverse() : sortedRows).map((row, index) => (
                <tr key={index} style={{ margin: "0", padding: "0" }} id={id1}>
                  {columns.map((cols, indx) =>
                    `${cols.HeaderVisible}` === "visible" ? (
                      <td key={indx} width={cols.widths} id={cols.field} name={[`${cols.field}`]} value={[`${row[indx]?.value}`]} style={{ padding: "4px 8px" }}>
                        {row[indx]?.value ?? ""}
                      </td>
                    ) : null,
                  )}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default SortableTable;
