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
import OrderEntry from "./Transactions/OrderEntry.jsx";

const routes = [
 { path:"/Payment", component:Payment, title:"Payment" },
 { path:"/AdvancePayment", component:AdvancePayment, title:"AdvancePayment" },
 { path:"/UTRPayment", component:UTRPayment, title:"UTRPayment" },
 { path:"/BarCodeGenerate", component:BarCodeGenerate, title:"BarCodeGenerate"},
 { path:"/ProductionEntry", component:ProductionEntry, title:"ProductionEntry"},
 { path:"/CheckingEntry", component:CheckingEntry, title:"CheckingEntry"},
 { path:"/DefectEntry", component:DefectEntry, title:"DefectEntry"},
 { path:"/AutoGenerateMaster", component:AutoGenerateMaster, title:"AutoGenerateMaster"},
 { path:"/DeviceCommunication", component:DeviceCommunication, title:"DeviceCommunication"},
 { path:"/ProductionStatusReport", component:ProductionStatusReport, title:"ProductionStatusReport"},
 { path:"/OrderCloseEntry", component:OrderCloseEntry, title:"OrderCloseEntry"},
 { path:"/AboutMaster", component:AboutMaster, title:"AboutMaster"},
  { path:"/OrderEntry", component:OrderEntry, title:"OrderEntry"},
]

const TransactionsRoutes = routes.map(r => ({
 path: r.path,
 element: <r.component title={r.title} subTitle="Details" />
}))

export default TransactionsRoutes;