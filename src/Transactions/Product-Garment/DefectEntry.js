import React, { useContext, useEffect, useMemo, useState } from 'react'
import Label from '../../Custom/Label'
import DataContext from '../../context/CreateUserContext';
import axios from 'axios';
import DataTable from '../../Custom/DataTable';
import Input from '../../component/elements/Input'
import SocialMissing from '../../Social/SocialMissing';
import { toast } from 'react-toastify';


const DefectEntry = ({ title, subTitle,  }) => {
  const { API_URL, newButton, inputref, handleSubmit, tabindex, bgValue, currentPage, setCurrentPage,
    CountryParam, searchLable1, searchLable2, searchLable3,  addColumns2, setAddColumns2,
    setSearchLable1, setSearchLable2, setSearchLable3, defaultDetails,
     colorValue, foreValue,loginCompCode,loginUser,defectValues, setDefectValues,addRows2, setAddRows2,
    sorting, setSorting, setNewButton, sizeGroup, setSizeGroup, color1,  HeadersColumn2,defpo, setDefPo } = useContext(DataContext);
  const TabIndexClick = (inx) => {
    setNewButton(inx);
  }

 const [totalcounts, setTotalcounts] = useState(0);
// menuheader={menuheader} SequenceTable={sequenceTable} header_items={header_items} colorValue={colorValue} foreValue={foreValue} loginUser={loginUser} loginCompCode={loginCompCode} defectValues={defectValues} setDefectValues={setDefectValues} addRows2={addRows2} setAddRows2={setAddRows2}
    const [totalItems,setTotalItems]=useState([]);
  let TableName='asptblcutpanret' 
  const userrightsMenuCheck = API_URL + "/UserRights/userrightsMenuCheck";
  let ITEM_PER_PAGE = 10; 
  const compcodeparam = API_URL + "/CompanyMaster/GridLoad";
  const GridLoadDetails = API_URL + "/DefectEntry/GridLoad";
  const PonoDetails = API_URL + "/DefectEntry/PonoDetails";
  const BarcodeChange = API_URL + "/DefectEntry/BarcodeChange";
  const GridLoadColor = API_URL + "/DefectEntry/GridLoadColor";
  const ponochange = API_URL + "/DefectEntry/ponochange";
  const ordertype_auto = API_URL + "/DefectEntry/Autos";
  const GetProcess = API_URL + "/DefectEntry/GetProcess";
  const Remarks = API_URL + "/DefectEntry/Remarks";
  const insert_update = API_URL + "/DefectEntry/DefectEntry";
  const [userRights1, setUserRights1] = useState([])
  const [visible, setvisible] = useState(true);
  const heights = "320px"; let validorder = "";
  const [fetchError, setFetchError] = useState(null)
  const [remarks, setRemarks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('');
  const [barItem, setBarItem] = useState([])
  const [colorItem, setColorItem] = useState([])
  const [compcodeData, setCompCodeData] = useState([])
  // const [poItem, setPoItem] = useState([])
  const [sizeGrpItems, setSizeGrpItems] = useState([])
  const [processItems, setProcessItems] = useState([])
  const [styleItem, setStyleItem] = useState([])
  const [sizeItems, setSizeItems] = useState([])
  const [active, setActive] = useState(false)
  const [poActive, setPoActive] = useState(false)
  const [sizeGroup_FilterSearch, setSizeGroup_FilterSearch] = useState([]);
  const [sizeGroupGrid, setSizeGroupGrid] = useState([])
  const [newButton1, setNewButton1] = useState(3);
  setSearchLable1("Search"); setSearchLable2(""); setSearchLable3('')
  const [searchCompCode, setSearchCompCode] = useState([])
  const [searchUserName, setSearchUserName] = useState([])
  const [checkSize, setCheckSize] = useState(false)
  const [checkColor, setCheckColor] = useState(false)
  const [grid, setGrid] = useState([]);
  var data = []; let rows, cols; var ColumnsData = [];
  var RowsData = []; var DArray = [[], []]; let RowIndex = 0;
  const [qtycheck, setQtyCheck] = useState()
  let qtychecks = 0;

  const tables = document.getElementById('maintable1');
  var allchkcolorname = document.getElementsByName("allchkcolorname");
  const [gridColor, setGridColor] = useState([])
  const [dynamicCols, setDynamicCols] = useState([])
  const [dynamicRows, setDynamicRows] = useState([])
  const [pos, setPos] = useState([]);
  const minDate = new Date().toISOString().slice(0, 10)
  var imagesrc = '', imageFile = '';
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  var data1 = [], data2 = []; var datas = []; var datasize1 = [];
  var dataIndex = [];
  const [images, setImage] = useState(imagesrc);
  
  const HeadersColumnGrid =
    [   
      "Visible|visible",
      "CutPanRet ID|asptblcutpanretid",
      "CutPanRet1 ID|asptblcutpanret1id",
      "Panel No|panelno",
      "Compcode|compcode",
      "Buyer|buyer",
      "Pono|pono",
      "Style Ref|styleref",
      "Order No|orderno",
      "Order Qty|orderqty",
      "Issue Type|issuetype",
      "Style Name|stylename",
      "Remarks|remarks"
].map(item => {
  const [headername, field] = item.split("|");
  return { headername, field };
});
    
useEffect(() => {
  let isMounted = true;

  async function fetchMyAPI() {
    const results = await Promise.allSettled([
      axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`),
      axios.get(`${compcodeparam}`),
      axios.get(`${GridLoadDetails}`),     
      axios.get(`${Remarks}`)
    ]);

    if (!isMounted) return;

    const [
      userRightsRes,
      compcodeRes,
      gridRes,   
      remarksRes
    ] = results;

    // Check each
    if (userRightsRes.status === "rejected")
      toast.error("User Rights API Error:", userRightsRes.reason);

    if (compcodeRes.status === "rejected")
      toast.error("Compcode API Error:", compcodeRes.reason);

    if (gridRes.status === "rejected")
      toast.error("Grid Load Error:", gridRes.reason);

    

    if (remarksRes.status === "rejected")
      toast.error("Remarks API Error:", remarksRes.reason);

    // Set only successful responses
    if (userRightsRes.status === "fulfilled")
      setUserRights1(userRightsRes.value.data);

    if (compcodeRes.status === "fulfilled")
      setCompCodeData(compcodeRes.value.data);

    if (gridRes.status === "fulfilled")
      setGrid(gridRes.value.data);



    if (remarksRes.status === "fulfilled")
      setRemarks(remarksRes.value.data);
  }

  fetchMyAPI();
  return () => { isMounted = false };
}, []);



const handleChange = async (e) => {
  const { name, value } = e.target;

  if (value === "") return;

  // Update field instantly
  setDefectValues(prev => ({ ...prev, [name]: value }));
  validorder = "";

  try {
    // -------------------------
    // 1) COMP CODE CHANGE
    // -------------------------
    if (name === "Compcode") {

      const res = await axios.get(`${ordertype_auto}/${year}/${value}/${title}/${TableName}`);
      const row = res.data[0];
      setDefectValues(prev => ({
        ...prev,
        Asptblcutpanret1id: row.id,
        Compcode1: row.gtcompmastid,
        Compcode: row.gtcompmastid,
        Shortcode: row.shortcode,
        Panelno: `${year}-${row.shortcode}-${row.id}`,
        Cutpaneldate: new Date().toISOString().slice(0, 10),
      }));
    }

    // -------------------------
    // 2) ISSUE TYPE CHANGE
    // -------------------------
    if (name === "IssueType") {


      const res1 = await axios.get(`${PonoDetails}/${defectValues.Compcode}/${value}`);
       const pro=await  axios.get(`${GetProcess}/${value}`);
      const row = res1.data[0];     
      setDefPo(res1.data); 

     setProcessItems(pro.data)
      if (row.asptblpurid >= 1) {
        setDefectValues(prev => ({
          ...prev,
          Remarks: value,
          IssueType: value,        
          Processname:pro.data[0].asptblpromasid,              
        }));
    
      } else {
        toast.error(res1);
      }
    }

    // -------------------------
    // 3) PONO CHANGE
    // -------------------------
    if (name === "Pono") {

      setAddRows2([]);
      setAddColumns2(HeadersColumn2);
      RowsData = [];

      const res1 = await axios.get(`${ponochange}/${defectValues.Compcode}/${value}`);
      const row = res1.data[0];     
      setDefectValues(prev => ({
        ...prev,
        Barcode: `${row.minid}-${row.maxid}`,
        Pono: row.pono,
        Orderno: row.orderno,
        Styleref: row.styleref,        
      }));



    }
  }
  catch (error) {
    toast.error(error);
    setFetchError(error);
  }
};
const BarcodeChanges = async (comcode, type, pono, bar) => {
      try {
        if (bar.length < 9) return;
        let data1 = [];
        // ---- CHECK IF BARCODE ALREADY EXISTS -----
        let ss = [];
        if (bar.length === 9) {
          ss = addRows2.filter(item => item[8]?.value === bar);
        } else {
          ss = addRows2.filter(item =>
            item.some(col => col.field === "QrCode" && col.value === bar)
          );
        }

        if (ss.length > 0) {
          toast.error("Child Record Found : " + bar);
          return;
        }

        // ---- CALL API ----
        const res = await axios.get(`${BarcodeChange}/${comcode}/${type}/${pono}/${bar}`);

        if (res.data[0].barcode.length > 10) {
          toast.error(res.data[0].barcode);
          return;
        }

        // ---- PROCESS RETURNED ROWS ----
        res.data.forEach((datas, index) => {

          const row = [
            { field: "SNo", value: index + 1 },
            { field: "Asptblcutpanretdetid", value: datas.asptblcutpanretdetid ?? 0 },
            { field: "Asptblcutpanretid", value: datas.asptblcutpanretid ?? 0 },
            { field: "Asptblcutpanret1id", value: defectValues.Asptblcutpanret1id ?? 0 },
            { field: "Asptblpurdetid", value: datas.asptblpurdetid },
            { field: "Asptblpurid", value: datas.asptblpurid },
            { field: "Compcode", value: datas.compcode },
            { field: "Pono", value: datas.pono },
            { field: "QrCode", value: datas.barcode },
            { field: "Colorname", value: datas.colorname },
            { field: "Sizename", value: datas.sizename },
            { field: "Pcs", value: 1 },
          ];
      

          data1.push(row);
        });

        // ---- ADD TO STATE ----
        if (data1.length > 0) {
          setAddRows2(prev => [...prev, ...data1]);
        }

      } catch (ex) {
        toast.error("Invalid Barcode");
      }
};


  // const BarcodeChanges = async (comcode, type, pono, bar) => {

  //   try {
  //     if (bar.length >= 9) {
  // data = []; let ss="";data1=[]
  // if(bar.length===9){                
  //   ss = addRows2.filter((item) => (item[8].value === bar));
  //  }else{                        
  //      ss = addRows2.filter((item) => (
  //        item.forEach((element) => (
  //          element[8].value === bar
  //        ))             
  //      ));            
  //    }
 
  //  if (ss.length >= 1) {                  
  //      toast.error("Child Record Found   : " + bar);
  //      bar="";ss="";
  //  }
     
  //       if (ss.length < 1) {
         
  //         await axios.get(`${BarcodeChange}/${comcode}/${type}/${pono}/${bar}`).then(async(resss) => {
  //           if (resss.data[0].barcode.length > 10) {  alert(resss.data[0].barcode); } else {
  //           await  resss.data.forEach((datas,inx) => {
                       
  //                 var str0 = { field: "SNo", value: inx + 1, placeholder: "sNo", HeaderVisible: 'visible', pattern: "" };
  //                 var str1 = { field: "Asptblcutpanretdetid", value: datas.asptblcutpanretdetid === undefined ? 0 : datas.asptblcutpanretdetid, placeholder: "Asptblcutpanretdetid", HeaderVisible: 'visible', pattern: "" };
  //                 var str2 = { field: "Asptblcutpanretid", value: datas.asptblcutpanretid === undefined ? 0 : datas.asptblcutpanretid, placeholder: "Asptblcutpanretdetid", HeaderVisible: 'visible', pattern: "" };
  //                 var str3 = { field: "Asptblcutpanret1id", value: defectValues.Asptblcutpanret1id === undefined ? 0 : defectValues.Asptblcutpanret1id, placeholder: "Asptblcutpanret1id", HeaderVisible: 'visible', pattern: "" };
  //                 var str4 = { field: "Asptblpurdetid", value: datas.asptblpurdetid, placeholder: "Asptblpurdetid", HeaderVisible: 'visible', pattern: "" };
  //                 var str5 = { field: "Asptblpurid", value: datas.asptblpurid, placeholder: "Asptblpurid", HeaderVisible: 'visible', pattern: "" };
  //                 var str6 = { field: "Compcode", value: datas.compcode, placeholder: "Compcode", HeaderVisible: 'visible', pattern: "" };
  //                 var str7 = { field: "Pono", value: datas.pono, placeholder: "Pono", HeaderVisible: 'visible', pattern: "" };
  //                 var str8 = { field: "QrCode", value: datas.barcode };
  //                 var str9 = { field: "Colorname", value: datas.colorname };
  //                 var str10 = { field: "Sizename", value: datas.sizename };
  //                 var str11 = { field: "Pcs", value: 1 };
                 
  //                 data.push(str0);
  //                 data.push(str1)
  //                 data.push(str2); data.push(str3); data.push(str4); data.push(str5);
  //                 data.push(str6); data.push(str7); data.push(str8); data.push(str9);
  //                 data.push(str10); data.push(str11);          
  //                 if (data.length >= 1) {
  //                   data1.push(data)
  //                   data = []
  //                 }           
              
  //               if (data1.length ===resss.data.length) {
  //                 data1.forEach( (row1) => {                   
  //                    setAddRows2(pre => [...pre, row1]);
  //                 })

  //               }
  //             })
  //               }
  //             })
          
  //       }
  //     }

  //   }
  //   catch (ex) {
  //     alert("Invalid Barcode");
  //   }
    
  // };

  const commentsDataGrid = useMemo(() => {
    let computedComments = grid;
    if (search) {
      computedComments = computedComments.filter((item) => ((item.Pono).includes(search)))
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
  }, [grid, currentPage, search, sorting])

const GridLoad_Check = async (id) => {
  try {
    // RESET STATES  
    setAddRows2([]);
    setAddColumns2([]);
    setDefectValues([]);

    // -------------------- MAIN HEADER LOAD --------------------
    const res = await axios.get(`${GridLoadDetails}/${id.asptblcutpanretid}/${id.compcode}`);

    if (res.data?.length === 0) {
      toast.error("Invalid Data");
      return;
    }

    const header = res.data[0];

    // ---- SET FORM VALUES ----
   setDefectValues(prev => ({
          ...prev,
      Asptblcutpanretid: header.asptblcutpanretid ?? 0,
      Asptblcutpanret1id: header.asptblcutpanret1id ?? 0,
      Docid: header.docid,
      Asptblpurid: header.asptblpurid,
      Asptblpur1id: header.asptblpur1id,
      Panelno: header.panelno,
      Pono: header.pono,
      Shortcode: header.shortcode,
      Cutpaneldate: header.cutpaneldate?.toString().substring(0, 10),
      Compcode: header.compcode,
      Compname: header.compname,
      Buyer: header.buyer,
      Styleref: header.styleref,
      Orderno: header.orderno1,
      Processname: header.processname,
      IssueType: header.issuetype,
      Remarks: header.remarks,
      DefectType: header.defecttype,
      Notes: header.notes,
      Barcode: header.barcode
    }));

    // ---- Show/Hide Dropdown ----
    setvisible(header.issuetype === "ORDER");

    // ---- Load PO Item Dropdown ----
    const poRes = await axios.get(`${PonoDetails}/${header.compcode}/${header.issuetype}`);
    if(poRes.data !==""){
    setDefPo(poRes.data);
    }
    // -------------------- BUILD COMMON COLUMN TEMPLATE --------------------
    const baseColumns = HeadersColumn2.map(col => ({
      field: col.field,
      value: "",
      placeholder: col.field,
      HeaderVisible: col.HeaderVisible,
      widths: col.widths,
      disabled: "true"
    }));

    setAddColumns2(baseColumns);
   

    // -------------------- LOAD GRID ROW COLORS --------------------
    const colorRes = await axios.get(`${GridLoadColor}/${header.asptblcutpanretid}/${header.compcode}`);
    const rowsData = [];

    colorRes.data.forEach((row, index) => {
      const builtRow = baseColumns.map((col) => {
        switch (col.field) {
          case "SNo": return { ...col, value: index + 1 };
          case "Asptblcutpanretdetid": return { ...col, value: row.asptblcutpanretdetid };
          case "Asptblcutpanretid": return { ...col, value: row.asptblcutpanretid };
          case "Asptblcutpanret1id": return { ...col, value: row.asptblcutpanret1id };
          case "Asptblpurdetid": return { ...col, value: row.asptblpurdetid };
          case "Asptblpurid": return { ...col, value: row.asptblpurid };
          case "Compcode": return { ...col, value: row.compcode };
          case "Pono": return { ...col, value: row.pono };
          case "QrCode": return { ...col, value: row.barcode };
          case "Colorname": return { ...col, value: row.colorname };
          case "Sizename": return { ...col, value: row.sizename };
          case "Pcs": return { ...col, value: row.pcs };
          case "IssueType": return { ...col, value: row.issuetype };
          case "Remarks": return { ...col, value: row.remarks };
          default: return col;
        }
      });

      rowsData.push(builtRow);
    });

    // ---- SET GRID ROWS ONCE ----
    setAddRows2(rowsData);
    setNewButton(1);

  } catch (err) {
    console.error(err);
    toast.error("Error while loading grid");
  }
};

  
  const DefectEntry_News = async () => {

    setNewButton(1); data = []; setDefectValues([])
    setActive(false);setQrbarValues([]);
    const ponoPromise = await axios.get(`${GridLoadDetails}`);       
             setGrid(ponoPromise.data)    
    setAddRows2([]); setAddColumns2(HeadersColumn2); RowsData = []


  }
const FieldValidate = async (prodValues) => {
  // Required fields list
  const requiredFields = [
    { field: "Compcode", message: "CompCode is Empty" },
    { field: "IssueType", message: "ProcessType is Empty" },
    { field: "Pono", message: "PoNo is Empty" },
    { field: "Orderno", message: "OrderNo is Empty" },
    { field: "Styleref", message: "StyleRef is Empty" },
    { field: "Cutpaneldate", message: "ProCutpaneldate is Empty" },
    { field: "Notes", message: "Notes is Empty" }
  ];

  for (const item of requiredFields) {
    if (!prodValues[item.field]) {
      toast.error(item.message);
      return false;
    }
  }

  if (!addRows2 || addRows2.length < 1) {
    toast.error("Invalid Grid Rows");
    return false;
  }

  return true; // Validation passed
};

const TableRowValidate = async (addRows2) => {
  if (!addRows2 || addRows2.length < 1) {
    return "Please Add Rows to Grid";
  }

  for (let rowIndex = 0; rowIndex < addRows2.length; rowIndex++) {
    const row = addRows2[rowIndex];

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const field = row[colIndex];

      if (field.field !== "Colorname") {
        if (!field.value || field.value < 1) {
          return `Please enter value for : ${field.field} at column index ${colIndex}`;
        }
      }
    }
  }

  return true; // Validation success
};

  


const BarCodeData = [
  {
    Asptblcutpanretid: defectValues.Asptblcutpanretid ?? 0,
    Asptblcutpanret1id: defectValues.Asptblcutpanret1id ?? 0,
    Docid: defectValues.Docid ?? 0,
    Shortcode: defectValues.Shortcode ?? "",
    Finyear: year ?? "",
    Cutpaneldate: defectValues.Cutpaneldate ?? "",
    Panelno: defectValues.Panelno ?? "",
    Compcode: defectValues.Compcode ?? 0,
    Orderqty: defectValues.Orderqty ?? 0,
    Pono: defectValues.Pono ?? "",
    Buyer: defectValues.Buyer ?? "",
    Active: active ? "T" : "F",
    Productioncancel: poActive ? "T" : "F",
    Lotno: defectValues.Lotno ?? "",
    Bundle: defectValues.Bundle ?? "",
    Gridrowcount: addRows2?.length ?? 0,
    Processname: defectValues.Processname ?? "",
    Processtype: defectValues.IssueType ?? "",
    Issuetype: defectValues.IssueType ?? "",    
    // These flags look like booleans -> return "T" or "F"
    Restitching: defectValues.Restitching ? "T" : "F",
    Rechecking: defectValues.Rechecking ? "T" : "F",
    Inward: defectValues.Inward ? "T" : "F",
    Delivery: defectValues.Delivery ? "T" : "F",
    Styleref: defectValues.Styleref ?? "",
    DefectType: defectValues.DefectType ?? "",
    Orderno: defectValues.Orderno ?? "",
    Notes: defectValues.Notes ?? "",
  }
];



function ListData() {
  return addRows2.map(row => {
    const keys = [];
    const values = [];

    addColumns2.forEach((cols, index) => {
      const cell = row[index];
      if (!cell?.field) return;

      keys.push(cell.field.trim());
      values.push(cell.value ?? 0);
    });

    return func(keys, values);
  });
}


  // async function  ListData () {

  //   addRows2.forEach((rows, i) => {
  //     data1 = []; data2 = [];
  //     addColumns2.forEach((cols, j) => {
  //       data1.push(rows[j].field.trim(),);
  //       data2.push(rows[j].value !== undefined ? rows[j].value : 0);
  //     })
  //     const obj = func(data1, data2);
  //     datas.push(obj);

  //   })
  //   return  datas;
  // }

  function func(arr1, arr2) {
    const obj = {};
    arr1.forEach((Curr_element, index) => {
      obj[Curr_element.trim()] = arr2[index]
    })
    return obj;
  };


  async function ParamsListData(res){   
    const [Pono,Asptblcutpanretid,Compcode,Finyear,Asptblcutpanret1id]=res.data?.split(",") ?? []
    return [{
      Pono:Pono,Asptblcutpanretid:Asptblcutpanretid,Compcode:Compcode,
      Finyear:Finyear,Asptblcutpanret1id:Asptblcutpanret1id
  }]}

  const DefectEntry_Save = async (e) => {
     let  response;    
  try {
    setIsLoading(true);

    // -------------------------
    // Step 1 : Field validation
    // -------------------------
    const errorMessage = await FieldValidate(defectValues);
    

    if (!errorMessage) {
      toast.error("Please fill required fields.");
      setIsLoading(false);
      return;
    }

    // -------------------------
    // Step 2 : Row validation
    // -------------------------
   let  rowError = await TableRowValidate(addRows2);

    if (!rowError) {
      toast.error("Please fill row data correctly.");
      setIsLoading(false);
      return;
    }
      setIsLoading(true)
    // -------------------------
    // Step 3 : Primary submit
    // -------------------------
        const OBJ1 = BarCodeData;
     response = await axios.post(`${insert_update}/${JSON.stringify(OBJ1)}`);
    if (!response || !response.data) {
      toast.error("Save failed");
      setIsLoading(false);
      return;
    }

    // -------------------------
    // Step 4 : Load DT again
    // -------------------------
    const users = await ListData();
    const param = await ParamsListData(response);

    if (!users || !param) {
      toast.error("Parameter generation failed");
      setIsLoading(false);
      return;
    }
let i,j=0;
    // -------------------------
    // Step 5 : Final Submit
    // -------------------------
     const userss = chunkArray(users, 25); 
      
      for ( i = 0; i < userss.length; i++) 
        {
            response="";   j+=userss[i].length;
            response= await axios.post(`${insert_update}/${JSON.stringify(userss[i])}/${JSON.stringify(param)}`);
       setTotalcounts(`Rows  : ${response.data + "  :  " + j}/${users.length}`);
          }
   

  } catch (ex) {
    setFetchError(ex);
 toast.success(ex);     
  } finally {
    setIsLoading(false);
   
      DefectEntry_News();
        toast.success(response?.data);     
  }
};

  function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

  const DefectEntry_Delete = async (e) => {
  }

  const DefectEntry_Search = async (e) => {
  }
  const [Qrbarvalues, setQrbarValues] = useState([]);
  const handleChange1 = async (e) => {
    const {  value } = e.target;
    setQrbarValues(value);
  }

  return (
    <div onSubmit={handleSubmit} >
      {userRights1.length >= 1 &&
       <div className='container-fluid animate-zoom' >
                   <div className='row' style={{ display: `${userRights1[0].readonlys === "T" ? "block" : "none"}` }}>

    <ul className="bloc-tabs" style={{ display: "flex", justifyContent: "right" }}>
              <li> <button type='submit' onClick={() => DefectEntry_News()}   style={{backgroundColor:`${colorValue}`, display: userRights1[0].news === "T" ? "block" : "none" }} >New</button></li>
              <li> <button type='submit' onClick={() => DefectEntry_Save()}  style={{ backgroundColor:`${colorValue}`, display: userRights1[0].saves === "T" ? "block" : "none" }}>Save</button></li>
              <li> <button type='submit' onClick={(e) => DefectEntry_Delete()}  style={{ backgroundColor:`${colorValue}`, display: userRights1[0].deletes === "T" ? "block" : "none" }} >Delete</button></li>
              <li> <button type='submit' onClick={() => DefectEntry_Search()}  style={{ backgroundColor:`${colorValue}`, display: userRights1[0].search === "T" ? "block" : "none" }} > Search </button></li>
              <li> <button type='submit' onClick={() => DefectEntry_News()}  style={{ backgroundColor:`${colorValue}`, display: userRights1[0].prints === "T" ? "block" : "none" }}>Print</button></li>
              <li> <button type='submit' onClick={() => DefectEntry_News()}  style={{ backgroundColor:`${colorValue}`, display: userRights1[0].readonlys === "T" ? "none" : "none" }}>Read</button></li>
              <li> <button type='submit' onClick={() => DefectEntry_News()}  style={{ backgroundColor:`${colorValue}`, display: userRights1[0].treebutton === "T" ? "block" : "none" }}>TreeButton</button></li>
              <li> <button type='submit' onClick={() => DefectEntry_News()}  style={{ backgroundColor:`${colorValue}`, display: userRights1[0].globalsearch === "T" ? "block" : "none" }}> GlobalSearch </button></li>
              <li> <button type='submit' onClick={() => DefectEntry_News()}   style={{ backgroundColor:`${colorValue}`, display: userRights1[0].login === "T" ? "block" : "none" }}>Login</button></li>
              <li> <button type='submit' onClick={() => DefectEntry_News()}  style={{ backgroundColor:`${colorValue}`, display: userRights1[0].changepassword === "T" ? "block" : "none" }}>ChangePassword</button></li>
              <li> <button type='submit' onClick={() => DefectEntry_News()}  style={{ backgroundColor:`${colorValue}`, display: userRights1[0].changeskin === "T" ? "block" : "none" }}>ChangeSkin</button></li>
              <li> <button type='submit' onClick={() => DefectEntry_News()}  style={{ backgroundColor:`${colorValue}`, display: userRights1[0].contact === "T" ? "block" : "none" }}> Contact </button></li>
              <li> <button type='submit' onClick={() => DefectEntry_News()}  style={{ backgroundColor:`${colorValue}`, display: userRights1[0].pdf === "T" ? "block" : "none" }}>Pdf</button></li>
              <li> <button type='submit' onClick={() => DefectEntry_News()}  style={{ backgroundColor:`${colorValue}`, display: userRights1[0].imports === "T" ? "block" : "none" }}> Import </button></li>
              <li> <button type='submit' onClick={() => DefectEntry_News()}  style={{ backgroundColor:`${colorValue}`, display: userRights1[0].download === "T" ? "block" : "none" }}> Download </button></li>
            </ul>


             <ul className='' style={{backgroundColor:`${colorValue}`}}>
                          <li>  <button className={newButton === 1 ? "tabs active-tabs container-fluid" : "tabs container-fluid"} onClick={() => TabIndexClick(1)} style={{backgroundColor:`${colorValue}` }}>{title}  </button></li>
                           <li><button className={newButton === 2 ? "tabs active-tabs container-fluid" : "tabs container-fluid"} onClick={() => TabIndexClick(2)} style={{ backgroundColor:`${colorValue}`}} > {subTitle}</button></li>

                        </ul>
            <div className='content-tabs'>
              <div className={newButton === 1 ? "content active-content" : "content"}>
                <div className='row'  >
                   <h6 className='p-1 d-flex justify-content-center' style={{backgroundColor:`${colorValue}`}}  >
                        <Label className={`col-md-1 ps-2`} labelName={"CompCode"} forecolor={`${foreValue}`} visible={true} ></Label>
                    <select className='col-md-1' name="Compcode" style={{color:`${colorValue}`}}
                      value={defectValues.Compcode || ""} onChange={handleChange} >
                      <option></option>{
                        compcodeData.map((result, index) => (
                          <option key={index} value={result.gtcompmastid}>
                            {result.compcode}
                          </option>))
                      }
                    </select>
                      <Label className={`col-md-1 ps-2`} name="Type" forecolor={`${foreValue}`} labelName={"Type "} visible={true}  ></Label>
                    <select className='col-md-2' name="IssueType" ref={inputref}  tabIndex="1" style={{ color: `${colorValue}` }}
                      value={defectValues.IssueType || ""} onChange={handleChange} >
                      <option></option>
                      <option value={"STITCHING MISTAKE"} >STITCHING MISTAKE</option>
                      <option value={"CHECKING MISTAKE"} >CHECKING MISTAKE</option>
                    </select>
                   <Label className={`col-md-1 ps-2`} name="Pono" forecolor={`${foreValue}`} labelName={"Pono "} visible={true}  ></Label>
                    <select name="Pono" className='col-md-2' tabIndex="2" ref={inputref} 
                    value={defectValues.Pono || ""} onChange={handleChange}  style={{color:`${colorValue}`}}>
                         <option></option>{
                              
                                      defpo.map((result, index) => (
                                        <option key={index} value={result.pono} >
                                          {result.pono}
                                        </option>   
                          ))
                      }
                    </select>
                   </h6>
             
                  <div className='row py-1'>
                    <Input type={'text'} className1='col-md-1' className='col-md-1' id='Asptblcutpanretid' name='Asptblcutpanretid' placeholder='' value={defectValues.Asptblcutpanretid || ""} onChange={handleChange} barValues={defectValues} setBarValues={setDefectValues} name1={"DefectID"} stylecolor={`${colorValue}`} visible={true} tabIndex={3} disabled='true' />
                    <Input type={'text'} className1='col-md-1' className='col-md-1' id='Asptblcutpanret1id' name='Asptblcutpanret1id' placeholder='' value={defectValues.Asptblcutpanret1id || ""} onChange={handleChange} barValues={defectValues} setBarValues={setDefectValues} name1={"Defect1ID"} stylecolor={colorValue} visible={true} tabIndex={4} disabled='true' />
                    <Input type={'text'} className1='col-md-1' className='col-md-1' id='Shortcode' name='Shortcode' placeholder='' value={defectValues.Shortcode || ""} onChange={handleChange} barValues={defectValues} setBarValues={setDefectValues} name1={"ShortCode"} stylecolor={colorValue} visible={true} tabIndex={5} disabled='true' />
                    <Input type="date" className1='col-md-1' className='col-md-2' id='Cutpaneldate' name='Cutpaneldate' placeholder='' value={defectValues.Cutpaneldate} onChange={handleChange} barValues={defectValues} setBarValues={setDefectValues} name1={"Date"} stylecolor={colorValue} visible={true} tabIndex={6} />
                    <Input type={'text'} className1='col-md-1' className='col-md-2' id='Panelno' name='Panelno' placeholder='' value={defectValues.Panelno || ""} onChange={handleChange} barValues={defectValues} setBarValues={setDefectValues} name1={"CutPanelno"} stylecolor={colorValue} visible={true} tabIndex={7} disabled='true' />
                  </div>
                  <div className='row'>

                    <Label className={`col-md-1`} labelName={"Processname"} forecolor={`${colorValue}`} visible={true} ></Label>
                            <select className='col-md-2'  disabled='true' name="Processname" ref={inputref} tabIndex="11"   style={{ color: `${colorValue}` }}
                                                    value={defectValues.Processname || ""} onChange={handleChange} >
                                              
                                                  {                                                        
                                                        processItems.map((result, index) => (<option key={index} value={result.asptblpromasid}>
                                                            {result.processname}
                                                        </option>))
                                                  }
                         </select>


                    <Label className={`col-md-1`} name="Remarks" forecolor={`${colorValue}`} labelName={"Remarks"} visible={true}  ></Label>
                    <select className='col-md-2' name="Remarks" tabIndex="7" ref={inputref}
                      onChange={handleChange} disabled='true'>
                      <option>{defectValues.IssueType || ""}</option>

                    </select>
                    <Input type={'text'} className1='col-md-1' className='col-md-2' id='OrderNo' name='OrderNo' placeholder='' value={defectValues.Orderno || ""} onChange={handleChange} barValues={defectValues} setBarValues={setDefectValues} name1={"Erp-OrderNo"} stylecolor={`${colorValue}`} visible={true} tabIndex={8} disabled='true' />
                    <Input type={'text'} className1='col-md-1' className='col-md-2' id='Styleref' name='Styleref' placeholder='' value={defectValues.Styleref || ""} onChange={handleChange} barValues={defectValues} setBarValues={setDefectValues} name1={"Styleref"} stylecolor={colorValue} visible={true} tabIndex={9} disabled='true' />



                  </div>
                  <div className='row py-1'>
                    <Label className={`col-md-1`} name="DefectType" forecolor={`${colorValue}`} labelName={"DefectType *"} visible={true}   ></Label>
                    <select className='col-md-2' name="DefectType" tabIndex="10" ref={inputref} style={{color:`${colorValue}`}}
                      value={defectValues.DefectType || ""} onChange={handleChange} >
                      <option></option>
                      <option value={"OIL"} >OIL</option>
                      <option value={"ADAS"} >ADAS</option>
                      <option value={"HOLES"} >HOLES</option>
                      <option value={"YARN CONDAMINATION"} >YARN CONDAMINATION</option>

                    </select>

                    <Label className={`col-md-1`} name="Notes" forecolor={`${colorValue}`} labelName={"Notes *"} visible={true}  ></Label>
                    <select className='col-md-2' name="Notes" tabIndex="11" ref={inputref}
                      value={defectValues.Notes || ""} onChange={handleChange} style={{color:`${colorValue}`}} >
                      <option></option>
                      <option value={"PCS RATE"} >PCS RATE</option>
                      <option value={" MONTHLY"} > MONTHLY</option>
                    </select>
                    <Input type={'text'} className1='col-md-1' className='col-md-5' id='Barcode' name='Barcode' placeholder='' value={defectValues.Barcode || ""} onChange={handleChange} axioss1={ponochange} barValues={defectValues} setBarValues={setDefectValues} name1={"BarCode"} stylecolor={colorValue} visible={true} tabIndex={11} />
                  </div>
                </div>
                <div className='row'  style={{padding:"5px"}}>
                  <Label className={`col-md-2`} labelName={"barCode Scan"} forecolor={`${colorValue}`} visible={true} ></Label>
                  <input className='col-md-4' type='text' value={Qrbarvalues || ""} onChange={handleChange1} name="Qrbarvalues" ref={inputref} style={{  fontSize: "20px", fontWeight: "bold" }} />
                  <button type='submit' onClick={() => BarcodeChanges(defectValues.Compcode, defectValues.IssueType, defectValues.Pono, Qrbarvalues)} style={{ backgroundColor: `${colorValue}`, display: userRights1[0].news === "T" ? "block" : "none" }} className='col-md-2' >ADD</button>
                 <Label className={`col-md-2`} labelName={"Result"} forecolor={`${colorValue}`} visible={true} ></Label>
                </div>

                <div style={{ overflow: "auto", height: "300px", backgroundColor:`${bgValue}` }} className='col-md-12'>
                  <div style={{ overflow: "auto", height: "100%", width: "auto", border: `1px solid ${colorValue}`, borderRadius: "0.1em", margin: "0", padding: "0.5%" }}  >

                    <table className='table table-responsive table-striped' id='maintable' >
                      <thead style={{ backgroundColor: `${bgValue}`, position: "sticky" }}  >
                        <tr >
                          {
                            addColumns2.map((h, index) => (
                              `${h.HeaderVisible}` === 'visible' ?
                                <th key={index} width={h.widths} style={{backgroundColor:`${colorValue}`, color:`${foreValue}`, margin: "0", padding: "3px", borderLeft: "1px solid white", textAlign: "left" }}
                                  name={h.field}>{h.field.toUpperCase()} </th>
                                : ""
                            ))
                          }
                        </tr>
                      </thead>
                      <tbody id='maintable1'>
                        {
                          addRows2.length < 0 ?
                            <SocialMissing colorValue={colorValue} fetchError={fetchError}></SocialMissing> :
                            addRows2.slice().reverse().map((rows, index) => (
                              <tr key={index} style={{ margin: "0", padding: "0" }} id="maintableRows"  >
                                {
                                  addColumns2.map((cols, indx, width) => {
                                    return `${cols.HeaderVisible}` === 'visible' ?
                                      <td key={indx} width={cols.widths} id={cols.field} name={[`${cols.field}`]}
                                        value={[`${rows[indx].value}`]}  >   {[`${rows[indx].value}`]}        </td> : ""

                                  })

                                }
                              </tr>
                            ))
                        }
                      </tbody>

                    </table>

                  </div>

                </div>
                <strong className='col-md-12 p-0 m-0' style={{backgroundColor:{colorValue}}}>{totalcounts}</strong> 
              </div>
              <div className={newButton === 2 ? "content active-content" : "content"}>
                <div className='row animate-zoom'>

                  <DataTable heights={heights} colorValue={colorValue} headers={HeadersColumnGrid}
                    comments={grid} setComments={setGrid} foreValue={foreValue}
                    searches={search} setSearches={setSearch}
                    totalItems={totalItems} setTotalItems={setTotalItems}
                    currentPage={currentPage} setCurrentPage={setCurrentPage}
                    sorting={sorting} setSorting={setSorting} ITEM_PER_PAGE={ITEM_PER_PAGE}
                    EditData={GridLoad_Check}
                    commentsData={commentsDataGrid}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default DefectEntry
