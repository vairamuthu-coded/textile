import { useContext, useEffect, useMemo, useRef, useState } from "react";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import SocialMissing from "../Social/SocialMissing";
import Search from "../Custom/Search";
import DataContext from "../context/CreateUserContext";
import { toast } from "react-toastify";
import defaultimage from "../Images/win.png";
import ImageUploader from "../Custom/ImageUploader.jsx";
import ActionButtton from "../ActionButtton.jsx";
const CompanyMaster = ({ title, subTitle }) => {
  const {
    newButton,
    setNewButton,
    inputref,
    tabindex,
    API_URL,
    colorValue,
    handleSubmit,
    currentPage,
    setCurrentPage,
    companyValues,
    setCompanyValues,
    sorting,
    setSorting,
    ITEM_PER_PAGE,
    stateItems,
    setStateItems,
    userRights,
    setUserRights,
    countryItems,
    setCountryItems,
    searchLable1,
    searchLable2,
    searchLable3,
    defaultDetails,
    foreValue,
    setSearchLable1,
    setSearchLable2,
    setSearchLable3,
    images,
    setImage,
  } = useContext(DataContext);

  const insert = `${API_URL}/CompanyMaster/Saves`;
  const deleteData = `${API_URL}/CompanyMaster/DeleteCommond`;
  const CityParam = `${API_URL}/CityMaster/GridLoad`;
  const StateParam = `${API_URL}/CityMaster/GridLoad`;
  const CompanyMasterParam = `${API_URL}/CompanyMaster/GridLoad`;
  const CompanyMasterGrid = `${API_URL}/CompanyMaster/GridLoad`;
  const [totalItems, setTotalItems] = useState([]);
  const CountryParam = `${API_URL}/StateMaster/GridLoad`;
  const DeviceParam = `${API_URL}/CompanyMaster/DeviceConnect`;
  const userrightsMenuCheck = `${API_URL}/UserRights/userrightsMenuCheck`;
  const [fetchError, setFetchError] = useState(null);
  setSearchLable1("Search");
  setSearchLable2("");
  setSearchLable3("");

  const [searchCompCode, setSearchCompCode] = useState([]);
  const [searchUserName, setSearchUserName] = useState([]);
  // const [images, setImage] = useState({
  //   imageFile: null,
  //   imagesrc: defaultimage,
  //   filetype: "",
  // });

  const [cityItems, setCityItems] = useState([]);
  const [company_search, setCompanySearch] = useState([]);
  const [company_filterSearch, setCompanyFilterSearch] = useState([]);
  const [company_items, setCompanyItems] = useState([]);
  const [company_logo, setCompanyLogo] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setCompanyValues((prev) => ({
      ...prev,
      [name]: newValue,
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
      const data = res.data;
      setStateItems(data);
      const stateId = data?.[0]?.gtstatemastid;
      const Country = data?.[0]?.gtcountrymastid;
      setCompanyValues((prev) => ({
        ...prev,
        city: id,
        state: stateId,
        country: Country,
      }));

      if (stateId) {
        handleCountryChange(stateId);
      }
    } catch (error) {
      console.error(error);
      setFetchError(error);
    }
  };

  const handleCountryChange = async (id) => {
    if (!id) return;
    try {
      const { data } = await axios.get(`${CountryParam}/${id}`);

      setCountryItems(data.reverse());
    } catch (error) {
      setFetchError(error?.message || "Failed to load country");
    }
  };

  let validcheck = true;
  const validate = (values) => {
    const regex = /^[a-zA-Z\s]+$/;
    const fields = [
      { key: "compcode", name: "Company Code" },
      { key: "compname", name: "Company Name" },
      { key: "contactname", name: "Contact Name" },
    ];
    for (let field of fields) {
      if (!regex.test(values[field.key])) {
        toast.error(`Special characters not allowed in ${field.name}`);
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    const fetchMyAPI = async () => {
      try {
        const [userRightsRes, cityRes, companyRes] = await Promise.all([axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`), axios.get(CityParam), axios.get(CompanyMasterParam)]);

        setUserRights(userRightsRes.data);
        setCityItems(cityRes.data);
        setCompanyItems(companyRes.data.reverse());

        setNewButton(1);
      } catch (error) {
        console.error(error);
        setFetchError(error);
      }
    };

    fetchMyAPI();
  }, []);

  useEffect(() => {
    const filterResult = company_items.filter((item) => item.compcode.includes(company_search));
    setCompanyFilterSearch(filterResult.reverse());
  }, [company_items, company_search]);

  const CompanyMaster_Exit = () => {};

  const heights = "380px";
  const CompanyMasterColumn = [
    { headername: "", field: "none" },
    { headername: "ID", field: "gtcompmastid" },
    { headername: "COMPCODE", field: "compcode" },
    { headername: "COMPNAME", field: "compname" },
    { headername: "CITYNAME", field: "cityname" },
    { headername: "STATENAME", field: "statename" },
    { headername: "COUNTRYNAME", field: "countryname" },
    { headername: "ACTIVE", field: "active" },
  ];

  const byteArrayToBase64 = (bytes) => {
    let binary = "";
    let len = bytes.length;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const CompanyMasterCheck = async (row) => {
    try {
      const res = await axios.put(`${CompanyMasterGrid}/${row.gtcompmastid}`);
      if (!res.data || res.data[0].gtstatemastid === 0) {
        toast.error("Invalid Data");
        return;
      }
      const data = res.data[0];
      const imageSrc = `${data.filetype},${data.companylogo}`;
      setImage({
        imagesrc: imageSrc,
        filetype: data.filetype,
      });

      setCompanyValues({
        gtcompmastid: data.gtcompmastid,
        displayname: data.displayname,
        compcode: data.compcode,
        compname: data.compname,
        city: data.gtcitymastid,
        state: data.gtstatemastid,
        country: data.gtcountrymastid,
        address: data.address,
        gstno: data.gstno,
        gstdate: data.gstdate,
        website: data.website,
        email: data.email,
        accno: data.accno,
        bankname: data.bankname,
        ifsc: data.ifsc,
        phoneno: data.phoneno,
        contactname: data.contactname,
        active: data.active === "T",
      });

      if (data.gtcitymastid > 0) {
        handleStateChange(data.gtcitymastid);
      }
    } catch (error) {
      toast.error("-- " + error.message);
    } finally {
      setNewButton(1);
    }
  };

  const CompanyMaster_Save = async () => {
    try {
      const isValid = validate(companyValues);
      if (!isValid) return;
      const CountryData = {
        gtcompmastid: companyValues.gtcompmastid > 0 ? companyValues.gtcompmastid : 0,
        compcode: companyValues.compcode,
        compname: companyValues.compname,
        city: companyValues.city,
        state: companyValues.state,
        country: companyValues.country,
        displayname: companyValues.displayname === undefined ? "" : companyValues.displayname,
        images: images.imagesrc,
        filetype: images.filetype,
        address: companyValues.address,
        gstno: companyValues.gstno === undefined ? 0 : companyValues.gstno,
        gstdate: companyValues.gstdate === undefined ? 0 : companyValues.gstdate,
        website: companyValues.website === undefined ? 0 : companyValues.website,
        pincode: companyValues.pincode === undefined ? 0 : companyValues.pincode,
        email: companyValues.email === undefined ? 0 : companyValues.email,
        accno: companyValues.accno === undefined ? 0 : companyValues.accno,
        bankname: companyValues.bankname === null ? "1" : companyValues.bankname,
        ifsc: companyValues.ifsc === null ? 0 : companyValues.ifsc,
        phoneno: companyValues.phoneno === undefined ? 0 : companyValues.phoneno,
        contactname: companyValues.contactname === undefined ? "" : companyValues.contactname,
        active: companyValues.active ? "T" : "F",
      };

      const response = await axios.post(insert, CountryData);
      if (response.data) {
        const res = await axios.get(CompanyMasterParam);
        setCompanyItems(res.data);
        toast.success(response.data);
        CompanyMaster_New();
      }
    } catch (error) {
      toast.error(error?.message || "Save failed");
    }
  };

  const CompanyMaster_Delete = async (id) => {
    try {
      if (companyValues.gtcompmastid == "") {
        alert(`Empty Not Allowed`);
        return;
      }
      await axios
        .delete(`${deleteData}/${id}`)
        .then((respose) => {
          if (respose.data === "true") {
            // axios.get(`${API_URL}${CompanyMasterParam}`)
            //   .then((res) => { setCityItems(res.data.reverse()); setNewButton(1); })
            //   .catch((error) => { alert(error); });
            // alert("Record Deleted Successfully");
          } else {
            alert(respose.error);
          }
        })
        .catch((error) => {
          alert(error);
        });
    } catch (err) {
      if (err.response) {
      }
    }
  };
  const CompanyMasterClear = () => {};

  const CompanyMaster_New = () => {
    setStateItems([]);
    setCountryItems([]);
    setCompanyValues([]);
    setNewButton(1);
    setImage({
      imagesrc: null,
      filetype: "",
    });

    CompanyMasterClear();
  };

  const TabIndexClick = (inx) => {
    setNewButton(inx);
  };

  const commentsData = useMemo(() => {
    const keyword = String(company_search || "").toLowerCase();

    // 1) FILTER
    let filtered = company_items;

    if (keyword) {
      filtered = company_items.filter((item) =>
        String(item.compcode || "")
          .toLowerCase()
          .includes(keyword),
      );
    }

    // Update total count
    setTotalItems(filtered.length);

    // 2) SORT
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;

      filtered = [...filtered].sort((a, b) => reversed * String(a[sorting.field] || "").localeCompare(String(b[sorting.field] || "")));
    }

    // 3) PAGINATION
    const start = (currentPage - 1) * ITEM_PER_PAGE;
    const end = start + ITEM_PER_PAGE;

    return filtered.slice(start, end);
  }, [company_items, currentPage, company_search, sorting]);

  const menuButtons = [
    { key: "news", label: "News", action: CompanyMaster_New },
    { key: "saves", label: "Save", action: CompanyMaster_Save },
    { key: "deletes", label: "Delete", action: CompanyMaster_Delete },
    { key: "searches", label: "Search", action: CompanyMaster_New },
    { key: "prints", label: "Prints", action: CompanyMaster_New },
    { key: "treebutton", label: "TreeButton", action: CompanyMaster_New },
    { key: "globalsearch", label: "Globalsearch", action: CompanyMaster_New },
    { key: "login", label: "Login", action: CompanyMaster_New },
    { key: "changepassword", label: "Changepassword", action: CompanyMaster_New },
    { key: "changeskin", label: "Changeskin", action: CompanyMaster_New },
    { key: "contact", label: "Contact", action: CompanyMaster_New },
    { key: "pdf", label: "Pdf", action: CompanyMaster_New },
    { key: "import", label: "Import", action: CompanyMaster_New },
    { key: "download", label: "Download", action: CompanyMaster_New },
  ];

  return (
    <>
      {userRights?.length > 0 && (
        <div className="container-fluid animate-zoom" style={{ backgroundColor: "whitesmoke" }}>
          <div className="row" style={{ display: `${userRights[0].readonlys === "T" ? "block" : "none"}` }}>
            <ActionButtton
              news={CompanyMaster_New}
              saves={CompanyMaster_Save}
              deletes={CompanyMaster_Delete}
              searches={CompanyMaster_New}
              prints={CompanyMaster_New}
              treebutton={CompanyMaster_New}
              globalsearch={CompanyMaster_New}
              login={CompanyMaster_New}
              changepassword={CompanyMaster_New}
              changeskin={CompanyMaster_New}
              contact={CompanyMaster_New}
              pdf={CompanyMaster_New}
              imports={CompanyMaster_New}
              download={CompanyMaster_New}
              userRights={userRights}
              colorValue={colorValue}
              newButton={newButton}
              foreValue={foreValue}
              screenHeader="COMPANY MASTER"
            />

            <ul className="" style={{ backgroundColor: `${colorValue}` }}>
              <li className="ps-2">
                {" "}
                <button className={newButton === 1 || newButton === 10 ? "tabs active-tabs btn" : "tabs"} onClick={() => TabIndexClick(1)} style={{ backgroundColor: `${colorValue}`, padding: "1%", fontWeight: "bold" }}>
                  {title}{" "}
                </button>
              </li>
              <li className="ps-2">
                {" "}
                <button className={newButton === 2 ? "tabs active-tabs btn" : "tabs"} onClick={() => TabIndexClick(2)} style={{ backgroundColor: `${colorValue}`, fontWeight: "bold" }}>
                  {" "}
                  {subTitle}{" "}
                </button>
              </li>
            </ul>

            <div className="row">
              <div className={newButton === 1 ? "content active-content" : "content"}>
                <div className="row">
                  <div className="col-md-10">
                    <div className="row m-1">
                      <label className="col-md-1">ID</label>
                      <input className="col-md-1" type="text" name="id" value={companyValues.gtcompmastid || ""} onChange={handleChange} />
                      <label className="col-md-1">ShortCode</label>
                      <input className="col-md-1" type="text" name="shortcode" value={companyValues.shortcode || ""} onChange={handleChange} />
                      <label className="col-md-1">ComCode</label>
                      <input className="col-md-1" type="text" name="compcode" value={companyValues.compcode || ""} onChange={handleChange} />
                      <label className="col-md-1"></label>
                      <input className="col-md-4 " type="text" name="compname" value={companyValues.compname || ""} onChange={handleChange} />
                    </div>

                    <div className="row m-1">
                      <label className="col-md-1">Display</label>
                      <input className="col-md-5" type="text" name="displayname" value={companyValues.displayname || ""} onChange={handleChange} />

                      <label className="col-md-1">Division</label>
                      <select className="col-md-4" name="division" value={companyValues.division || ""} onChange={handleChange}>
                        {" "}
                        <option></option>{" "}
                      </select>
                    </div>

                    <div className="row m-1">
                      <label className="col-md-1"> City </label>

                      <select className="col-sm-2" name="city" value={companyValues.city || ""} onChange={handleChange}>
                        <option></option>
                        {cityItems !== null &&
                          cityItems.map((result, index) => (
                            <option key={index} value={result.gtcitymastid}>
                              {result.cityname}
                            </option>
                          ))}
                      </select>

                      <label className="col-md-1"> State </label>

                      <select className="col-sm-2" name="state" value={companyValues.state} onChange={handleChange}>
                        {stateItems !== " " &&
                          stateItems.map((result, index) => (
                            <option key={index} value={result.gtstatemastid}>
                              {result.statename}
                            </option>
                          ))}
                      </select>

                      <label className="col-md-1"> Country </label>
                      <select className="col-sm-2" name="country" value={companyValues.country} onChange={handleChange}>
                        {countryItems !== null &&
                          countryItems.map((result, index) => (
                            <option key={index} value={result.gtcountrymastid}>
                              {result.countryname}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="row m-1">
                      <label className="col-md-1"> Address </label>
                      <textarea className="col-md-10" rows="4" type="text" name="address" value={companyValues.address || ""} onChange={handleChange}>
                        {" "}
                      </textarea>
                    </div>

                    <div className="row m-1">
                      <label className="col-md-1"> GstNo</label>
                      <input className="col-md-2" type="text" name="gstno" value={companyValues.gstno || ""} onChange={handleChange} />
                      <label className="col-md-1"> Date</label>
                      <input className="col-md-2" type="date" name="gstdate" value={companyValues.gstdate || ""} onChange={handleChange} />
                      <label className="col-md-1"> WebSite </label>
                      <input className="col-md-4" type="text" name="website" value={companyValues.website || ""} onChange={handleChange} />
                    </div>

                    <div className="row m-1">
                      <label className="col-md-1"> Email </label>
                      <input className="col-md-10" type="email" name="email" value={companyValues.email || ""} onChange={handleChange} />
                    </div>
                    <div className="row m-1">
                      <label className="col-md-1"> AccNo </label>
                      <input className="col-md-5" type="text" name="accno" value={companyValues.accno || ""} onChange={handleChange} />

                      <label className="col-md-2"> BankName </label>

                      <select className="col-md-3" name="bankname" value={companyValues.bankname || ""} onChange={handleChange}>
                        <option></option>
                        <option value="1">City Union Bank</option>
                        <option value="2">State Bank of India</option>
                      </select>
                    </div>
                    <div className="row m-1">
                      <label className="col-md-1"> IFSC </label>

                      <select className="col-md-5" name="ifsc" value={companyValues.ifsc || ""} onChange={handleChange}>
                        <option></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </select>

                      <label className="col-md-2"> Branch </label>

                      <select className="col-md-3" name="branch" value={companyValues.branch || ""} onChange={handleChange}>
                        <option></option>
                        <option value="1">Kumaran Road Branch(City)</option>
                        <option value="2">Railway Station Main Branch(State)</option>
                      </select>
                    </div>
                    <div className="row m-1">
                      <label className="col-md-1"> Contact </label>
                      <input className="col-md-5" type="text" name="phoneno" value={companyValues.phoneno || ""} onChange={handleChange} />

                      <label className="col-md-2"> ContactName </label>
                      <input className="col-md-3" type="text" name="contactname" value={companyValues.contactname || ""} onChange={handleChange} />
                    </div>

                    <div className="row m-1">
                      <label className="col-md-1"> Active </label>

                      <label className="checkbox" style={{ padding: "0px", margin: 0, width: "60px" }}>
                        <input type="checkbox" name="active" checked={companyValues.active} onChange={handleChange} />
                        <span></span>
                        <i className="indicator"></i>
                      </label>
                    </div>
                  </div>

                  <div className="col-md-1">
                    <div style={{ padding: "0px", border: "1px solid var(--bs-white)", alignItems: "right" }}>
                      <ImageUploader images={images} setImage={setImage} defaultimage={defaultimage} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {!fetchError && company_items !== null ? (
              <div className={newButton === 2 ? "content active-content" : "content"}>
                <div className="row">
                  <Search
                    colorValue={colorValue}
                    searchs={company_search}
                    setsearchs={setCompanySearch}
                    SearchLable1={searchLable1}
                    SearchLable2={searchLable2}
                    SearchLable3={searchLable3}
                    stylecolor={foreValue}
                    handleChange={handleChange}
                    ChangeValues={companyValues}
                    searchCompCode={searchCompCode}
                    searchUserName={searchUserName}
                  />
                  {!fetchError && newButton === 2 ? (
                    <>
                      <DataTable
                        heights={heights}
                        colorValue={colorValue}
                        headers={CompanyMasterColumn}
                        comments={company_items}
                        setComments={setCompanyItems}
                        searches={company_search}
                        setSearches={setCompanySearch}
                        foreValue={foreValue}
                        totalItems={totalItems}
                        setTotalItems={setTotalItems}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        sorting={sorting}
                        setSorting={setSorting}
                        ITEM_PER_PAGE={ITEM_PER_PAGE}
                        EditData={CompanyMasterCheck}
                        commentsData={commentsData}
                      />
                    </>
                  ) : (
                    <p style={{ marginTop: "1rem", color: "var(--bs-danger)" }}>{fetchError}</p>
                  )}
                </div>
              </div>
            ) : (
              <SocialMissing colorValue={colorValue} fetchError={fetchError}></SocialMissing>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyMaster;
//https://www.google.com/search?q=dbcontext+update+in+web+api+c%23&oq=&gs_lcrp=EgZjaHJvbWUqCQgAEEUYOxjCAzIJCAAQRRg7GMIDMgkIARBFGDsYwgMyCQgCEEUYOxjCAzIJCAMQRRg7GMIDMgkIBBBFGDsYwgMyCQgFEEUYOxjCAzIJCAYQRRg7GMIDMgkIBxBFGDsYwgPSAQ0xNzcxMzcwOTJqMGo3qAIIsAIB&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:703d5d2c,vid:QM91e2wIPWg,st:0
