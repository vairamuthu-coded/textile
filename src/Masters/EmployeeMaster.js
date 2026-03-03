import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import CreateUserContext from '../context/CreateUserContext';
import DataTable from '../Custom/DataTable';
import axios from 'axios';
import SocialMissing from '../Social/SocialMissing';
import { el } from 'date-fns/locale';
import { RiChatSettingsFill } from 'react-icons/ri';

const EmployeeMaster = ({ title, subTitle, colorValue }) => {
  const {
    newButton, setNewButton, inputref, tabindex, API_URL,
    handleSubmit, totalItems, setTotalItems, currentPage, setCurrentPage,
    sorting, setSorting, ITEM_PER_PAGE, companyValues, setCompanyValues, stateItems, setStateItems,
    countryItems, setCountryItems,
  } = useContext(CreateUserContext)
  const insert = "/CompanyMaster/CompanyMaster_Insert";
  const update = "/CompanyMaster/CompanyMasterUpdate";
  const insert_update1 = "/CompanyMaster/CompanyMaster_Insert_Update1";
  const deleteData = "/CompanyMaster/CompanyMaster_Delete";
  const CityParam = "/CityMaster/CityMaster";
  const StateParam = "/CityMaster/CityMaster_Data";
  const CompanyMasterParam = "/CompanyMaster/CompanyMaster";
  const CountryParam = "/StateMaster/StateMaster_Find_Country";
  const DeviceParam = "/CompanyMaster/DeviceConnect";
  const [fetchError, setFetchError] = useState(null)

  let defaultimage = '../Images/Anugraha_logo.jpg';

  var imagesrc = '', imageFile = '';
  const [images, setImage] = useState(imagesrc);

  // function handleImageUpload(e){
  //   e.preventDefault();
  //     inputref.current.click();
  //   }
  // const uploadImageDisplay= async ()=>{
  //   try{
  //     const uploadfile=inputref.current.files[0];
  //   const cachedUrl=URL.createObjectURL(uploadfile);
  //   setImage(cachedUrl); 
  //   companyValues.images=images;
  //   alert(cachedUrl)
  //   // const uploadfile=inputref.current.files[0];
  //   // const formdata=new  FormData();
  //   // formdata.append("file",uploadfile);
  //   // const response= await fetch("https://api.escuelajs.co/api/v1/files/upload",{
  //   //   method:"post",
  //   //   body:formdata
  //   // });
  //   //       if (response.status===201 ) {
  //   //       const data= await response.json();     
  //   //       setImage(data?.location);
  //   //       companyValues.images=data.originalname;
  //   //       }



  //   }
  //   catch(err){
  //     console.error(err);
  //     setImage(defaultImage)

  //   }
  //   finally{

  //   }
  // }

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

  const [cityItems, setCityItems] = useState([])
  const [company_active, setCompanyActive] = useState(false)
  const [company_search, setCompanySearch] = useState([])
  const [company_filterSearch, setCompanyFilterSearch] = useState([]);
  const [company_items, setCompanyItems] = useState([])
  const [company_logo, setCompanyLogo] = useState('')


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyValues((previousValue) => {
      return {
        ...previousValue, [name]: value,
      }
    })

    if (name === "city") { handleStateChange(e.target.value); }
    if (name === "state") { handleCountryChange(companyValues.state); }
  };

  const handleStateChange = (id) => {
    if (id === undefined) { } else {
      companyValues.city = id;
      try {
        axios.get(`${API_URL}${StateParam}/${id}`).then((res) => {
          setStateItems(res.data.reverse());
          companyValues.state = res.data[0].gtstatemastid;
          handleCountryChange(companyValues.state);
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

    if (id === undefined) { } else {
      // companyValues.state=id;
      try {
        axios.get(`${API_URL}${CountryParam}/${id}`).then((res) => {
          setCountryItems(res.data.reverse());
        }).catch((error) => {
          // setFetchError("Service does't running. pls check (Country Master) ");
        });
      }
      catch (e) {
      }
      finally {

      }
    }
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

    axios.get(`${API_URL}${CityParam}`).then((res) => { setCityItems(res.data); }).catch((error) => { alert(error); });
    setNewButton(1);
  }, [])

  const CompanyMaster_Search = () => {
    axios.get(`${API_URL}${CompanyMasterParam}`).then((ress) => { setCompanyItems(ress.data.reverse()); }).catch((error) => { alert(error); });
    setNewButton(2);

  }


  useEffect(() => {
    const filterResult = company_items.filter((item) => ((item.compcode).includes(company_search)))
    setCompanyFilterSearch(filterResult.reverse());
  }, [company_items, company_search]);

  const CompanyMaster_Exit = () => {

  }




  const heights = "380px";
  const CompanyMasterColumn =
    [
      { headername: "id", field: "gtcompmastid" },
      { headername: "compcode", field: "compcode" },
      { headername: "compname", field: "compname" },
      { headername: "CityName", field: "cityname" },
      { headername: "StateName", field: "statename" },
      { headername: "CountryName", field: "countryname" },
      { headername: "Active", field: "active" }
    ]


  const CompanyMasterCheck = (id) => {
    try {
      axios.get(`${API_URL}${CompanyMasterParam}/${id.gtcompmastid}`)
        .then((res) => {
          if (res.data[0].gtstatemastid === 0) { alert("Invalid Data") } else {
            const updatepost = { active: res.data[0].active === "T" ? true : false };

            setImage({
              ...images,
              imageFile,
              imagesrc: res.data[0].companylogoo,
            })
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
            setCompanyActive(updatepost.active);
            if (cityItems != null) { handleStateChange(res.data[0].gtcitymastid); }
            if (stateItems != null) { handleCountryChange(res.data[0].gtstatemastid); }
          }
        }).catch((error) => { alert("--" + error) });

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
          displayname: companyValues.displayname,
          images: images.imagesrc,
          filenames: images.imageFile,
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
          active: company_active === true ? "T" : "F"
        };
        await axios.post(`${API_URL}${insert}`, CountryData)
          .then((respose) => {
            if (respose.data === true) {
              axios.get(`${API_URL}${CompanyMasterParam}`)
                .then((res) => { setCompanyItems(res.data.reverse()); }).catch((error) => { alert("Service does't running. pls check City Master) API in Country Controller") });

              alert(respose.data);
            }
            else {
              alert("Error " + respose.data);
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
    setCompanyActive(false);


  }

  const CompanyMaster_New = () => {
    setStateItems([]); setCountryItems([])
    setCompanyValues([]);
    setNewButton(1);
    setImage('');
    CompanyMasterClear();
  }




  const commentsData = useMemo(() => {
    let computedComments = company_items;
    if (company_search) {
      computedComments = computedComments.filter((item) => ((item.compcode).includes(company_search))
      )
    }
    setTotalItems(computedComments.length);
    //sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort((a, b) =>
        reversed * a[sorting.field].localeCompare(b[sorting.field]))
    }
    return computedComments.slice(
      (currentPage - 1) * ITEM_PER_PAGE,
      (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [company_items, currentPage, company_search, sorting])





  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='container-fluid animate-zoom' >

          <div className='row' style={{ backgroundColor: "white" }}>
            <div className='col-md-12' style={{ textAlign: "right" }}>
              <ul >
                <li> <button type='submit' onClick={() => CompanyMaster_New()} style={{ color: `${colorValue}` }}>News</button></li>
                <li> <button type='submit' onClick={() => CompanyMaster_Save()} style={{ color: `${colorValue}` }}>Save</button></li>
                <li> <button type='submit' onClick={() => CompanyMaster_Delete(companyValues.color)} style={{ color: `${colorValue}` }}>Delete</button></li>
                <li> <button type='submit' onClick={() => CompanyMaster_Search()} style={{ color: `${colorValue}` }}> Search </button></li>
                <li> <button type='submit' onClick={() => CompanyMaster_Exit()} style={{ color: `${colorValue}` }}> Exit </button></li>

              </ul>
            </div>


            <div className='bloc-tabs'>
              <div className={newButton === 1 ? "tabs active-tabs" : "tabs"} onClick={() => setNewButton(1)} style={{ color: `${colorValue}` }}> {title} </div>
              <div className={newButton === 2 ? "tabs active-tabs" : "tabs"} onClick={() => CompanyMaster_Search()} style={{ color: `${colorValue}` }} > {subTitle} </div>
            </div>
            {!fetchError && company_items !== null ? (
              <div className='content-tabs' >
                <div className={newButton === 1 ? "content active-content" : "content"} style={{ backgroundColor: "var(--bs-background)" }}>

                  <div className='row'  >
                    <div className='col-md-10 py-1'>

                      <div className='row'  >

                        <label className='col-md-1' >ID</label>
                        <input className='col-md-1' type='text' name='id' value={companyValues.gtcompmastid || ""} onChange={handleChange} />
                        <label className='col-md-1' >ComCode</label>
                        <select className='col-md-1' name='compcode' value={companyValues.compcode || ""} onChange={handleChange} ><option></option></select>
                        <label className='col-md-1' >CompName</label>
                        <select className='col-md-6 ' name='compname' value={companyValues.compname || ""} onChange={handleChange}  ><option></option></select>
                      </div>

                      <div className='row' style={{ padding: "3px" }} >
                        <label className='col-md-1' >EmpName</label>
                        <input className='col-md-5' type='text' name='employeename' value={companyValues.employeename || ""} onChange={handleChange} />

                        <label className='col-md-1' >LastName</label>
                        <input className='col-md-4' type='text' name='lastname' value={companyValues.lastname || ""} onChange={handleChange} />
                      </div>

                      <div className='row' >
                        <label className='col-md-1' > Address </label>
                        <textarea className='col-md-10' rows="4" type='text' name='address'
                          value={companyValues.address || ""} onChange={handleChange}     >    </textarea>

                      </div>
                      <div className='row py-1' >
                        <label className='col-md-1'> Gender </label>
                        <label className='col-md-1'> Male </label>
                        <label className='col-md-1  checkbox' style={{ marginRight: "32px", padding: "0px", width: "60px" }}>
                          <input type="checkbox" name="male" checked={company_active} onChange={(e) => setCompanyActive(e.target.checked)} />
                          <span></span>
                          <i className='indicator'></i>
                        </label>
                        <label className='col-md-1'> FeMale </label>
                        <label className='col-md-1 checkbox ' style={{ padding: "0px", width: "60px" }}>
                          <input type="checkbox" name="female" checked={company_active} onChange={(e) => setCompanyActive(e.target.checked)} />
                          <span></span>
                          <i className='indicator'></i>
                        </label>
                        <label className='col-md-2 col-sm-1' style={{ width: "215px" }} > DateofBirth </label>
                        <input className='col-md-2' type='date' name='dateofbirth' value={companyValues.dateofbirth || ""} onChange={handleChange} />

                      </div>
                      <div className='row'  >

                        <label className='col-md-1' > City </label>

                        <select className='col-sm-2' name='city' value={companyValues.city || ""} onChange={handleChange}  >
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
                            stateItems !== null && stateItems.map((result, index) => (
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
                      <div className='row py-1'  >

                        <label className='col-md-1' > Department </label>
                        <select className='col-sm-2' name='department' value={companyValues.department || ""} onChange={handleChange}  >
                          <option></option>
                          {
                            cityItems !== null &&
                            cityItems.map((result, index) => (
                              <option key={index} value={result.gtcitymastid}>
                                {result.cityname}
                              </option>))
                          }
                        </select>
                        <label className='col-md-1 ' > DateofJoin </label>
                        <input className='col-md-2' type='text' name='dateofjoin' value={companyValues.dateofjoin || ""} onChange={handleChange} />
                        <label className='col-md-1' > IdCardNo </label>
                        <input className='col-md-2' type='text' name='idcardno' value={companyValues.idcardno || ""} onChange={handleChange} />
                        <label className='col-md-1' > BloodGroup </label>
                        <select className='col-sm-2' name='bloodgroup' value={companyValues.bloodgroup || ""} onChange={handleChange}  >
                          <option></option>
                          {
                            cityItems !== null &&
                            cityItems.map((result, index) => (
                              <option key={index} value={result.gtcitymastid}>
                                {result.cityname}
                              </option>))
                          }
                        </select>
                      </div>
                      <div className='row'>
                        <label className='col-md-1' > Contact </label>
                        <input className='col-md-2' type='text' name='contactno' value={companyValues.contactno || ""} onChange={handleChange} />
                        <label className='col-md-1' > Category </label>
                        <select className='col-sm-2' name='category' value={companyValues.category || ""} onChange={handleChange}  >
                          <option></option>
                          {
                            cityItems !== null &&
                            cityItems.map((result, index) => (
                              <option key={index} value={result.gtcitymastid}>
                                {result.cityname}
                              </option>))
                          }
                        </select>

                        <label className='col-md-1' > Designation </label>
                        <select className='col-sm-2' name='designation' value={companyValues.designation || ""} onChange={handleChange}  >
                          <option></option>
                          {
                            cityItems !== null &&
                            cityItems.map((result, index) => (
                              <option key={index} value={result.gtcitymastid}>
                                {result.cityname}
                              </option>))
                          }
                        </select>
                        <label className='col-md-1' > Grade </label>
                        <select className='col-sm-2' name='grade' value={companyValues.grade || ""} onChange={handleChange}  >
                          <option></option>
                          {
                            cityItems !== null &&
                            cityItems.map((result, index) => (
                              <option key={index} value={result.gtcitymastid}>
                                {result.cityname}
                              </option>))
                          }
                        </select>

                      </div>
                      <div className='row py-1'>
                        <label className='col-md-1' >Salary</label>
                        <input className='col-md-1' type='text' name='salary' value={companyValues.salary || ""} onChange={handleChange} />

                      </div>


                    </div>

                    <div className='col-md-2'  >
                      <div style={{ padding: "10px", border: "1px solid var(--bs-light)" }} >
                        <img src={images.imagesrc} style={{ height: "150px", width: "150px" }} />
                        <input type='file' id='imageuploader' onChange={showPreview} accept='image/'
                          className="form-control">
                        </input>
                      </div>
                    </div>

                  </div>

                </div>


                <div className={newButton === 2 ? "content active-content" : "content"}>

                  {!fetchError && newButton === 2 ? (
                    <>
                      <DataTable heights={heights} colorValue={colorValue} headers={CompanyMasterColumn}
                        comments={company_items} setComments={setCompanyItems}
                        searches={company_search} setSearches={setCompanySearch}
                        totalItems={totalItems} setTotalItems={setTotalItems}
                        currentPage={currentPage} setCurrentPage={setCurrentPage}
                        sorting={sorting} setSorting={setSorting} ITEM_PER_PAGE={ITEM_PER_PAGE}
                        EditData={CompanyMasterCheck}
                        commentsData={commentsData} />
                    </>
                  ) : <p style={{ marginTop: "2rem", color: "var(--bs-danger)" }} >{fetchError}</p>}
                </div>
              </div>
            ) : <SocialMissing colorValue={colorValue} fetchError={fetchError}></SocialMissing>}
          </div>
        </div>

      </form>

    </>
  )
}

export default EmployeeMaster
//https://www.google.com/search?q=how+to+add+and+remove+table+rows+dynamically+in+react.js&sca_esv=4ae0cb76205a33f7&sca_upv=1&biw=1360&bih=641&tbm=vid&sxsrf=ADLYWIJ19KvtizOlrNHTUoAP6vSKDlIObw%3A1717653116661&ei=fE5hZv36J4nuseMPm5y6wAQ&oq=table+rows+add+in+react+js&gs_lp=Eg1nd3Mtd2l6LXZpZGVvIhp0YWJsZSByb3dzIGFkZCBpbiByZWFjdCBqcyoCCAEyBBAjGCcyBhAAGAgYHjILEAAYgAQYhgMYigUyCBAAGIAEGKIEMggQABiABBiiBDIIEAAYgAQYogRIyp4HUABYAHAAeACQAQCYAbMBoAGzAaoBAzAuMbgBAcgBAJgCAaACxQGYAwCIBgGSBwMwLjGgB6wG&sclient=gws-wiz-video#fpstate=ive&vld=cid:2dd36a65,vid:aI09baZcb3Q,st:0