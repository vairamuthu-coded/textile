const Popup = ({ show, onClose, title, children, foreValue, colorValue, handlePopupSave, handlePopupClear, handlePopupPopulate, button1, button2, button3 }) => {
  if (!show) return null;
  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      role="dialog"
      style={{
        position: "fixed",
        inset: 0,
        top: "0",
        zIndex: 1055,
        backgroundColor: "rgba(0, 0, 0, 0.55)",
        overflow: "hidden",
      }}
    >
      <div className="modal-dialog modal-dialog-centered bg-white p-1">
        <div
          className="modal-content shadow-lg border-0"
          style={{
            height: "100%",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div
            className="modal-header p-1"
            style={{
              backgroundColor: colorValue,
              color: foreValue,
              minHeight: "22px",
              borderBottom: "1px solid rgba(0,0,0,0.2)",
            }}
          >
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: "100%",
                position: "relative",
              }}
            >
              <h6
                className="mb-0 fw-bold"
                style={{
                  fontSize: "15px",
                  color: "white",
                  letterSpacing: "0.3px",
                }}
              >
                {title}
              </h6>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-danger btn-sm d-flex align-items-center justify-content-center"
                title="Close"
                style={{
                  position: "absolute",
                  right: "0px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "20px",
                  height: "20px",
                  padding: 0,
                  borderRadius: "50%",
                  fontSize: "18px",
                  lineHeight: "1",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                ×
              </button>
            </div>
          </div>
          <div
            className="modal-body p-2"
            style={{
              flex: 1,
              overflowY: "auto",
              overflowX: "auto",
              backgroundColor: "#f8f9fa",
            }}
          >
            <div
              className="bg-white p-2"
              style={{
                minHeight: "100%",
                borderRadius: "6px",
                border: "1px solid #dee2e6",
              }}
            >
              {children}
            </div>
          </div>
          <div
            className="modal-footer p-0"
            style={{
              backgroundColor: colorValue,
              color: "white",
              borderTop: "1px solid rgba(0,0,0,0.2)",
            }}
          >
            <div className="d-flex justify-content-end align-items-center gap-1 w-100">
              <ul className="list-unstyled">
                <li className="d-flex justify-content-end">
                  <div className="d-flex justify-content-end gap-2 w-100" style={{ backgroundColor: colorValue }}>
                    {button1 !== "ALL" && (
                      <button className="bg-primary p-2 w-25" onClick={handlePopupPopulate} value={button1}>
                        {button1}
                      </button>
                    )}

                    <button className="bg-success p-2" onClick={handlePopupSave}>
                      {button2}
                    </button>

                    <button className="bg-danger p-2" onClick={handlePopupClear}>
                      {button3}
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
