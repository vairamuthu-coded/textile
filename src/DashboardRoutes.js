import Dashboard from "./Dashboard";
import AdminDashboard from "./Custom/AdminDashboard";

const DashboardRoutes = [
 { path:"/Dashboard", element:<Dashboard/> },
 { path:"/AdminDashboard", element:<AdminDashboard/> },
];

export default DashboardRoutes;