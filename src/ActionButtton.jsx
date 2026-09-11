import React from "react";
const ActionButtton = ({ news, saves, deletes, searches, prints, readonlys, treebutton, globalsearch, login, changepassword, changeskin, contact, pdf, imports, download, userRights, colorValue, foreValue, newButton, screenHeader, isLoading }) => {
  const menuButtons = [
    { key: "news", label: "New", action: news },
    { key: "saves", label: "Save", action: saves },
    { key: "deletes", label: "Delete", action: deletes },
    { key: "search", label: "Search", action: searches },
    { key: "prints", label: "Prints", action: prints },
    { key: "treebutton", label: "TreeButton", action: treebutton },
    { key: "globalsearch", label: "Globalsearch", action: globalsearch },
    { key: "login", label: "Login", action: login },
    { key: "changepassword", label: "Changepassword", action: changepassword },
    { key: "changeskin", label: "Changeskin", action: changeskin },
    { key: "contact", label: "Contact", action: contact },
    { key: "pdf", label: "Pdf", action: pdf },
    { key: "imports", label: "Import", action: imports },
    { key: "download", label: "Download", action: download },
  ];

  return (
    <div className="container-fluid" style={{ cursor: isLoading ? "wait" : "default" }}>
      <div className="row">
        <ul className="bg-white boxShadow" style={{ display: "flex", justifyContent: "space-between" }}>
          <li className="boxShadow" style={{ margin: "0px", padding: "0px", float: "left" }}>
            <h3 className="p-0 m-0 fw-bold">{screenHeader}</h3>
          </li>{" "}
          <li className="boxShadow" style={{ margin: "0px", padding: "0px", float: "right" }}>
            {menuButtons.map(
              (btn, index) =>
                userRights[0][btn.key] === "T" && (
                  <li key={index} className="boxShadow me-2" style={{ justifyContent: "right" }}>
                    <button className={newButton === 1 ? "active-tabs  w-100" : "w-100"} style={{ backgroundColor: colorValue, minWidth: "50px" }} onClick={btn.action}>
                      {btn.label}
                    </button>
                  </li>
                ),
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ActionButtton;
