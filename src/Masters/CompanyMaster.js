import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'

import DataTable from '../Custom/DataTable';
import axios from 'axios';
import SocialMissing from '../Social/SocialMissing';
import { el } from 'date-fns/locale';
import { RiChatSettingsFill } from 'react-icons/ri';
import Search from '../Custom/Search';
import DataContext from '../context/CreateUserContext';
import { toast } from 'react-toastify';
// import styled from 'styled-components';
// const Button=styled.button`
// width:100%;padding-left:10px;margin:2px;color:white;
// justify-content:center;
// `

const CompanyMaster = ({ title, subTitle,   }) => {
  const {
    newButton, setNewButton, inputref, tabindex, API_URL,colorValue,
    handleSubmit,  currentPage, setCurrentPage,companyValues, setCompanyValues,
    sorting, setSorting, ITEM_PER_PAGE,stateItems, setStateItems,userRights,setUserRights,
    countryItems, setCountryItems,searchLable1,searchLable2,searchLable3,defaultDetails,foreValue,
    setSearchLable1,setSearchLable2,setSearchLable3 ,
  } = useContext(DataContext)



  const insert = "/CompanyMaster/Saves";
  const deleteData = "/CompanyMaster/DeleteCommond";
  const CityParam = "/CityMaster/GridLoad";
  const StateParam = "/CityMaster/GridLoad";
  const CompanyMasterParam="/CompanyMaster/GridLoad";
  const CompanyMasterGrid="/CompanyMaster/GridLoad";
    const [totalItems,setTotalItems]=useState([]);
  const CountryParam = "/StateMaster/GridLoad";
 const DeviceParam="/CompanyMaster/DeviceConnect";
   const userrightsMenuCheck = API_URL + "/UserRights/userrightsMenuCheck";
  const [fetchError,setFetchError]=useState(null)
  setSearchLable1("Search");  setSearchLable2("");  setSearchLable3("")
  let defaultimage='';
  const [searchCompCode, setSearchCompCode] = useState([])
  const [searchUserName, setSearchUserName] = useState([])
var  imagesrc='',imageFile='';
const [images, setImage] = useState(imagesrc);


const showPreview=e=>{
  if(e.target.files.name != ""){

    imageFile=e.target.files[0]   
    const reader=new FileReader();
    reader.onload=x=>{
      setImage({
      ...images,
      imageFile,
      imagesrc:x.target.result,
    })
    }    
    reader.readAsDataURL(imageFile);    
   }
   else{
   
    setImage({
      ...images,
      imageFile:null,
      imagesrc:defaultimage
    })
    
  }
  
}

  // const uploadImageDisplay= async ()=>{
  //   try{
  //   const uploadfile=inputref.current.files[0];
  //   const formdata=new  FormData();
  //   formdata.append("file",uploadfile);
  //   const response= await fetch("https://api.escuelajs.co/api/v1/files/upload",{
  //     method:"post",
  //     body:formdata
  //   });
  //         if (response.status===201 ) {
  //         const data= await response.json();     
  //         setImage(data?.location);
  //         companyValues.images=data.originalname;
  //         }

  //   //    companyValues.images=images;
  //   // const cachedUrl=URL.createObjectURL(uploadfile);
  //   // setImage(cachedUrl); 
    
  //   }
  //   catch(err){
  //     console.error(err);
  //     setImage(defaultImage)
     
  //   }
  //   finally{

  //   }
  // }

  const [cityItems, setCityItems] = useState([])

  const [company_search, setCompanySearch] = useState([])
  const [company_filterSearch, setCompanyFilterSearch] = useState([]);
  const [company_items, setCompanyItems] = useState([])
  const [company_logo, setCompanyLogo] = useState('')
 

  const handleChange = (e) => {
    const {name,value,type,checked } = e.target; 
   
    if(name==="city"){handleStateChange(e.target.value);}   
    if(name==="state"){handleCountryChange(companyValues.state);}   
    if (type !== "checkbox") {
      setCompanyValues((previousValue) => {
        return {
          ...previousValue, [name]: value,
        }
      })
  }else{
    setCompanyValues((previousValue) => {
        return {
          ...previousValue, [name]: checked,
        }
      })
  }
}

  const handleStateChange = (id) => {   
    if (id === undefined) { } else {
     
      companyValues.city = id;
      try {
        axios.get(`${API_URL}${StateParam}/${id}`).then((res) => {
          setStateItems(res.data);         
         
           companyValues.state = res.data[0].gtstatemastid;
           handleCountryChange(res.data[0].gtstatemastid);
        }).catch((error) => {
          setFetchError(error);
        });
      }
      catch (e) { }
      finally {

      }
    }
  }

  const handleCountryChange = (id) => {   

    if(id === undefined){}else{
    
    try {      
      axios.get(`${API_URL}${CountryParam}/${id}`).then((res) => {  

        setCountryItems(res.data.reverse());
      }).catch((error) => {
         setFetchError(error);
        });
    }
    catch (e) {
    }
    finally {

    }}
  }


  let validcheck = true;
  const validate = (companyValues) => {
    if (/^[a-zA-Z]$/.test(companyValues.compcode)) {
      alert("Special Charector not allowed");
      validcheck = false;
      return;
    }
    if (/^[a-zA-Z]$/.test(companyValues.compname)) {
      alert("Special Charector not allowed");
      validcheck = false;
      return;
    }
    if (/^[a-zA-Z]$/.test(companyValues.contactname)) {
      alert("Special Charector not allowed");
      validcheck = false;
      return;
    }
    return validcheck;
  }
// alert(JSON.stringify(companyValues.gtcitymastid));



  useEffect(() => {    
    async function fetchMyAPI() {
 await axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`).then((ress) => {  setUserRights(ress.data);   }).catch((error) => { setFetchError(error) });
   await axios.get(`${API_URL}${CityParam}`).then((res) => { setCityItems(res.data); }).catch((error) => { alert(error); });
        axios.get(`${API_URL}${CompanyMasterParam}`).then((ress) => {setCompanyItems(ress.data.reverse()); }).catch((error) => { alert(error); });

   setNewButton(1);
    }
    fetchMyAPI();
  },[])



  useEffect(() => {
    const filterResult = company_items.filter((item) => ((item.compcode).includes(company_search)))
    setCompanyFilterSearch(filterResult.reverse());
  }, [company_items, company_search]);

const CompanyMaster_Exit=()=>{
  
}




  const heights = "380px";
  const CompanyMasterColumn =
    [
      { headername: "",field: "none" },
      { headername:"id", field: "gtcompmastid" },
      { headername:"compcode", field: "compcode" },
      { headername:"compname", field: "compname" },   
      {headername:"CityName",field:"cityname"},
      {headername:"StateName",field:"statename"},
      {headername:"CountryName",field:"countryname"},
      {headername:"Active",field:"active" }
    ]


  const CompanyMasterCheck = (id) => {
    try { 
      axios.put(`${API_URL}${CompanyMasterGrid}/${id.gtcompmastid}`)
        .then((res) => {        
          if (res.data[0].gtstatemastid === 0) {alert("Invalid Data") } else {        
            alert(JSON.stringify(res.data[0].companylogoo))        
            setImage({                     
              imagesrc:res.data[0].companylogoo          
            });
         
            setCompanyValues({
              gtcompmastid: res.data[0].gtcompmastid,
              displayname: res.data[0].displayname,
              compcode: res.data[0].compcode,
              compname: res.data[0].compname,
              city: res.data[0].gtcitymastid,
               state: res.data[0].gtstatemastid,
               country: res.data[0].gtcountrymastid,
              address: res.data[0].address,
              gstno: res.data[0].gstno,
              gstdate: res.data[0].gstdate,
              website: res.data[0].website,
              email: res.data[0].email,
              accno: res.data[0].accno,
              bankname: res.data[0].bankname,
              ifsc: res.data[0].ifsc,
              phoneno: res.data[0].phoneno,
              contactname: res.data[0].contactname,              
              active: res.data[0].active === "T" ? true : false
            });
           

             if (companyValues.city !== null) { handleStateChange(res.data[0].gtcitymastid); }
             //if (companyValues.state !== null) { handleCountryChange(res.data[0].gtstatemastid); }
          }
        }).catch((error) => { alert("--"+error) });

    }
    catch (err) {
      if (err.response) {
        console.log(`Error ${err.message}`);
      }
    }
    finally {
      setNewButton(1);
    }
  }

  const CompanyMaster_Insert = async () => {

    try {
      validate(companyValues);
      if (validcheck === true) {
        const CountryData = {
          gtcompmastid: companyValues.gtcompmastid > 0 > 0 ? companyValues.gtcompmastid : 0, 
          compcode: companyValues.compcode,
          compname: companyValues.compname,
          city: companyValues.city,
          state: companyValues.state,
          country: companyValues.country,
          displayname:companyValues.displayname, 
          images: images.imagesrc, 
          filenames:images.imageFile,
              address: companyValues.address,
              gstno: companyValues.gstno,
              gstdate: companyValues.gstdate,
              website: companyValues.website,
              email: companyValues.email,
              accno: companyValues.accno,
              bankname: companyValues.bankname,
              ifsc: companyValues.ifsc,
              phoneno: companyValues.phoneno,
              contactname: companyValues.contactname,
          active: companyValues.active === true ? "T" : "F"
        };      
          await axios.post(`${API_URL}${insert}`, CountryData)
            .then((respose) => {
              if (respose.data !== null) {
                axios.get(`${API_URL}${CompanyMasterParam}`)
                  .then((res) => { setCompanyItems(res.data); }).catch((error) => { alert(error) });
                   alert(respose.data); 
              }
             
            }).catch((error) => {
              alert(error);

            });
        
       
      }
    }
    catch (err) {
      console.log(`Error . ${err}`);
    }
  }

  const CompanyMaster_Save = () => {

    CompanyMaster_Insert();

  }






  const CompanyMaster_Delete = async (id) => {
    try {
      if (companyValues.gtcompmastid == '') { alert(`Empty Not Allowed`); return; }
      await axios.delete(`${API_URL}${deleteData}/${id}`)
        .then((respose) => {
          if (respose.data === 'true') {
            // axios.get(`${API_URL}${CompanyMasterParam}`)
            //   .then((res) => { setCityItems(res.data.reverse()); setNewButton(1); })
            //   .catch((error) => { alert(error); });
            // alert("Record Deleted Successfully");

          }
          else {

            alert(respose.error);
          }
        }).catch((error) => {
          alert(error);

        });
    }
    catch (err) {
      if (err.response) {
        console.log(`Error ${err.message}`);
        alert(err.error);
      }
    }
  }
  const CompanyMasterClear = () => {



  }

  const CompanyMaster_New = () => {
      setNewButton(2);
    setStateItems([]);setCountryItems([])
     setCompanyValues([]); 
     setNewButton(1);   
    setImage(''); 
      CompanyMasterClear();
  }

    const TabIndexClick = (inx) => {
        setNewButton(inx);
    }


const commentsData = useMemo(() => {

  const keyword = String(company_search || "").toLowerCase();

  // 1) FILTER
  let filtered = company_items;

  if (keyword) {
    filtered = company_items.filter(item =>
      String(item.compcode || "").toLowerCase().includes(keyword)
    );
  }

  // Update total count
  setTotalItems(filtered.length);

  // 2) SORT
  if (sorting.field) {
    const reversed = sorting.order === "asc" ? 1 : -1;

    filtered = [...filtered].sort((a, b) =>
      reversed *
      String(a[sorting.field] || "").localeCompare(String(b[sorting.field] || ""))
    );
  }

  // 3) PAGINATION
  const start = (currentPage - 1) * ITEM_PER_PAGE;
  const end = start + ITEM_PER_PAGE;

  return filtered.slice(start, end);

}, [company_items, currentPage, company_search, sorting]);





  return (
    <>
<div onSubmit={handleSubmit}  >  
  
  {userRights.length  &&
 <div className='container-fluid animate-zoom' >
                    <div className='row' style={{ display: `${userRights[0].readonlys === "T" ? "block" : "none"}` }}>

         
 
 <ul className='boxShadow d-flex justify-content-end'>
                                <li  > <button type='submit' className={newButton === 1  ? "tabs active-tabs" : "tabs" } style={{display:`${userRights[0].news}`==='T' ? "block" : "none",backgroundColor:`${colorValue}`}} onClick={() => CompanyMaster_New()}    >News</button></li>
                                <li > <button type='submit' className={newButton === 2 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].saves}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => CompanyMaster_Save()}    >Save</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].deletes}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => CompanyMaster_Delete(companyValues.gtcompmastid)}  >Delete</button></li>
                                <li  > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].searches}` === "T" ? "block" : "none",ackgroundColor:`${colorValue}`}}  onClick={() => CompanyMaster_New()}  > Search </button></li>
                                <li  > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].prints}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => CompanyMaster_New()} >Prints</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].readonlys}` === "T" ? "none" : "none",backgroundColor:`${colorValue}`}} onClick={() => CompanyMaster_New()} >Readonlys</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].treebutton}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => CompanyMaster_New()} >TreeButton</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].globalsearch}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => CompanyMaster_New()} > Globalsearch </button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].login}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => CompanyMaster_New()} >Login</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].changepassword}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => CompanyMaster_New()} >Changepassword</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].changeskin}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => CompanyMaster_New()} >Changeskin</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].contact}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}} onClick={() => CompanyMaster_New()} > Contact </button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].pdf}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => CompanyMaster_New()} >Pdf</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].import}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => CompanyMaster_New()} > Import </button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].download}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => CompanyMaster_New()} > Download </button></li>
                                  <li> <button type='submit' onClick={() => CompanyMaster_Exit()} style={{ backgroundColor: `${colorValue}` }}> Exit </button></li>

                            </ul>

    <ul className='bloc-tabs'>
                               <li className='p-1'> <button className={newButton === 1 || newButton === 10 ? "tabs active-tabs btn" : "tabs"} onClick={() => TabIndexClick(1)} style={{ backgroundColor:`${colorValue}`,width:'100%' }}><b>{title} </b> </button></li>
                               <li className='p-1'> <button className={newButton === 2 ? "tabs active-tabs btn" : "tabs"} onClick={() => TabIndexClick(2)} style={{ backgroundColor:`${colorValue}`,width:'100%'  }} ><b> {subTitle}</b> </button></li>

                            </ul>       
          
               <div className={newButton === 1 ? "content active-content" : "content"} > 
             
<div className='row' >
  
                <div className='col-md-10' >
                 <fieldset>
                   
                <div className='row m-1'  >
                  
                    <label className='col-md-1' >ID</label>
                    <input className='col-md-1' type='text' name='id' value={companyValues.gtcompmastid || ""}  onChange={handleChange} />
                    <label className='col-md-1' >ShortCode</label>
                    <input className='col-md-1' type='text' name='shortcode' value={companyValues.shortcode || ""} onChange={handleChange} />
                    <label className='col-md-1' >ComCode</label>
                    <input className='col-md-1' type='text' name='compcode' value={companyValues.compcode || ""}  onChange={handleChange} />
                    <label className='col-md-1' ></label>
                    <input className='col-md-4 ' type='text' name='compname' value={companyValues.compname || ""}  onChange={handleChange}  />
                
                  </div>

                 <div className='row m-1'  >
                    <label className='col-md-1' >Display</label>
                    <input className='col-md-5' type='text' name='displayname' value={companyValues.displayname || ""} onChange={handleChange} />

                    <label className='col-md-1' >Division</label>
                    <select className='col-md-4' name='division' value={companyValues.division || ""} onChange={handleChange}     >  <option></option> </select>
                  </div>
                  

                  <div className='row m-1'  >
                    <label className='col-md-1' > City </label>

                    <select className='col-sm-2' name='city' value={companyValues.city || ""}  onChange={handleChange}  >
                    <option></option>         
                      {
                        cityItems !== null &&
                        cityItems.map((result, index) => (
                          <option key={index} value={result.gtcitymastid}>
                            {result.cityname}
                          </option>))
                      }
                    </select>

                    <label className='col-md-1' > State </label>

                    <select className='col-sm-2' name='state' value={companyValues.state} onChange={handleChange}>    
                                
                      {
                        stateItems !== " " && stateItems.map((result,index) => (
                          <option key={index} value={result.gtstatemastid}>
                            {result.statename}
                          </option>))
                      }
                    </select>

                    <label className='col-md-1' > Country </label>
                    <select className='col-sm-2' name='country' value={companyValues.country} onChange={handleChange}>                     
                          
                      {
                        countryItems !== null &&
                        countryItems.map((result, index) => (
                          <option key={index} value={result.gtcountrymastid}>
                            {result.countryname}
                          </option>))
                      }
                    </select>



                  </div>
                 <div className='row m-1'  >
                    <label className='col-md-1' > Address </label>
                    <textarea className='col-md-10' rows="4" type='text' name='address' 
                    value={companyValues.address || ""} onChange={handleChange}     >    </textarea>

                  </div>
              
                
                    <legend className='p-2 text-success' style={{ fontWeight: "bold", color: `${colorValue}` }}>Account Details</legend>
                    <div className='row m-1'>

                      <label className='col-md-1' > GstNo</label>
                      <input className='col-md-2' type='text' name='gstno' value={companyValues.gstno || ""} onChange={handleChange} />
                      <label className='col-md-1' > Date</label>
                      <input className='col-md-2' type='date' name='gstdate' value={companyValues.gstdate || ""} onChange={handleChange} />
                      <label className='col-md-1' > WebSite </label>
                      <input className='col-md-4' type='text' name='website' value={companyValues.website || ""} onChange={handleChange} />
                    </div>

                    <div className='row m-1'>

                      <label className='col-md-1' > Email </label>
                      <input className='col-md-10' type='email' name="email" value={companyValues.email || ""} onChange={handleChange} />
                    </div>
                 
                    <legend className='p-2 text-success' style={{ fontWeight: "bold", color: `${colorValue}` }}>Bank Details</legend>
                    <div className='row m-1' >
                      <label className='col-md-1' > AccNo </label>
                      <input className='col-md-5' type='text' name="accno" value={companyValues.accno || ""} onChange={handleChange} />
                     
                      <label className='col-md-2' > BankName </label>

                      <select className='col-md-3' name='bankname' value={companyValues.bankname || ""} onChange={handleChange} >
                        <option></option><option value="1">City Union Bank</option><option value="2">State Bank of India</option>
                      </select>
                    </div>
                    <div className='row m-1' >
                      <label className='col-md-1' > IFSC </label>

                      <select className='col-md-5' name='ifsc' value={companyValues.ifsc || ""} onChange={handleChange}  >
                        <option></option><option value="1">1</option><option value="2">2</option>
                      </select>

                      <label className='col-md-2' >            Branch </label>

                      <select className='col-md-3' name='branch' value={companyValues.branch || ""} onChange={handleChange}  >
                        <option></option><option value="1">Kumaran Road Branch(City)</option><option value="2">Railway Station Main Branch(State)</option>
                      </select>
                    </div>
                    <div className='row m-1' >
                      <label className='col-md-1' > Contact </label>
                      <input className='col-md-5' type='text' name='phoneno' value={companyValues.phoneno || ""} onChange={handleChange} />


                      <label className='col-md-2' > ContactName  </label>
                      <input className='col-md-3' type='text' name='contactname' value={companyValues.contactname || ""} onChange={handleChange} />
                    </div>

                    <div className='row m-1'>
                      <label className='col-md-1'  > Active </label>
        

                      <label className='checkbox' style={{ padding: "0px",margin:0, width: "60px" }}>
                                                        <input type="checkbox" name="active" checked={companyValues.active} onChange={handleChange} />
                                                        <span></span>
                                                        <i className='indicator'></i>
                                                    </label>

                    </div>

                  </fieldset>
                </div>

                <div className='col-md-2'  >
                  <div style={{ padding: "0px", border: "1px solid var(--bs-white)",alignItems:"right" }} >
                    <img src={images.imagesrc} style={{height:"150px" , width:"150px",textAlign:"right"}} />                        
                    <input type='file' id='imageuploader'   onChange={showPreview} accept='image/' 
                        className="form-control">
                        </input>
                  </div> 
                </div>

           

            </div>
        </div>
        
         {!fetchError && company_items!== null ? (
            <div className={newButton ===2 ? "content active-content" : "content"}>
            <div className='row' >
            <Search colorValue={colorValue} searchs={company_search} setsearchs={setCompanySearch}
              SearchLable1={searchLable1} SearchLable2={searchLable2}
              SearchLable3={searchLable3}  stylecolor={foreValue}
              handleChange={handleChange} ChangeValues={companyValues}
              searchCompCode={searchCompCode} searchUserName={searchUserName} />
            {!fetchError &&  newButton===2 ? (
              <>
                <DataTable heights={heights} colorValue={colorValue} headers={CompanyMasterColumn}
                
                  comments={company_items} setComments={setCompanyItems}
                  searches={company_search} setSearches={setCompanySearch} foreValue={foreValue}
                  totalItems={totalItems} setTotalItems={setTotalItems}
                  currentPage={currentPage} setCurrentPage={setCurrentPage}
                  sorting={sorting} setSorting={setSorting} ITEM_PER_PAGE={ITEM_PER_PAGE}
                  EditData={CompanyMasterCheck}
                  commentsData={commentsData} />
              </>
            ) : <p style={{ marginTop: "1rem", color: "var(--bs-danger)" }} >{fetchError}</p>}
          </div>
            </div>
           ) : <SocialMissing colorValue={colorValue} fetchError={fetchError}></SocialMissing>}    
        </div>
        </div>
}
      </div>
          
    </>
  )
}

export default CompanyMaster
//https://www.google.com/search?q=dbcontext+update+in+web+api+c%23&oq=&gs_lcrp=EgZjaHJvbWUqCQgAEEUYOxjCAzIJCAAQRRg7GMIDMgkIARBFGDsYwgMyCQgCEEUYOxjCAzIJCAMQRRg7GMIDMgkIBBBFGDsYwgMyCQgFEEUYOxjCAzIJCAYQRRg7GMIDMgkIBxBFGDsYwgPSAQ0xNzcxMzcwOTJqMGo3qAIIsAIB&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:703d5d2c,vid:QM91e2wIPWg,st:0