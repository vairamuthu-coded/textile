import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import DataContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import SocialMissing from "../Social/SocialMissing";
import Search from "../Custom/Search";
import { toast } from "react-toastify";
const FabricTypeMaster = ({ title, subTitle, colorValue }) => {
  const {
    API_URL,
    newButton,
    handleSubmit,
    tabindex,
    totalItems,
    setTotalItems,
    currentPage,
    setCurrentPage,
    CountryParam,
    fabtype,
    setFabType,
    searchLable1,
    searchLable2,
    searchLable3,
    setSearchLable1,
    setSearchLable2,
    setSearchLable3,
    color1,
    sorting,
    setSorting,
    setNewButton,
  } = useContext(DataContext);
  let ITEM_PER_PAGE = 15;
  setSearchLable1("Search");
  setSearchLable2("");
  setSearchLable3("");
  const insert_update = API_URL + "/FabricTypeMasters/PostFabricTypeMaster";
  const GetDataparam = API_URL + "/FabricTypeMasters/GetFabricTypeMaster";
  const deleteData = API_URL + "/FabricTypeMasters/DeleteFabricTypeMaster";
  const [searchCompCode, setSearchCompCode] = useState([]);
  const [searchUserName, setSearchUserName] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(false);
  const [size_FilterSearch, setSize_FilterSearch] = useState([]);

  setNewButton(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFabType((previousValue) => {
      return {
        ...previousValue,
        [name]: value,
      };
    });
  };

  let validcheck = true;
  const validate = (fabtype) => {
    if (!fabtype.fabrictype.trim()) {
      toast("Invalid Country Name");
      validcheck = false;
      return;
    }
    if (/^[a-zA-Z]$/.test(fabtype.fabrictype)) {
      toast("Special Charector not allowed");
      validcheck = false;
      return;
    }
    return validcheck;
  };

  useEffect(() => {
    axios
      .get(`${GetDataparam}`)
      .then((res) => {
        setItems(res.data);
        fabtype.asptblfabrictypemasid = "0";
      })
      .catch((error) => {
        setFetchError(error);
      });
  }, []);

  useEffect(() => {
    const filterResult = items.filter((post) => post.fabrictype.includes(search));
    setSize_FilterSearch(filterResult.reverse());
  }, [items, search]);

  const HeadersColumn = [
    { headername: "id", field: "asptblfabrictypemasid" },
    { headername: "FabricType", field: "fabrictype" },
    { headername: "Active", field: "active" },
  ];

  const heights = "420px";

  const FabricTypeMaster_Check = (id) => {
    try {
      const myitem = items.filter((item) => item.asptblfabrictypemasid == id.asptblfabrictypemasid);
      const updatepost = { asptblfabrictypemasid: myitem[0].asptblfabrictypemasid, fabrictype: myitem[0].fabrictype, active: myitem[0].active === "T" ? true : false };
      setActive(updatepost.active);
      setFabType({ asptblfabrictypemasid: updatepost.asptblfabrictypemasid, fabrictype: updatepost.fabrictype, active: active });
    } catch (err) {
      if (err.response) {
        setFetchError(err.response);
      }
    } finally {
      setNewButton(1);
    }
  };

  const FabricTypeMaster_Save = async () => {
    //    validate(fabtype);
    // if(validcheck==true){

    try {
      const CountryData = { asptblfabrictypemasid: fabtype.asptblfabrictypemasid > 0 ? fabtype.asptblfabrictypemasid : 0, fabrictype: fabtype.fabrictype, active: active === true ? "T" : "F" };
      await axios
        .post(`${insert_update}`, CountryData)
        .then((respose) => {
          if (respose.data !== "") {
            axios
              .get(`${GetDataparam}`)
              .then((res) => {
                setItems(res.data);
              })
              .catch((error) => {});
            if (respose.data.asptblfabrictypemasid > 0) {
              alert("Updated Successfully");
            }
            if (respose.data.asptblfabrictypemasid === 0) {
              alert("Record Saved Successfully");
            }
          } else {
            setFetchError(respose.error);
            alert("Error " + respose.data);
          }
        })
        .catch((error) => {
          setFetchError(error);
        });
    } catch (err) {
      setFetchError(`Error . ${err}`);
    } finally {
      FabricTypeMaster_New();
    }
    // }else{
    //   alert("pls Enter Mandatory Field");
    // }
  };

  const FabricTypeMaster_Delete = async () => {
    try {
      if (fabtype.fabrictype === "") {
        alert(`Empty Not Allowed`);
        return;
      }
      if (fabtype.asptblfabrictypemasid >= 1) {
        const asptblfabrictypemasid = fabtype.asptblfabrictypemasid;
        await axios
          .delete(`${deleteData}/${asptblfabrictypemasid}`)
          .then((respose) => {
            if (respose.data.asptblfabrictypemasid > 0) {
              axios
                .get(`${GetDataparam}`)
                .then((res) => {
                  setItems(res.data);
                  setNewButton(1);
                })
                .catch((error) => {
                  alert(error);
                  setFetchError(error);
                });
              alert("Record Deleted Successfully");
              FabricTypeMaster_New();
            } else {
              setFetchError(respose.error);
              alert("Error " + respose.data);
            }
          })
          .catch((error) => {
            setFetchError(error);
          });
      }
    } catch (err) {
      if (err.response) {
        console.log(`Error ${err.message}`);
      }
    }
  };

  const inputref = useRef();

  const FabricTypeMaster_New = () => {
    setNewButton(1);
    setActive(false);
    setFabType({ asptblfabrictypemasid: 0, fabrictype: "", active: active });
  };

  const commentsData = useMemo(() => {
    let computedComments = items;
    if (search) {
      computedComments = computedComments.filter((item) => item.fabrictype.includes(search));
    }
    // setTotalItems(computedComments.length);
    //sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
    }
    return computedComments.slice((currentPage - 1) * ITEM_PER_PAGE, (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [items, currentPage, search, sorting]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="container-fluid">
        <div className="row" style={{ backgroundColor: "white" }}>
          {!fetchError ? (
            <>
              <div className="col-md-12" style={{ textAlign: "right" }}>
                <div style={{ background: "var(--bs-header)" }}>
                  <ul>
                    <li>
                      {" "}
                      <button type="submit" onClick={() => FabricTypeMaster_New()} style={{ backgroundColor: `${color1[0]}` }}>
                        News
                      </button>
                    </li>
                    <li>
                      {" "}
                      <button type="submit" onClick={() => FabricTypeMaster_Save()} style={{ backgroundColor: `${color1[1]}` }}>
                        Save
                      </button>
                    </li>
                    <li>
                      {" "}
                      <button type="submit" onClick={(e) => FabricTypeMaster_Delete()} style={{ backgroundColor: `${color1[2]}` }}>
                        Delete
                      </button>
                    </li>
                    <li>
                      {" "}
                      <button type="submit" onClick={() => FabricTypeMaster_New()} style={{ backgroundColor: `${color1[3]}` }}>
                        {" "}
                        Search{" "}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6" style={{ backgroundColor: "var(--bs-white)", padding: "0" }}>
                <div className="bloc-tabs">
                  <div className="tabs active-tabs" style={{ color: `${colorValue}` }}>
                    {" "}
                    {title}{" "}
                  </div>
                </div>

                <div className="content active-content" style={{ backgroundColor: "var(--bs-light)" }}>
                  <fieldset>
                    <legend></legend>

                    <div className="row py-1">
                      <label className="col-md-2"> ID </label>
                      <input className="col-md-1" type="text" name="asptblfabrictypemasid" value={fabtype.asptblfabrictypemasid} readOnly />
                    </div>
                    <div className="row">
                      <label className="col-md-2"> FabricType </label>

                      <input className="col-md-6" name="fabrictype" type="text" value={fabtype.fabrictype} onChange={handleChange} />
                    </div>
                    <div className="row py-1">
                      <label className="col-md-2"> Active </label>
                      <label className="checkbox" style={{ padding: "0px", width: "60px" }}>
                        <input type="checkbox" name="active" checked={active} onChange={(e) => setActive(e.target.checked)} />
                        <span></span>
                        <i className="indicator"></i>
                      </label>
                    </div>
                  </fieldset>
                </div>
              </div>
              <div className="col-md-6" style={{ backgroundColor: "var(--bs-white)", padding: "0" }}>
                <div className="bloc-tabs">
                  <div className="tabs active-tabs" style={{ color: `${colorValue}` }}>
                    {" "}
                    {title}{" "}
                  </div>
                </div>
                <div className="content-tabs">
                  <Search
                    colorValue={colorValue}
                    searchs={search}
                    setsearchs={setSearch}
                    SearchLable1={searchLable1}
                    SearchLable2={searchLable2}
                    SearchLable3={searchLable3}
                    handleChange={handleChange}
                    ChangeValues={fabtype}
                    searchCompCode={searchCompCode}
                    searchUserName={searchUserName}
                  />

                  <DataTable
                    heights={heights}
                    colorValue={colorValue}
                    headers={HeadersColumn}
                    comments={items}
                    setComments={setItems}
                    searches={search}
                    setSearches={setSearch}
                    totalItems={totalItems}
                    setTotalItems={setTotalItems}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    sorting={sorting}
                    setSorting={setSorting}
                    ITEM_PER_PAGE={ITEM_PER_PAGE}
                    EditData={FabricTypeMaster_Check}
                    commentsData={commentsData}
                  />
                </div>
              </div>
            </>
          ) : (
            <SocialMissing colorValue={colorValue} fetchError={fetchError}></SocialMissing>
          )}
        </div>
      </div>
    </form>
  );
};

export default FabricTypeMaster;
