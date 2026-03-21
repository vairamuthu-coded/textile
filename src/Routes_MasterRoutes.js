import CountryMaster from './Masters/CountryMaster'
import StateMaster from './Masters/StateMaster'
import CityMaster from './Masters/CityMaster'
import CompanyMaster from './Masters/CompanyMaster'
import PartyMaster from './Masters/PartyMaster'
import EmployeeMaster from './Masters/EmployeeMaster'
import BankMaster from './Masters/BankMaster'
import BranchMaster from './Masters/BranchMaster'
import IFSCMaster from './Masters/IFSCMaster'
import SizeMaster from './Masters/SizeMaster'
import SizeGroupMaster from './Masters/SizeGroupMaster'
import FabricTypeMaster from './Masters/FabricTypeMaster'
import YarnBlendMaster from './Masters/YarnBlendMaster'
import CountsMaster from './Masters/CountsMaster'
import RemarksMaster from './Masters/RemarksMaster'
import YarnMaster from './Masters/YarnMaster'
import FabricMaster from './Masters/FabricMaster'
import ProcessMaster from './Masters/ProcessMaster'
import ColorMaster from './Masters/ColorMaster'
import BuyerMaster from './Masters/BuyerMaster'
import StyleGroupMaster from './Masters/StyleGroupMaster'
import StyleCategoryMaster from './Masters/StyleCategoryMaster'
import StyleItemMaster from './Masters/StyleItemMaster'
import TaxTemplateDetails from './Masters/TaxTemplateDetails'
import TaxMaster from './Masters/TaxMaster'
import TaxTempMaster from './Masters/TaxTempMaster'

const routes = [
 { path:'/CountryMaster', component:CountryMaster, title:'CountryMaster'},
 { path:'/StateMaster', component:StateMaster, title:'StateMaster'},
 { path:'/CityMaster', component:CityMaster, title:'CityMaster'},
 { path:'/CompanyMaster', component:CompanyMaster, title:'CompanyMaster'},
 { path:'/PartyMaster', component:PartyMaster, title:'PartyMaster'},
 { path:'/BankMaster', component:BankMaster, title:'BankMaster'},
 { path:'/BranchMaster', component:BranchMaster, title:'BranchMaster'},
 { path:'/IFSCMaster', component:IFSCMaster, title:'IFSC Master'},
 { path:'/SizeMaster', component:SizeMaster, title:'SizeMaster'},
 { path:'/SizeGroupMaster', component:SizeGroupMaster, title:'SizeGroupMaster'},
 { path:'/FabricTypeMaster', component:FabricTypeMaster, title:'FabricTypeMaster'},
 { path:'/YarnBlendMaster', component:YarnBlendMaster, title:'YarnBlendMaster'},
 { path:'/CountsMaster', component:CountsMaster, title:'CountsMaster'},
 { path:'/RemarksMaster', component:RemarksMaster, title:'RemarksMaster'},
 { path:'/YarnMaster', component:YarnMaster, title:'YarnMaster'},
 { path:'/FabricMaster', component:FabricMaster, title:'FabricMaster'},
 { path:'/EmployeeMaster', component:EmployeeMaster, title:'EmployeeMaster'},
 { path:'/ProcessMaster', component:ProcessMaster, title:'ProcessMaster'},
 { path:'/ColorMaster', component:ColorMaster, title:'ColorMaster'},
 { path:'/BuyerMaster', component:BuyerMaster, title:'BuyerMaster'},
 { path:'/StyleGroupMaster', component:StyleGroupMaster, title:'StyleGroupMaster'},
 { path:'/StyleCategoryMaster', component:StyleCategoryMaster, title:'StyleCategoryMaster'},
 { path:'/StyleItemMaster', component:StyleItemMaster, title:'StyleItemMaster'},
 { path:'/TaxTemplateDetails', component:TaxTemplateDetails, title:'TaxTemplateDetails'} ,
 { path:'/TaxMaster', component:TaxMaster, title:'TaxMaster'} ,
 { path:'/TaxTempMaster', component:TaxTempMaster, title:'TaxTempMaster'} ,
 
]

const MasterRoutes = routes.map(r => ({
 path: r.path,
 element: <r.component title={r.title} subTitle="Details" />
}))

export default MasterRoutes