import React from "react";
const TableRow = ({ item, columns, EditData, index, checkall, setCheckchild, checkchild }) => {
  return (
    <tr key={index} onClick={() => EditData(item)} style={{ height: "100%", overflow: "auto", fontFamily: `${"var(--bs-font-roboto)"}`, fontSize: `${"var(--bs-font-sm)"}`, fontStyle: "italic" }}>
      {columns.map((columnitem, indx) => {
        return (
          <td key={indx}>
            {`${columnitem.field}` === "visible" ? <input type="checkbox" checked={checkall === true ? checkall : null} onChange={(e) => setCheckchild(e.target.checked)} /> : `${columnitem.field}` === "SNo" ? index + 1 : item[`${columnitem.field}`]}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;
