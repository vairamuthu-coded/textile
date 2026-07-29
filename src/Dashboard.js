import { useContext, useEffect, useState } from "react";
import axios from "axios";
import DataContext from "./context/CreateUserContext";
import Marquee from "react-fast-marquee";
import { toast } from "react-toastify";
import ResponsiveTabs from "./ResponsiveTabs";
import "./Dashboard.css";

const Dashboard = ({ title, subTitle }) => {
  const { sidebar, newButton, setNewButton, API_URL, defaultDetails, handlepage, colorValue, foreValue, menuheader, headerdrop } = useContext(DataContext);
  const findmenuname1 = API_URL + "/UserMasters/FindScreenName";
  const [findmenu, setFindMenu] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (menuheader.length > 0) {
      handlepage1(0, menuheader[0].menunameid);
    }
  }, [menuheader]);

  const handlepage1 = async (index, pid) => {
    try {
      setLoading(true);

      const res = await axios.get(`${findmenuname1}/${pid}`);

      setFindMenu(res.data);
      setNewButton(index);
    } catch (error) {
      toast.error(error);
      setFetchError("Failed to load menu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <ResponsiveTabs data={menuheader} activeIndex={newButton} onChange={handlepage1} colorValue={colorValue} foreValue={foreValue} />
      <div className="h-100  shadow-sm p-3  flex-row align-items-center justify-content-between card-hover">
        <div className="row" style={{ backgroundColor: "whitesmoke" }}>
          {findmenu.map((item, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-3 my-2 dashboard-item" onClick={() => handlepage(item.menuname)}>
              <div className="h-100 shadow-sm p-2 m-1 d-flex align-items-center justify-content-between card-hover dashboard-card" style={{ cursor: "pointer", backgroundImage: 'url("../Images/Toolbar.bmp")' }}>
                <strong className="mb-0 text-truncate fw-bolder card-title" style={{ color: colorValue }}>
                  {item.menuname}
                </strong>
                <img className="card-logo" src={item.companylogoo || "/no-image.png"} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
