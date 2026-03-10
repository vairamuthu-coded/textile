import CountryMaster from './Masters/CountryMaster'
import StateMaster from './Masters/StateMaster'
import CityMaster from './Masters/CityMaster'
import Dashboard from './Dashboard'
import AdminDashboard from './Custom/AdminDashboard'
import CompanyMaster from './Masters/CompanyMaster'
import PartyMaster from './Masters/PartyMaster'
import UserMaster from './TreeView/UserMaster'
import MenuNameMaster from './TreeView/MenuNameMaster'
import NavigationMaster from './TreeView/NavigationMaster'
import TreeViewMaster from './TreeView/TreeViewMaster'
import UserRights from './TreeView/UserRights'
import EmployeeMaster from './Masters/EmployeeMaster'
import Payment from './Transactions/Payment'
import AdvancePayment from './Transactions/AdvancePayment'
import BankMaster from './Masters/BankMaster'
import BranchMaster from './Masters/BranchMaster'
import IFSCMaster from './Masters/IFSCMaster'
import SizeMaster from './Masters/SizeMaster'
import UTRPayment from './Transactions/UTRPayment'
import ProcessMaster from './Masters/ProcessMaster'
import ColorMaster from './Masters/ColorMaster'
import BuyerMaster from './Masters/BuyerMaster'
import StyleItemMaster from './Masters/StyleItemMaster'
import StyleCategoryMaster from './Masters/StyleCategoryMaster'
import SizeGroupMaster from './Masters/SizeGroupMaster'
import StyleGroupMaster from './Masters/StyleGroupMaster'
import FabricTypeMaster from './Masters/FabricTypeMaster'
import FabricMaster from './Masters/FabricMaster'
import CountsMaster from './Masters/CountsMaster'
import YarnMaster from './Masters/YarnMaster'
import YarnBlendMaster from './Masters/YarnBlendMaster'
import RemarksMaster from './Masters/RemarksMaster';
import BinMaster from './Masters/BinMaster';
const MasterRoutes = [
 { path:'/CountryMaster'        ,element:<CountryMaster         title="CountryMaster"       subTitle="Details"/>},
{ path:'/StateMaster'          ,element:<StateMaster           title="StateMaster"         subTitle="Details"/>},
{ path:'/CityMaster'           ,element:<CityMaster            title="CityMaster"          subTitle="Details"/>}, 
{ path:"/PartyMaster"          ,element:<PartyMaster           title="PartyMaster"         subTitle="Details" />} ,
{ path:"/BankMaster"           ,element:<BankMaster            title="BankMaster"          subTitle="Details"  />} ,
{ path:"/BranchMaster"         ,element:<BranchMaster          title="BranchMaster"        subTitle="Details"  />},
{ path:"/IFSCMaster"           ,element:<IFSCMaster            title="IFSC Master"         subTitle="Details" /> } ,
{ path:"/SizeMaster"           ,element:<SizeMaster            title="SizeMaster"          subTitle="Details"  />},
{ path:"/SizeGroupMaster"      ,element:<SizeGroupMaster       title="SizeGroupMaster"     subTitle="Details" />},
{ path:"/FabricTypeMaster"     ,element:<FabricTypeMaster      title="FabricTypeMaster"    subTitle="Details" />},
{ path:"/YarnBlendMaster"      ,element:<YarnBlendMaster       title="YarnBlendMaster"     subTitle="Details"  />} ,
{ path:"/CountsMaster"         ,element:<CountsMaster          title="CountsMaster"        subTitle="Details"  />},
{ path:"/RemarksMaster"        ,element:<RemarksMaster         title="RemarksMaster"       subTitle="Details"  />},
{ path:"/YarnMaster"           ,element:<YarnMaster            title="YarnMaster"          subTitle="Details"  />},
{ path:"/FabricMaster"         ,element:<FabricMaster          title="FabricMaster"        subTitle="Details"  />} ,
{ path:"/CompanyMaster"        ,element:<CompanyMaster         title="CompanyMaster"       subTitle="Details"  />} ,
{ path:"/EmployeeMaster"       ,element:<EmployeeMaster        title="EmployeeMaster"      subTitle="Details"  />} ,
{ path:"/Payment"              ,element:<Payment               title="Payment"             subTitle="Details"  />},
{ path:"/ProcessMaster"        ,element:<ProcessMaster         title="ProcessMaster"       subTitle="Details"  />} ,
{ path:"/ColorMaster"          ,element:<ColorMaster           title="ColorMaster"         subTitle="Details"  />},
{ path:"/BuyerMaster"          ,element:<BuyerMaster           title="BuyerMaster"         subTitle="Details"  />},
{ path:"/StyleGroupMaster"     ,element:<StyleGroupMaster      title="StyleGroupMaster"    subTitle="Details"  />},
{ path:"/StyleCategoryMaster"  ,element:<StyleCategoryMaster   title="StyleCategoryMaster" subTitle="Details"  />},
{ path:"/StyleItemMaster"      ,element:<StyleItemMaster       title="StyleItemMaster"     subTitle="Details"  />},

];

export default MasterRoutes;