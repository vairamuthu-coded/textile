import React from "react";

const Popup = ({ show, onClose, title, children, foreValue, colorValue, popupDataCopy, setPopupDataCopy, handlePopupSave, handlePopupClear, handlePopupPopulate }) => {
  if (!show) return null;
  return (
    <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)", height: "1000#", overflow: "auto" }}>
      <div className="modal-dialog modal-dialog-centered bg-white">
        <div className="modal-content">
          <div className="modal-title" style={{ color: foreValue, backgroundColor: colorValue, textAlign: "center" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="mx-auto">{title}</div>
              <button className="bg-danger ms-auto" onClick={onClose}>
                X
              </button>
            </div>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer p-2">
            <div className="position-sticky bottom-0 bg-white">
              <ul className="list-unstyled">
                <li className="d-flex justify-content-end">
                  <div className="d-flex justify-content-start gap-2  w-100" style={{ backgroundColor: `${colorValue}` }}>
                    <button className="bg-primary p-2">Populate</button>
                    <button className="bg-success p-2">Save</button>
                    <button className="bg-danger  p-2">Cancel</button>
                  </div>

                  <div className="d-flex justify-content-end gap-2  w-100" style={{ backgroundColor: `${colorValue}` }}>
                    <button className="bg-primary p-2" onClick={handlePopupPopulate}>
                      Populate
                    </button>
                    <button className="bg-success p-2" onClick={handlePopupSave}>
                      Save
                    </button>
                    <button className="bg-danger  p-2" onClick={handlePopupClear}>
                      Cancel
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
