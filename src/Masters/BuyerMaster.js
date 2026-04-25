import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import CreateUserContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import SocialMissing from "../Social/SocialMissing";
import { el } from "date-fns/locale";
import { RiChatSettingsFill } from "react-icons/ri";
import Search from "../Custom/Search";
import { toast } from "react-toastify";

const BuyerMaster = ({ title, subTitle }) => {
  const {
    newButton,
    setNewButton,
    tabindex,
    API_URL,
    handleSubmit,
    currentPage,
    setCurrentPage,
    sorting,
    setSorting,
    ITEM_PER_PAGE,
    stateItems,
    setStateItems,
    foreValue,
    countryItems,
    setCountryItems,
    searchLable1,
    searchLable2,
    searchLable3,
    userRights,
    setUserRights,
    setSearchLable1,
    setSearchLable2,
    setSearchLable3,
    color1,
    colorValue,
    defaultDetails,
    buyerValues,
    setBuyerValues,
  } = useContext(CreateUserContext);
  const insert = `${API_URL}/BuyerMasters`;
  const StateParam = `${API_URL}/CityMaster/StateMaster`;
  const CountryParam = `${API_URL}/CityMaster/CountryMaster`;
  const CityParam = `${API_URL}/CityMaster/CityMaster`;
  const compcodeparam = `${API_URL}/CompanyMaster/CompanyMaster`;
  const userrightsMenuCheck = `${API_URL}/UserRights/userrightsMenuCheck`;
  const [fetchError, setFetchError] = useState(null);
  const [compcodeData, setCompCodeData] = useState([]);
  setNewButton(1);
  setSearchLable1("Search");
  setSearchLable2("");
  setSearchLable3("");
  let defaultimage = "../Images/Anugraha_logo.jpg";
  const [searchCompCode, setSearchCompCode] = useState([]);
  const [searchUserName, setSearchUserName] = useState([]);
  const [buyer_active, setBuyerActive] = useState(false);
  var imagesrc = "",
    imageFile = "";
  const [images, setImage] = useState(imagesrc);
  const [totalItems, setTotalItems] = useState([]);

  const showPreview = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImage({
        ...images,
        imageFile: null,
        imagesrc: defaultimage,
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage((prev) => ({
        ...prev,
        imageFile: file,
        imagesrc: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const [cityItems, setCityItems] = useState([]);
  const [buyeractive, setCompanyActive] = useState(false);
  const [buyersearch, setBuyerSearch] = useState([]);
  const [buyerfilterSearch, setCompanyFilterSearch] = useState([]);
  const [buyeritems, setBuyerItems] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setBuyerValues((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (name === "City") {
      setStateItems([]);
      setCountryItems([]);

      handleStateChange(value);
    }

    if (name === "State") {
      setCountryItems([]);
      handleCountryChange(value);
    }
  };

  const handleStateChange = async (id) => {
    if (!id) return;

    try {
      const res = await axios.get(`${StateParam}/${id}`);

      const states = res?.data || [];
      setStateItems(states);

      // Optional auto-select first state
      if (states.length > 0) {
        const stateId = states[0].gtstatemastid;

        setBuyerValues((prev) => ({
          ...prev,
          State: stateId,
        }));

        await handleCountryChange(stateId);
      }
    } catch (error) {
      const message = error?.response?.data || error?.message || "State API failed";

      toast.error(message);
      setFetchError(message);
    }
  };

  const handleCountryChange = async (id) => {
    if (!id) return;

    try {
      const res = await axios.get(`${CountryParam}/${id}`);

      const countrys = res?.data || [];
      setCountryItems(countrys);
      if (countrys.length > 0) {
        const countryId = countrys[0].gtcountrymastid;
        setBuyerValues((prev) => ({
          ...prev,
          Country: countryId,
        }));
      }
    } catch (error) {
      const message = error?.response?.data || error?.message || "Country API failed";

      toast.error(message);
      setFetchError(message);
    }
  };

  const validate = (values) => {
    const regex = /^[a-zA-Z0-9\s]+$/;

    const fields = [
      { key: "Compcode", label: "Company Code" },
      { key: "City", label: "City Name" },
      { key: "State", label: "State Name" },
      { key: "Country", label: "Country Name" },
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
        const [userRightsRes, buyerRes, stateRes, compRes] = await Promise.all([axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`), axios.get(insert), axios.get(CityParam), axios.get(compcodeparam)]);
        setUserRights(userRightsRes.data);
        setBuyerItems(buyerRes.data);
        setCityItems(stateRes.data);
        setCompCodeData(compRes.data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchData();
  }, []);

  const BuyerMaster_Search = () => {};

  const inputref = useRef();

  useEffect(() => {
    const filterResult = buyeritems.filter((item) => item.buyercode.includes(buyersearch));
    setCompanyFilterSearch(filterResult.reverse());
  }, [buyeritems, buyersearch]);

  const BuyerMaster_Exit = () => {};

  const heights = "380px";
  const BuyerMasterColumn = [
    { headername: "", field: "none" },
    { headername: "ID", field: "asptblbuymasid" },
    { headername: "Code", field: "buyercode" },
    { headername: "Buyer", field: "buyername" },
    { headername: "Agent", field: "buyingagent" },
    { headername: "City", field: "cityname" },
    { headername: "Active", field: "active" },
  ];

  const BuyerMasterCheck = async (row) => {
    try {
      const res = await axios.get(`${insert}/${row.asptblbuymasid}`);
      const data = res.data?.[0];
      if (!data || data.asptblbuymasid === 0) {
        toast.error("Invalid Data");
        return;
      }

      setBuyerValues({
        Asptblbuymasid: data.asptblbuymasid,
        Asptblbuymasid1: data.asptblbuymasid,
        Buyingagent: data.buyingagent,
        Compcode: data.gtcompmastid,
        Compname: data.gtcompmastid,
        Buyercode: data.buyercode,
        Buyername: data.buyername,
        City: data.gtcitymastid,
        State: data.gtstatemastid,
        Country: data.gtcountrymastid,
        Address: data.address,
        Phoneno: data.phoneno,
        Pincode: data.pincode,
        Website: data.website,
        Email: data.email,
        Contactname: data.contactname,
        Active: data.active === "T" ? true : false,
      });

      handleStateChange(data.gtcitymastid);
    } catch (error) {
      toast.error(error?.message || "Failed to load Buyer");
    }
  };

  const BuyerMaster_Save = async () => {
    try {
      const isValid = validate(buyerValues);
      if (!isValid) return;

      const buyerData = {
        Asptblbuymasid: buyerValues.Asptblbuymasid > 0 ? buyerValues.Asptblbuymasid : 0,
        Asptblbuymasid1: buyerValues.Asptblbuymasid > 0 ? buyerValues.Asptblbuymasid : 0,
        Compcode: buyerValues.Compcode,
        Compname: buyerValues.Compcode,
        Buyercode: buyerValues.Buyercode,
        Buyername: buyerValues.Buyername,
        Buyingagent: buyerValues.Buyingagent,
        City: buyerValues.City,
        State: buyerValues.State,
        Country: buyerValues.Country,
        Address: buyerValues.Address,
        Phoneno: buyerValues.Phoneno,
        Pincode: buyerValues.Pincode,
        Website: buyerValues.Website,
        Email: buyerValues.Email,
        Contactname: buyerValues.Contactname,
        Active: buyerValues.Active ? "T" : "F",
      };

      const response = await axios.post(insert, buyerData);

      if (response?.data) {
        BuyerMaster_New();
        toast.success(response.data);

        // ✅ Fetch updated list ONLY after success
        const res = await axios.get(insert);
        if (res?.data) setBuyerItems(res.data);
      } else {
        toast.error("Error saving data");
      }
    } catch (error) {
      toast.error(error?.message || "Save failed");
    }
  };

  const BuyerMaster_Delete = async (id) => {
    if (!id || id <= 0) {
      toast.error("Invalid ID");
      return;
    }

    try {
      const response = await axios.delete(`${insert}/${id}`);
      if (response?.data?.success) {
        toast.success(response.data.message);
        // Refresh list
        const res = await axios.get(insert);
        if (res?.data) setBuyerItems(res.data);

        BuyerMaster_New();
      } else {
        toast.error(response?.data?.message || "Delete failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || "Delete failed");
    }
  };

  const BuyerMaster_New = async () => {
    try {
      setStateItems([]);
      setCountryItems([]);
      setBuyerValues([]);
      setNewButton(1);
    } catch (error) {
      toast.error("Buyer API service not running");
    }
  };

  const commentsData = useMemo(() => {
    let computedComments = buyeritems;

    if (buyersearch) {
      computedComments = computedComments.filter((item) => item.buyercode.includes(buyersearch));
    }
    if (computedComments) setTotalItems(computedComments.length);
    //sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
    }
    return computedComments.slice((currentPage - 1) * ITEM_PER_PAGE, (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [buyeritems, currentPage, buyersearch, sorting]);

  const menuButtons = [
    { key: "news", label: "News", action: BuyerMaster_New },
    { key: "saves", label: "Save", action: BuyerMaster_Save },
    { key: "deletes", label: "Delete", action: () => BuyerMaster_Delete(buyerValues.Asptblbuymasid) },
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
    { key: "download", label: "Download", action: BuyerMaster_New },
  ];

  return (
    <>
      {userRights?.length > 0 ? (
        <div className="container-fluid animate-zoom p-1">
          <div className="row" style={{ display: `${userRights[0].readonlys === "T" ? "block" : "none"}` }}>
            <ul className="d-flex justify-content-end">
              {menuButtons.map(
                (btn, index) =>
                  userRights[0][btn.key] === "T" && (
                    <li key={index}>
                      <button className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{ backgroundColor: colorValue }} onClick={btn.action}>
                        {btn.label}
                      </button>
                    </li>
                  ),
              )}
            </ul>
            <div className="row">
              <div className="col-md-6 float-start">
                <ul className="" style={{ backgroundColor: `${colorValue}` }}>
                  <li className="ps-2">
                    {" "}
                    <button className={newButton === 1 ? "tabs active-tabs btn" : "tabs"} style={{ backgroundColor: `${colorValue}`, padding: "1%", fontWeight: "bold" }}>
                      {title}{" "}
                    </button>
                  </li>
                </ul>

                <div className="content-tabs">
                  <div className="content active-content">
                    <div className="row">
                      <div className="row">
                        <label className="col-md-2">ID</label>
                        <input className="col-md-2" type="text" name="Asptblbuymasid" value={buyerValues.Asptblbuymasid || ""} onChange={handleChange} />
                        <label className="col-md-2">ID</label>
                        <input className="col-md-2" type="text" name="Asptblbuymasid1" value={buyerValues.Asptblbuymasid1 || ""} onChange={handleChange} />
                      </div>
                      <div className="row py-1">
                        <label className="col-md-2">ComCode</label>
                        <select className="col-md-2" name="Compcode" readOnly value={buyerValues.Compcode || ""} onChange={handleChange}>
                          <option></option>
                          {compcodeData !== null &&
                            compcodeData.map((result, index) => (
                              <option key={index} value={result.gtcompmastid}>
                                {result.compcode}
                              </option>
                            ))}
                        </select>
                        <select className="col-md-8" name="Compname" readOnly value={buyerValues.Compcode || ""} onChange={handleChange}>
                          <option></option>
                          {compcodeData !== null &&
                            compcodeData.map((result, index) => (
                              <option key={index} value={result.gtcompmastid}>
                                {result.compname}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div className="row">
                        <label className="col-md-2">BuyerCode</label>
                        <input className="col-md-2" type="text" name="Buyercode" value={buyerValues.Buyercode || ""} onChange={handleChange} autoFocus />
                        <label className="col-md-3">BuyerName</label>
                        <input className="col-md-5 " type="text" name="Buyername" value={buyerValues.Buyername || ""} onChange={handleChange} />
                      </div>

                      <div className="row py-1">
                        <label className="col-md-2">BuyAgent</label>
                        <input className="col-md-5 " type="text" name="Buyingagent" value={buyerValues.Buyingagent || ""} onChange={handleChange} />
                        <label className="col-md-2"> City </label>

                        <select className="col-sm-3" name="City" value={buyerValues.City || ""} onChange={handleChange}>
                          <option></option>
                          {cityItems !== null &&
                            cityItems.map((result, index) => (
                              <option key={index} value={result.gtcitymastid}>
                                {result.cityname}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div className="row">
                        <label className="col-md-2"> State </label>

                        <select className="col-md-5" name="State" value={buyerValues.State} onChange={handleChange}>
                          {stateItems !== null &&
                            stateItems.map((result, index) => (
                              <option key={index} value={result.gtstatemastid}>
                                {result.statename}
                              </option>
                            ))}
                        </select>

                        <label className="col-md-2"> Country </label>
                        <select className="col-md-3" name="Country" value={buyerValues.Country} onChange={handleChange}>
                          {countryItems !== null &&
                            countryItems.map((result, index) => (
                              <option key={index} value={result.gtcountrymastid}>
                                {result.countryname}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="row py-1 ">
                        <label className="col-md-2"> Address </label>
                        <textarea className="col-md-10" rows="4" type="text" name="Address" value={buyerValues.Address || ""} onChange={handleChange}>
                          {" "}
                        </textarea>
                      </div>

                      <div className="row py-1">
                        <label className="col-md-2"> Email </label>
                        <input className="col-md-10" type="email" name="Email" value={buyerValues.Email || ""} onChange={handleChange} />
                      </div>
                      <div className="row">
                        <label className="col-md-2"> WebSite </label>
                        <input className="col-md-10" type="text" name="Website" value={buyerValues.Website || ""} onChange={handleChange} />
                      </div>
                      <div className="row py-1">
                        <label className="col-md-2"> Phone</label>
                        <input className="col-md-5" type="text" name="Phoneno" value={buyerValues.Phoneno || ""} onChange={handleChange} />
                        <label className="col-md-2"> PinCode</label>
                        <input className="col-md-3" type="text" name="Pincode" value={buyerValues.Pincode || ""} onChange={handleChange} />
                      </div>
                      <div className="row">
                        <label className="col-md-2"> Contact</label>
                        <input className="col-md-10" type="text" name="Contactname" value={buyerValues.Contactname || ""} onChange={handleChange} />
                      </div>
                      <div className="row">
                        <label className="col-md-2"> Active </label>
                        <label className="checkbox" style={{ padding: "0px", width: "60px" }}>
                          <input type="checkbox" name="Active" checked={buyerValues.Active} onChange={handleChange} />
                          <span></span>
                          <i className="indicator"></i>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 float-end">
                <div className="content-tabs">
                  <div className={newButton === 1 ? "content active-content" : "content"}>
                    <Search
                      colorValue={colorValue}
                      searchs={buyersearch}
                      setsearchs={setBuyerSearch}
                      SearchLable1={searchLable1}
                      SearchLable2={searchLable2}
                      SearchLable3={searchLable3}
                      stylecolor={foreValue}
                      handleChange={handleChange}
                      ChangeValues={buyerValues}
                      searchCompCode={searchCompCode}
                      searchUserName={searchUserName}
                    />

                    {!fetchError && newButton === 1 ? (
                      <>
                        <DataTable
                          heights={heights}
                          colorValue={colorValue}
                          foreValue={foreValue}
                          headers={BuyerMasterColumn}
                          comments={buyeritems}
                          setComments={setBuyerItems}
                          searches={buyersearch}
                          setSearches={setBuyerSearch}
                          totalItems={totalItems}
                          setTotalItems={setTotalItems}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          sorting={sorting}
                          setSorting={setSorting}
                          ITEM_PER_PAGE={ITEM_PER_PAGE}
                          EditData={BuyerMasterCheck}
                          commentsData={commentsData}
                        />
                      </>
                    ) : (
                      <p style={{ marginTop: "2rem", color: "var(--bs-danger)" }}>{fetchError}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      ) : (
        <SocialMissing colorValue={colorValue} fetchError={fetchError}></SocialMissing>
      )}
    </>
  );
};

export default BuyerMaster;
