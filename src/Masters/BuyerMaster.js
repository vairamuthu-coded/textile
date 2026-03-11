import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import CreateUserContext from '../context/CreateUserContext';
import DataTable from '../Custom/DataTable';
import axios from 'axios';
import SocialMissing from '../Social/SocialMissing';
import { el } from 'date-fns/locale';
import { RiChatSettingsFill } from 'react-icons/ri';
import Search from '../Custom/Search';
import toast from 'react-hot-toast';

const BuyerMaster = ({ title, subTitle,  }) => {
    const {
        newButton, setNewButton,  tabindex, API_URL,
        handleSubmit,  currentPage, setCurrentPage,
        sorting, setSorting, ITEM_PER_PAGE,  stateItems, setStateItems,foreValue,
        countryItems, setCountryItems, searchLable1, searchLable2, searchLable3,userRights,setUserRights,
        setSearchLable1, setSearchLable2, setSearchLable3, color1,colorValue,defaultDetails,buyerValues,setBuyerValues
    } = useContext(CreateUserContext)
    const insert = `${API_URL}/BuyerMaster/BuyerMaster_Insert`;
    const update = `${API_URL}/BuyerMaster/BuyerMasterUpdate`;
    const insert_update1 = `${API_URL}/BuyerMaster/BuyerMaster_Insert_Update1`;
    const deleteData = `${API_URL}/BuyerMaster/BuyerMaster_Delete`;
    const StateParam = `${API_URL}/CityMaster/GridLoad`;
    const BuyerMasterParam = `${API_URL}/BuyerMaster/BuyerMaster`;
    const CountryParam = `${API_URL}/StateMaster/GridLoad`;
    const compcodeparam = `${API_URL}/CompanyMaster/CompanyMaster`;
       const userrightsMenuCheck = `${API_URL}/UserRights/userrightsMenuCheck`;
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

const showPreview = (e) => {
  const file = e.target.files?.[0];
  if (!file) {
    setImage({
      ...images,
      imageFile: null,
      imagesrc: defaultimage
    });
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => {
    setImage(prev => ({
      ...prev,
      imageFile: file,
      imagesrc: reader.result
    }));
  };

  reader.readAsDataURL(file);
};


    const [cityItems, setCityItems] = useState([])
    const [buyeractive, setCompanyActive] = useState(false)
    const [buyersearch, setBuyerSearch] = useState([])
    const [buyerfilterSearch, setCompanyFilterSearch] = useState([]);
    const [buyeritems, setBuyerItems] = useState([])


const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  const newValue = type === "checkbox" ? checked : value;
  setBuyerValues(prev => ({
    ...prev,
    [name]: newValue
  }));

  if (name === "city") {
    handleStateChange(value);
  }

  if (name === "state") {
    handleCountryChange(value);
  }
};


const handleStateChange = async (id) => {

  if (!id) return;

  try {
    const res = await axios.get(`${StateParam}/${id}`);

    setStateItems(res.data);

    const stateId = res.data?.[0]?.gtstatemastid;

    if (stateId) {
      handleCountryChange(stateId);
    }

  } catch (error) {
    toast.error(error);
    setFetchError(error);
  }

};

const handleCountryChange = async (id) => {
  if (!id) return;
  try {
    const { data } = await axios.get(`${CountryParam}/${id}`);
    setCountryItems(data || []);
  } catch (error) {
    const message =
      error?.response?.data || error?.message ||  "Country API failed";
    toast.error(message);
    setFetchError(message);

  }

};


const validate = (values) => {

  const regex = /^[a-zA-Z0-9\s]+$/;

  const fields = [
    { key: "compcode", label: "Company Code" },
    { key: "compname", label: "Company Name" },
    { key: "city", label: "City Name" },
    { key: "state", label: "State Name" },
    { key: "country", label: "Country Name" }
  ];

  for (const field of fields) {
    if (!regex.test(values[field.key] || "")) {
      toast.error(`Special characters not allowed in ${field.label}`);
      return false;
    }
  }

  return true;
};
  

useEffect(() => {

  const fetchData = async () => {
    try {
      const [userRightsRes,buyerRes, stateRes, compRes] = await Promise.all([
        axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`),
        axios.get(BuyerMasterParam),
        axios.get(StateParam),
        axios.get(compcodeparam)
      ]);
      setUserRights(userRightsRes.data);
      setBuyerItems(buyerRes.data);
      setCityItems(stateRes.data);
      setCompCodeData(compRes.data);

    } catch (error) {    
      totalItems.error(error.message);
    }
  };

  fetchData();

}, []);

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

const BuyerMasterCheck = async (row) => {
  try {

    const res = await axios.get(`${BuyerMasterParam}/${row.asptblbuymasid}`);
    const data = res.data?.[0];
    if (!data || data.asptblbuymasid === 0) {
      alert("Invalid Data");
      return;
    }

    const activeValue = data.active === "T";
    setBuyerActive(activeValue);
    setBuyerValues({
      asptblbuymasid: data.asptblbuymasid,
      asptblbuymasid1: data.asptblbuymasid1,
      buyingagent: data.buyingagent,
      compcode: data.gtcompmastid,
      compname: data.gtcompmastid,
      buyercode: data.buyercode,
      buyername: data.buyername,
      city: data.gtcitymastid,
      state: data.gtstatemastid,
      country: data.gtcountrymastid,
      address: data.address,
      phoneno: data.phoneno,
      pincode: data.pincode,
      website: data.website,
      email: data.email,
      contactname: data.contactname,
      active: activeValue
    });

    handleStateChange(data.gtcitymastid);

  } catch (error) {

    
    toast.error(error?.message || "Failed to load Buyer");

  }

};


    const BuyerMaster_Save = async() => {
        try {
            const isValid = validate(buyerValues);
            if (!isValid) return;
            const buyerData = {
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
                active: buyer_active ? "T" : "F"
            };
            const response = await axios.post(insert, buyerData);
            if (response.data) {
                BuyerMaster_New();                
                toast.success(response.data);
            } else {
                toast.error("Error saving data");
            }
        } catch (error) {  toast.error(error?.message || "Save failed");}
    }

const BuyerMaster_Delete = async (id) => {

  if (!id) {
    toast.error("Empty Not Allowed");
    return;
  }

  try {
    const response = await axios.delete(`${deleteData}/${id}`);
    if (response.data === "true") {
      BuyerMaster_New();
      toast.success("Record Deleted Successfully");
    } else {
      toast.error("Delete failed");
    }

  } catch (error) {
    toast.error(error?.message || "Delete failed");
  }

};


    const BuyerMaster_New = async () => {
        try{
         setStateItems([]); setCountryItems([])
         setBuyerValues([]);
         setNewButton(1);
         setBuyerActive(false);      
        const res = await axios.get(BuyerMasterParam);
        setBuyerItems(res.data);
    } catch (error) {
    toast.error("Buyer API service not running");
  }
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

const menuButtons = [
  { key: "news", label: "News", action: BuyerMaster_New },
  { key: "saves", label: "Save", action: BuyerMaster_Save },
  { key: "deletes", label: "Delete", action: BuyerMaster_Delete },
  { key: "searches", label: "Search", action: BuyerMaster_New },
  { key: "prints", label: "Prints", action: BuyerMaster_New },
  { key: "treebutton", label: "TreeButton", action: BuyerMaster_New },
  { key: "globalsearch", label: "Globalsearch", action: BuyerMaster_New },
  { key: "login", label: "Login", action: BuyerMaster_New },
  { key: "changepassword", label: "Changepassword", action: BuyerMaster_New },
  { key: "changeskin", label: "Changeskin", action: BuyerMaster_New },
  { key: "contact", label: "Contact", action: BuyerMaster_New },
  { key: "pdf", label: "Pdf", action: BuyerMaster_New },
  { key: "import", label: "Import", action: BuyerMaster_New },
  { key: "download", label: "Download", action: BuyerMaster_New }
];



    return (
        <>
           
                {userRights?.length > 0  ? (
                
                    <div className='container-fluid animate-zoom p-1'  >
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
                        <div className='row' >
                                 
                        <div className='col-md-6 float-start' >
                           <ul className='' style={{backgroundColor:`${colorValue}`}}>
                               <li className='ps-2'> <button className={newButton === 1  ? "tabs active-tabs btn" : "tabs"}  style={{ backgroundColor:`${colorValue}`, padding:'1%',fontWeight:'bold'}}>{title}  </button></li>
                            </ul>
                      
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
                        
                     </div>
               
                    <div className='col-md-6 float-end'  >             
                    <div className='content-tabs' >
                    <div className={newButton === 1 ? "content active-content" : "content"}>
        <Search colorValue={colorValue} searchs={buyersearch} setsearchs={setBuyerSearch}
              SearchLable1={searchLable1} SearchLable2={searchLable2}
              SearchLable3={searchLable3}  stylecolor={foreValue}
              handleChange={handleChange} ChangeValues={buyerValues}
              searchCompCode={searchCompCode} searchUserName={searchUserName} />
                                
                                {!fetchError && newButton === 1 ? (
                                    <>
                                        <DataTable heights={heights} colorValue={foreValue} headers={BuyerMasterColumn}

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
                
            </div>
       </div>  </div>
                ): <SocialMissing colorValue={colorValue} fetchError={fetchError}></SocialMissing>}    
        </>
    )
}


export default BuyerMaster
