import React, { createContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const DataContext = createContext({});
export const DataProvider = ({
  children,
  API_URL,
  colorValue,
  bgValue,
  localServerCart,
  defaultDetails,
  header_items,
  menuheader,
  headerfilterdata,
  sidebarData,
  foreValue,
  sidebar,
  setSidebar,
  showSidebar,
  headerdrop,
  setHeaderDrop,
  urls,
  setSelectedTitle,
  selectedTitle,
  mode,
  setMode,
}) => {
  let navigate = useNavigate();
  let lists = "";
  const [countryValues, setCountryValues] = useState("");
  const [po, setPo] = useState([]);
  const [defpo, setDefPo] = useState([]);
  const [propo, setProPo] = useState([]);
  const [chkpo, setChkPo] = useState([]);
  const [statuspo, setStatusPo] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [selectText, setSelectedText] = useState();
  const [isloading, setIsLoading] = useState(true);
  let [sorting, setSorting] = useState({ field: "", order: "" });
  const [newButton, setNewButton] = useState(1);
  let [currentPage, setCurrentPage] = useState(1);
  const [userRights, setUserRights] = useState([]);
  const [error, setError] = useState("");
  const [processValues, setProcessValues] = useState([]);
  const [stateValues, setStateValues] = useState({});
  const [cityValues, setCityValues] = useState({});
  const [companyValues, setCompanyValues] = useState([]);
  const [colorValues, setColorValues] = useState([]);
  const [styleGroupValues, setStyleGroupValues] = useState([]);
  const [stateItems, setStateItems] = useState([]);
  const [countryItems, setCountryItems] = useState([]);
  const [cityStateData, setCityStateData] = useState([]);
  const [cityCountryData, setCityCountryData] = useState([]);
  const [employeeValues, setEmployeeValues] = useState([]);
  const [sizeValues, setSizeValues] = useState([]);
  const [styleCatValues, setStyleCatValues] = useState([]);
  const [sizeGroup, setSizeGroup] = useState([]);
  const [fabtype, setFabType] = useState([]);
  const [finYearData, setFinyear] = useState([]);
  const [yarnBlend, setYarnBlend] = useState([]);
  const [fab, setFab] = useState([]);
  const [styleItemValues, setStyleItemValues] = useState([]);
  let tablecheck = false;
  let inputref = useRef();
  const [checkall, setCheckAll] = useState(false);
  const [checkchild, setCheckchild] = useState(false);
  const [searchLable1, setSearchLable1] = useState("Search");
  const [searchLable2, setSearchLable2] = useState("");
  const [searchLable3, setSearchLable3] = useState("");
  const [counts, setCounts] = useState([]);
  const [lastindex1, setlastindex1] = useState(null);
  const [lastindex, setlastindex] = useState(null);

  const treeviewdata = [];
  //BarCodeGenerate
  const [color1, setColor1] = useState(["var(--bs-white)", "var(--bs-success)", "var(--bs-primary-text-emphasis)", "var(--bs-primary)"]);

  const HeadersColumn = [
    { field: "Colorname", value: "", placeholder: "Color", HeaderVisible: "visible", pattern: "", widths: "200px" },
    { field: "Portion", value: "", placeholder: "qty", HeaderVisible: "visible", pattern: "", widths: "60px" },
  ];

  const HeadersColumn1 = [
    { field: "SNo", value: "", placeholder: "Color", HeaderVisible: "visible", width: "50px", pattern: "" },
    { field: "Asptblprolotdetid", value: "", placeholder: "Color", HeaderVisible: "none", width: "100px", pattern: "" },
    { field: "Asptblprolotid", value: "", placeholder: "Color", HeaderVisible: "none", width: "100px", pattern: "" },
    { field: "Asptblprolot1id", value: "", placeholder: "Color", HeaderVisible: "none", width: "100px", pattern: "" },
    { field: "Asptblpurdetid", value: "", placeholder: "Color", HeaderVisible: "none", width: "100px", pattern: "" },
    { field: "Asptblpurid", value: "", placeholder: "Color", HeaderVisible: "none", width: "100px", pattern: "" },
    { field: "Compcode", value: "", placeholder: "Color", HeaderVisible: "none", width: "100px", pattern: "" },
    { field: "Pono", value: "", placeholder: "Color", HeaderVisible: "none", width: "100px", pattern: "" },
    { field: "QrCode", value: "", placeholder: "Color", HeaderVisible: "visible", width: "100px", pattern: "" },
    { field: "Colorname", value: "", placeholder: "Color", HeaderVisible: "visible", width: "100px", pattern: "" },
    { field: "Sizename", value: "", placeholder: "portion-qty", HeaderVisible: "visible", width: "100px", pattern: "" },
    { field: "Pcs", value: "", placeholder: "", HeaderVisible: "visible", width: "50px", pattern: "" },
  ];

  const HeadersColumn2 = [
    { field: "SNo", value: "", placeholder: "SNo", HeaderVisible: "visible", width: "50px", pattern: "" },
    { field: "Asptblcutpanretdetid", value: "", placeholder: "Asptblcutpanretdetid", HeaderVisible: "none", width: "100px", pattern: "" },
    { field: "Asptblcutpanretid", value: "", placeholder: "Asptblcutpanretid", HeaderVisible: "none", width: "100px", pattern: "" },
    { field: "Asptblcutpanret1id", value: "", placeholder: "Asptblcutpanret1id", HeaderVisible: "none", width: "100px", pattern: "" },
    { field: "Asptblpurdetid", value: "", placeholder: "Asptblpurdetid", HeaderVisible: "none", width: "100px", pattern: "" },
    { field: "Asptblpurid", value: "", placeholder: "Asptblpurid", HeaderVisible: "none", width: "100px", pattern: "" },
    { field: "Compcode", value: "", placeholder: "Compcode", HeaderVisible: "none", width: "100px", pattern: "" },
    { field: "Pono", value: "", placeholder: "Pono", HeaderVisible: "none", width: "100px", pattern: "" },
    { field: "QrCode", value: "", placeholder: "QrCode", HeaderVisible: "visible", width: "100px", pattern: "" },
    { field: "Colorname", value: "", placeholder: "Color", HeaderVisible: "visible", width: "100px", pattern: "" },
    { field: "Sizename", value: "", placeholder: "Color", HeaderVisible: "visible", width: "100px", pattern: "" },
    { field: "Pcs", value: "", placeholder: "Pcs", HeaderVisible: "visible", width: "100px", pattern: "" },
  ];

  const HeadersColumn3 = [
    { field: "SNo", value: "", placeholder: "SNo", HeaderVisible: "visible", width: "50px", pattern: "" },
    { field: "Asptblchkdetid", value: "", placeholder: "Asptblchkdetid", HeaderVisible: "none", width: "100px", pattern: "" },
    { field: "Asptblchkid", value: "", placeholder: "Asptblchkid", HeaderVisible: "none", width: "100px", pattern: "" },
    { field: "Asptblchk1id", value: "", placeholder: "Asptblchk1id", HeaderVisible: "none", width: "100px", pattern: "" },
    { field: "Asptblpurdetid", value: "", placeholder: "Asptblpurdetid", HeaderVisible: "none", width: "100px", pattern: "" },
    { field: "Asptblpurid", value: "", placeholder: "Asptblpurid", HeaderVisible: "none", width: "100px", pattern: "" },
    { field: "Compcode", value: "", placeholder: "Compcode", HeaderVisible: "none", width: "100px", pattern: "" },
    { field: "Pono", value: "", placeholder: "Pono", HeaderVisible: "none", width: "100px", pattern: "" },
    { field: "QrCode", value: "", placeholder: "QrCode", HeaderVisible: "visible", width: "100px", pattern: "" },
    { field: "Colorname", value: "", placeholder: "Color", HeaderVisible: "visible", width: "100px", pattern: "" },
    { field: "Sizename", value: "", placeholder: "Color", HeaderVisible: "visible", width: "100px", pattern: "" },
    { field: "Pcs", value: "", placeholder: "Pcs", HeaderVisible: "visible", width: "100px", pattern: "" },
  ];

  const [addColumns, setAddColumns] = useState(HeadersColumn);
  const [addColumns1, setAddColumns1] = useState(HeadersColumn1);
  const [addColumns2, setAddColumns2] = useState(HeadersColumn2);
  const [addColumns3, setAddColumns3] = useState(HeadersColumn3);
  let ITEM_PER_PAGE = 100;

  const IntialzeState = "";
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [barValues, setBarValues] = useState([]);
  const [addRows, setAddRows] = useState([]);
  const [prodValues, setprodValues] = useState([]);
  const [addRows1, setAddRows1] = useState([]);
  const [defectValues, setDefectValues] = useState([]);
  const [addRows2, setAddRows2] = useState([]);
  const [checkValues, setCheckValues] = useState([]);
  const [addRows3, setAddRows3] = useState([]);
  const [buyerValues, setBuyerValues] = useState([]);
  //const [countsValues, setCountsValues] = useState([]);
  //const [remarksValues, setRemarksValues] = useState([]);
  //const [loginCompCode, setLoginCompCode] = useState("PSS");
  //const [loginUser, setLoginUser] = useState("VAIRAM");
  //const [loginPass, setLoginPass] = useState("Vairamwarsawabi297@");
  //const [sidebar, setSidebar] = useState(false);

  // const showSidebar = () => setSidebar(!sidebar);
  // const [header_items, setHeaderItems] = useState([]);
  const [header_search, setHeaderSearch] = useState("");
  //const [headerfilterdata, setHeaderFilterData] = useState([]);
  // const [menuheader, setMenuHeader] = useState([]);
  //const [headerdrop, setHeaderDrop] = useState(false);
  //const [loginPage, setLoginPage] = useState(false);
  const [autoValues, setAutoValues] = useState([]);
  //const [menuNameValues, setMenuNameValues] = useState([])
  //const [naviValues, setNaviValues] = useState([]);
  // const [userRightValues, setUserRightValues] = useState([]);
  const [sequenceTable, setSequenceTable] = useState("asptblautogeneratemas");

  const handlepage = async (selectedTitle) => {
    setHeaderSearch("");
    setHeaderDrop(false);
    setSidebar(false);
    const alreadyExists = selectedValue.includes(selectedTitle);
    if (!alreadyExists) {
      const newList = [...selectedValue, selectedTitle];
      setSelectedValue(newList);
      setlastindex(newList.length - 1); // 🟢 Correct index
      navigate(`/${selectedTitle}`);
    }
  };

  function tabpageClick(element, index) {
    if (lists === null || lists === undefined) {
      lists = "Dashboard";
      setSelectedTitle([]);
      setSelectedValue([]);
    }
    if (lists === "") {
      lists = element;
      setSelectedTitle(lists);
    }
    setSelectedTitle(lists);
    setlastindex1(index);
    setlastindex(index);

    setHeaderSearch("");
    setHeaderDrop(false);
    setSidebar(false);
    navigate(`/${lists}`);
  }

  function handleClose(index, name) {
    let listitems = [...selectedValue];
    listitems.splice(index, 1);
    lists = listitems[0];
    // FIXED: listitems <= 0  → listitems.length <= 0
    if (listitems.length <= 0) {
      setSelectedValue([]); // FIX: cannot set string
      setSelectedTitle(name);
    } else {
      setSelectedValue(listitems);
      setSelectedTitle(lists);
      navigate(`/${lists}`);
    }

    if (name === "CountryMaster") {
      setCountryValues([]);
      return;
    }
    if (name === "StateMaster") {
      setStateValues([]);
      return;
    }
    if (name === "CityMaster") {
      setCityValues([]);
      return;
    }
    if (name === "CompanyMaster") {
      setCompanyValues([]);
      return;
    }
    if (name === "BarcodeGenerate") {
      setBarValues([]);
      setAddRows([]);
      return;
    }
    if (name === "ProductionEntry") {
      setprodValues([]);
      setAddRows1([]);
      return;
    }
    if (name === "DefectEntry") {
      setDefectValues([]);
      return;
    }
    if (name === "CheckingEntry") {
      setCheckValues([]);
      setAddRows3([]);
      return;
    }
    if (name === "BuyerMaster") {
      setBuyerValues([]);
      return;
    }
    if (name === "AutoGenerateMaster") {
      setAutoValues([]);
      return;
    }
  }

  return (
    <DataContext.Provider
      value={{
        handleClose,
        tabpageClick,
        lastindex,
        lastindex1,
        header_search,
        setHeaderSearch,
        handlepage,
        sidebarData,
        sidebar,
        setSidebar,
        showSidebar,
        bgValue,
        localServerCart,
        menuheader,
        headerfilterdata,
        headerdrop,
        setHeaderDrop,
        error,
        setError,
        foreValue,
        mode,
        setMode,
        colorValue,
        po,
        setPo,
        defpo,
        setDefPo,
        propo,
        setProPo,
        chkpo,
        setChkPo,
        statuspo,
        setStatusPo,
        selectText,
        setSelectedText,
        userRights,
        setUserRights,
        treeviewdata,
        counts,
        setCounts,
        searchLable1,
        searchLable2,
        searchLable3,
        checkall,
        setCheckAll,
        checkchild,
        setCheckchild,
        setSearchLable1,
        setSearchLable2,
        setSearchLable3,
        newButton,
        setNewButton,
        tablecheck,
        handleSubmit,
        urls,
        API_URL,
        IntialzeState,
        isloading,
        setIsLoading,
        defaultDetails,
        sequenceTable,
        setAddRows2,
        header_items,
        countryValues,
        setCountryValues,
        stateValues,
        setStateValues,
        cityValues,
        setCityValues,
        inputref,
        companyValues,
        setCompanyValues,
        stateItems,
        setStateItems,
        countryItems,
        setCountryItems,
        processValues,
        setProcessValues,
        cityStateData,
        setCityStateData,
        cityCountryData,
        setCityCountryData,
        color1,
        buyerValues,
        setBuyerValues,
        sizeValues,
        setSizeValues,
        sizeGroup,
        setSizeGroup,
        colorValues,
        setColorValues,
        employeeValues,
        setEmployeeValues,
        styleItemValues,
        setStyleItemValues,
        styleCatValues,
        setStyleCatValues,
        styleGroupValues,
        setStyleGroupValues,
        fabtype,
        setFabType,
        yarnBlend,
        setYarnBlend,
        fab,
        setFab,
        barValues,
        setBarValues,
        prodValues,
        setprodValues,
        currentPage,
        setCurrentPage,
        sorting,
        setSorting,
        ITEM_PER_PAGE,
        addRows,
        setAddRows,
        addColumns,
        setAddColumns,
        HeadersColumn,
        addColumns1,
        setAddColumns1,
        HeadersColumn1,
        HeadersColumn2,
        autoValues,
        setAutoValues,
        selectedValue,
        setSelectedValue,
        selectedTitle,
        setSelectedTitle,
        addRows1,
        setAddRows1,
        defectValues,
        setDefectValues,
        addColumns2,
        setAddColumns2,
        addRows2,
        setAddRows2,
        checkValues,
        setCheckValues,
        addRows3,
        setAddRows3,
        addColumns3,
        setAddColumns3,
        HeadersColumn3,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;
