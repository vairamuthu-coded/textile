import { useSelector } from "react-redux";
import Suggesstion from "./Suggesstion";
import Feed from "./Feed";
import SideBar from "./SideBar";
import "./InstaApp.css";

const InstaApp = () => {
  const { user, suggestedUsers } = useSelector((store) => store.auth); 
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex flex-row">
          <div className="col-md-2 col-sm-2">
            <SideBar user={user} />
          </div>
          <div className="col-md-7 col-sm-7">
           <Feed  />
          </div>
          <div className="col-md-3 col-sm-3">
            <Suggesstion user={user} suggestedUsers={suggestedUsers} />
          </div>
        </div>
    </div>
    </>
  );
};

export default InstaApp;
