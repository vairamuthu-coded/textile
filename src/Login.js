import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ defaultDetails, loginCompCode, loginPage, setLoginPage, setLoginCompCode, loginUser, setLoginUser, loginPass, setLoginPass, handleLoginSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError("All fields are required");
      return;
    }

    setError("");

    // Dummy login check
    if (formData.username === "admin" && formData.password === "1234") {
      alert("Login Successful");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <>
      {loginPage === false && (
        <div className={Login.container}>
          <form className={Login.form} onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p className={Login.error}>{error}</p>}
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className={Login.input} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className={Login.input} />
            <button type="submit" className={Login.button}>
              Login
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
