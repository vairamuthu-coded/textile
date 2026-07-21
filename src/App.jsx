import { createContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/CreateUserContext";
import { TreeViewDataProdiver } from "./context/CreateTreeViewContext";
import styled from "styled-components";
import { destop, mobile, tablet } from ".././src/ShoppingCart/Responsive";
import CryptoJS from "crypto-js";
import { CreateShopContextProdiver } from "./context/CreateShopContext.js";
import Tabpage from "./Tabpage.jsx";
import AppRoutes from "./AppRoutes.js";
import Sidebar from "./component/Sidebar.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { toast } from "react-toastify";
import Login from "./Login.js";
import axios from "axios";

export const UserContext = createContext({});

function App({ API_URL, localServerCart, urls }) {
  const [defaultDetails, setDefaultDetails] = useState({ HCompcode: "1", Compcode: "AGF", UserId: "", User: "VAIRAM", Pass: "123" });
  const [selectedTitle, setSelectedTitle] = useState([]);
  const [mode, setMode] = useState("light");
  const [sidebar, setSidebar] = useState(false);
  const [authToken, setAuthToken] = useState();
  const showSidebar = () => setSidebar((prev) => !prev);
  const [colorValue, setColorValue] = useState("var(--bs-teal)");
  const [foreValue, setForeValue] = useState("white");
  const [bgValue, setBgValue] = useState("whitesmoke");
  const [header_items, setHeaderItems] = useState([]);
  const [header_search, setHeaderSearch] = useState("");
  const [headerfilterdata, setHeaderFilterData] = useState([]);
  const [menuheader, setMenuHeader] = useState([]);
  const [secretkey, setSecretkey] = useState([]);
  const [headerdrop, setHeaderDrop] = useState(false);
  const [loginPage, setLoginPage] = useState(false);
  let navigate = useNavigate();
  let lastindex = 0;
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  let TitleCompCode = defaultDetails.Compcode,
    TitleUser = "Vairamuthu";

  const constirng1 = `${API_URL}/UserMasters/Headings/${defaultDetails.Compcode}/${defaultDetails.User}`;
  const constirng2 = `${API_URL}/UserMasters/ScreenName/${defaultDetails.Compcode}/${defaultDetails.User}/screen`;
  const constirng3 = `${API_URL}/UserMasters/ScreenNameHeading/${defaultDetails.Compcode}/${defaultDetails.User}`;
  const constirng4 = `${API_URL}/CompanyMaster/GridLoad/${defaultDetails.Compcode}`;
  const constirng5 = `${API_URL}/UserRights/UserRightsCheck`;
  const constirng6 = `${API_URL}/WeatherForecast/SecretKey`;
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
  const isAuthenticated = "";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2, res3, res6] = await Promise.all([axios.get(constirng1), axios.get(constirng2), axios.get(constirng3), axios.get(constirng6)]);
        setMenuHeader(res1.data);
        setHeaderItems(res2.data);
        setSidebarData(res3.data);
        setAuthToken(res2.data[0].token || "");
        setSecretkey(res6.data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchData();
  }, [defaultDetails.Compcode, defaultDetails.User]);

  const handleLoginSubmit = async () => {
    if (!defaultDetails.Compcode?.trim()) {
      toast.error("CompCode is required");
      return;
    }
    if (!defaultDetails.User?.trim()) {
      toast.error("User Name is required");
      return;
    }
    if (!defaultDetails.Pass?.trim()) {
      toast.error("Password is required");
      return;
    }
    try {
      const res = await axios.get(`${constirng5}/${defaultDetails.Compcode}/${defaultDetails.User}/${defaultDetails.Pass}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (res.data) {
        setAuthToken(res.data[0].token);
        setLoginPage(true);
        navigate("/Dashboard");
      } else {
        toast.error("Invalid Login");
      }
    } catch (error) {
      toast.error(error.response?.statusText || error.message);
    }
  };

  const closeWindow = () => {
    setAuthToken(null);
    window.close();
  };

  return (
    <>
      {loginPage === false ? (
        <Login defaultDetails={defaultDetails} setDefaultDetails={setDefaultDetails} handleLoginSubmit={handleLoginSubmit} handleChange={handleChange} loginPage={loginPage} closeWindow={closeWindow} />
      ) : (
        <div className="container-fluid animate-zoom " style={{ padding: "0px", margin: "0px", border: `3px solid ${colorValue}` }}>
          <div className="row" style={{ margin: "0px", padding: "0px" }}>
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
                  <main onClick={headerSidebarClose} onSubmit={handleSubmit} style={{ backgroundColor: "white" }}>
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
            <Footer title={titlename} colorValue={colorValue}></Footer>
          </div>
        </div>
      )}
    </>
  );
}
export default App;
