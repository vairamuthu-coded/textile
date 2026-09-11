import MasterRoutes from "./Routes_MasterRoutes";
import TransactionsRoutes from "./Routes_TransactionsRoutes";
import DashboardRoutes from "./Routes_DashboardRoutes";
import TreeViewRoutes from "./Routes_TreeViewRoutes";
const AppRoutes = [...DashboardRoutes, ...MasterRoutes, ...TransactionsRoutes, ...TreeViewRoutes];
export default AppRoutes;
