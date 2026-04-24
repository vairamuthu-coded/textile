import { createContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/CreateUserContext";
import { TreeViewDataProdiver } from "./context/CreateTreeViewContext";

import styled from "styled-components";
import { destop, mobile, tablet } from ".././src/ShoppingCart/Responsive";

import { CreateShopContextProdiver } from "./context/CreateShopContext.js";

import Tabpage from "./Tabpage.jsx";

import AppRoutes from "./AppRoutes.js";

import Sidebar from "./component/Sidebar.js";
import Header from "./Header.js";
import Footer from "./Footer.js";

import { toast } from "react-toastify";
import Login from "./Login.js";
import axios from "axios";

if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", JSON.stringify([]));
}
export const UserContext = createContext({});

function App({ API_URL, localServerCart, urls }) {
  const [defaultDetails, setDefaultDetails] = useState({ Compcode: "AGF", UserId: "", User: "VAIRAM", Pass: "Vairamwarsawabi297@" });
  const [selectedTitle, setSelectedTitle] = useState([]);

  const [mode, setMode] = useState("light");
  const [sidebar, setSidebar] = useState(false);
  // const showSidebar = () => setSidebar(!sidebar);
  const showSidebar = () => setSidebar((prev) => !prev);
  const [colorValue, setColorValue] = useState("var(--bs-info-text-emphasis)");
  const [foreValue, setForeValue] = useState("white");
  const [bgValue, setBgValue] = useState("whitesmoke");
  const [header_items, setHeaderItems] = useState([]);
  const [header_search, setHeaderSearch] = useState("");
  const [headerfilterdata, setHeaderFilterData] = useState([]);
  const [menuheader, setMenuHeader] = useState([]);
  const [headerdrop, setHeaderDrop] = useState(false);
  const [loginPage, setLoginPage] = useState(false);
  let navigate = useNavigate();
  let lastindex = 0;
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  let TitleCompCode = defaultDetails.Compcode,
    TitleUser = "Vairamuthu";

  const constirng1 = `${API_URL}/UserMaster/Headings/${defaultDetails.Compcode}/${defaultDetails.User}`;
  const constirng2 = `${API_URL}/UserMaster/ScreenName/${defaultDetails.Compcode}/${defaultDetails.User}/screen`;
  const constirng3 = `${API_URL}/UserMaster/ScreenNameHeading/${defaultDetails.Compcode}/${defaultDetails.User}`;
  const constirng4 = `${API_URL}/CompanyMaster/GridLoad/${defaultDetails.Compcode}`;
  const constirng5 = `${API_URL}/UserRights/UserRightsCheck/${defaultDetails.Compcode}/${defaultDetails.User}/${defaultDetails.Pass}`;

  const [sidebarData, setSidebarData] = useState([]);

  const titlename = "Anugraha Fashion Mill Private Limited";
  const [error, setError] = useState();
  const headerSidebarClose = (e) => {
    setSidebar(false);
    setHeaderSearch("");
    setHeaderDrop(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDefaultDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  let ref = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2, res3] = await Promise.all([axios.get(constirng1), axios.get(constirng2), axios.get(constirng3)]);
        setMenuHeader(res1.data);
        setHeaderItems(res2.data);
        setSidebarData(res3.data);
      } catch (error) {
        toast.error("Error loading data");
        console.error(error);
      }
    };

    fetchData();
  }, [defaultDetails.Compcode, defaultDetails.User]);

  const handleLoginSubmit = async () => {
    try {
      const res = await axios.get(constirng5);

      if (res.data === true) {
        setLoginPage(true);
        navigate("/Dashboard");
      } else {
        toast.error("Invalid Login");
      }
    } catch (error) {
      toast.error("Login Error");
    }
  };

  const closeWindow = () => {
    window.close();
  };

  return (
    <>
      {loginPage === false ? (
        <Login defaultDetails={defaultDetails} setDefaultDetails={setDefaultDetails} handleLoginSubmit={handleLoginSubmit} handleChange={handleChange} loginPage={loginPage} closeWindow={closeWindow} />
      ) : (
        <div className="container-fluid animate-zoom " style={{ backgroundColor: `${foreValue}` }}>
          <div className="row ">
            <DataProvider
              headerdrop={headerdrop}
              setHeaderDrop={setHeaderDrop}
              sidebar={sidebar}
              setSidebar={setSidebar}
              showSidebar={showSidebar}
              API_URL={API_URL}
              urls={urls}
              localServerCart={localServerCart}
              header_items={header_items}
              menuheader={menuheader}
              selectedTitle={selectedTitle}
              setSelectedTitle={setSelectedTitle}
              mode={mode}
              setMode={setMode}
              colorValue={colorValue}
              foreValue={foreValue}
              setForeValue={setForeValue}
              bgValue={bgValue}
              defaultDetails={defaultDetails}
              headerfilterdata={headerfilterdata}
              sidebarData={sidebarData}
            >
              <TreeViewDataProdiver API_URL={API_URL} colorValue={colorValue} bgValue={bgValue} setBgValue={setBgValue} foreValue={foreValue} defaultDetails={defaultDetails} setDefaultDetails={setDefaultDetails}>
                <CreateShopContextProdiver error={error} setError={setError} API_URL={API_URL} localServerCart={localServerCart} colorValue={colorValue}>
                  <Sidebar menuheader={menuheader} showSidebar={showSidebar} header_items={sidebarData} bgValue={bgValue} colorValue={colorValue} />
                  <Header mode={mode} setMode={setMode} titlename={titlename} setColorValue={setColorValue} TitleCompCode={TitleCompCode} TitleUser={TitleUser} />

                  <Tabpage title={selectedTitle} bgValue={bgValue} colorValue={colorValue} />
                  <main onClick={headerSidebarClose} onSubmit={handleSubmit}>
                    <Routes>
                      {AppRoutes.map((route, index) => {
                        const { element, ...rest } = route;
                        return <Route key={index} {...rest} element={element} path={route.path} />;
                      })}
                    </Routes>
                  </main>
                </CreateShopContextProdiver>
              </TreeViewDataProdiver>
            </DataProvider>
          </div>
          <Footer title={titlename} colorValue={colorValue}></Footer>
        </div>
      )}
    </>
  );
}
export default App;
