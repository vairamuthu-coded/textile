
// import CountryMaster from './Masters/CountryMaster'
// import StateMaster from './Masters/StateMaster'
// import CityMaster from './Masters/CityMaster'
// import Dashboard from './Dashboard'
// import AdminDashboard from './Custom/AdminDashboard'
// import CompanyMaster from './Masters/CompanyMaster'
// import PartyMaster from './Masters/PartyMaster'
// import UserMaster from './TreeView/UserMaster'
// import MenuNameMaster from './TreeView/MenuNameMaster'
// import NavigationMaster from './TreeView/NavigationMaster'
// import TreeViewMaster from './TreeView/TreeViewMaster'
// import UserRights from './TreeView/UserRights'
// import EmployeeMaster from './Masters/EmployeeMaster'
// import Payment from './Transactions/Payment'
// import AdvancePayment from './Transactions/AdvancePayment'
// import BankMaster from './Masters/BankMaster'
// import BranchMaster from './Masters/BranchMaster'
// import IFSCMaster from './Masters/IFSCMaster'
// import SizeMaster from './Masters/SizeMaster'
// import UTRPayment from './Transactions/UTRPayment'
// import ProcessMaster from './Masters/ProcessMaster'
// import ColorMaster from './Masters/ColorMaster'
// import BuyerMaster from './Masters/BuyerMaster'
// import StyleItemMaster from './Masters/StyleItemMaster'
// import StyleCategoryMaster from './Masters/StyleCategoryMaster'
// import SizeGroupMaster from './Masters/SizeGroupMaster'
// import StyleGroupMaster from './Masters/StyleGroupMaster'
// import FabricTypeMaster from './Masters/FabricTypeMaster'
// import FabricMaster from './Masters/FabricMaster'
// import CountsMaster from './Masters/CountsMaster'
// import YarnMaster from './Masters/YarnMaster'
// import YarnBlendMaster from './Masters/YarnBlendMaster'
// import BarCodeGenerate from './Transactions/BarCodeGenerate'
// import AutoGenerateMaster from './Registration/AutoGenerateMaster'
// import ProductionEntry from './Transactions/Product-Garment/ProductionEntry'
// import CheckingEntry from './Transactions/Product-Garment/CheckingEntry'
// import DefectEntry from './Transactions/Product-Garment/DefectEntry'
// import RemarksMaster from './Masters/RemarksMaster.js';
import NotFound from './ShoppingCart/Shopping/NotFound.jsx';
import NewProduct from './ShoppingCart/Shopping/NewProduct.jsx';
import ProductList from './ShoppingCart/Shopping/ProductList.jsx';
import UpdateProduct from './ShoppingCart/Shopping/UpdateProduct.jsx';
import Remarks from './ShoppingCart/Shopping/Remarks.jsx';
import WishList from './ShoppingCart/Shopping/WishList.js';
import Cart from './ShoppingCart/Shopping/Cart.jsx';
import ColorSelector from './ShoppingCart/Shopping/ColorSelector.jsx';
// import BinMaster from './Masters/BinMaster.jsx';
import CreatePost from './Instagram/CreatePost.jsx'
import  ViewStory from './Instagram/ViewStory'
import Stories from './Instagram/Stories.jsx'
 import InstaApp from './Instagram/InstaApp.jsx'
 import Home from './Appointment/Home.jsx'
 import Edit from './Appointment/Edit.jsx'
 import Delete from './Appointment/Delete.jsx'
 import Appointment from './Appointment/Appointment.jsx'
 import New from './Appointment/New.jsx'
 import Profile from './Instagram/Profile.jsx'
import EditProfile from './Instagram/EditProfile.jsx'
import ChatPage from './Instagram/ChatPage.jsx'


import MasterRoutes from "./MasterRoutes";
import TransactionsRoutes from "./TransactionsRoutes";
import DashboardRoutes from "./DashboardRoutes";
import TreeViewRoutes from './TreeViewRoutes';





 const AppRoutes = [
// { path:'/AdminDashboard'       ,element:<AdminDashboard        title="AdminDashboard"      subTitle="Details"/>},
// { path:'/Dashboard'            ,element:<Dashboard             title="Anugraha Fashion Mill Private Limited"           subTitle="Details"/>},
// { path:'/CountryMaster'        ,element:<CountryMaster         title="CountryMaster"       subTitle="Details"/>},
// { path:'/StateMaster'          ,element:<StateMaster           title="StateMaster"         subTitle="Details"/>},
// { path:'/CityMaster'           ,element:<CityMaster            title="CityMaster"          subTitle="Details"/>}, 
// { path:"/PartyMaster"          ,element:<PartyMaster           title="PartyMaster"         subTitle="Details" />} ,
// { path:"/BankMaster"           ,element:<BankMaster            title="BankMaster"          subTitle="Details"  />} ,
// { path:"/BranchMaster"         ,element:<BranchMaster          title="BranchMaster"        subTitle="Details"  />},
// { path:"/IFSCMaster"           ,element:<IFSCMaster            title="IFSC Master"         subTitle="Details" /> } ,
// { path:"/SizeMaster"           ,element:<SizeMaster            title="SizeMaster"          subTitle="Details"  />},
// { path:"/SizeGroupMaster"      ,element:<SizeGroupMaster       title="SizeGroupMaster"     subTitle="Details" />},
// { path:"/FabricTypeMaster"     ,element:<FabricTypeMaster      title="FabricTypeMaster"    subTitle="Details" />},
// { path:"/YarnBlendMaster"      ,element:<Remarks               title="YarnBlendMaster"     subTitle="Details"  />} ,
// { path:"/NewProduct"           ,element:<NewProduct            title="CountsMaster"        subTitle="Details"  />},
// { path:"/ProductList"          ,element:<ProductList           title="ProductList"         subTitle="Details" />} ,
// { path:"/Cart"                 ,element:<Cart                  title="Cart"                subTitle="Details"  />},
// { path:"/UpdateProduct/:id"    ,element:<UpdateProduct         title="UpdateProduct"       subTitle="Details"  />},
// { path:"/WishList"             ,element:<WishList              title="WishList"            subTitle="Details"  />} ,
// { path:"/CountsMaster"         ,element:<CountsMaster          title="CountsMaster"        subTitle="Details"  />},
// { path:"/RemarksMaster"        ,element:<RemarksMaster         title="RemarksMaster"       subTitle="Details"  />},
// { path:"/YarnMaster"           ,element:<YarnMaster            title="YarnMaster"          subTitle="Details"  />},
// { path:"/FabricMaster"         ,element:<FabricMaster          title="FabricMaster"        subTitle="Details"  />} ,
// { path:"/CompanyMaster"        ,element:<CompanyMaster         title="CompanyMaster"       subTitle="Details"  />} ,
// { path:"/EmployeeMaster"       ,element:<EmployeeMaster        title="EmployeeMaster"      subTitle="Details"  />} ,
// { path:"/Payment"              ,element:<Payment               title="Payment"             subTitle="Details"  />},
// { path:"/ProcessMaster"        ,element:<ProcessMaster         title="ProcessMaster"       subTitle="Details"  />} ,
// { path:"/ColorMaster"          ,element:<ColorMaster           title="ColorMaster"         subTitle="Details"  />},
// { path:"/BuyerMaster"          ,element:<BuyerMaster           title="BuyerMaster"         subTitle="Details"  />},
// { path:"/StyleGroupMaster"     ,element:<StyleGroupMaster      title="StyleGroupMaster"    subTitle="Details"  />},
// { path:"/StyleCategoryMaster"  ,element:<StyleCategoryMaster   title="StyleCategoryMaster" subTitle="Details"  />},
// { path:"/StyleItemMaster"      ,element:<StyleItemMaster       title="StyleItemMaster"     subTitle="Details"  />},
// { path:"/BarCodeGenerate"      ,element:<BarCodeGenerate       title="BarCodeGenerate"     subTitle="Details"  />},
// { path:"/ProductionEntry"      ,element:<ProductionEntry       title="ProductionEntry"     subTitle="Details"  />},
// { path:"/CheckingEntry"        ,element:<CheckingEntry         title="CheckingEntry"       subTitle="Details"  />},
// { path:"/DefectEntry"          ,element:<DefectEntry           title="DefectEntry"         subTitle="Details" />},
// { path:"/AutoGenerateMaster"   ,element:<AutoGenerateMaster    title="AutoGenerateMaster"  subTitle="Details"  />},
// { path:"/AdvancePayment"       ,element:<AdvancePayment        title="AdvancePayment"      subTitle="Details"  />},
// { path:"/UTRPayment"           ,element:<UTRPayment            title="UTRPayment"          subTitle="Details"  />},
// { path:"/UserMaster"           ,element:<UserMaster            title="UserMaster"          subTitle="Details"  />},
// { path:"/MenuNameMaster"       ,element:<MenuNameMaster        title="MenuNameMaster"      subTitle="Details"  />},
// { path:"/NavigationMaster"     ,element:<NavigationMaster      title="NavigationMaster"    subTitle="Details"  />},
// { path:"/TreeViewMaster"       ,element:<TreeViewMaster        title="TreeViewMaster"      subTitle="Details"  />},
// { path:"/UserRights"           ,element:<UserRights            title="UserRights"          subTitle="Details"  />},
// { path:"/DeviceCommunication"  ,element:<DeviceCommunication   title="DeviceCommunication" subTitle="Details"  />},
// { path:"/ProductionStatusReport",element:<ProductionStatusReport title="ProductionStatusReport" subTitle="Details"  />},
// { path:"/OrderCloseEntry"      ,element:<OrderCloseEntry       title="OrderCloseEntry"     subTitle="Details"  />},
// { path:"/AboutMaster"          ,element:<AboutMaster           title="AboutMaster"         subTitle="Details"  />},
// { path:"*"                     ,element:<NotFound              title="NotFound"            subTitle="Details"  />},
// { path:'/ColorSelector'        ,element:<ColorSelector/>} ,
// { path:'/BinMaster'            ,element:<BinMaster/> },
// { path:'/InstaApp'             ,element:<InstaApp/>},
// { path:'/CreatePost'           ,element:<CreatePost/>},
// { path:'/ViewStory/:id/:tot'   ,element:<ViewStory/>},
// { path:'/Stories'              ,element:<Stories/>},
// { path:'/ChatPage'              ,element:<ChatPage/>},
// { path:'/all'                  ,element:<GetAllPost/>},
// { path:'/userpost/all'         ,element:<GetUserPost/>},
// { path:'/:id/like'             ,element:<LikePost/>},
// { path:'/:id/dislike'          ,element:<DisLikePost/>},
// { path:'/:id/comment'          ,element:<AddComment/>},
// { path:'/:id/comment/all'      ,element:<GetCommentOfPost/>},
// { path:'/delete/:id'           ,element:<DeletePost/>},
// { path:'/:id/bookmark'         ,element:<BookmarkPost/>},


  //  { path:'/Profile'              ,element:<Profile/>},
  // { path:'/EditProfile'          ,element:<EditProfile/>},
// { path:'/ChatPage'                 ,element:<ChatPage/>}

 ...DashboardRoutes,
 ...MasterRoutes,
 ...TransactionsRoutes,
 ...TreeViewRoutes
]

export default AppRoutes