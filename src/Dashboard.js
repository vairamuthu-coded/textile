import { useContext, useEffect, useState } from "react";
import axios from "axios";
import DataContext from "./context/CreateUserContext";
import Marquee from "react-fast-marquee";
import { toast } from "react-toastify";
import ResponsiveTabs from "./ResponsiveTabs";

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
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-3 my-2" onClick={() => handlepage(item.menuname)}>
              <div
  className="h-100 shadow-sm p-2 m-1 d-flex align-items-center justify-content-between card-hover"
  style={{    cursor: "pointer",    backgroundImage: 'url("../Images/Toolbar.bmp")',    borderRadius: "5px",    backgroundSize: "cover",    border: "4px solid white",  }}>
  <strong
    className="mb-0 text-truncate fw-bolder"    style={{      color: colorValue,      fontSize: "16px",      fontFamily: "Roboto",    }}  >    {item.menuname}  </strong>
  <img    src={item.companylogoo || "/no-image.png"}    alt=""    style={{      width: "40px",      height: "32px",      objectFit: "contain",   }}  />
</div>
              {/* <div
                className="h-100 shadow-sm p-2 m-1 d-flex align-items-center justify-content-between card-hover "
                style={{
                  cursor: "pointer",
                  backgroundImage: `url("../Images/Toolbar.bmp")`,
                  borderRadius: "5px",
                  backgroundSize: "cover",
                  transition: "transform 0.9s ease",
                  border: "4px solid white",
                }}
              >
                <strong className="mb-0 text-truncate justify-content-between fw-bolder" style={{ color: colorValue, fontSize: "16px", fontFamily: "Roboto" }}>
                  {item.menuname}
                </strong>
                <img src={item.companylogoo || "/no-image.png"} alt="" style={{ width: "40px", height: "32px", objectFit: "contain" }} />
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
