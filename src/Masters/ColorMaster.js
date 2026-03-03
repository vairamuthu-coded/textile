import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import DataContext from '../context/CreateUserContext';
import DataTable from '../Custom/DataTable';
import axios from 'axios';
import SocialMissing from '../Social/SocialMissing';

const ColorMaster = ({ title, subTitle }) => {
    const { handleSubmit, API_URL, newButton, tabindex, colorValues, setColorValues,
       currentPage, setCurrentPage,tablecheck,userRights,setUserRights,defaultDetails,foreValue,colorValue,
       searchLable1,searchLable2,searchLable3,mode,
        sorting, setSorting, setNewButton } = useContext(DataContext)
      let ITEM_PER_PAGE = 50;
      const ColorParam = API_URL+"/ColorMaster/GetColor";
      const insert_update =API_URL+"/ColorMaster/ColorMasterInsertUpdate";
      const deleteData = API_URL+"/ColorMaster/ColorMaster_Delete";
        const userrightsMenuCheck = API_URL + "/UserRights/userrightsMenuCheck";
      let validcheck = true;
      const [fetchError, setFetchError] = useState(null)
      const [search, setSearch] = useState('');
      const [items, setItems] = useState([])
      const [active, setActive] = useState(false)
      const [totalItems,setTotalItems]=useState([]);
      const [color_FilterSearch, setColor_FilterSearch] = useState([]);
         const [checkall,setCheckAll]=useState(false)   
         const [checkchild,setCheckchild]=useState(false)  
      const HeadersColumn =
      [
        { headername: "ID", field: "asptblcolmasid" },
        { headername: "Color", field: "colorname" },
        { headername: "Active", field: "active" }       
      ]
  
    const heights = "420px";
  
      useEffect(() => {
    async function fetApi(){
    await axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`).then((res0) => { setUserRights(res0.data)    }).catch((error) => { setFetchError(error) });
    await axios.get(`${ColorParam}`).then((res) => {setItems(res.data.reverse());}).catch((error) => { alert(error) });    }

    fetApi();
  
  }, [])

    
    
    
      useEffect(() => {
        const filterResult = items.filter((post) => ((post.colorname).includes(search)))
        setColor_FilterSearch(filterResult.reverse());
      }, [items, search]);
    
  
     const handleChange=(e)=>{
     const { name, value,checked,type } = e.target;
       if(type !=="checkbox"){
      setColorValues((previousValue)=>{
          return{
              ...previousValue,[name]:value,
          }
      })
    }else{
        setColorValues((previousValue) => {
      return {
        ...previousValue, [name]: checked,
      }
     
    })
    }
  
    };
    const validate = (colorValues) => {
        if (!colorValues.colorname.trim()) {
          alert("Invalid Color Name");
          validcheck = false;
          return;
        }
        if (/^[a-zA-Z]$/.test(colorValues.colorname)) {
          alert("Special Charector not allowed");
          validcheck = false;
          return;
        }
        return validcheck;
      }
    
    
      const ColorMaster_Check = (id) => { 
        try {
          const myitem = items.filter(item => item.asptblcolmasid === id.asptblcolmasid);
          const updatepost = { asptblcolmasid: myitem[0].asptblcolmasid, colorname: myitem[0].colorname, active: myitem[0].active === "T" ? true : false };
          setActive(updatepost.active);
          setColorValues({asptblcolmasid: updatepost.asptblcolmasid, colorname: updatepost.colorname, active: active })
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
    
    
      const ColorMaster_Insert = () => {
      
        try {
          const ColorData = {asptblcolmasid: colorValues.asptblcolmasid > 0 ? colorValues.asptblcolmasid : 0, colorname: colorValues.colorname, active: active === true ? "T" : "F" };
          axios.post(`${insert_update}`,ColorData)
          .then((respose) => { alert(respose.data);
            if (respose.data === true) {
              axios.get(`${ColorParam}`)
              .then((res) => { setItems(res.data.reverse()); setNewButton(2); })
              .catch((error) => { setFetchError(error) });
        
              if(colorValues.asptblcolmasid != 0){alert("Updated Successfully"); } 
              if(colorValues.asptblcolmasid === 0){alert("Record Saved Successfully"); }
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
    
    
    const ColorMaster_Save = () => {
      ColorMaster_Insert();
    }
    
      const ColorMaster_Delete = async (id) => {
       
        try {
          if (colorValues.colorname === '') { alert(`Empty Not Allowed`); return; }
          if (colorValues.asptblcolmasid >= 1) {
            const id = colorValues.asptblcolmasid;
            await axios.delete(`${deleteData}/${id}`)
              .then((respose) => {
                if (respose.data === 'true') {
                  axios.get(`${ColorParam}`)
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
      const ColorMasterClear = () => {setColorValues({});
     }
      const ColorMasterNew = (tabindex) => { 
        setNewButton(tabindex); ColorMasterClear(); setActive(false); 
      }
    
    
    
    
    
      const commentsData = useMemo(() => {
        let computedComments = items;
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
      }, [items, currentPage, search, sorting])

  return (
              <form onSubmit={handleSubmit}  >
           
       {userRights.length>0 &&
      <div className='container-fluid animate-zoom'  >
       <div className='row' style={{ display: `${userRights[0].readonlys === "T" ? "block" : "none"}` }}>     
   
                      <ul className='d-flex flex-row-reverse boxShadow' >      
                                <li> <button  className={newButton === 1  ? "tabs active-tabs" : "tabs" } style={{display:`${userRights[0].news}`==='T' ? "block" : "none",backgroundColor:`${colorValue}`}} onClick={() => ColorMasterNew()}    >News</button></li>
                                <li> <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].saves}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => ColorMaster_Save()}    >Save</button></li>
                                <li> <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].deletes}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => ColorMaster_Delete(colorValues.asptblcolmasid)}  >Delete</button></li>
                                <li> <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].searches}` === "T" ? "block" : "none",ackgroundColor:`${colorValue}`}}  onClick={() => ColorMasterNew()}  > Search </button></li>
                                <li> <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].prints}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => ColorMasterNew()} >Prints</button></li>
                                <li> <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].readonlys}` === "T" ? "none" : "none",backgroundColor:`${colorValue}`}} onClick={() => ColorMasterNew()} >Readonlys</button></li>
                                <li> <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].treebutton}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => ColorMasterNew()} >TreeButton</button></li>
                                <li> <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].globalsearch}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => ColorMasterNew()} > Globalsearch </button></li>
                                <li> <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].login}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => ColorMasterNew()} >Login</button></li>
                                <li> <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].changepassword}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => ColorMasterNew()} >Changepassword</button></li>
                                <li> <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].changeskin}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => ColorMasterNew()} >Changeskin</button></li>
                                <li> <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].contact}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}} onClick={() => ColorMasterNew()} > Contact </button></li>
                                <li> <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].pdf}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => ColorMasterNew()} >Pdf</button></li>
                                <li> <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].import}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => ColorMasterNew()} > Import </button></li>
                                <li> <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].download}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => ColorMasterNew()} > Download </button></li>
                            </ul>  
            <div className='row pt-2' style={{backgroundColor:`${foreValue}`}}>
            
             
                <div className='col-md-6'>
                  <div className='bloc-tabs' >
              <div className="tabs active-tabs" style={{  backgroundColor: `${colorValue}` ,color:`${foreValue}`}}> {title} </div>
            </div>   
                  <div className='row pt-1'>
                    <label className='col-md-2' > ColorID </label>
                    <input className='col-md-2' type='text' name="asptblcolmasid" value={colorValues.asptblcolmasid} />
                  </div>
                   <div className='row pt-1' >
                    <label className='col-md-2' > colorname </label>
                    <input className='col-md-10' type='text' name="colorname" ref={inputref}
                      onChange={handleChange} value={colorValues.colorname}
                      required />

                  </div>
                         <div className='row'>
                    <label className='col-md-2'  > Active </label>
                    <label className='checkbox' style={{ padding: "0px", width: "60px" }}>
                      <input type="checkbox" name='active' checked={colorValues.active} onChange={handleChange} />
                      <span></span>
                      <i className='indicator'></i>
                    </label>
                  </div> 

               </div>
             
               <div className='col-md-6 pt-1'>
                <div className='bloc-tabs' >
              <div className="tabs active-tabs" style={{  backgroundColor: `${colorValue}` ,color:`${foreValue}`}}> {title} </div>
            </div>   
            <div className='row ' >               
                <DataTable heights={heights} colorValue={colorValue} headers={HeadersColumn}              
                comments={items} setComments={setItems} mode={mode}
                searches={search} setSearches={setSearch}
                totalItems={totalItems} setTotalItems={setTotalItems}
                currentPage={currentPage} setCurrentPage={setCurrentPage}
                sorting={sorting} setSorting={setSorting} ITEM_PER_PAGE={ITEM_PER_PAGE}
                EditData={ColorMaster_Check} commentsData={commentsData} 
                 setCheckchild={setCheckchild} setCheckAll={setCheckAll} checkall={checkall}
                 SearchLable1={searchLable1} SearchLable2={searchLable2} SearchLable3={searchLable3}
              />         
             
              </div>
             
              </div>
 
</div>

            </div>
                  {/* ) : <SocialMissing colorValue={colorValue} fetchError={fetchError} ></SocialMissing>} */}
  </div>
           
     
}
   </form>
  )
}

export default ColorMaster
