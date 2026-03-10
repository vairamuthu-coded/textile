import Payment from "./Transactions/Payment";
import AdvancePayment from "./Transactions/AdvancePayment";
import UTRPayment from "./Transactions/UTRPayment";
import BarCodeGenerate from './Transactions/BarCodeGenerate'
import AutoGenerateMaster from './Registration/AutoGenerateMaster'
import ProductionEntry from './Transactions/Product-Garment/ProductionEntry'
import CheckingEntry from './Transactions/Product-Garment/CheckingEntry'
import DefectEntry from './Transactions/Product-Garment/DefectEntry'
import DeviceCommunication from './Transactions/Attendance/DeviceCommunication.jsx'
import AboutMaster from './Registration/AboutMaster.jsx'
import ProductionStatusReport from './Reports/Lyla/ProductionStatusReport.jsx'
import OrderCloseEntry from './Transactions/SRG/OrderCloseEntry.js'
const TransactionsRoutes = [
 { path:"/Payment", element:<Payment/> },
 { path:"/AdvancePayment", element:<AdvancePayment/> },
 { path:"/UTRPayment", element:<UTRPayment/> },
 { path:"/BarCodeGenerate"      ,element:<BarCodeGenerate       title="BarCodeGenerate"     subTitle="Details"  />},
{ path:"/ProductionEntry"      ,element:<ProductionEntry       title="ProductionEntry"     subTitle="Details"  />},
{ path:"/CheckingEntry"        ,element:<CheckingEntry         title="CheckingEntry"       subTitle="Details"  />},
{ path:"/DefectEntry"          ,element:<DefectEntry           title="DefectEntry"         subTitle="Details" />},
{ path:"/AutoGenerateMaster"   ,element:<AutoGenerateMaster    title="AutoGenerateMaster"  subTitle="Details"  />},
{ path:"/AdvancePayment"       ,element:<AdvancePayment        title="AdvancePayment"      subTitle="Details"  />},
{ path:"/UTRPayment"           ,element:<UTRPayment            title="UTRPayment"          subTitle="Details"  />},
{ path:"/DeviceCommunication"  ,element:<DeviceCommunication   title="DeviceCommunication" subTitle="Details"  />},
{ path:"/ProductionStatusReport",element:<ProductionStatusReport title="ProductionStatusReport" subTitle="Details"  />},
{ path:"/OrderCloseEntry"      ,element:<OrderCloseEntry       title="OrderCloseEntry"     subTitle="Details"  />},
{ path:"/AboutMaster"          ,element:<AboutMaster           title="AboutMaster"         subTitle="Details"  />},

];

export default TransactionsRoutes;