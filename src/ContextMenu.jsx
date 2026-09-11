import React, { useEffect } from "react";

const ContextMenu = ({ contextMenu, setContextMenu, onInsertBefore, onInsertAfter, onDelete, onDeleteAll }) => {
  const closeMenu = () => {
    setContextMenu((prev) => (prev.visible ? { ...prev, visible: false } : prev));
  };

  useEffect(() => {
    const handleClick = () => closeMenu();
    const handleRightClick = () => closeMenu();
    const handleEsc = (e) => {
      if (e.key === "Escape") closeMenu();
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleRightClick);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleRightClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  if (!contextMenu.visible) return null;

  return (
    <div
      className="context-menu"
      style={{
        position: "absolute",
        top: contextMenu.y,
        left: contextMenu.x,
      }}
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.stopPropagation()}
    >
      <div className="menu-item" onClick={onInsertBefore}>
        Insert Before
      </div>

      <div className="menu-item" onClick={onInsertAfter}>
        Insert After
      </div>

      <div className="menu-item" onClick={onDeleteAll}>
        Delete All
      </div>

      <div className="menu-item" onClick={onDelete}>
        Delete
      </div>
    </div>
  );
};

export default ContextMenu;
