import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:5271/api",
});

export function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export function logout() {
  localStorage.removeItem("token");
  setAuthToken(null);
  window.location.href = "/login";
}
export default api;