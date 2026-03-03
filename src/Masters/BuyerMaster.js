import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import CreateUserContext from '../context/CreateUserContext';
import DataTable from '../Custom/DataTable';
import axios from 'axios';
import SocialMissing from '../Social/SocialMissing';
import { el } from 'date-fns/locale';
import { RiChatSettingsFill } from 'react-icons/ri';
import Search from '../Custom/Search';

const BuyerMaster = ({ title, subTitle,  }) => {
    const {
        newButton, setNewButton,  tabindex, API_URL,
        handleSubmit,  currentPage, setCurrentPage,
        sorting, setSorting, ITEM_PER_PAGE,  stateItems, setStateItems,
        countryItems, setCountryItems, searchLable1, searchLable2, searchLable3,
        setSearchLable1, setSearchLable2, setSearchLable3, color1,colorValue,defaultDetails,buyerValues,setBuyerValues
    } = useContext(CreateUserContext)
    const insert = "/BuyerMaster/BuyerMaster_Insert";
    const update = "/BuyerMaster/BuyerMasterUpdate";
    const insert_update1 = "/BuyerMaster/BuyerMaster_Insert_Update1";
    const deleteData = "/BuyerMaster/BuyerMaster_Delete";

    const StateParam = "/CityMaster/GridLoad";
    const BuyerMasterParam = "/BuyerMaster/BuyerMaster";
    const CountryParam = "/StateMaster/GridLoad";
    const compcodeparam = API_URL + "/CompanyMaster/CompanyMaster";
    const [fetchError, setFetchError] = useState(null)
    const [compcodeData, setCompCodeData] = useState([])
    setNewButton(1)
    setSearchLable1("Search"); setSearchLable2(""); setSearchLable3("")
    let defaultimage = '../Images/Anugraha_logo.jpg';
    const [searchCompCode, setSearchCompCode] = useState([])
    const [searchUserName, setSearchUserName] = useState([])
    const [buyer_active, setBuyerActive] = useState(false)
    var imagesrc = '', imageFile = '';
    const [images, setImage] = useState(imagesrc);
  const [totalItems,setTotalItems]=useState([]);

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
    const [buyeractive, setCompanyActive] = useState(false)
    const [buyersearch, setBuyerSearch] = useState([])
    const [buyerfilterSearch, setCompanyFilterSearch] = useState([]);
    const [buyeritems, setBuyerItems] = useState([])



    const handleChange = (e) => {
        const { name, value } = e.target;
        setBuyerValues((previousValue) => {
            return {
                ...previousValue, [name]: value,
            }
        })

        if (name === "city") { handleStateChange(e.target.value); }
        if (name === "state") { handleCountryChange(buyerValues.state); }
    };

    const handleStateChange =(id) => {
   
        if (id === undefined) { } else {
       
            try {
               axios.get(`${API_URL}${StateParam}/${id}`).then((res) => {
                    setStateItems(res.data);      
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

    const handleCountryChange =  (id) => {

        if (id === undefined) { } else {
           
            try {
               axios.get(`${API_URL}${CountryParam}/${id}`).then((res) => {
                    setCountryItems(res.data);

                }).catch((error) => {
               
                });
            }
            catch (e) {
            }
            finally {

            }
        }
    }


    let validcheck = true;
    const validate = (buyerValues) => {
        if (/^[a-zA-Z]$/.test(buyerValues.compcode)) {
            alert("Special Charector not allowed");
            validcheck = false;
            return;
        }
        if (/^[a-zA-Z]$/.test(buyerValues.compname)) {
            alert("Special Charector not allowed");
            validcheck = false;
            return;
        }
        if (/^[a-zA-Z]$/.test(buyerValues.contactname)) {
            alert("Special Charector not allowed");
            validcheck = false;
            return;
        }
        return validcheck;
    }
  

    useEffect(() => {
        axios.get(`${API_URL}${BuyerMasterParam}`).then((ress) => { setBuyerItems(ress.data);
            axios.get(`${API_URL}${StateParam}`).then((res) => { setCityItems(res.data);
                axios.get(`${compcodeparam}`).then((res2) => {
                    setCompCodeData(res2.data);}).catch((error) => { alert(error); });
            }).catch((error) => { alert(error); });

         }).catch((error) => { alert(error); });
        
 
       
    }, [])

    const BuyerMaster_Search = () => {
       

    }

    const inputref = useRef();


    useEffect(() => {
        const filterResult = buyeritems.filter((item) => ((item.buyercode).includes(buyersearch)))
        setCompanyFilterSearch(filterResult.reverse());
    }, [buyeritems, buyersearch]);

    const BuyerMaster_Exit = () => {

    }




    const heights = "380px";
    const BuyerMasterColumn =
        [
            { headername: "", field: "none" },
            { headername: "id", field: "asptblbuymasid" },
            { headername: "Code", field: "buyercode" },
            { headername: "Buyer", field: "buyername" },
            { headername: "Agent", field: "buyingagent" },           
            { headername: "City", field: "cityname" },
            { headername: "Active", field: "active" }
        ]


    const BuyerMasterCheck = (id) => {
        try {
            
        
            axios.get(`${API_URL}${BuyerMasterParam}/${id.asptblbuymasid}`)
                .then((res) => {                   
                    if (res.data[0].asptblbuymasid === 0) { alert("Invalid Data") } else {
                    
                        const updatepost = { active: res.data[0].active === "T" ? true : false };                       
                        setBuyerActive(updatepost.active);
                        setBuyerValues({
                            asptblbuymasid: res.data[0].asptblbuymasid,
                            asptblbuymasid1: res.data[0].asptblbuymasid1,
                            buyingagent: res.data[0].buyingagent,
                            compcode: res.data[0].gtcompmastid,
                            compname: res.data[0].gtcompmastid,
                            buyercode: res.data[0].buyercode,
                            buyername: res.data[0].buyername,
                            city: res.data[0].gtcitymastid,
                            state: res.data[0].gtstatemastid,
                            country: res.data[0].gtcountrymastid,
                            address: res.data[0].address,
                            phoneno: res.data[0].phoneno,
                            pincode: res.data[0].pincode,                          
                            website: res.data[0].website,
                            email: res.data[0].email,  
                            contactname: res.data[0].contactname,
                            active: res.data[0].active === "T" ? true : false
                        });
                        
                         handleStateChange(res.data[0].gtcitymastid); 
                  
                    }
                }).catch((error) => { alert("--" + error) });

        }
        catch (err) {
            if (err.response) {
                alert(`Error ${err.message}`);
            }
        }
        finally {
           
        }
    }

    const BuyerMaster_Insert = async () => {
        try {
            validate(buyerValues);
            if (validcheck === true) {
                const CountryData = {
                    asptblbuymasid: buyerValues.asptblbuymasid > 0 ? buyerValues.asptblbuymasid : 0, 
                    asptblbuymasid1: buyerValues.asptblbuymasid1 > 0 ? buyerValues.asptblbuymasid1 : 0,   
                    compcode: buyerValues.compcode,
                    compname: buyerValues.compname,
                    buyercode: buyerValues.buyercode,
                    buyername: buyerValues.buyername,
                    buyingagent: buyerValues.buyingagent,
                    city: buyerValues.city,
                    state: buyerValues.state,
                    country: buyerValues.country,
                    address: buyerValues.address,
                    phoneno: buyerValues.phoneno,
                    pincode: buyerValues.pincode,                          
                    website: buyerValues.website,
                    email: buyerValues.email,  
                    contactname: buyerValues.contactname,
                    active: buyer_active === true ? "T" : "F"
                };
               
                await axios.post(`${API_URL}${insert}`, CountryData)
                    .then((respose) => {
                        if (respose.data !== "") {
                            BuyerMaster_New();
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

    const BuyerMaster_Save = () => {

        BuyerMaster_Insert();

    }






    const BuyerMaster_Delete = async (id) => {
        try {
            if (buyerValues.asptblbuymasid == '') { alert(`Empty Not Allowed`); return; }
            await axios.delete(`${API_URL}${deleteData}/${id}`)
                .then((respose) => {
                    if (respose.data === 'true') {
          
                        BuyerMaster_New();
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


    const BuyerMaster_New = () => {
         setStateItems([]); setCountryItems([])
         setBuyerValues([]);
         setNewButton(1);
         setBuyerActive(false);      
        axios.get(`${API_URL}${BuyerMasterParam}`)
        .then((res) => { setBuyerItems(res.data); }).catch((error) => { alert("Service does't running. pls check City Master) API in Country Controller") });

    }




    const commentsData = useMemo(() => {
        let computedComments = buyeritems;
       
        if (buyersearch) {
            computedComments = computedComments.filter((item) => ((item.buyercode).includes(buyersearch))
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
    }, [buyeritems, currentPage, buyersearch, sorting])





    return (
        <>
            <form onSubmit={handleSubmit} className='animate__animated '>
                <div className='container-fluid animate-zoom' >

                    <div className='row' style={{ backgroundColor: "white" }}>
                        <div className='col-md-12' style={{ textAlign: "right" }}>
                            <ul style={{ backgroundColor: "white" }}>

                                <li> <button type='submit' onClick={() => BuyerMaster_New()} style={{ backgroundColor: `${color1[0]}` }}>News</button></li>
                                <li> <button type='submit' onClick={() => BuyerMaster_Save()} style={{ backgroundColor: `${color1[1]}` }}>Save</button></li>
                                <li> <button type='submit' onClick={(e) => BuyerMaster_Delete(buyerValues.asptblbuymasid)} style={{ backgroundColor: `${color1[2]}` }}>Delete</button></li>
                                <li> <button type='submit' onClick={() => BuyerMaster_Search()} style={{ backgroundColor: `${colorValue}` }}> Search </button></li>
                                <li> <button type='submit' onClick={() => BuyerMaster_Exit()} style={{ backgroundColor: `${colorValue}` }}> Exit </button></li>


                            </ul>
                        </div>

                        {!fetchError && buyeritems.length ? (
                            <>
                        <div className='col-md-6' style={{ backgroundColor: "var(--bs-white)", padding: "0" }}>
                        <div className='bloc-tabs'>
                            <div className={newButton === 1 ? "tabs active-tabs" : "tabs"} onClick={() => setNewButton(1)} style={{ color: `${colorValue}` }}> {title} </div>
                        </div>
                      
                        <div className='content-tabs' >
                        <div className="content active-content" >
                                <div className='row'  >
                                <div className='row'>
                                <label className='col-md-2' >ID</label>
                                <input className='col-md-2' type='text' name='asptblbuymasid'  value={buyerValues.asptblbuymasid || ""} onChange={handleChange}  />
                                <label className='col-md-2' >ID</label>
                                <input className='col-md-2' type='text' name='asptblbuymasid1'  value={buyerValues.asptblbuymasid1 || ""} onChange={handleChange}   />

                                            </div>
                                        <div className='row py-1'  >
                                            <label className='col-md-2' >ComCode</label>
                                            <select className='col-md-2' name='compcode' readOnly value={buyerValues.compcode || ""} onChange={handleChange}  >
                                            <option></option>
                                                {
                                                    compcodeData !== null &&
                                                    compcodeData.map((result, index) => (
                                                        <option key={index} value={result.gtcompmastid}>
                                                            {result.compcode}
                                                        </option>))
                                                }
                                            </select>
                                            <select className='col-md-8' name='compname' readOnly value={buyerValues.compcode || ""} onChange={handleChange}  >
                                            <option></option>
                                                {
                                                    compcodeData !== null &&
                                                    compcodeData.map((result, index) => (
                                                        <option key={index} value={result.gtcompmastid}>
                                                            {result.compname}
                                                        </option>))
                                                }
                                            </select>
                                        </div>
                                  
                                            <div className='row'  >
                                                <label className='col-md-2' >BuyerCode</label>
                                                <input className='col-md-2' type='text' name='buyercode' value={buyerValues.buyercode || ""} onChange={handleChange} 
                                                autoFocus  />
                                                <label className='col-md-3' >BuyerName</label>
                                                <input className='col-md-5 ' type='text' name='buyername' value={buyerValues.buyername || ""} onChange={handleChange} />
                                            </div>
                                     
                                        <div className='row py-1'  >
                                            <label className='col-md-2' >BuyAgent</label>
                                            <input className='col-md-5 ' type='text' name='buyingagent' value={buyerValues.buyingagent || ""} onChange={handleChange} />
                                            <label className='col-md-2' > City </label>

                                            <select className='col-sm-3' name='city' value={buyerValues.city || ""} onChange={handleChange}  >
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

                                        <div className='row'  >


                                            <label className='col-md-2' > State </label>

                                            <select className='col-md-5' name='state' value={buyerValues.state} onChange={handleChange}>
                                            
                                                {
                                                    stateItems !== null && stateItems.map((result, index) => (
                                                        <option key={index} value={result.gtstatemastid}>
                                                            {result.statename}
                                                        </option>))
                                                }
                                            </select>

                                            <label className='col-md-2' > Country </label>
                                            <select className='col-md-3' name='country' value={buyerValues.country} onChange={handleChange}>
                                            
                                                {
                                                    countryItems !== null &&
                                                    countryItems.map((result, index) => (
                                                        <option key={index} value={result.gtcountrymastid}>
                                                            {result.countryname}
                                                        </option>))
                                                }
                                            </select>



                                        </div>
                                        <div className='row py-1 ' >
                                            <label className='col-md-2' > Address </label>
                                            <textarea className='col-md-10' rows="4" type='text' name='address'
                                                value={buyerValues.address || ""} onChange={handleChange}     >    </textarea>

                                        </div>

                                        <div className='row py-1'>

                                            <label className='col-md-2' > Email </label>
                                            <input className='col-md-10' type='email' name="email" value={buyerValues.email || ""} onChange={handleChange} />
                                        </div>
                                        <div className='row'>
                                            <label className='col-md-2' > WebSite </label>
                                            <input className='col-md-10' type='text' name='website' value={buyerValues.website || ""} onChange={handleChange} />

                                        </div>
                                        <div className='row py-1'>

                                            <label className='col-md-2' > Phone</label>
                                            <input className='col-md-5' type='text' name='phoneno' value={buyerValues.phoneno || ""} onChange={handleChange} />
                                            <label className='col-md-2' > PinCode</label>
                                            <input className='col-md-3' type='text' name='pincode' value={buyerValues.pincode || ""} onChange={handleChange} />
                                        </div>
                                        <div className='row'>
                                        <label className='col-md-2' > Contact</label>
                                            <input className='col-md-10' type='text' name='contactname' value={buyerValues.contactname || ""} onChange={handleChange} />

                                            </div>
                                        <div className='row'>
                                            <label className='col-md-2'  > Active </label>
                                            <label className='checkbox' style={{ padding: "0px", width: "60px" }}>
                                                <input type="checkbox" name='active' checked={buyer_active} onChange={(e) => setBuyerActive(e.target.checked)} />
                                                <span></span>
                                                <i className='indicator'></i>
                                            </label>
                                        </div>
                                </div>

                            </div>


                          
                        </div>
                        {/* ) : <SocialMissing colorValue={colorValue} fetchError={fetchError}></SocialMissing>}    */}
                    </div>
               
                    <div className='col-md-6' style={{ backgroundColor: "var(--bs-light)", padding: "0" }}>

<div className="tabs active-tabs" style={{ color: `${colorValue}` }}> {subTitle} </div>
<div className='content-tabs' >
  <div className={newButton === 1 ? "content active-content" : "content"}>
       
                                <Search colorValue={colorValue} searchs={buyersearch} setsearchs={setBuyerSearch}
                                    SearchLable1={searchLable1} SearchLable2={searchLable2}
                                    SearchLable3={searchLable3}
                                    handleChange={handleChange} ChangeValues={buyerValues}
                                    searchCompCode={searchCompCode} searchUserName={searchUserName} />
                                {!fetchError && newButton === 1 ? (
                                    <>
                                        <DataTable heights={heights} colorValue={colorValue} headers={BuyerMasterColumn}

                                            comments={buyeritems} setComments={setBuyerItems}
                                            searches={buyersearch} setSearches={setBuyerSearch}
                                            totalItems={totalItems} setTotalItems={setTotalItems}
                                            currentPage={currentPage} setCurrentPage={setCurrentPage}
                                            sorting={sorting} setSorting={setSorting} ITEM_PER_PAGE={ITEM_PER_PAGE}
                                            EditData={BuyerMasterCheck}
                                            commentsData={commentsData} />
                                    </>
                                ) : <p style={{ marginTop: "2rem", color: "var(--bs-danger)" }} >{fetchError}</p>} 
                         
                         </div>
              </div>
           
            </div>
               
                </>
            ) : <SocialMissing colorValue={colorValue} fetchError={fetchError} ></SocialMissing> }
 </div>
                </div>
            </form>

        </>
    )
}


//https://www.google.com/search?q=dbcontext+update+in+web+api+c%23&oq=&gs_lcrp=EgZjaHJvbWUqCQgAEEUYOxjCAzIJCAAQRRg7GMIDMgkIARBFGDsYwgMyCQgCEEUYOxjCAzIJCAMQRRg7GMIDMgkIBBBFGDsYwgMyCQgFEEUYOxjCAzIJCAYQRRg7GMIDMgkIBxBFGDsYwgPSAQ0xNzcxMzcwOTJqMGo3qAIIsAIB&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:703d5d2c,vid:QM91e2wIPWg,st:0
export default BuyerMaster
