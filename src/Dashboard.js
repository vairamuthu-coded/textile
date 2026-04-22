import { useContext, useEffect, useState } from "react";
import axios from "axios";
import DataContext from "./context/CreateUserContext";
import Marquee from "react-fast-marquee";
import toast from "react-hot-toast";

const Dashboard = ({ title, subTitle }) => {
  const { sidebar, newButton, setNewButton, API_URL, defaultDetails, handlepage, colorValue, foreValue, menuheader, headerdrop } = useContext(DataContext);
  const findmenuname1 = API_URL + "/UserMaster/FindScreenName";
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
      <div className="d-flex flex-wrap gap-2 pb-2" style={{ borderBottom: `1px solid ${colorValue}` }}>
        {menuheader.map((item, index) => (
          <p
            key={index}
            className={`btn ${newButton === index ? "active-tabs" : "panel"}`}
            style={{
              color: newButton === index ? foreValue : colorValue,
              backgroundColor: newButton === index ? colorValue : "transparent",
              border: `1px solid ${colorValue}`,
              fontSize: "var(--bs-body-font-size)",
            }}
            onClick={() => handlepage1(index, item.menunameid)}
          >
            {item.menuname}
          </p>
        ))}
      </div>

      <div className="container-fluid">
        <div className="row">
          {findmenu.map((item, index) => (
            <div key={index} className="col-12 col-md-3  mt-3" onClick={() => handlepage(item.menuname)}>
              <div className="card h-100 shadow-sm" style={{ cursor: "pointer", backgroundColor: colorValue, color: foreValue, borderRadius: "8px" }}>
                <div className="card-body d-flex justify-content-between align-items-center">
                  <h6 className="mb-0" style={{ color: foreValue }}>
                    {item.menuname}
                  </h6>

                  <img src={item.companylogoo} alt="" style={{ width: "32px", height: "32px", objectFit: "contain" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
