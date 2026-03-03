import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import DataContext from '../context/CreateUserContext';
import DataTable from '../Custom/DataTable';
import axios from 'axios';
import SocialMissing from '../Social/SocialMissing';
import Label from '../Custom/Label'; 
import { toast } from 'react-toastify';
import { useReactToPrint } from 'react-to-print';
import SortingDetails from '../component/data/SortingDetails';
import Input from '../component/elements/Input';
import dateFormat from 'dateformat'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import Search from '../Custom/Search';
import { useParams } from 'react-router-dom';
import { ALERT } from '@blueprintjs/core/lib/esm/common/classes';
import TextInput from '../component/elements/TextInput ';

let TableName='asptblpur'  ;

const BarCodeGenerate = ({ title, subTitle, }) => {
    const { API_URL, newButton, handleSubmit,tabindex, currentPage, setCurrentPage,
        CountryParam, searchLable1, searchLable2, searchLable3,
        setSearchLable1, setSearchLable2, setSearchLable3,
        sequenceTable,colorValue,bgValue,foreValue,barValues, 
    setBarValues,addRows, setAddRows,defaultDetails,
        sorting, setSorting, setNewButton, sizeGroup, setSizeGroup, color1,  addColumns, setAddColumns, HeadersColumn } = useContext(DataContext)
    let ITEM_PER_PAGE = 10; let totalcounts = 0;
   let inputref=useRef();
let portionMaximum=5;
   
  const [totalItems,setTotalItems]=useState([]);
  const ENDPOINTS = {
  COMPANY: "/CompanyMaster/GridLoad",
  BUYER: "/BuyerMaster/BuyerMaster",
  ORDER_SAVE: "/PurchasesOrders/PurchasesOrders",
  SIZE_MASTER: "/SizeGroupMasters/GetSizeMaster",
  SIZE_GROUP: "/SizeGroupMasters/GetSizeGroupMaster",
  DELETE_SIZE_GROUP: "/SizeGroupMasters/DeleteSizeGroupMaster",
  COLOR: "/ColorMaster/GetActiveColor",
  PROCESS: "/ProcessMaster/GetProcess",
  STYLE_ITEM: "/StyleItemMasters/GetStyleItemMaster",
  PONO_DETAILS: "/PurchasesOrders/ponoDetails",
  PONO_DETAILSS: "/PurchasesOrders/PonoDetailss",
  GRID_LOAD: "/PurchasesOrders/GridLoad",
  GRID_LOAD_COLOR: "/PurchasesOrders/GridLoadColor",
  GRID_LOAD_SIZE: "/PurchasesOrders/GridLoadSize",
  MENU_RIGHTS: "/UserRights/userrightsMenuCheck",
};
const compcodeparam = API_URL + ENDPOINTS.COMPANY;
const BuyerMasterParam = API_URL + ENDPOINTS.BUYER;
const insert_update = API_URL + ENDPOINTS.ORDER_SAVE;

const sizeparam = API_URL + ENDPOINTS.SIZE_MASTER;
const sizeGroupParam = API_URL + ENDPOINTS.SIZE_GROUP;
const deleteData = API_URL + ENDPOINTS.DELETE_SIZE_GROUP;

const colorparam = API_URL + ENDPOINTS.COLOR;
const GetProcess = API_URL + ENDPOINTS.PROCESS;
const GetStyleItem = API_URL + ENDPOINTS.STYLE_ITEM;

const PonoDetails = API_URL + ENDPOINTS.PONO_DETAILS;
const PonoDetailss = API_URL + ENDPOINTS.PONO_DETAILSS;

const GridLoadDetails = API_URL + ENDPOINTS.GRID_LOAD;
const GridLoadColor = API_URL + ENDPOINTS.GRID_LOAD_COLOR;
const GridLoadSize = API_URL + ENDPOINTS.GRID_LOAD_SIZE;
const userrightsMenuCheck = API_URL + ENDPOINTS.MENU_RIGHTS;



const refs = useRef([]);

const handleEnter = (e, index) => {
  if (e.key === "Enter" || e.key === "Tab") {
    e.preventDefault();
    refs.current[index + 1]?.focus();
    
  }
};

    const [active, setActive] = useState(true)
    const [poActive, setPoActive] = useState(false)

const printFormat=["PDF","WORD"];
const [docFormat,setDocFormat]=useState(null)
    const heights = "400px"; let validorder = "";
    const [fetchError, setFetchError] = useState(null)
    const [buyerItem, setBuyerItem] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [search, setSearch] = useState('');
    const [barItem, setBarItem] = useState([])
    const [colorItem, setColorItem] = useState([])
    const [compcodeData, setCompCodeData] = useState([])
    const [poItem, setPoItem] = useState([])
    const [sizeGrpItems, setSizeGrpItems] = useState([])
    const [processItems, setProcessItems] = useState([])
    const [styleItem, setStyleItem] = useState([])
    const [sizeItems, setSizeItems] = useState([])
    const [sizeGroup_FilterSearch, setSizeGroup_FilterSearch] = useState([]);
    const [sizeGroupGrid, setSizeGroupGrid] = useState([])
    const [newButton1, setNewButton1] = useState(4);
    setSearchLable1("Search"); setSearchLable2(""); setSearchLable3('')
    const [loading, setLoading] = useState(false)
    const [checkSize, setCheckSize] = useState(false)
    const [checkColor, setCheckColor] = useState(false)
    const [grid, setGrid] = useState([]);
    var data = []; let rows, cols; var ColumnsData = [];
    var RowsData = []; var DArray = [[], []]; let RowIndex = 0;
    const [qtycheck, setQtyCheck] = useState()
    let qtychecks = 0;


const loadDropDown = async (url, setter) => {
  try {
    setter([]);
    const res = await axios.get(url);
    setter(res.data);
  } catch (err) {
    toast.error(err?.message);
  }
};
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  let workerUrls="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js";
   const [pdfFile, setPdfFile]=useState(null);
    const tables = document.getElementById('maintable1');
    var chksiz = document.getElementsByName("chksizename");
    var chkcol = document.getElementsByName("chkcolorename");
    var chkallsize = document.getElementsByName("chkallsizename");
    var chkallTable = document.getElementById("chkallTable");
    var chkallTable1 = document.getElementById("allcolorname");
    var allchkcolorname = document.getElementsByName("allchkcolorname");
    const [gridColor, setGridColor] = useState([])
    const [dynamicCols, setDynamicCols] = useState([])
    const [dynamicRows, setDynamicRows] = useState([])
    const [pos, setPos] = useState([]);
    const [userRights1, setUserRights1] = useState([]) 
    const [searchCompCode, setSearchCompCode] = useState([])
    const [searchUserName, setSearchUserName] = useState([])
  const [checkall,setCheckAll]=useState(false)   
  const [checkchild,setCheckchild]=useState(false)  
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    var imagesrc = '', imageFile = '';
    const [images, setImage] = useState(imagesrc);
  useEffect(() => {
  const loadData = async () => {
    try {
      const [
        res1, res2, res3, res4, res5, res6, res7, res8, res9
      ] = await Promise.all([
        axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`),
        axios.get(`${compcodeparam}`),
        axios.get(`${GetProcess}`),
        axios.get(`${BuyerMasterParam}`),
        axios.get(`${sizeparam}/1`),
        axios.get(`${colorparam}`),
        axios.get(`${GetStyleItem}`),
        axios.get(`${sizeGroupParam}`),
        axios.get(`${GridLoadDetails}`)
      ]);

      setUserRights1(res1.data);
      setCompCodeData(res2.data);
      setProcessItems(res3.data);
      setBuyerItem(res4.data);
      setSizeItems(res5.data);
      setColorItem(res6.data);
      setStyleItem(res7.data);
      setSizeGrpItems(res8.data);
      setGrid(res9.data);
      setNewButton(1);
       
    } catch (error) {
      setFetchError(error);
      toast.error(error)
    }
  };
  loadData();
}, []);

const [dataList, setDataList] = useState([]);
const [csuser,setCsUser]=useState([])
    useEffect(() => {
        const filterResult = barItem.filter((post) => ((post.Sizegroup).includes(search)))
        setSizeGroup_FilterSearch(filterResult);
    }, [barItem, search]);

    var data1 = [], data2 = []; var datas = []; var datasize1 = [];
    var dataIndex = [];


async function ListData() {
    datas = [];

    addRows.forEach((rows, i) => {
        const data1 = []; // reset inside
        const data2 = [];

        addColumns.forEach((cols, j) => {
            data1.push(rows[j].field.trim());
            data2.push(rows[j].value);
        });

        const obj = func(data1, data2);
        datas.push(obj);
    });

    return datas;
}

// const ParamsListData = (res) => {

//     var datas=[]
//   const [Pono, Asptblpurid, Compcode, Finyear, Asptblpur1id] =
//     res.data?.split(",") ?? [];
//   const datas1 = {
//    Asptblpurid: Number(Asptblpurid) || 0,
//    Asptblpur1id: Number(Asptblpur1id) || 0,
//    Finyear: Finyear,
//    Compcode: Compcode,
//    Pono: Pono,
//   };
// datas.push(datas1);
//   return datas;
// };
const ParamsListData = (res) => {
  const [Pono, Asptblpurid, Compcode, Finyear, Asptblpur1id,Barcodetype] = res.data?.split(",") ?? [];
  return [{ Asptblpurid: Number(Asptblpurid) || 0, Asptblpur1id: Number(Asptblpur1id) || 0, 
     Finyear: Finyear,Compcode:Compcode,Pono:Pono,Barcodetype:Barcodetype }];
};



function func(arr1, arr2) {
    const obj = {};

    arr1.forEach((key, index) => {
        // check if numeric (column keys like 130, 140)
        if (isNaN(key)) {
            obj[key] = arr2[index]; // text keys
        } else {
            obj["s" + key] = arr2[index]; // prepend 's' for numeric keys
        }
    });

    return obj;
}



   const BarCodeData = {
    Asptblpurid: Number(barValues?.Asptblpurid) || 0,
    Asptblpur1id: Number(barValues?.Asptblpur1id) || 0,
    Finyear: barValues?.Finyear ?? year,
    Podate: barValues?.Podate,
    Compcode: barValues?.Compcode,
    Compcode1: barValues?.Compcode,
    Compname: barValues?.Compcode,   
    Pono: barValues?.Pono ?? poItem,
    Orderqty: Number(barValues?.Orderqty) || 0,
    Excessqty: Number(barValues?.Excessqty) || 0,
    Sizegroup: barValues?.Sizegroup,
    Buyer: barValues?.Buyercode,
    Processtype: barValues?.Ordertype,
    Orderno: barValues?.Orderno,
    Styleref: barValues?.Styleref,
    Stylename: barValues?.Stylegroup,
    Processname: barValues?.Processname,
    Active: barValues?.Active===true ? "T" : "F",
    Pocancel: barValues?.Pocancel===true ? "T" : "F",
    Garmentimage: images?.imagesrc
};


 
var errorMessage = "";
const FieldValidate = async (barValues) => {
    const requiredFields = [
        { field: "Compcode",      message: "CompCode Is Empty" },
        { field: "Ordertype",     message: "OrderType Is Empty" },
        { field: "Buyercode",     message: "BuyerCode Is Empty" },
        { field: "Stylegroup",    message: "StyleGroup Is Empty" },
        { field: "Orderno",       message: "OrderNo Is Empty" },
        { field: "Styleref",      message: "StyleRef Is Empty" },
        { field: "Sizegroup",     message: "SizeGroup Is Empty" },
        { field: "Processname",   message: "ProcessName Is Empty" },
        { field: "Orderqty",      message: "OrderQty Is Empty" },
        { field: "Podate",        message: "Podate Is Empty" },
    ];

    // Check Pono separately

    if (!poItem) {
        errorMessage = "Pono is Empty";
        toast.error(errorMessage);
        return false;
    }

//     // Loop through required fields
    for (const item of requiredFields) {
        if (barValues[item.field] === undefined || barValues[item.field] === "") {
            errorMessage = item.message;
            toast.error(errorMessage);
            return false;
        }
    }

    // Validate grid rows
    if (addRows.length < 1) {
        errorMessage = "Invalid Grid Rows";
        toast.error(errorMessage);
        return false;
    }

    return true; // all good
};

const TableRowValidate = (addRows) => {
    if (addRows.length < 1) {
        const msg = "Pls Add Rows in Grid";
        toast.error(msg);
        return msg;
    }

    let qtyTotal = 0;

    for (let rowIndex = 0; rowIndex < addRows.length; rowIndex++) {
        const row = addRows[rowIndex];

        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            const { field, value } = row[colIndex];

            if (field === "Colorname") continue;  // Skip color

            // Validate empty values
            if (value < 1) {
                const msg = `Pls Enter Value in ${field} Column at Index: ${colIndex}`;
                toast.error(msg);
                return qtyTotal;
            }

            // Accumulate qty (excluding Portion column)
            if (field !== "Portion") {
                qtyTotal += value;

                // Exceed check when using OrderQty
                if (barValues.Orderqty > 0 && barValues.Excessqty === undefined) {
                    if (qtyTotal > barValues.Orderqty) {
                        //const msg = `Order Qty Exceed. Please Enter Correct Order Qty: ${barValues.Orderqty} | Actual: ${qtyTotal}`;
                       // toast.error(msg);
                        //return qtyTotal;
                    }
                }

                // Exceed check when using ExcessQty
                if (barValues.Excessqty !== undefined) {
                    if (qtyTotal > barValues.Excessqty) {
                        // const msg = `Excess Qty Exceed. Please Enter Correct Qty: ${barValues.Excessqty} | Actual: ${qtyTotal}`;
                        // toast.error(msg);
                        //return qtyTotal;
                    }
                }
            }
        }
    }

    return qtyTotal; // valid
};

   
const handleChange = async (e) => {
    const { name, value, type, checked,inputMode } = e.target;
    const fieldValue =
        type === "checkbox" ? checked :
        inputMode === "numeric" ? value.replace(/[^0-9]/g, "") :
        value;

    // Update input state immediately (safe)
    setBarValues(prev => ({
        ...prev,
        [name]: fieldValue
    }));

    // Build a snapshot to use for async logic
    const current = {
        ...barValues,
        [name]: fieldValue
    };

    validorder = "";

    // -------------------------
    // COMP CODE CHANGED
    // -------------------------
     if (name === "Compcode") {   
        const today = new Date().toISOString().slice(0, 10);
        setBarValues(prev => ({
            ...prev,
            Compcode: value,
            Podate: today
        }));   
        current.Compcode = value; 
        current.Podate = today;
     }

    // -------------------------
    // ORDERTYPE = ORDER
    // -------------------------
    if (name === "Ordertype" && value === "ORDER") {
        if (!current.Compcode) return;

        setvisible(false);
        setPoItem([]);
        setAddRows([]);
        setAddColumns(HeadersColumn);
        uncheck(chksiz, "");
        uncheck(chkcol, "");

        try {
            const res = await axios.get(
                `${GridLoadDetails}/${current.Compcode}/${TableName}/${title}/${sequenceTable}`
            );

            if (res?.data) {
                setPoItem(res.data);
            } else {
                setFetchError(res.data);
                toast.error(res?.data);
            }
        } catch (err) {
            setFetchError(err);
            toast.error(err);
        }
        return;
    }

    // -------------------------
    // ORDERTYPE = EXCESSQTY
    // -------------------------
    if (name === "Ordertype" && value === "EXCESSQTY") {
       
        if (!current.Compcode) return;      
        setvisible(true);
        setPoItem([]);

        try {
             
            const res = await axios.get(`${PonoDetails}/${TableName}/${current.Compcode}`);              
            setPos(res.data);           
            setBarValues(prev => ({
                ...prev,
                Pono: res.data[0].pono,
                Pono1: res.data[0].pono,           
            }));
            
        } catch (error) {
            setFetchError(error);
            toast.error(error);
        }
        return;
    }

    // -------------------------
    // PONO1 CHANGE
    // -------------------------
    if (name==="Pono1") {        
       
   
        if (!current.Compcode || !current.Ordertype) return;
 
        setvisible(true);
        setPoItem([value]);
        // Reset temp arrays (create new ones)
        let columns = [];
        let rows = [];

        setAddColumns([]);
        setAddRows([]);
        uncheck(chkcol, "");

        try {
            // Step 1: load PONO details
            const res = await axios.get(
                `${PonoDetailss}/${current.Compcode}/${current.Ordertype}/${value}`
            );

            const row = res.data[0];
            await DropDown_Check(row.sizegroup, "Sizegroup");
            await StateValues(row);

            // Step 2: load all colors
            const resColor = await axios.get(
                `${GridLoadColor}/${value}/${row.compcode}`
            );

            // Step 3: load all sizes once
            const resSize = await axios.get(
                `${PonoDetails}/${row.compcode}/${row.sizegroup}/${value}`
            );

            const sizes = resSize.data;
            // ⚡ Build final column list
            const sizeColumns = sizes.map(s => ({
                field: s.sizename,
                placeholder: "Size",
                HeaderVisible: "visible",
                widths: "30px"
            }));

            columns = [...HeadersColumn, ...sizeColumns];          
            setAddColumns(columns);

            // ⚡ Build rows — 1 row per color
            for (const color of resColor.data) {

                if (color.colorname === "invalid") {
                    setFetchError(color.portion);
                    toast.error(color.portion);
                    continue;
                }

                const rowData = [
                    { field: "Colorname", value: color.colorname },
                    { field: "Portion", value: color.portion ?? 0 },
                    ...sizes.map(s => ({
                        field: s.sizename,
                        value: "",
                        placeholder: "Size"
                    }))
                ];

                rows.push(rowData);
            }

            // Batch update rows once
            setAddRows(rows);

            // apply checkbox logic
            for (const r of rows) {
                await TSizeColor(chkallTable, chksiz, r, false, true);
                await TSizeColor(chkallTable1, chkcol, r, true, false);
            }

        } catch (err) {
            toast.error(err);
            setFetchError(err);
        }

        return;
    }
    // -------------------------
    // SIZEGROUP CHANGE
    // -------------------------
    if (name === "Sizegroup") {
        await DropDown_Check(value, name);
    }
};

    
   
    const BarCodeTrans_Search = async () => { setNewButton(2) }

const BarCodeTrans_Save = async () => {
  try {
    const isValid = await FieldValidate(barValues);
    if (!isValid) return; // Stop if field validation fails

    const validqty = await TableRowValidate(addRows);

    const orderQty = Number(barValues?.Orderqty);
    const excessQty = Number(barValues?.Excessqty);

    if (!(orderQty === validqty || excessQty === validqty)) {
      const msg = `Excess Qty Exceed. Please Enter Correct Qty: ${orderQty} | Actual: ${validqty}`;
      const [msg1, msg2] = msg.split("|").map(x => x.trim());
      toast.error(`${msg1}\n${msg2}`);
      return;
    }

    // First API call  
    const res = await axios.post(`${insert_update}`,BarCodeData);
    const users = await ListData(); 
    
    totalcounts="Total Rows : "+ users.length;
    const param= ParamsListData(res);    

    if (!res.data) {
      toast.error("Invalid response from server");
      return;
    }


    // Second API call
      if(users){ 
    const res2 = await axios.post(`${insert_update}/${JSON.stringify(users)}/${JSON.stringify(param)}`);
    if (!res2.data) {
      toast.error("Save failed!");
      return;
    }

    // Third API call
    const res3 = await axios.post(`${insert_update}/${JSON.stringify(param)}`);
    if (!res3.data) {
      toast.error("Save failed!");
      return;
    }

    toast.success(res3.data);
    setIsLoading(false);totalcounts=0;
    BarCodeTrans_New(); // Reset UI
}

  } catch (error) {
    console.error(error);
    setFetchError(error);
    toast.error(error?.message || "Error occurred");
  }
};




const BarCodeTrans_Delete = async () => {
    try {
        setNewButton(10);

        if (!sizeGroup.Sizegroup) {
            toast.error("Empty Not Allowed");
            return;
        }

        if (sizeGroup.asptblsizgrpid >= 1) {
            const id = sizeGroup.asptblsizgrpid;

            // DELETE API
            const deleteRes = await axios.delete(`${deleteData}/${id}`);

            if (deleteRes.data) {
                // Reload list
                try {
                    const listRes = await axios.get(sizeGroupParam);
                    setBarItem(listRes.data);
                } catch (listErr) {
                    setFetchError(listErr);
                    toast.error(listErr.message);
                }

                toast.success("Record Deleted Successfully");
                BarCodeTrans_New();
            } else {
                toast.error("Error " + deleteRes.data);
            }
        }
    } catch (err) {
        setFetchError(err);
        toast.error(`Error ${err?.message || err}`);
    }
};


const TSizeColor = (tblid, TableName, tbldata, validcheck, validsize) => {
    const rows = tblid.rows.length;   
    try{
        
    for (let i = 0; i < rows; i++) {
        const cells = tblid.rows[i].cells;
        const tds = cells[2]?.innerText.trim();   // Only column index 2
        if (!tds) continue;

        // COLOR SELECTION BLOCK
        if (validcheck === true) {
            const rowData = tbldata.map(col => ({
                field: col.field,
                value: col.field === "Colorname" ? tds : "",
                placeholder:col.field,
                HeaderVisible: col.HeaderVisible,
                widths: col.widths === "" ? "30px" : col.widths
                // value: col.field === "Colorname" ? tds : "",
                // placeholder: col.field === "Colorname" ? "Colorname" : "Colorname",
                // HeaderVisible: col.field === "Colorname" ? "HeaderVisible" : "visible",
                // widths: col.field === "Colorname" ? "widths" : "30px"
            }));

            RowsData.push(rowData);
        }

        // SIZE SELECTION BLOCK
        if (validsize === true) {
            RowsData.push({
                field: tds,
                value: '',
                placeholder: "Size",
                HeaderVisible: "visible",
                widths: "30px",
            });
        }

        // CHECKBOX AUTO SELECT
        tbldata.forEach(col => {
            if (validcheck === true && tds === col.value) {
                TableName[i].checked = true;
            }
            if (validsize === true && tds === col.field) {
                TableName[i].checked = true;
            }
        });
    }

}catch(e){
    toast.error(e)
}
};


   

    const uncheck = (ch, ind) => {
        for (var i = 0; i < ch.length; i++) {
            ch[i].checked = false;
        }
    }

    const TabIndexClick = async(inx) => {       
          if (inx === 3) { 
      const response = await axios.get(`${API_URL}/UserMaster/GenerateReportDetails/${barValues.Compcode}/${barValues.Asptblpurid}/${printFormat[0]}` );
        setPdfFile(`data:application/pdf;base64,${response.data}`);   
     const response1 = await axios.get(`${API_URL}/UserMaster/GenerateReportDetails/${barValues.Compcode}/${barValues.Asptblpurid}/${printFormat[1]}`);
        setDocFormat(`data:application/pdf;base64,${response1.data}`);     

        }

         if (inx === 4) { 
                 const response = await axios.get(`${API_URL}/ProductionStatusReport/ProdcutionReport/${printFormat[0]}`);
        setPdfFile(`data:application/pdf;base64,${response.data}`);  
          setDocFormat(`data:application/pdf;base64,${response.data}`); 
        }
        setNewButton(inx);
    }

    

const GridLoad = async () => {
  try {
    setLoading(true);
    const res = await axios.get(GridLoadDetails);
    setGrid(res.data);
  } catch (error) {
    setFetchError(error);
  } finally {
    setLoading(false);
  }
};



    const BarCodeTrans_New = () => {
 setPdfFile(null)
        setNewButton(1); setCsUser(null)
        setBarValues([]); imagesrc=null;
        setAddRows([]);setImage({imagesrc})
        setAddColumns(HeadersColumn); RowsData = []
        uncheck(chksiz, ""); uncheck(chkcol, "");
        setCheckSize(false); setCheckColor(false); setPoItem([])
        allchkcolorname.checked = false;
GridLoad();
      
    }



    const DropDown_Check = async (id, fieldname) => {

        try {
            if (fieldname === "Sizegroup") {
                setSizeItems([]);
            loadDropDown(`${sizeparam}/${id}`, setSizeItems);                  
            }
        }
        catch (err) {
            if (err.response) {
                toast.error(err?.response)
                setFetchError(err.response)
            }
        }

    }

    const [visible, setvisible] = useState(true);


    var ponos = '';


const chksizenameChange = (e, ind, fieldName) => {

 if(!barValues.Sizegroup){return}
     const { checked } = e.target;
    // If rows exist, do NOT allow size column toggle
    if (addRows.length > 0) {
        uncheck(chksiz, ind);
        return;
    }

    setAddColumns(prev => {
        const exists = prev.some(col => col.field === fieldName);

        // If checkbox is checked → add column
        if (checked) {
            if (!exists) {
                return [
                    ...prev,
                    {
                        field: fieldName,
                        value: '',
                        placeholder: "Size",
                        HeaderVisible: "visible",
                        widths:"30px"
                    }
                ];
            }
            return prev; // no duplicate column
        }

        // Checkbox unchecked → remove column
        return prev.filter(col => col.field !== fieldName);
    });
};



    let defaultimage = '../Images/Anugraha_logo.jpg';

    const showPreview = e => {
        if (e.target.files.name != "") {
            imageFile = e.target.files[0]
            const reader = new FileReader();
            reader.onload = x => {
                setImage({
                    ...images,
                    imageFile,
                    imagesrc: x.target.result,
                })
            }
            reader.readAsDataURL(imageFile);
        }
        else {
            setImage({
                ...images,
                imageFile: null,
                imagesrc: defaultimage
            })

        }

    }
    var alldata1, r = 0, tds = "", str = "";



    const chkallsizenameChange = async (e) => {
    const { checked } = e.target;
 if(!barValues.Sizegroup){return}
    setCheckSize(checked);
    setAddRows([]); 
    RowsData = [];  

    // Update size-related columns first
    await TSizeColor(chkallTable, chksiz, addColumns, 'false', checked);
    // Merge HeadersColumn + RowsData using map object (unique by field)
    const hashData = new Map();
    [...HeadersColumn, ...RowsData].forEach(obj => {
        hashData.set(obj.field, { ...(hashData.get(obj.field) || {}), ...obj });
    });
    const finalData = Array.from(hashData.values());
    // Update columns in one render
    setAddColumns(finalData);
};


const chkallallcolornameChange = async (e) => {
    const { checked, type } = e.target;
 if(!barValues.Sizegroup){return}
    // Clear rows first
    setAddRows([]);
    setCheckColor(checked);

     if (type === "checkbox") {

    // Perform required size/color update
   await TSizeColor(chkallTable1, chkcol, addColumns, checked, 'false');

    if (addColumns.length > 2 && RowsData.length > 0) {
        // Update rows in one batch instead of inside a loop
        setAddRows([...RowsData]);
        RowsData = []; // restore empty list if needed
    }
    }
};


    const chkcolorenameChange = async (colors, ind) => {
         if(!barValues.Sizegroup){return}
    if (addColumns.length <= 2) return;

    // new row data

    const rowData = addColumns.map(col => {
        return {
            field: col.field, value: col.field === "Colorname" ? colors : "",widths:col.widths
        };
    });

    // check if row with same color exists
    const exists = addRows.some(r => r[0].value === colors);

    if (!exists) {
        // add new row
        setAddRows(prev => [...prev, rowData]);
    } else {
        // remove the row
        setAddRows(prev => prev.filter(r => r[0].value !== colors));
    }
};

const fieldValueChange = (e, colindex, rowindex) => {
    const { name, value } = e.target;

    // Convert to number safely
    const finalValue = parseInt(value) || 0;

    // Ignore zero/invalid values
    if (finalValue <= 0) return;

    setAddRows(prev => {
        const updated = [...prev].map(row => [...row]); // deep clone of rows
        const cell = updated[rowindex][colindex];
        if (cell.field !== name) return updated;
        // Portion only allows <=5
        if (name === "Portion") {

            if (finalValue <= portionMaximum) {
                cell.value = finalValue;
            }
            if (finalValue > portionMaximum) {
                toast.error("Portion Exeeded.Maximum Portion : "+ portionMaximum)
            }
            return updated;
        }

        // Other fields except Colorname allow max length 6
        if (name !== "Colorname") {
            if (value.length <= 6) {
                cell.value = finalValue;
            }
        }

        return updated;
    });
};





    const HeadersColumnGrid =
        [
            { headername: "", field: "visible" },
            { headername: "Asptblpurid", field: "asptblpurid" },
            { headername: "Compcode", field: "compcode" },
            { headername: "Podate", field: "podate" },
            { headername: "Pono", field: "pono" },
            { headername: "Stylename", field: "stylename" },
            { headername: "Sizegroup", field: "sizegroup" },
            { headername: "Orderqty", field: "orderqty" },
            { headername: "Styleref", field: "styleref" },
            { headername: "Orderno", field: "orderno" },
            { headername: "Active", field: "active" },
        ]

const StateValues = async (res) => {
    // Start with a clean object
    let newState = {
        Asptblpurid: 0,
        Asptblpur1id: 0,
        Finyear: "",
        Podate: "",
        Compcode: "",
        Compcode1: "",
        Compname: "",
        Pono: "",
        Pono1: "",
        Orderqty: 0,
        Sizegroup: "",
        Excessqty: 0,
        Buyercode: "",
        Ordertype: "",
        Orderno: "",
        Styleref: "",
        Stylegroup: "",
        Processname: "",
        Active: "F",
        Pocancel: "F",
        Garmentimage: "",
        Imagebytes:""
    };

    // -------------------------------
    // CASE 1: ORDER + new / negative id
    // -------------------------------
    if (res.processtype === "ORDER" && res.asptblpurid < 0) {
        newState.Pono = res.pono;
        newState.Pono1 = res.pono;       
        setBarValues(newState);
        return;
    }

    // -------------------------------
    // CASE 2: EDIT MODE (existing record)
    // -------------------------------
    if (res.asptblpurid >= 1) {
     
        // Set image preview
        setImage({           
            imagesrc: res.garmentimage !== null ? "data:image/jpeg;base64,"+res.garmentimage : null,
        });

        newState = {
            ...newState,
            Asptblpurid: res.asptblpurid,
            Asptblpur1id: res.asptblpur1id,
            Finyear: res.finyear,
            Podate: res.podate,
            Compcode: res.compcode,
            Compcode1: res.compcode,
            Compname: res.compcode,
            Pono: res.pono,
            Pono1: res.pono,
            Orderqty: res.orderqty,
            Sizegroup: res.sizegroup,
            Excessqty: res.excessqty,
            Buyercode: res.buyer,
            Ordertype: res.processtype,
            Orderno: res.orderno,
            Styleref: res.styleref,
            Stylegroup: res.stylename,
            Processname: res.processname,
            Active: res.active==="T" ? true : false,
            Pocancel: res.pocancel==="T" ? true : false,
            Garmentimage: res.garmentimage !== null ? "data:image/jpeg;base64,"+res.garmentimage : null,
            Imagebytes:res.garmentimage !== null ? res.garmentimage.length : 0,
        };

        setBarValues(newState);
        return;
    }

    // -------------------------------
    // CASE 3: NEW ENTRY (id = 0)
    // -------------------------------
     setImage({           
            imagesrc: res.garmentimage !== null ? "data:image/jpeg;base64,"+res.garmentimage : null,
        });
    newState = {
        ...newState,
        Finyear: res?.finyear,
        Podate: res?.podate,
        Compcode: res?.compcode,
        Compcode1: res?.compcode,
        Compname: res?.compcode,
        Pono: res?.pono,
        Pono1: res?.pono,
        Orderqty: res?.orderqty,
        Sizegroup: res?.sizegroup,
         Excessqty: res?.excessqty,
         Buyercode: res?.buyer,
         Ordertype: res?.processtype,
         Orderno: res?.orderno,
         Styleref: res?.styleref,
         Stylegroup: res?.stylename,
         Processname: res?.processname,
         Active: res?.active==="T" ? true : false,
         Pocancel: res?.pocancel==="T" ? true : false,
         Garmentimage:res?.garmentimage !== null ? "data:image/jpeg;base64,"+res?.garmentimage : null,
         Imagebytes:res?.garmentimage !== null ? res?.garmentimage.length : 0,
    };

    setBarValues(newState);
};

const GridLoad_Check = async (id) => {
    try {
        setAddRows([]);
        setAddColumns([]);
        setPdfFile(null);
        uncheck(chksiz, '');
        uncheck(chkcol, '');

        // 1. HEADER
        const res = await axios.get(`${GridLoadDetails}/${id.asptblpurid}/${id.compcode}`);
        if (res.data.length === 0) return toast.error("Invalid Data");

        const header = res.data[0];
        await StateValues(header);

        setvisible(true);
        setPoItem(header.pono);

        // 2. SIZE GROUP
        const sizeResp = await axios.get(`${sizeparam}/${header.sizegroup}`);
        setSizeItems(sizeResp.data);

        // 3. BASE COLUMNS
        let baseColumns = HeadersColumn.map(col => ({
            field: col.field,
            value: '',
            placeholder: col.placeholder,
            HeaderVisible: "visible",
            widths: col.widths,
            disabled: false
        }));

        // 4. SIZE COLUMNS
        const res1 = await axios.get(
            `${GridLoadDetails}/${id.asptblpurid}/${id.compcode}/${id.pono}`
        );

        let sizeColumns = [];
        if (res1.data.length > 0) {
            sizeColumns = res1.data.map(size => ({
                field: size.sizename,
                value: 0,
                placeholder: "Size",
                HeaderVisible: "visible",
                widths: "30px"
            }));
        }

        setAddColumns([...baseColumns, ...sizeColumns]);

        // 5. COLORS
        const colorResp = await axios.get(
            `${GridLoadColor}/${id.asptblpurid}/${id.pono}/${id.compcode}`
        );
        const colors = colorResp.data;

        // 6. SIZE QTY
        const sizeQtyResp = await axios.get(
            `${GridLoadSize}/${id.asptblpurid}/${id.pono}/${id.compcode}`
        );
        const sizeQty = sizeQtyResp.data;

        // 7. BUILD ROWS
        let allRows = [];

        for (const color of colors) {
            const rowSizeQty = sizeQty.filter(x => x.colorname === color.colorname);

            let row = [];

            for (const column of [...baseColumns, ...sizeColumns]) {
                if (column.field === "Colorname") {
                    row.push({ field: "Colorname", value: color.colorname,width:column.widths });
                }
                else if (column.field === "Portion") {
                    row.push({ field: "Portion", value: rowSizeQty[0]?.portion, width:column.widths});
                }
                else {
                    const sizeValue = rowSizeQty.find(x => x.sizename === column.field);
                    row.push({field: column.field, value: sizeValue?.orderqty,width:column.widths});
                }
            }

            allRows.push(row);
        }

        // 8. SET ROWS
        setAddRows(allRows);

        for (const row of allRows) {
            await TSizeColor(chkallTable, chksiz, row, false, true);
            await TSizeColor(chkallTable1, chkcol, row, true, false);
        }

    } catch (ex) {
        toast.error(ex.response?.data || ex.message);
    } finally {
        setNewButton(1);
    }
};




    const commentsData = useMemo(() => {
        let computedComments = sizeItems;
        if (search) {
            computedComments = sizeItems.filter((item) => ((item.sizename).includes(search)))
        }
        SortingDetails(computedComments, setTotalItems, sorting)
        return computedComments.slice(
            (currentPage - 1) * ITEM_PER_PAGE,
            (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);

    }, [sizeItems, currentPage, search, sorting])


    const commentsDataColor = useMemo(() => {
        let computedComments = colorItem;
        if (search) {
            computedComments = computedComments.filter((item) => ((item.colorname).includes(search)))
        }
        setTotalItems(computedComments.length);

        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedComments = computedComments.sort((a, b) =>
                reversed * a[sorting.field].localeCompare(b[sorting.field]))
        }
        return computedComments.slice(
            (currentPage - 1) * ITEM_PER_PAGE,
            (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
    }, [colorItem, currentPage, search, sorting])


   const commentsDataGrid = useMemo(() => {
  const keyword = String(search || "").toLowerCase();
  // STEP 1: FILTER
  let filtered = grid;

  if (keyword.trim() !== "") {
    filtered = grid.filter((item) => {
      const fieldsToSearch = [
        "asptblpurid",
        "pono",
        "sizegroup",
        "stylename",
        "orderno",
        "styleref",
      ];

      return fieldsToSearch.some((key) => 
        String(item[key] || "").toLowerCase().includes(keyword)
      );
    });
  }

  // Update total count
  setTotalItems(filtered.length);

  // STEP 2: SORT
  if (sorting.field) {
    const order = sorting.order === "asc" ? 1 : -1;

    filtered = [...filtered].sort((a, b) => 
      order * String(a[sorting.field] || "").localeCompare(String(b[sorting.field] || ""))
    );
  }

  // STEP 3: PAGINATION
  const start = (currentPage - 1) * ITEM_PER_PAGE;
  const end = start + ITEM_PER_PAGE;

  return filtered.slice(start, end);

}, [grid, currentPage, search, sorting]);




const contentRef = useRef(null);
  const  reactToPrintFn = useReactToPrint({ contentRef });
   

const TabIndexClick1 = async (inx, name) => {

  setNewButton1(inx);
};


const pageLayout = {
    transformSize: ({ size }) => ({
        width: size.width + 32,
        height: size.height + 32,
    }),
};


  const BarCodeTrans_Prints =  () => {     


    if (docFormat !== null) {    
      
      const link = document.createElement("a");
      link.href = docFormat;
       if(newButton===3){ link.download = `_ BarCode.docx`;   }else{
       link.download = `_ BarCode.pdf`;   }
      document.body.appendChild(link);
      link.click();      
      link.remove(); 
    
    } else {
      toast.error("No Data Found");
    }
  }
    
  





    return (
<div onSubmit={handleSubmit}  >
            {userRights1.length >= 1 &&
      
                <div className='container-fluid animate-zoom p-1' >
                    <div className='row' style={{ display: `${userRights1[0].readonlys === "T" ? "block" : "none"}` }}>
                        <>
                       <ul className="boxShadow" style={{ display: "flex", justifyContent: "right",margin:'0 0 5px 0'  }}>
                                <li> <button type='submit' className={newButton === 1  ? "tabs active-tabs" : "tabs" } style={{display:`${userRights1[0].news}`==='T' ? "block" : "none",backgroundColor:`${colorValue}`}} onClick={() => BarCodeTrans_New()}    >News</button></li>
                                <li> <button type='submit' className={newButton === 10 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].saves}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => BarCodeTrans_Save()}    >Save</button></li>
                                <li > <button type='submit' className={newButton === 11 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].deletes}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => BarCodeTrans_Delete(barValues.asptblpurid)}  >Delete</button></li>
                                <li  > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].searche}` === "T" ? "block" : "none",ackgroundColor:`${colorValue}`}}  onClick={() => BarCodeTrans_Search()}  > Search </button></li>
                                <li  > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].prints}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}} onClick={()=>BarCodeTrans_Prints()}  >Prints</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].readonlys}` === "T" ? "none" : "none",backgroundColor:`${colorValue}`}} onClick={() => BarCodeTrans_New()} >Readonlys</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].treebutton}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => BarCodeTrans_New()} >TreeButton</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].globalsearch}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => BarCodeTrans_New()} > Globalsearch </button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].login}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => BarCodeTrans_New()} >Login</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].changepassword}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => BarCodeTrans_New()} >Changepassword</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].changeskin}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => BarCodeTrans_New()} >Changeskin</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].contact}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}} onClick={() => BarCodeTrans_New()} > Contact </button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].pdf}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => BarCodeTrans_New()} >Pdf</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].imports}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => BarCodeTrans_New()} > Import </button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].download}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => BarCodeTrans_New()} > Download </button></li>
                            </ul>      

                          
                            <ul className='' style={{backgroundColor:`${colorValue}`}}>
                               <li className='ps-2'> <button className={newButton === 1 || newButton === 10 ? "tabs active-tabs btn" : "tabs"} onClick={() => TabIndexClick(1)} style={{ backgroundColor:`${colorValue}`, width:'100%',padding:'1%',fontWeight:'bold'}}>{title}  </button></li>
                               <li className='ps-2'> <button className={newButton === 2 ? "tabs active-tabs btn" : "tabs"} onClick={() => TabIndexClick(2)} style={{ backgroundColor:`${colorValue}`, width:'100%', fontWeight:'bold', }} > {subTitle} </button></li>
                               <li className='ps-2'> <button className={newButton === 3 ? "tabs active-tabs btn" : "tabs "} onClick={() => TabIndexClick(3,barValues.Asptblpurid)} style={{ backgroundColor:`${colorValue}`, width:'100%',fontWeight:'bold', }} > Reports  </button></li>
                               <li className='ps-2'> <button className={newButton === 4 ? "tabs active-tabs btn" : "tabs "} onClick={() => TabIndexClick(4,barValues.Asptblpurid)} style={{ backgroundColor:`${colorValue}`, width:'100%',fontWeight:'bold', }} > Reports Status </button></li>

                            </ul>
                           <div className='content-tabs' >
                                <div className={newButton === 1 || newButton === 10 ? "content active-content" : "content"}>
                                    <div className='row animate-zoom'  >
                                        <div className='col-md-11'> 
                                            <div className='row'>
                                                <Input type={'text'} className1='col-md-1' className='col-md-1' id='Asptblpurid' name='Asptblpurid' placeholder='' value={barValues.Asptblpurid || ""} onChange={handleChange} barValues={barValues} setBarValues={setBarValues} name1={"id"} stylecolor={`${colorValue}`} visible={true} />
                                                <Input type={'text'} className1='col-md-1' className='col-md-1' id='Asptblpur1id' name='Asptblpur1id' placeholder='' value={barValues.Asptblpur1id || ""} onChange={handleChange} barValues={barValues} setBarValues={setBarValues} name1={"Seq"} stylecolor={colorValue} visible={true} />
                                                <Label className={`col-md-1`} forecolor={`${colorValue}`} labelName={"CompCode"}></Label>
                                                <select className='col-md-1' name="Compcode"    style={{ color: `${colorValue}` }} defaultValue={"--"}
                                                    value={barValues.Compcode || ""} onChange={handleChange} tabIndex="0" ref={el => refs.current[0] = el} onKeyDown={e => handleEnter(e,0)}  >
                                                    <option></option>
                                                    {   
                                                        compcodeData.map((result, index) => (
                                                            <option key={index} value={result.gtcompmastid}>
                                                                {result.compcode}
                                                            </option>))
                                                    }
                                                </select>

                                                <Label className={`col-md-1`} labelName={"Type"} forecolor={`${colorValue}`} ></Label>
                                                <select className='col-md-2' name="Ordertype"  style={{ color: `${colorValue}` }}
                                                    value={barValues.Ordertype || ""} onChange={handleChange} tabIndex="1" ref={el => refs.current[1] = el} onKeyDown={e => handleEnter(e,1)}  >
                                                    <option></option>
                                                    <option value={"ORDER"}>ORDER</option>
                                                    <option value={"EXCESSQTY"}>EXCESSQTY</option>
                                                </select>
                                                <Label className={`col-md-1`} name="Pono1" forecolor={`${colorValue}`} labelName={"PoNo"}  visible={barValues.Ordertype === "ORDER" ? "none" : "block"} ></Label> 
                                                 <select className='col-md-2' name="Pono1"  style={{ display: `${barValues.Ordertype}` === "ORDER" ? "none"  : "block", color: `${colorValue}` }}
                                                    value={barValues.Pono || ""} onChange={handleChange} tabIndex="2" ref={el => refs.current[2] = el} onKeyDown={e => handleEnter(e,2)}  >
                                                   <option></option>{
                                                        pos.map((result, index) => (
                                                            <option key={index} value={result.pono}>
                                                                {result.pono}
                                                            </option>))
                                                    }
                                                </select>

                                            </div>
                                            <div className='row py-1' >
                                                 <Label className={`col-md-1`} labelName={"Pono"} forecolor={`${colorValue}`} ></Label>
                                                <input type="text"  readOnly  className='col-md-2'  name='Pono' placeholder='' value={poItem || ""} onChange={handleChange} 
                                                ref={el => refs.current[2] = el}   onKeyDown={e => handleEnter(e,2)}  />

                                                <Label className={`col-md-1`} labelName={"Buyer"} forecolor={`${colorValue}`} ></Label>
                                                <select className='col-md-2' tabIndex="3" ref={el => refs.current[3] = el} onKeyDown={e => handleEnter(e,3)}  name="Buyercode"  style={{ color: `${colorValue}` }}
                                                    value={barValues.Buyercode || ""} onChange={handleChange} >
                                                    <option></option>{
                                                        buyerItem.map((result, index) => (
                                                            <option key={index} value={result.asptblbuymasid}>
                                                                {result.buyercode}
                                                            </option>))
                                                    }
                                                </select>

                                                <Label className={`col-md-1`} labelName={"StyleName"} forecolor={`${colorValue}`} ></Label>
                                                <select className='col-md-2' name="Stylegroup" style={{ color: `${colorValue}` }}
                                                    value={barValues.Stylegroup || ""} onChange={handleChange} tabIndex="4" ref={el => refs.current[4] = el} onKeyDown={e => handleEnter(e,4)}  >
                                                    <option></option>{
                                                        styleItem.map((result, index) => (
                                                            <option key={index} value={result.asptblstygrpmasid}>
                                                                {result.stylegroup}
                                                            </option>))
                                                    }
                                                </select>
                                                 <Label className="col-md-1" labelName={"Podate"} forecolor={`${colorValue}`} ></Label>
                                                  <input type='date'  className='col-md-2'  name='Podate'  placeholder='' value={barValues.Podate || ""} onChange={handleChange} ref={el => refs.current[5] = el} onKeyDown={e => handleEnter(e,5)}  />

                                            </div>
                                            <div className='row' >
                                                <Label className={`col-md-1`} labelName={"Orderno"} forecolor={`${colorValue}`}></Label>
                                                <input type='text' name='Orderno' value={barValues.Orderno || " "}   className='col-md-2' onChange={handleChange} ref={el => refs.current[6] = el} onKeyDown={e => handleEnter(e,6)} />
                                               <Label className={`col-md-1`} labelName={"Styleref"} forecolor={`${colorValue}`}></Label> 
                                               <input type='text' name='Styleref' value={barValues.Styleref || " " }  className='col-md-2' onChange={handleChange} ref={el => refs.current[7] = el} onKeyDown={e => handleEnter(e,7)} />
                                                <Label className={`col-md-1`} labelName={"SizeGroup"} forecolor={`${colorValue}`}></Label>
                                                <select className='col-md-2' name="Sizegroup"   style={{ color: `${colorValue}` }}
                                                    value={barValues.Sizegroup || ""} onChange={handleChange} tabIndex="8"  ref={el => refs.current[8] = el} onKeyDown={e => handleEnter(e,8)} >
                                                    <option></option>{
                                                        sizeGrpItems !== null &&
                                                        sizeGrpItems.map((result, index) => (<option key={index}
                                                            value={result.asptblsizgrpid}>
                                                            {result.sizegroup}
                                                        </option>))
                                                    }
                                                </select>
                                                <Label className={`col-md-1`} labelName={"Process"} forecolor={`${colorValue}`} ></Label>
                                                <select className='col-md-2' name="Processname"  tabIndex="11"   style={{ color: `${colorValue}` }}
                                                    value={barValues.Processname || ""} onChange={handleChange} ref={el => refs.current[9] = el}  onKeyDown={e => handleEnter(e,9)}  >
                                                    <option></option>{
                                                        processItems !== null &&
                                                        processItems.map((result, index) => (<option key={index} value={result.asptblpromasid}>
                                                            {result.processname}
                                                        </option>))
                                                    }
                                                </select>
                                            </div>
                                            <div className='row py-1' >
                                                 <Label className={`col-md-1`} labelName={"Orderqty"} forecolor={`${colorValue}`}></Label>
                                                <input type='text' name='Orderqty' inputMode='numeric' pattern="[0-9]*" maxLength={5} value={barValues.Orderqty || " "}   className='col-md-1' style={{ color: `${colorValue}` }}  onChange={handleChange} ref={el => refs.current[10] = el} onKeyDown={e => handleEnter(e,10)} />
                                               <Label className={`col-md-1`} labelName={"Excessqty"} forecolor={`${colorValue}`}></Label> 
                                               <input type='text' name='Excessqty' inputMode='numeric' pattern="[0-9]*" maxLength={5} value={barValues.Excessqty || " " }  className='col-md-1' style={{ color: `${colorValue}` }} onChange={handleChange} ref={el => refs.current[11] = el} onKeyDown={e => handleEnter(e,11)} />
                                               <Label className={`col-md-1`} labelName={"Active"} forecolor={`${colorValue}`} ></Label>
                                                 <label className='checkbox' style={{ padding: "0px", width: "60px" }}  ref={el => refs.current[12] = el} onKeyDown={e => handleEnter(e,12)} >
                                                <input type="checkbox" className='col-md-1' name="Active"  style={{color:`${colorValue}`}}
                                                checked={barValues.Active} onChange={handleChange}  />
                                                <span></span>
                                                <i className='indicator'></i>
                                                </label>
                                                  <Label className={`col-md-1`} labelName={"PoActive"} forecolor={`${colorValue}`} ></Label>
                                             <label className='checkbox col-md-1' style={{ padding: "0px", width: "60px" }} ref={el => refs.current[13] = el} onKeyDown={e => handleEnter(e,13)}  >
                                                <input type="checkbox"  name="poCancel" checked={barValues.Pocancel} 
                                                onChange={handleChange}   />
                                                <span></span>
                                                <i className='indicator'></i>
                                            </label>
                                                <Label className={`col-md-2`} labelName={"Total"} forecolor={`${colorValue}`} ></Label>
                                            </div>
                                        </div>
                                        <div className='col-md-1'>
                                            <img src={images.imagesrc || ""} className='col-md-6' style={{ height: '30px', width: '30px', backgroundColor: "whitesmoke" }} />
                                            <input type='file' id='imageuploader'  onChange={showPreview}  className='col-md-12' tabIndex="16" style={{ height: '40px', width: '70%'}} ref={el => refs.current[14] = el} onKeyDown={e => handleEnter(e,14)} >
                                            </input>

                                        </div>
                                        <div className='row'>
                                            <div className='bloc-tabs' >
                                                <div className="tabs active-tabs" style={{ backgroundColor:`${colorValue}`, color: `${foreValue}` }}><b>Details </b></div>
                                            </div>
                                            <div className='col-md-9'>
                                                <div style={{ overflow: "auto",  backgroundColor:`${bgValue}` }} className='col-md-12'>
                                                    <div style={{ overflow: "auto", height: "300px", width: "100%", border: `1px solid ${colorValue}`,  }}  >
                                                       
                                                    <table className="table table-responsive table-striped" id="maintable" tabIndex="19">
                                                        <thead style={{position: "sticky" }}>
                                                            <tr>
                                                                {addColumns.map((h, index) =>
                                                                    h.HeaderVisible === "visible" ? (
                                                                        <th key={index}  width={h.widths}  style={{   backgroundColor: colorValue,  color: foreValue,  margin: 0,  fontWeight: "bolder",  borderLeft: "1px solid white", textAlign: "center", }} name={h.field} >
                                                                            {h.field.toUpperCase()}
                                                                        </th>
                                                                    ) : null
                                                                )}
                                                            </tr>
                                                        </thead>
                                                        <tbody id="maintable1">
                                                            {addRows.length > 0 &&
                                                                addRows.map((rows, rowIndex) => (
                                                                    <tr  key={rowIndex}>
                                                                        {addColumns.map((col, colIndex) =>
                                                                            col.HeaderVisible === "visible" ? (
                                                                                <td  key={colIndex} width={rows[colIndex].widths} style={{ margin: 0, padding: 0, border: `1px solid lightgrey`, color: foreValue,  }} >
                                                                                    <input  type="text"  disabled={col.disabled} width={rows[colIndex].widths} style={{color:colorValue}}   className="col-md-12 ps-2 border-0" id={col.field + "_" + rowIndex}  name={col.field}  value={rows[colIndex].value ?? ""} onChange={(e) => fieldValueChange( e, colIndex,  rowIndex, barValues.Asptblpurid ) }  tabIndex="20" />
                                                                                </td>
                                                                            ) : null
                                                                        )}
                                                                    </tr>
                                                                ))}
                                                        </tbody>
                                                    </table>



                                                    </div>

                                                </div>
                                                {totalcounts}
                                            </div>

                                            <div className='col-md-3' style={{ backgroundColor: "var(--bs-light)", border: `2px solid var(--bs-light)`, padding: "0",height:'240px' }}>

                                                 <ul className='bloc-tabs'>
                                                    <li > <button className={newButton1 === 4 ? "tabs active-tabs btn" : "tabs"} onClick={() => TabIndexClick1(4, "Size Details")} style={{ backgroundColor:`${colorValue}`, color: `${foreValue}`,width:'100%',fontWeight:'bold',color:'white' }} tabIndex="17"> Size Details </button> </li>
                                                    <li> <button className={newButton1 === 5 ? "tabs active-tabs btn" : "tabs"} onClick={() => TabIndexClick1(5, "Color Details")} style={{ backgroundColor:`${colorValue}`, color: `${foreValue}`,width:'100%',fontWeight:'bold',color:'white' }} tabIndex="18" >Color Details </button>  </li>

                                                </ul>
                                                <div className='content-tabs' >
                                                    <div className='col-md-12' style={{ backgroundColor: "var(--bs-white)", border: `2px solid var(--bs-light)`, padding: "5px" }}>
                                                        <Label className={`col-md-2`} labelName={"Search"}  ></Label>
                                                        <input className='col-md-10' type='text' name="search" ref={inputref}
                                                            value={barValues.search || ""} onChange={handleChange} />
                                                    </div>
                                                    <div className={newButton1 === 4 ? "content active-content" : "content"} >
                                                        <div  style={{ overflow: "auto", height: "230px" }}>
                                                            <table className='table table-responsive table-striped' id='SizeTable' >
                                                                <thead style={{ backgroundColor: `${colorValue}`, position: "sticky" }}   >
                                                                    <tr style={{ border: "none", padding: "0", margin: "0" }}>

                                                                        <th style={{ color:`${colorValue}` }} width="20px">SNo </th>
                                                                        <th style={{ color: `${colorValue}` }} width="20px"> <input type='checkbox' checked={checkSize} name='chkallsizename' onChange={(e) => chkallsizenameChange(e)} ></input> </th>
                                                                        <th style={{ color: `${colorValue}` }} width="150px">SizeName </th>
                                                                        <th style={{ color: `${colorValue}`, display: "none" }}>ID </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="chkallTable">
                                                                    {
                                                                        sizeItems.map((row, index, headervisible) => (
                                                                            <tr key={index} onChange={(e) => chksizenameChange(e, index, row.sizename)}>
                                                                                <td  style={{ backgroundColor: `${colorValue}`, color: `var(--bs-white)`, textAlign: "center" }}  > {index + 1}</td>
                                                                                <td style={{ color: `var(--bs-white)` }} ><input type='checkbox' name="chksizename" checked={checkSize === true ? checkSize : null}   ></input> </td>
                                                                                <td style={{ width: "50px" }}  >{row.sizename}  </td>
                                                                                <td style={{ width: "50px", display: "none" }} >{row.asptblsizmasid}  </td>
                                                                            </tr>

                                                                        ))}
                                                                </tbody>

                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div className={newButton1 === 5 ? "content active-content" : "content"}>
                                                        <div style={{ overflow: "hidden", height: "230px" }} className='col-md-12'>
                                                            <div  style={{ overflow: "auto", height: "250px" }}  >
                                                                <table className='table table-responsive table-striped ' id='maintable' >
                                                                    <thead style={{ backgroundColor: `${colorValue}`, position: "sticky" }}   >
                                                                        <tr>
                                                                            <th style={{ color: `var(--bs-white)` }} width="20px">SNo </th>
                                                                            <th style={{ color: `var(--bs-white)`, width: "20px" }}> <input type='checkbox' id="allchkcolorname" checked={checkColor} name="allchkcolorname" onChange={(e) => chkallallcolornameChange(e)} ></input> </th>
                                                                            <th style={{ color: `var(--bs-white)`, width: "20px" }}>ColorName </th>
                                                                            <th style={{ color: `var(--bs-white)`, width: "20px", display: "none" }}>ID </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody id="allcolorname" >
                                                                        {
                                                                            colorItem.map((row, index) => (
                                                                                <tr key={index} onChange={(e) => chkcolorenameChange(row.colorname, index)}  >
                                                                                    <td style={{ backgroundColor: `${colorValue}`, color: `var(--bs-white)`, textAlign: "center" }} width="20px" > {index + 1}</td>
                                                                                    <td style={{ color: `var(--bs-white)` }} ><input type='checkbox' name="chkcolorename" checked={checkColor === true ? checkColor : null}></input> </td>
                                                                                    <td style={{ width: "50px" }} >{row.colorname}  </td>
                                                                                    <td style={{ width: "50px", display: "none" }} >{row.asptblcolmasid}  </td>
                                                                                </tr>

                                                                            ))

                                                                        }
                                                                    </tbody>

                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                              <div className={newButton === 2 ? "content active-content" : "content"}>
                                     <div className="content active-content pt-2">

                     <Search colorValue={colorValue} searchs={search} setsearchs={setSearch}
                            SearchLable1={searchLable1} SearchLable2={searchLable2}
                            SearchLable3={searchLable3} stylecolor={foreValue}
                            handleChange={handleChange} ChangeValues={grid}
                            searchCompCode={searchCompCode} searchUserName={searchUserName} />

                                        <DataTable heights={heights} colorValue={colorValue} headers={HeadersColumnGrid}
                                            comments={grid} setComments={setGrid} foreValue={foreValue}
                                            searches={search} setSearches={setSearch}
                                            totalItems={totalItems} setTotalItems={setTotalItems}
                                            currentPage={currentPage} setCurrentPage={setCurrentPage}
                                            sorting={sorting} setSorting={setSorting} ITEM_PER_PAGE={ITEM_PER_PAGE}
                                            EditData={GridLoad_Check}setCheckchild={setCheckchild} checkall={checkall} setCheckAll={setCheckAll}
                                            commentsData={commentsDataGrid}
                                        />
                                    </div>
                                </div>
                                   <div  className={newButton === 3 ? "content active-content" : "content"}>
                                    <div className='row animate-zoom'>
                                        {setFetchError&&<span className='text-danger'>{setFetchError}</span>}     
                                    
                                              <div className='col-md-12' style={{height:'446px',overflow:'auto'}}>      
                                            {pdfFile &&
                                            
                                               <Worker workerUrl={workerUrls}>  
                                                    <Viewer fileUrl={pdfFile} 
                                                     defaultScale={1.2}  ></Viewer>   
                                                  </Worker>  
}
                                               </div> 
                                             
                                                {!pdfFile&&<>No file is selected yet</>}
                                </div>                                     

                                    </div> 
                                      <div  className={newButton === 4 ? "content active-content" : "content"}>
                                    <div className='row animate-zoom'>
                                        {setFetchError&&<span className='text-danger'>{setFetchError}</span>}     
                                    
                                              <div  style={{height:'446px',width:'100%', overflow:'auto'}}>      
                                            {pdfFile &&                                            
                                               <Worker workerUrl={workerUrls}>                                                    
                                                    <Viewer fileUrl={pdfFile}  pageLayout={pageLayout}
                                                     defaultScale={1.2} defaultLayoutPlugin={defaultLayoutPlugin}   ></Viewer>   
                                               </Worker> 
                                            }
                                               </div> 
                                             
                                                {!pdfFile&&<>No file is selected yet</>}
                                </div>                                     

                                    </div> 
                                </div> 
                            



                        </>

                    </div>
                </div>
            }
        </div>
    )
}

export default BarCodeGenerate
