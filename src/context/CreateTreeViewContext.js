import { createContext,  useState } from "react"
import { useNavigate } from "react-router-dom";
const DataContext = createContext({})
export const TreeViewDataProdiver = ({ children,API_URL ,
  defaultDetails,colorValue,foreValue
}) => { 

   let navigate = useNavigate();  //let lists = '';    

    // const [loginCompCode, setLoginCompCode] = useState("PSS");
    // const [loginUser, setLoginUser] = useState("VAIRAM");
    // const [loginPass, setLoginPass] = useState("Vairamwarsawabi297@");    
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);    
const [error,setError]=useState('');
    const [userValues, setUserValues] = useState([])
    const [naviValues, setNaviValues] = useState([]);

    //const [sequenceTable, setSequenceTable] = useState("asptblautogeneratemas");

  const [menuNameValues, setMenuNameValues] = useState([]);  
  const tabindex = 1; let ITEM_PER_PAGE = 100;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState();
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const [currentPage1, setCurrentPage1] = useState(1);
  const [totalItems1, setTotalItems1] = useState();
  const [sorting1, setSorting1] = useState({ field: "", order: "" });
  const [newButton, setNewButton] = useState(1);
  const [userRightValues, setUserRightValues] = useState([]);
  let labelHeader='';


  const handleSubmit = (e) => { e.preventDefault(); }
  const [color1, setColor1] = useState(["var(--bs-danger)","var(--bs-success)","var(--bs-warning)","var(--bs-primary)"]);

  const [searchLable1, setSearchLable1] = useState('');
  const [searchLable2, setSearchLable2] = useState('');
  const [searchLable3, setSearchLable3] = useState('');
  const [navi_Items1, setNaviItems1] = useState([])
  const [navi_Items, setNaviItems] = useState([])
      const [userRights,setUserRights]=useState([]);


 
    
  return (
    <DataContext.Provider value=
      {{
       userRights,setUserRights,error,setError,API_URL, 
       userValues, setUserValues,defaultDetails,
        naviValues, setNaviValues,  colorValue,foreValue,
        searchLable1,searchLable2,searchLable3,setSearchLable1,setSearchLable2,setSearchLable3,
        menuNameValues, setMenuNameValues, 
        ITEM_PER_PAGE,tabindex,
        totalItems, setTotalItems, handleSubmit, sorting, setSorting,
        newButton, setNewButton, currentPage, setCurrentPage,navi_Items1, setNaviItems1,navi_Items, setNaviItems,
        currentPage1, setCurrentPage1,totalItems1, setTotalItems1,sorting1, setSorting1,
        userRightValues, setUserRightValues ,
        color1
      }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataContext;
