import AgentMaster from "./Masters/AgentMaster";
import BankMaster from "./Masters/BankMaster";
import BranchMaster from "./Masters/BranchMaster";
import BuyerMaster from "./Masters/BuyerMaster";
import CountryMaster from "./Masters/CountryMaster";
import CountsMaster from "./Masters/CountsMaster";
import StateMaster from "./Masters/StateMaster";
import CityMaster from "./Masters/CityMaster";
import CompanyMaster from "./Masters/CompanyMaster";
import PartyMaster from "./Masters/PartyMaster";
import EmployeeMaster from "./Masters/EmployeeMaster";
import IFSCMaster from "./Masters/IFSCMaster";
import SizeMaster from "./Masters/SizeMaster";
import SizeGroupMaster from "./Masters/SizeGroupMaster";
import FabricTypeMaster from "./Masters/FabricTypeMaster";
import HSNMaster from "./Masters/HSNMaster";
import RemarksMaster from "./Masters/RemarksMaster";
import FabricMaster from "./Masters/FabricMaster";
import ProcessMaster from "./Masters/ProcessMaster";
import ColorMaster from "./Masters/ColorMaster";
import StyleGroupMaster from "./Masters/StyleGroupMaster";
import StyleCategoryMaster from "./Masters/StyleCategoryMaster";
import StyleItemMaster from "./Masters/StyleItemMaster";
import TaxTemplateDetails from "./Masters/TaxTemplateDetails";
import TaxMaster from "./Masters/TaxMaster";
import TaxTempMaster from "./Masters/TaxTempMaster";
import PayTermMaster from "./Masters/PayTermMaster";
import OrderPackTypeMaster from "./Masters/OrderPackTypeMaster";
import CurrencyMaster from "./Masters/CurrencyMaster";
import UomMaster from "./Masters/UomMaster";
import FinYearMaster from "./Masters/FinYearMaster";
import path from "path-browserify";
import YarnBlendMaster from "./Masters/YarnBlendMaster";
import YarnMaster from "./Masters/YarnMaster";

import ProcessGroupSequence from "./Masters/ProcessGroupSequence";
import ProcessGroupMaster from "./Masters/ProcessGroupMaster";
import LoopLengthMaster from "./Masters/LoopLengthMaster";
import GsmMaster from "./Masters/GsmMaster";
import DesignMaster from "./Masters/DesignMaster";
import PortionMaster from "./Masters/PortionMaster";
import GaugeMaster from "./Masters/GaugeMaster";

const routes = [
  { path: "/BankMaster", component: BankMaster, title: "BankMaster" },
  { path: "/BranchMaster", component: BranchMaster, title: "BranchMaster" },
  { path: "/BuyerMaster", component: BuyerMaster, title: "BuyerMaster" },
  { path: "/CountryMaster", component: CountryMaster, title: "CountryMaster" },
  { path: "/ColorMaster", component: ColorMaster, title: "ColorMaster" },
  { path: "/CityMaster", component: CityMaster, title: "CityMaster" },
  { path: "/CompanyMaster", component: CompanyMaster, title: "CompanyMaster" },
  { path: "/PartyMaster", component: PartyMaster, title: "PartyMaster" },
  { path: "/IFSCMaster", component: IFSCMaster, title: "IFSC Master" },
  { path: "/SizeMaster", component: SizeMaster, title: "SizeMaster" },
  { path: "/SizeGroupMaster", component: SizeGroupMaster, title: "SizeGroupMaster" },
  { path: "/FabricTypeMaster", component: FabricTypeMaster, title: "FabricTypeMaster" },
  { path: "/CountsMaster", component: CountsMaster, title: "CountsMaster" },
  { path: "/RemarksMaster", component: RemarksMaster, title: "RemarksMaster" },
  { path: "/FabricMaster", component: FabricMaster, title: "FabricMaster" },
  { path: "/EmployeeMaster", component: EmployeeMaster, title: "EmployeeMaster" },
  { path: "/ProcessMaster", component: ProcessMaster, title: "ProcessMaster" },
  { path: "/ProcessGroupMaster", component: ProcessGroupMaster, title: "ProcessGroupMaster" },
  { path: "/ProcessGroupSequence", component: ProcessGroupSequence, title: "ProcessGroupSequence" },
  { path: "/HSNMaster", component: HSNMaster, title: "HSNMaster" },
  { path: "/StateMaster", component: StateMaster, title: "StateMaster" },
  { path: "/StyleGroupMaster", component: StyleGroupMaster, title: "StyleGroupMaster" },
  { path: "/StyleCategoryMaster", component: StyleCategoryMaster, title: "StyleCategoryMaster" },
  { path: "/StyleItemMaster", component: StyleItemMaster, title: "StyleItemMaster" },
  { path: "/TaxTemplateDetails", component: TaxTemplateDetails, title: "TaxTemplateDetails" },
  { path: "/TaxMaster", component: TaxMaster, title: "TaxMaster" },
  { path: "/TaxTempMaster", component: TaxTempMaster, title: "TaxTempMaster" },
  { path: "/PayTermMaster", component: PayTermMaster, title: "PayTermMaster" },
  { path: "/OrderPackTypeMaster", component: OrderPackTypeMaster, title: "OrderPackTypeMaster" },
  { path: "/CurrencyMaster", component: CurrencyMaster, title: "CurrencyMaster" },
  { path: "/UomMaster", component: UomMaster, title: "UomMaster" },
  { path: "/FinYearMaster", component: FinYearMaster, title: "FinYearMaster" },
  { path: "/YarnBlendMaster", component: YarnBlendMaster, title: "YarnBlendMaster" },
  { path: "/YarnMaster", component: YarnMaster, title: "YarnMaster" },
  { path: "/LoopLengthMaster", component: LoopLengthMaster, title: "LoopLengthMaster" },
  { path: "/GsmMaster", component: GsmMaster, title: "GsmMaster" },
  { path: "/DesignMaster", component: DesignMaster, title: "DesignMaster" },
  { path: "/PortionMaster", component: PortionMaster, title: "PortionMaster" },
  { path: "/GaugeMaster", component: GaugeMaster, title: "GaugeMaster" },
];

const MasterRoutes = routes.map((r) => ({
  path: r.path,
  element: <r.component title={r.title} subTitle="Details" />,
}));

export default MasterRoutes;
