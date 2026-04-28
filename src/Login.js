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
            <div className="modal-content p-5">
              <div className="modalContainer" style={{ backgroundColor: "lightgray" }}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-3">
                      <img src="../Images/Anugraha_logo.jpg" alt="Anugraha Logo" />
                    </div>
                    <div className="col-9">
                      {/* CompCode */}
                      <div className="row align-items-center mb-2">
                        <label className="col-12 col-md-3 mb-1 mb-md-0">CompCode</label>
                        <div className="col-12 col-md-9">
                          <input type="text" className="form-control px-2" value={defaultDetails.Compcode} onChange={handleChange} name="Compcode" />
                        </div>
                      </div>

                      {/* UserName */}
                      <div className="row align-items-center mb-2">
                        <label className="col-12 col-md-3 mb-1 mb-md-0">UserName</label>
                        <div className="col-12 col-md-9">
                          <input type="text" className="form-control px-2" value={defaultDetails.User} onChange={handleChange} name="User" />
                        </div>
                      </div>

                      {/* Password */}
                      <div className="row align-items-center mb-2">
                        <label className="col-12 col-md-3 ">Password</label>
                        <div className="col-12 col-md-9">
                          <input type="password" className="form-control px-2" value={defaultDetails.Pass} style={{ margin: 0, padding: 0 }} onChange={handleChange} name="Pass" />
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="row align-items-center m-2">
                        <div className="col-md-4 col-sm-12 ">
                          <button className="btn  col-md-12 col-sm-3 form-control" onClick={handleLoginSubmit}>
                            Login
                          </button>
                        </div>
                        <div className="col-md-4 col-sm-12 ">
                          <button className="btn  col-md-12 col-sm-3 form-control " onClick={closeWindow}>
                            Exit
                          </button>
                        </div>
                      </div>
                    </div>
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
