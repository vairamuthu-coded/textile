import React, { useContext, useEffect, useMemo, useState } from 'react'
import DataContext from '../context/CreateUserContext';
import DataTable from '../Custom/DataTable';
import axios from 'axios';
import Search from '../Custom/Search';
import { toast } from 'react-toastify';
const FabricMaster = ({ title, subTitle }) => {
  const { newButton, setNewButton, inputref, handleSubmit,userRights,setUserRights,
    API_URL, totalItems, setTotalItems, currentPage, setCurrentPage, sorting, setSorting,
    ITEM_PER_PAGE,defaultDetails,colorValue,
    searchLable1, searchLable2, searchLable3, color1, fab, setFab,
    setSearchLable1, setSearchLable2, setSearchLable3 } = useContext(DataContext)
  const [fab_Search, setFab_Search] = useState("");
  const [fabTypeData, setFabTypeData] = useState([]);
  const [fabYarnBlend, setFabYarnBlend] = useState([]);
  const [checkall, setCheckAll] = useState(false);
  const [active, setActive] = useState(false);
  const [organic, setOraganic] = useState(false);
  const [fab_FilterSearch, setFab_FilterSearch] = useState([]);

  const [searchCompCode, setSearchCompCode] = useState([]);
  const [searchUserName, setSearchUserName] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  const GetYarnBlendMaster =`${API_URL}/YarnBlendMasters/GetYarnBlendMaster`;
  const GetFabricTypeMaster=`${API_URL}/FabricTypeMasters/GetFabricTypeMaster`;
  const insert_update = `${API_URL}/FabricMasters/PostFabricMaster`;
  const deleteData = `${API_URL}/FabricMasters/DeleteFabricMaster`;
  const GridData = `${API_URL}/FabricMasters/GetFabricMaster`;
  const userrightsMenuCheck = `${API_URL}/UserRights/userrightsMenuCheck`;
  const heights = "400px";
  setSearchLable1("Search"); setSearchLable2(""); setSearchLable3("")
  const HeadersColumn =[
      { headername: "ID", field: "asptblfabmasid", visible: "none" },
      { headername: "Fabric Type", field: "fabrictype" },
      { headername: "Fabric", field: "fabric" },
      { headername: "Active", field: "active" }
    ]


  let totalper = 0;
  const [fabItems, setFabItems] = useState([]);
  const [artists, setArtists] = useState({
    asptblfabmasid: "0", fabrictype: "", per1: "", per2: "", per3: "", per4: "", per5: "",
    yarnblend1: "", yarnblend2: "", yarnblend3: "", yarnblend4: "", yarnblend5: "", fabric: "",
    aliasname: "", hsncode: "", per: 0,organic:false
  })

const handleChange = (e) => {
  const { name, value, type, checked,options } = e.target;
      let fieldValue = type === "checkbox" ? checked :  value;
    if (type !== "checkbox" && !/^[a-zA-Z0-9%() ]*$/.test(fieldValue)) {
    return;
  }

  setArtists((prev) => {
    const updated = { ...prev, [name]: type === "select-one" ? options[options.selectedIndex].text : fieldValue };
    const perValues = [
      parseInt(updated.per1 || 0),
      parseInt(updated.per2 || 0),
      parseInt(updated.per3 || 0),
      parseInt(updated.per4 || 0),
      parseInt(updated.per5 || 0),
    ];

    const yarnValues = [
      updated.yarnblend1,
      updated.yarnblend2,
      updated.yarnblend3,
      updated.yarnblend4,
      updated.yarnblend5,
    ];

    let totalper = perValues.reduce((a, b) => a + b, 0);

    let blend = "";
    perValues.forEach((p, i) => {
      if (p && yarnValues[i]) {
        blend += `${p}%${yarnValues[i]} `;
      }
    });

    let fabricText = "";
    blend !== "" && updated.organic === true ? fabricText = `ORGANIC COTTON (${blend.trim()})` :  fabricText = `${updated.fabrictype} (${blend.trim()})`;
    if (totalper > 100) {
      toast.error(`Yarn Percentage Exceed. Maximum 100% allowed (${totalper}%)`);
    }
    return {
      ...updated,
      fabric: fabricText,
      per: totalper
    };
  });

     setFab((prev) => ({
    ...prev,
    [name]: fieldValue.trim() 
  }));
 
  
};



  let validcheck = true;
  const validate = (fab) => {

    if (!fab.fabrictype) {
      alert("Invalid fabrictype");
      validcheck = false;
      return;
    }

    if (/^[a-zA-Z]$/.test(fab.fabric)) {
      alert("Special Charector not allowed");
      validcheck = false;
      return;
    }
    return validcheck;
  }



useEffect(() => {

  const fetchData = async () => {
    try {
      const [        
        userRightsRes,
        fabYarnBlendRes,
        fabTypeDataRes,
        gridRes
      ] = await Promise.all([       
        axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`),
         axios.get(GetYarnBlendMaster),
         axios.get(GetFabricTypeMaster),
          axios.get(GridData)
      ]);     
     
      setUserRights(userRightsRes?.data ?? []);
       setFabYarnBlend(fabYarnBlendRes?.data ?? []);
       setFabTypeData(fabTypeDataRes?.data ?? []);
        setFabItems(gridRes?.data ?? []);

    } catch (error) {      
      toast.error(error?.message || "Error fetching data");
      setFetchError(error?.message || "Unknown error");
    }
  };

  fetchData();

}, [defaultDetails?.Compcode, defaultDetails?.User, title]);

useEffect(() => {

  const text = fab_Search.toLowerCase() || "";
  const filterResult = fabItems.filter((post) =>
    post.fabric?.toLowerCase().includes(text)
  );
  setFab_FilterSearch([...filterResult].reverse());
}, [fabItems, fab_Search]);

// useEffect(() => {
//   const search = fab_Search?.toLowerCase() || "";
//   const filterResult = fabItems?.filter((item) =>
//     !search ||
//     item?.fabrictype?.toLowerCase().includes(search) ||
//     item?.fabric?.toLowerCase().includes(search)
//   ) || [];

//   setTotalItems(filterResult.length);
//   setFab_FilterSearch([...filterResult].reverse());

// }, [fabItems, fab_Search]);

  const FabMasterCheck = (id) => {
    try {
      axios.get(`${GridData}/${id.asptblfabmasid}`)
        .then((res) => {
          if (res.data.length === 0) { alert("Invalid Data") } else {
            // setActive(res.data[0].active === "T" ? true : false);
            // setOraganic(res.data[0].organic === "T" ? true : false);
            setFab({
              asptblfabmasid: res.data[0].asptblfabmasid,
              fabrictype: res.data[0].asptblfabrictypemasid,            
              per1: res.data[0].per1,
              per2: res.data[0].per2,
              per3: res.data[0].per3,
              per4: res.data[0].per4,
              per5: res.data[0].per5,
              yarnblend1: res.data[0].yarn1,
              yarnblend2: res.data[0].yarn2,
              yarnblend3: res.data[0].yarn3,
              yarnblend4: res.data[0].yarn4,
              yarnblend5: res.data[0].yarn5,
              fabric: res.data[0].fabric,
              aliasname: res.data[0].aliasname,
              hsncode: res.data[0].hsncode,
              active: res.data[0].active === "T" ? true : false,
              organic: res.data[0].organic === "T" ? true : false
            });


            //==========================

            setArtists({
              fabrictype: res.data[0].fabrictype,          
              per1: res.data[0].per1,
              per2: res.data[0].per2,
              per3: res.data[0].per3,
              per4: res.data[0].per4,
              per5: res.data[0].per5,
              yarnblend1: res.data[0].yarnblend1,
              yarnblend2: res.data[0].yarnblend2,
              yarnblend3: res.data[0].yarnblend3,
              yarnblend4: res.data[0].yarnblend4,
              yarnblend5: res.data[0].yarnblend5,
              fabric: res.data[0].fabric,
              aliasname: res.data[0].aliasname,
              hsncode: res.data[0].hsncode,
            });


          }
        })
        .catch((error) => { setFetchError(error) });
    }
    catch (err) {
      if (err.response) {
        console.log(`Error ${err.message}`);
      }
    }
    finally {



    }
  }


const FabricMaster_Save = async () => {

  const totalPer = parseInt(artists.per || 0);

  if (totalPer !== 100) {
    if (totalPer > 100) {
      toast.error(`Maximum % Exceed ${totalPer}`);
    } else {
      toast.error(`Minimum % Below ${totalPer}`);
    }
    return;
  }

  try {

    const CountryData = {
      asptblfabmasid: fab.asptblfabmasid > 0 ? fab.asptblfabmasid : 0,
      FABRICTYPE: fab.fabrictype,
       per1: fab.per1,
       per2: fab.per2 || 0,
       per3: fab.per3 || 0,
       per4: fab.per4 || 0,
       per5: fab.per5 || 0,
       yarnblend1: fab.yarnblend1 || 0,
       yarnblend2: fab.yarnblend2 || 0,
       yarnblend3: fab.yarnblend3 || 0,
       yarnblend4: fab.yarnblend4 || 0,
       yarnblend5: fab.yarnblend5 || 0,
       fabric: artists.fabric,
       aliasname: fab.aliasname,
       hsncode: fab.hsncode,
       active: fab.active ? "T" : "F",
       organic: fab.organic ? "T" : "F"
    };

    const response = await axios.post(insert_update, CountryData);

    if (response.data.asptblfabmasid === 0) {
      toast.success("Record Saved Successfully");
    } else {
      toast.success("Record Updated Successfully");
    }

    const gridRes = await axios.get(GridData);
    setFabItems(gridRes.data);

  } catch (err) {
    toast.error(`Error: ${err}`);
  }
};



  const FabricMaster_Delete = async (id) => {
    try {
      if (fab.asptblfabmasid == '') { alert(`Empty Not Allowed`); return; }
      await axios.delete(`${deleteData}/${id.asptblfabmasid}`)
        .then((respose) => {
          if (respose.data.asptblfabmasid > 0) {
            axios.get(`${GetYarnBlendMaster}`)
              .then((res) => { setFabItems(res.data.reverse()); })
              .catch((error) => { alert(error); setFetchError(error) });
            alert("Record Deleted Successfully");
          }
          else {
            setFetchError(respose.error)
            alert(respose.error);
          }
        }).catch((error) => {
          alert(error);
          setFetchError(error)
        });
    }
    catch (err) {
      if (err.response) {
        console.log(`Error ${err.message}`);
        alert(err.error);
      }
    }
  }



  const FabricMaster_New = () => {
    setNewButton(1);totalper=0;
    setArtists({
      asptblfabmasid: "0", fabrictype: "", per1: "", per2: "", per3: "", per4: "", per5: "",
      yarnblend1: "", yarnblend2: "", yarnblend3: "", yarnblend4: "", yarnblend5: "", fabric: "",
      aliasname: "", hsn: "",per:0,organic:false
    }); setActive(false); setOraganic(false);  setFab([]); }

  const FabricMaster_Search = () => {



  }

  const commentsData = useMemo(() => {
 let searchs=String(fab_Search || "").toLowerCase();
    let computedComments = fabItems;
    if (searchs) {
      computedComments = computedComments.filter((item) => {
      let fabric=String(item.fabric || "").toLowerCase();
      return fabric.includes(searchs)})
    }


    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort((a, b) =>
        reversed * a[sorting.field].localeCompare(b[sorting.field]))
    }
    return computedComments.slice(
      (currentPage - 1) * ITEM_PER_PAGE,
      (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [fabItems, currentPage, fab_Search, sorting])


  const menuButtons = [
  { key: "news", label: "News", action: FabricMaster_New },
  { key: "saves", label: "Save", action: FabricMaster_Save },
  { key: "deletes", label: "Delete", action: FabricMaster_Delete },
  { key: "searches", label: "Search", action: FabricMaster_Search },
  { key: "prints", label: "Prints", action: FabricMaster_New },
  { key: "treebutton", label: "TreeButton", action: FabricMaster_New },
  { key: "globalsearch", label: "Globalsearch", action: FabricMaster_New },
  { key: "login", label: "Login", action: FabricMaster_New },
  { key: "changepassword", label: "Changepassword", action: FabricMaster_New },
  { key: "changeskin", label: "Changeskin", action: FabricMaster_New },
  { key: "contact", label: "Contact", action: FabricMaster_New },
  { key: "pdf", label: "Pdf", action: FabricMaster_New },
  { key: "import", label: "Import", action: FabricMaster_New },
  { key: "download", label: "Download", action: FabricMaster_New }
];


  return (
   
    <>
      {userRights?.length > 0  ? (
      <div className='container-fluid animate-zoom' style={{ textAlign: "left", borderTop: "1px solid var(--bs-white)" }} >
                    <div className='row' style={{ display: `${userRights[0].readonlys === "T" ? "block" : "none"}` }}>
              <ul className="d-flex justify-content-end">
                  {menuButtons.map((btn, index) => (
                    userRights[0][btn.key] === "T" && (
                      <li key={index}>
                        <button className={newButton === 1 ? "tabs active-tabs" : "tabs"}
                          style={{ backgroundColor: colorValue }}onClick={btn.action}  >
                          {btn.label}
                        </button>
                      </li>
                    )
                  ))}
        </ul>
        </div>
        <div className='row pt-1'>
          <div className='col-md-7'>
          
            <div className='content active-content'>
              <fieldset><legend></legend>
                <div className='container-fluid'>
                  <div className='row' style={{ display: HeadersColumn[0].visible }}>
                    <label className='col-md-2' > ID </label>
                    <input className='col-md-1' type='text' name='asptblfabmasid' value={fab.asptblfabmasid || '0'} readOnly />
                  </div>
                  <div className='row'>
                    <label className='col-md-2'  > Organic </label>
                    <label className='checkbox' style={{ padding: "0px", width: "60px" }}>
                      <input type="checkbox" name='organic' checked={fab.organic} onChange={handleChange} />
                      <span></span>
                      <i className='indicator'></i>
                    </label>
                  </div>
                  <div className='row py-1' >
                    <label className='col-md-2' > FabricType </label>
                    <select className='col-md-10' name='fabrictype'  autoFocus value={fab.fabrictype || ""} onChange={handleChange} >
                      <option></option>
                      {
                        fabTypeData !== null &&
                        fabTypeData.map((result, index) => (
                          <option key={index} value={result.asptblfabrictypemasid}>
                            {result.fabrictype}
                          </option>))
                      }
                    </select>
                  </div>
                  <div className='row' >
                    <label className='col-md-2' > Per1 </label>
                    <input className='col-md-2' type='number'  min="0" max="100" name="per1" id="per1"
                      value={fab.per1 || ""} onChange={handleChange}
                    />
                    <label className='col-md-3' > Yarn Blend </label>
                    <select className='col-md-5' name='yarnblend1'  value={fab.yarnblend1 || ""} onChange={handleChange} >
                      <option></option>
                      {
                        fabYarnBlend !== null &&
                        fabYarnBlend.map((result, index) => (
                          <option key={index} value={result.asptblyarblemasid}>
                            {result.yarnblend}
                          </option>))
                      }
                    </select>
                  </div>

                  <div className='row py-1' >
                    <label className='col-md-2' > Per2 </label>
                    <input className='col-md-2' type='number'  min="0" max="100" name="per2" id="per2"
                      value={fab.per2 || ""} onChange={handleChange} />
                    <label className='col-md-3' > Yarn Blend </label>
                    <select className='col-md-5' name='yarnblend2'  value={fab.yarnblend2} onChange={handleChange} >
                      <option></option>
                      {
                        fabYarnBlend !== null &&
                        fabYarnBlend.map((result, index) => (
                          <option key={index} value={result.asptblyarblemasid}>
                            {result.yarnblend}
                          </option>))
                      }
                    </select>
                  </div>

                  <div className='row' >
                    <label className='col-md-2' > Per3 </label>
                    <input className='col-md-2' type='number'  min="0" max="100" name="per3" id="per3"
                      value={fab.per3 || ""} onChange={handleChange}
                    />
                    <label className='col-md-3' > Yarn Blend </label>
                    <select className='col-md-5' name='yarnblend3'  value={fab.yarnblend3 || ""} onChange={handleChange} >
                      <option></option>
                      {
                        fabYarnBlend !== null &&
                        fabYarnBlend.map((result, index) => (
                          <option key={index} value={result.asptblyarblemasid}>
                            {result.yarnblend}
                          </option>))
                      }
                    </select>
                  </div>
                  <div className='row py-1' >
                    <label className='col-md-2' > Per4 </label>
                    <input className='col-md-2' type='number'  min="0" max="100" name="per4" id='per4'
                      value={fab.per4 || ""} onChange={handleChange}
                    />
                    <label className='col-md-3' > Yarn Blend </label>
                    <select className='col-md-5' name='yarnblend4'  value={fab.yarnblend4 || ""} onChange={handleChange} >
                      <option></option>
                      {
                        fabYarnBlend !== null &&
                        fabYarnBlend.map((result, index) => (
                          <option key={index} value={result.asptblyarblemasid}>
                            {result.yarnblend}
                          </option>))
                      }
                    </select>
                  </div>
                  <div className='row' >
                    <label className='col-md-2' > Per5 </label>
                    <input className='col-md-2' type='number'  min="0" max="100" name="per5" id='per5'
                      value={fab.per5 || ""} onChange={handleChange}
                    />
                    <label className='col-md-3' > Yarn Blend </label>
                    <select className='col-md-5' name='yarnblend5' id="yarnblend5" value={fab.yarnblend5 || ""} onChange={handleChange} >
                      <option></option>
                      {
                        fabYarnBlend !== null &&
                        fabYarnBlend.map((result, index) => (
                          <option key={index} value={result.asptblyarblemasid}>
                            {result.yarnblend}
                          </option>))
                      }
                    </select>
                  </div>
                  <div className='row py-1' >
                    <label className='col-md-2' > Fabric  </label>
                    <input multiple={true} className='col-md-10' type='text' placeholder='Enter Fabric' name="fabric" id='tel'
                      value={artists.fabric || ""}
                    />
                  </div>
                  <div className='row' >
                    <label className='col-md-2' > AliasName </label>
                    <input multiple={true} className='col-md-10' type='text' placeholder='Enter Alias Name' name="aliasname"
                      value={fab.aliasname || ""} onChange={handleChange}
                    />
                  </div>
                  <div className='row py-1' >
                    <label className='col-md-2' > HSN </label>
                    <input className='col-md-10' type='text' name="hsncode"
                      value={fab.hsncode || ""} onChange={handleChange}
                    />
                  </div>
                  <div className='row'>
                    <label className='col-md-2'  > Active </label>
                    <label className='checkbox' style={{ padding: "0px", width: "60px" }}>
                      <input type="checkbox" name='active' placeholder='active' checked={fab.active} onChange={(e) => setFab({...fab, active: e.target.checked})} />
                      <span></span>
                      <i className='indicator'></i>
                    </label>
                    <input className='col-md-2' type='text' name="per"
                      value={artists.per || ""}
                      style={{ display: HeadersColumn[0].visible }} />
                  </div>
                </div>
              </fieldset>



            </div>
          </div>

          <div className='col-md-5'>
         
            <div className='content-tabs' >
              <Search colorValue={colorValue} searchs={fab_Search} setsearchs={setFab_Search}
                SearchLable1={searchLable1} SearchLable2={searchLable2}
                SearchLable3={searchLable3}
                handleChange={handleChange} ChangeValues={fab}
                searchCompCode={searchCompCode} searchUserName={searchUserName} />

              <DataTable heights={heights} colorValue={colorValue} headers={HeadersColumn}
                comments={fabItems} setComments={setFabItems}
                searches={fab_Search} setSearches={setFab_Search}
                totalItems={totalItems} setTotalItems={setTotalItems}
                currentPage={currentPage} setCurrentPage={setCurrentPage}
                sorting={sorting} setSorting={setSorting} ITEM_PER_PAGE={ITEM_PER_PAGE}
                EditData={FabMasterCheck}
                commentsData={commentsData} checkall={checkall} setCheckAll={setCheckAll} />

            </div>
          </div>
        </div>
      </div>
       ):(
        <div className='container-fluid animate-zoom' style={{ textAlign: "center", borderTop: "1px solid var(--bs-white)" }} >
          <h3 style={{ color: colorValue, padding: "50px" }}>You Don't Have Access To This Page</h3>
        </div>
      )} 
    </>
  )
}

export default FabricMaster
