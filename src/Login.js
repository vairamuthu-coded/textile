import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ defaultDetails, setDefaultDetails, handleLoginSubmit, handleChange, loginPage, closeWindow }) => {
  const [error, setError] = useState("");

  return (
    <>
      {loginPage === false && (
        <div className="modal bg-light " id="myModal">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3">
              <div className="modalContainer">
                <div className="modal-body">
                  {/* CompCode */}
                  <div className="row align-items-center mb-1">
                    <label className="col-12 col-md-4 mb-1 mb-md-0">CompCode</label>
                    <div className="col-12 col-md-8">
                      <input type="text" className="form-control" value={defaultDetails.Compcode} onChange={handleChange} name="Compcode" />
                    </div>
                  </div>

                  {/* UserName */}
                  <div className="row align-items-center mb-1">
                    <label className="col-12 col-md-4 mb-1 mb-md-0">UserName</label>
                    <div className="col-12 col-md-8">
                      <input type="text" className="form-control" value={defaultDetails.User} onChange={handleChange} name="User" />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="row align-items-center mb-1">
                    <label className="col-12 col-md-4 ">Password</label>
                    <div className="col-12 col-md-8">
                      <input type="password" className="form-control" value={defaultDetails.Pass} style={{ margin: 0, padding: 0 }} onChange={handleChange} name="Pass" />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-primary  w-md-auto" onClick={handleLoginSubmit}>
                      Login
                    </button>

                    <button className="btn btn-secondary  w-md-auto" onClick={closeWindow}>
                      Exit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
