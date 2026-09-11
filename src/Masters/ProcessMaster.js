import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import DataContext from '../context/CreateUserContext';
import DataTable from '../Custom/DataTable';
import axios from 'axios';
import SocialMissing from '../Social/SocialMissing';
const ProcessMaster = ({ title, subTitle, colorValue }) => {
  const { handleSubmit, API_URL, newButton, tabindex, processValues, setProcessValues,
    totalItems, setTotalItems, currentPage, setCurrentPage,tablecheck,
    sorting, setSorting, setNewButton } = useContext(DataContext)
  let ITEM_PER_PAGE = 50;
  const GetProcess = API_URL+"/ProcessMaster/GetProcess";
  const insert_update = API_URL+"/ProcessMaster/AddProcess";
  const deleteData = API_URL+"/ProcessMaster/ProcessMaster_Delete";
  let validcheck = true;
  const [fetchError, setFetchError] = useState(null)
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([])
  const [active, setActive] = useState(false)

  const [country_FilterSearch, setCountry_FilterSearch] = useState([]);
  useEffect(() => {
    axios.get(`${GetProcess}`)
      .then((res) => { setItems(res.data.reverse()); setNewButton(1); })
      .catch((error) => { setFetchError("Service does't running. pls check (ProcessMaster) API in Country Controller") });
  }, [])



  useEffect(() => {
    const filterResult = items.filter((post) => ((post.processname).includes(search)))
    setCountry_FilterSearch(filterResult.reverse());
  }, [items, search]);

  const HeadersColumn =
    [
      { headername: "id", field: "asptblproccessId" },
      { headername: "ProcessName", field: "processname" },
      { headername: "Active", field: "active" }
    ]

  const heights = "420px";

  

   const handleChange=(e)=>{
    const {name,value}=e.target;    
    setProcessValues((previousValue)=>{
        return{
            ...previousValue,[name]:value,
        }
    })

  };

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setprocessValues(values => ({ ...values, [name]: value }))

  // }
  const validate = (processValues) => {
    if (!processValues.processname.trim()) {
      alert("Invalid Country Name");
      validcheck = false;
      return;
    }
    if (/^[a-zA-Z]$/.test(processValues.processname)) {
      alert("Special Charector not allowed");
      validcheck = false;
      return;
    }
    return validcheck;
  }


  const CountryMaster_Check = (id) => { 
    try {
      const myitem = items.filter(item => item.asptblproccessId === id.asptblproccessId);
      const updatepost = { asptblproccessId: myitem[0].asptblproccessId, processname: myitem[0].processname, active: myitem[0].active === "T" ? true : false };
      setActive(updatepost.active);
      setProcessValues({asptblproccessId: updatepost.asptblproccessId, processname: updatepost.processname, active: active })
    }
    catch (err) {
      if (err.response) {

        setFetchError(err.response)
      }
    }
    finally {
      setNewButton(1);

    }
  }


  const CountryMaster_Insert = () => {
  
      try {
        const CountryData = {asptblproccessId: processValues.asptblproccessId > 0 ? processValues.asptblproccessId : 0, processname: processValues.processname, active: active === true ? "T" : "F" };

        // axios.post(`${insert_update}`,CountryData)
        axios.post(`${insert_update}`,CountryData)
        .then((respose) => {
          if (respose.data === true) {
            axios.get(`${GetProcess}`)
            .then((res) => { setItems(res.data.reverse()); setNewButton(2); })
            .catch((error) => { setFetchError("Service does't running. pls check (ProcessMaster) API in Country Controller") });
      
            if(CountryData.asptblproccessId != 0){alert("Updated Successfully"); } 
       if(CountryData.asptblproccessId === 0){alert("Record Saved Successfully"); }
            }
          else {
           
            alert("Error " + respose.data);
          }
        }).catch((error) => {
          alert(error)
        });

      }
      catch (err) {
        alert(`Error . ${err}`);
      } finally {
        
      }
 
  }


  const CountryMaster_Save = () => {
    CountryMaster_Insert();
  }

  const CountryMaster_Delete = async (id) => {
    alert(id);
    try {
      if (processValues.processname === '') { alert(`Empty Not Allowed`); return; }
      if (processValues.asptblproccessId >= 1) {
        const id = processValues.asptblproccessId;
        await axios.delete(`${deleteData}/${id}`)
          .then((respose) => {
            if (respose.data === 'delete') {
              axios.get(`${GetProcess}`)
                .then((res) => { setItems(res.data.reverse());; })
                .catch((error) => { setFetchError(error) });
              alert("Record Deleted Successfully");
              setNewButton(2);
            }
            else {
              setFetchError(respose.error)
              alert("Error " + respose.data);
            }
          }).catch((error) => {
            setFetchError(error)
          });

      }
    }
    catch (err) {
      if (err.response) {
        console.log(`Error ${err.message}`);
      }
    }
  }


  const inputref = useRef();
  const CountryMasterClear = () => {setProcessValues({});
 }
  const CountryMasterNew = (tabindex) => { 
    setNewButton(tabindex); CountryMasterClear(); setActive(false); 
  }





  const commentsData = useMemo(() => {
    let computedComments = items;
    if (search) {
      computedComments = computedComments.filter((item) => ((item.processname).includes(search)))
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
  }, [items, currentPage, search, sorting])


  return (
     <form onSubmit={handleSubmit}>
      <div className='container-fluid' >

        <div className='row' style={{ backgroundColor: "white" }}>
          {!fetchError && items !== null ? (
            <>
              <div className='col-md-12' style={{ textAlign: "right" }}>
                <div style={{ background: "var(--bs-header)" }}>
                  <ul >
                    <li> <button type='submit' onClick={() => CountryMasterNew(1)} style={{ backgroundColor: `${colorValue}` }}>News</button></li>
                    <li> <button type='submit' onClick={() => CountryMaster_Save()} style={{ backgroundColor: `${colorValue}` }}>Save</button></li>
                    <li> <button type='submit' onClick={(e) => CountryMaster_Delete(processValues.asptblproccessId)} style={{ backgroundColor: `${colorValue}` }}>Delete</button></li>
                    <li> <button type='submit' onClick={() => CountryMasterNew(2)} style={{ backgroundColor: `${colorValue}` }}> Search </button></li>
                  </ul>
                </div>
              </div>
              <div className='bloc-tabs'>

                <div className={newButton === 1 ? "tabs active-tabs" : "tabs"} onClick={() => setNewButton(1)} style={{ color: `${colorValue}` }}> {title} </div>
                <div className={newButton === 2 ? "tabs active-tabs" : "tabs"} onClick={() => setNewButton(2)} style={{ color: `${colorValue}` }} > {subTitle} </div>
              </div>

              <div className='content-tabs' >



                <div className={newButton === 1 ? "content active-content" : "content"}>
                  <div className='content active-content'>
                    <div className='row py-1'>
                      <label className='col-md-2' > CountryID </label>
                      <input className='col-md-1' type='text' name='asptblproccessId' value={processValues.asptblproccessId || ""} readOnly />
                    </div>
                    <div className='row' >
                      <label className='col-md-2' > processname </label>
                      <input className='col-md-3' type='text' name='processname' ref={inputref} defaultValue={""}
                        value={processValues.processname || ""} onChange={handleChange}
                        required />

                    </div>
                    <div className='row py-1'>
                      <label className='col-md-2' > Active </label>
                      <label className='col-md-1 checkbox'>
                        <input type="checkbox" name='active' checked={active} onChange={(e) => setActive(e.target.checked)} />
                        <span></span>
                        <i className='indicator'></i>
                      </label>
                    </div>
                  </div>
                </div>
                <div className={newButton === 2 ? "content active-content" : "content"} >
                {!fetchError && newButton ===2 ?  (               
                  <DataTable heights={heights} colorValue={colorValue} headers={HeadersColumn}
                    comments={items} setComments={setItems}
                    searches={search} setSearches={setSearch}
                    totalItems={totalItems} setTotalItems={setTotalItems}
                    currentPage={currentPage} setCurrentPage={setCurrentPage}
                    sorting={sorting} setSorting={setSorting} ITEM_PER_PAGE={ITEM_PER_PAGE}
                    EditData={CountryMaster_Check} 
                    commentsData={commentsData} 
                  />
                
                ) : <p style={{marginTop:"2rem",color:"var(--bs-danger)"}} ></p>}
                </div>



              </div>
            </>
           ) : <SocialMissing colorValue={colorValue} fetchError={fetchError} ></SocialMissing>}

        </div>
      </div>
     </form>
  )


}

export default ProcessMaster

