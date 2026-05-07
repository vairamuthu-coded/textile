import React from "react";
const ActionButtton = ({ news, saves, deletes, searches, prints, readonlys, treebutton, globalsearch, login, changepassword, changeskin, contact, pdf, imports, download, userRights, colorValue, newButton }) => {
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
    <div>
      <ul className="boxShadow d-flex justify-content-end">
        {menuButtons.map(
          (btn, index) =>
            userRights[0][btn.key] === "T" && (
              <li key={index}>
                <button className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{ backgroundColor: colorValue }} onClick={btn.action}>
                  {btn.label}
                </button>
              </li>
            ),
        )}
      </ul>
    </div>
  );
};

export default ActionButtton;
