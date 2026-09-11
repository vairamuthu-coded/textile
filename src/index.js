import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "font-awesome/css/font-awesome.min.css";
import "./Button.css";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
const API_URL = "http://localhost:5271/api"; //'http://192.168.101.15:82/api'; npx json-server --port 3001  --watch db.json 'https://fakestoreapi.com/products';
const localServerCart = "http://localhost:3001/productss";
const todoListUrl = "http://localhost:3002/Items";
const urls = "";

let persistor = persistStore(store);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App API_URL={API_URL} localServerCart={localServerCart} todoListUrl={todoListUrl} urls={urls} />
      </PersistGate>
    </Provider>

    <ToastContainer position="top-right" autoClose={3000} />
  </BrowserRouter>,
);
