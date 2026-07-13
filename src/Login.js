import React, { useState } from "react";

const Login = ({ defaultDetails, handleLoginSubmit, handleChange, closeWindow }) => {
  const [errors, setErrors] = useState({ Compcode: "", User: "", Pass: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = {
      Compcode: defaultDetails.Compcode?.trim() ? "" : "CompCode is required",
      User: defaultDetails.User?.trim() ? "" : "User Name is required",
      Pass: defaultDetails.Pass?.trim() ? "" : "Password is required",
    };

    setErrors(nextErrors);

    const hasErrors = Object.values(nextErrors).some((message) => message);
    if (!hasErrors) {
      handleLoginSubmit();
    }
  };

  return (
    <div className="modal bg-light " id="myModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-5">
          <div className="modalContainer" style={{ backgroundColor: "lightgray" }}>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-3">
                    <img src="../Images/Anugraha_logo.jpg" alt="Anugraha Logo" />
                  </div>
                  <div className="col-9">
                    {/* CompCode */}
                    <div className="row align-items-center mb-2">
                      <label className="col-12 col-md-3 mb-1 mb-md-0">CompCode</label>
                      <div className="col-12 col-md-9">
                        <input type="text" className="form-control px-2" value={defaultDetails.Compcode} onChange={handleChange} name="Compcode" required />
                        {errors.Compcode && <div className="text-danger small mt-1">{errors.Compcode}</div>}
                      </div>
                    </div>

                    {/* UserName */}
                    <div className="row align-items-center mb-2">
                      <label className="col-12 col-md-3 mb-1 mb-md-0">UserName</label>
                      <div className="col-12 col-md-9">
                        <input type="text" className="form-control px-2" value={defaultDetails.User} onChange={handleChange} name="User" required />
                        {errors.User && <div className="text-danger small mt-1">{errors.User}</div>}
                      </div>
                    </div>

                    {/* Password */}
                    <div className="row align-items-center mb-2">
                      <label className="col-12 col-md-3 ">Password</label>
                      <div className="col-12 col-md-9">
                        <input type="password" className="form-control px-2" value={defaultDetails.Pass} style={{ margin: 0, padding: 0 }} onChange={handleChange} name="Pass" required />
                        {errors.Pass && <div className="text-danger small mt-1">{errors.Pass}</div>}
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="row align-items-center m-2">
                      <div className="col-md-4 col-sm-12 ">
                        <button type="submit" className="btn col-md-12 col-sm-3 form-control">
                          Login
                        </button>
                      </div>
                      <div className="col-md-4 col-sm-12 ">
                        <button type="button" className="btn col-md-12 col-sm-3 form-control " onClick={closeWindow}>
                          Exit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
