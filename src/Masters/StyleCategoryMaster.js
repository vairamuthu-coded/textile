import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import DataContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import SocialMissing from "../Social/SocialMissing";

const StyleCategoryMaster = ({ title, subTitle, colorValue }) => {
  const { API_URL, newButton, handleSubmit, tabindex, currentPage, setCurrentPage, CountryParam, sorting, setSorting, setNewButton, styleCatValues, setStyleCatValues } = useContext(DataContext);
  let ITEM_PER_PAGE = 15;
  const insert_update = API_URL + "/StyleCategoryMasters";
  const stylecategoryparam = API_URL + "/StyleCategoryMasters";
  const deleteData = API_URL + "/StyleCategoryMasters";
  const getData = API_URL + "/StyleCategoryMasters";
  const [totalItems, setTotalItems] = useState([]);
  setNewButton(1);
  const [fetchError, setFetchError] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(false);
  const [size_FilterSearch, setSize_FilterSearch] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStyleCatValues((previousValue) => {
      return {
        ...previousValue,
        [name]: value,
      };
    });
  };

  let validcheck = true;
  const validate = (styleCatValues) => {
    if (!styleCatValues.stylecategory.trim()) {
      alert("Invalid Country Name");
      validcheck = false;
      return;
    }
    if (/^[a-zA-Z]$/.test(styleCatValues.stylecategory)) {
      alert("Special Charector not allowed");
      validcheck = false;
      return;
    }
    return validcheck;
  };

  useEffect(() => {
    axios
      .get(`${stylecategoryparam}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  useEffect(() => {
    const filterResult = items.filter((post) => post.stylecategory.includes(search));
    setSize_FilterSearch(filterResult.reverse());
  }, [items, search]);

  const HeadersColumn = [
    { headername: "S.No", field: "SNo" },
    { headername: "", field: "asptblstycatmasid" },
    { headername: "Style Category", field: "stylecategory" },
    { headername: "Active", field: "active" },
  ];

  const heights = "420px";

  const StyleCategoryMaster_Check = (id) => {
    try {
      const myitem = items.filter((item) => item.asptblstycatmasid == id.asptblstycatmasid);
      const updatepost = { asptblstycatmasid: myitem[0].asptblstycatmasid, stylecategory: myitem[0].stylecategory, active: myitem[0].active === "T" ? true : false };
      setActive(updatepost.active);
      setStyleCatValues({ asptblstycatmasid: updatepost.asptblstycatmasid, stylecategory: updatepost.stylecategory, active: active });
    } catch (err) {
      if (err.response) {
        setFetchError(err.response);
      }
    } finally {
    }
  };

  const StyleCategoryMaster_Save = async () => {
    //    validate(styleCatValues);
    // if(validcheck==true){

    try {
      const CountryData = { asptblstycatmasid: styleCatValues.asptblstycatmasid > 0 ? styleCatValues.asptblstycatmasid : 0, stylecategory: styleCatValues.stylecategory.toUpperCase(), Active: active === true ? "T" : "F" };
      await axios
        .post(`${insert_update}`, CountryData)
        .then((respose) => {
          if (respose.data !== "") {
            if (respose.data.asptblstycatmasid > 0) {
              alert("Updated Successfully");
            }
            if (respose.data.asptblstycatmasid === 0) {
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
      StyleCategoryMasterNew();
    }
    // }else{
    //   alert("pls Enter Mandatory Field");
    // }
  };

  const StyleCategoryMaster_Delete = async () => {
    try {
      if (styleCatValues.stylecategory === "") {
        alert(`Empty Not Allowed`);
        return;
      }
      if (styleCatValues.asptblstycatmasid >= 1) {
        const asptblstycatmasid = styleCatValues.asptblstycatmasid;
        await axios
          .delete(`${deleteData}/${asptblstycatmasid}`)
          .then((respose) => {
            if (respose.data.asptblstycatmasid > 0) {
              alert("Record Deleted Successfully");
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
    } finally {
      StyleCategoryMasterNew();
    }
  };

  const StyleCategoryMasterNew = () => {
    setNewButton(1);
    setActive(false);
    setStyleCatValues({ asptblstycatmasid: "", stylecategory: "", active: active });
    axios
      .get(`${stylecategoryparam}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        setFetchError("Service does't running. pls check (Country Master) API in Country Controller");
      });
  };

  const commentsData = useMemo(() => {
    let searchs = String(search || "").toLowerCase();
    let computedComments = items;
    if (searchs) {
      computedComments = computedComments.filter((item) => {
        let country = String(item.taxvalue || "").toLowerCase();
        return country.includes(searchs);
      });
    }
    setTotalItems(computedComments.length);

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
    }
    return computedComments.slice((currentPage - 1) * ITEM_PER_PAGE, (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [items, currentPage, search, sorting]);

  // const commentsData = useMemo(() => {
  //   let computedComments = items;
  //   if (search) {
  //     computedComments = computedComments.filter((item) => item.stylecategory.includes(search));
  //   }
  //   setTotalItems(computedComments.length);
  //   //sorting comments
  //   if (sorting.field) {
  //     const reversed = sorting.order === "asc" ? 1 : -1;
  //     computedComments = computedComments.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
  //   }
  //   return computedComments.slice((currentPage - 1) * ITEM_PER_PAGE, (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  // }, [items, currentPage, search, sorting]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="container-fluid animate-zoom">
        <div className="row" style={{ backgroundColor: "white" }}>
          {/* {!fetchError ? (
    <> */}
          <div className="col-md-12" style={{ textAlign: "right" }}>
            <div style={{ background: "var(--bs-header)" }}>
              <ul>
                <li>
                  {" "}
                  <button type="submit" onClick={() => StyleCategoryMasterNew()} style={{ backgroundColor: `${colorValue}` }}>
                    News
                  </button>
                </li>
                <li>
                  {" "}
                  <button type="submit" onClick={() => StyleCategoryMaster_Save()} style={{ backgroundColor: `${colorValue}` }}>
                    Save
                  </button>
                </li>
                <li>
                  {" "}
                  <button type="submit" onClick={(e) => StyleCategoryMaster_Delete()} style={{ backgroundColor: `${colorValue}` }}>
                    Delete
                  </button>
                </li>
                <li>
                  {" "}
                  <button type="submit" onClick={() => StyleCategoryMasterNew()} style={{ backgroundColor: `${colorValue}` }}>
                    {" "}
                    Search{" "}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-9" style={{ backgroundColor: "var(--bs-white)", padding: "0" }}>
            <div className="bloc-tabs">
              <div className="tabs active-tabs" style={{ color: `${colorValue}` }}>
                {" "}
                {title}{" "}
              </div>
            </div>

            <fieldset>
              <legend></legend>
              <div className="row" style={{ backgroundColor: "var(--bs-light)", padding: "0" }}>
                <div className="row py-1">
                  <label className="col-md-2"> ID </label>
                  <input className="col-md-2" type="text" name="asptblstycatmasid" value={styleCatValues.asptblstycatmasid} readOnly />
                </div>
                <div className="row">
                  <label className="col-md-2"> stylecategory </label>

                  <input className="col-md-5" name="stylecategory" type="text" value={styleCatValues.stylecategory} onChange={handleChange} />
                </div>
                <div className="row py-1">
                  <label className="col-md-2"> Active </label>
                  <label className="checkbox" style={{ padding: "0px", width: "60px" }}>
                    <input type="checkbox" name="active" checked={active} onChange={(e) => setActive(e.target.checked)} />
                    <span></span>
                    <i className="indicator"></i>
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
          <div className="col-md-3" style={{ backgroundColor: "var(--bs-white)", padding: "0" }}>
            <div className="bloc-tabs">
              <div className="tabs active-tabs" style={{ color: `${colorValue}` }}>
                {" "}
                {title}{" "}
              </div>
            </div>
            <div className="content active-content">
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
                EditData={StyleCategoryMaster_Check}
                commentsData={commentsData}
              />
            </div>
          </div>
          {/* </>
) : <SocialMissing colorValue={colorValue} fetchError={fetchError} ></SocialMissing> } */}
        </div>
      </div>
    </form>
  );
};

export default StyleCategoryMaster;
