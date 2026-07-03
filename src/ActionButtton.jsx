import React from "react";
const ActionButtton = ({ news, saves, deletes, searches, prints, readonlys, treebutton, globalsearch, login, changepassword, changeskin, contact, pdf, imports, download, userRights, colorValue, foreValue, newButton, screenHeader }) => {
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
    <div className="container-fluid " style={{ backgroundColor: "white", borderBottom: `1px solid ${colorValue}`, margin: "0px", padding: "0px" }}>
      <div className="row">
        <div className="col-12">
          <ul className="">
            <li className="boxShadow d-flex   flex-wrap list-unstyled p-0 m-0" style={{ margin: "0px", padding: "0px", float: "left" }}>
              <h3 className="p-0 m-0 fw-bold">{screenHeader}</h3>
            </li>
            {menuButtons.map(
              (btn, index) =>
                userRights[0][btn.key] === "T" && (
                  <li key={index} className="boxShadow d-flex justify-content-end  p-0 m-0" style={{ backgroundColor: foreValue, margin: "0px", color: colorValue, float: "right" }}>
                    <button className={newButton === 1 ? " active-tabs  w-100" : "  w-100"} style={{ backgroundColor: colorValue, minWidth: "50px" }} onClick={btn.action}>
                      {btn.label}
                    </button>
                  </li>
                ),
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActionButtton;
