import React, { useContext, useEffect, useMemo, useState } from 'react'
import DataContext from '../context/CreateUserContext';
import DataTable from '../Custom/DataTable';
import axios from 'axios';
import Search from '../Custom/Search';
const FabricMaster = ({ title, subTitle, colorValue }) => {
  const { newButton, setNewButton, inputref, handleSubmit,
    API_URL, totalItems, setTotalItems, currentPage, setCurrentPage, sorting, setSorting,
    ITEM_PER_PAGE,
    searchLable1, searchLable2, searchLable3, color1, fab, setFab,
    setSearchLable1, setSearchLable2, setSearchLable3 } = useContext(DataContext)
  const [fab_Search, setFab_Search] = useState([]);
  const [fabTypeData, setFabTypeData] = useState([]);
  const [fabYarnBlend, setFabYarnBlend] = useState([]);
  const [checkall, setCheckAll] = useState(false)
  const [active, setActive] = useState(false)
  const [organic, setOraganic] = useState(false)
  const [fab_FilterSearch, setFab_FilterSearch] = useState([]);
  const [fabItems, setFabItems] = useState([])
  const [searchCompCode, setSearchCompCode] = useState([])
  const [searchUserName, setSearchUserName] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const [artists, setArtists] = useState({
    asptblfabmasid: "0", fabrictype: "", per1: "", per2: "", per3: "", per4: "", per5: "",
    yarnblend1: "", yarnblend2: "", yarnblend3: "", yarnblend4: "", yarnblend5: "", fabric: "",
    aliasname: "", hsn: "", per: 0,organic:false
  })

  const GetYarnBlendMaster = API_URL + "/YarnBlendMasters/GetYarnBlendMaster";
  const GetFabricTypeMaster = API_URL + "/FabricTypeMasters/GetFabricTypeMaster";
  const insert_update = API_URL + "/FabricMasters/PostFabricMaster";
  const deleteData = API_URL + "/FabricMasters/DeleteFabricMaster";
  const GridData = API_URL + "/FabricMasters/GetFabricMaster";
  const heights = "400px";
  setSearchLable1("Search"); setSearchLable2(""); setSearchLable3("")
  const HeadersColumn =
    [
      { headername: "id", field: "asptblfabmasid", visible: "none" },
      { headername: "Fabric Type", field: "fabrictype" },
      { headername: "Fabric", field: "fabric" },
      { headername: "Active", field: "active" }
    ]


  let totalper = 0;
  const handleChange = (e) => {
    const { name, value, options, type, checked } = e.target;

    setFab((fab) => {
      if (type === "text") { return { ...fab, [name]: value } }
      if (type === "select-one") { return { ...fab, [name]: options.selectedIndex === 0 ? "" : value } }
      if (type === "checkbox") { return { ...fab, "active": checked === true ? setActive(true) : setActive(false) } }
      if (type === "checkbox") { return { ...fab, "organic": checked === true ? setOraganic(true) : setOraganic(false) } }
    });

    setArtists((artists) => {
      if (type === "text") { return { ...artists, [name]: value } }
      if (type === "select-one") { return { ...artists, [name]: options.selectedIndex === 0 ? "" : options[value].text } }
    });


    if (artists.fabrictype !== '') { fab.fabric = artists.fabrictype; }
    if (artists.fabrictype !== '' && artists.per1 !== '' ) {
      fab.fabric = artists.fabrictype + "(" + artists.per1 + "%" + artists.yarnblend1 + ")";
      artists.fabric = artists.fabrictype + "(" + artists.per1 + "%" + artists.yarnblend1 + ")";
      totalper = parseInt(artists.per1);
      artists.per = totalper; if (totalper > 100) { alert(artists.per + " Yarn  PerCentage Exceed.Maximum 100 % only Allowed . per1 Field" + artists.per1); }
    }

    if (artists.fabrictype !== '' && artists.per1 !== '' && artists.per2 !== '') {
      fab.fabric = artists.fabrictype + "(" + artists.per1 + "%" + artists.yarnblend1 + artists.per2 + "%" + artists.yarnblend2 + ")";
      artists.fabric = artists.fabrictype + "(" + artists.per1 + "%" + artists.yarnblend1 + artists.per2 + "%" + artists.yarnblend2 + ")";
      totalper = parseInt(artists.per1) + parseInt(artists.per2);
      artists.per = totalper;
      if (totalper > 100) {
        alert(artists.per + " Yarn  PerCentage Exceed.Maximum 100 % only Allowed . per2 Field" + artists.per2);
      }
    }

    if (artists.fabrictype !== '' && artists.per1 !== ''
      && artists.per2 !== '' && artists.per3 !== '') {
        fab.fabric = artists.fabrictype + "(" + artists.per1 + "%" + artists.yarnblend1 + artists.per2 + "%" + artists.yarnblend2 + artists.per3 + "%" + artists.yarnblend3 + ")";
        artists.fabric = artists.fabrictype + "(" + artists.per1 + "%" + artists.yarnblend1 + artists.per2 + "%" + artists.yarnblend2 + artists.per3 + "%" + artists.yarnblend3 + ")";

      totalper = parseInt(artists.per1) + parseInt(artists.per2) + parseInt(artists.per3);
      artists.per = totalper;
      if (totalper > 100) {
        alert(artists.per + " Yarn  PerCentage Exceed.Maximum 100 % only Allowed . per3 Field" + artists.per3);
      }

    }

    if (artists.fabrictype !== '' && artists.per1 !== ''
      && artists.per2 !== '' && artists.per3 !== '' && artists.per4 !== '') {
        fab.fabric = artists.fabrictype + "(" + artists.per1 + "%" + artists.yarnblend1 + artists.per2 + "%" + artists.yarnblend2 + artists.per3 + "%" + artists.yarnblend3 + artists.per4 + "%" + artists.yarnblend4 + ")";
        artists.fabric = artists.fabrictype + "(" + artists.per1 + "%" + artists.yarnblend1 + artists.per2 + "%" + artists.yarnblend2 + artists.per3 + "%" + artists.yarnblend3 + artists.per4 + "%" + artists.yarnblend4 + ")";

        totalper = parseInt(artists.per1) + parseInt(artists.per2) + parseInt(artists.per3) + parseInt(artists.per4);
      artists.per = totalper;
      if (totalper > 100) {
        alert(artists.per + " Yarn  PerCentage Exceed.Maximum 100 % only Allowed . per4 Field" + artists.per4);
      }
    }

    if (artists.fabrictype !== '' && artists.per1 !== '' && artists.per2 !== '' && artists.per3 !== '' && artists.per4 !== '' && artists.per5 !== '') {
      fab.fabric = artists.fabrictype + "(" + artists.per1 + "%" + artists.yarnblend1 + artists.per2 + "%" + artists.yarnblend2 + artists.per3 + "%" + artists.yarnblend3 + artists.per4 + "%" + artists.yarnblend4 + artists.per5 + "%" + artists.yarnblend5 + ")";
      artists.fabric = artists.fabrictype + "(" + artists.per1 + "%" + artists.yarnblend1 + artists.per2 + "%" + artists.yarnblend2 + artists.per3 + "%" + artists.yarnblend3 + artists.per4 + "%" + artists.yarnblend4 + artists.per5 + "%" + artists.yarnblend5 + ")";

      totalper = parseInt(artists.per1) + parseInt(artists.per2) + parseInt(artists.per3) + parseInt(artists.per4) + parseInt(artists.per5);
      artists.per = totalper;
      if (totalper > 100) {
        alert(artists.per + " Yarn  PerCentage Exceed.Maximum 100 % only Allowed . per5 Field" + artists.per5);
      }

    }
  };






  let validcheck = true;
  const validate = (fab) => {

    if (!fab.fabrictype) {
      alert("Invalid fabrictype");
      validcheck = false;
      return;
    }

    if (/^[a-zA-Z]$/.test(fab.fabric)) {
      alert("Special Charector not allowed");
      validcheck = false;
      return;
    }
    return validcheck;
  }




  useEffect(() => {
    axios.get(`${GridData}`).then((res) => {
      setFabItems(res.data);
      axios.get(`${GetYarnBlendMaster}`).then((res) => {
        setFabYarnBlend(res.data);
        axios.get(`${GetFabricTypeMaster}`).then((res) => { setFabTypeData(res.data); })
          .catch((error) => { setFetchError(error); });
      }).catch((error) => { setFetchError(error) });
    }).catch((error) => { setFetchError(error); });
  }, [])

  useEffect(() => {
    const filterResult = fabItems.filter((item) => ((item.fabrictype).includes(fab_Search)) || ((item.fabric).includes(fab_Search)))
    setFab_FilterSearch(filterResult.reverse());
  }, [fabItems, fab_Search]);

  const FabMasterCheck = (id) => {
    try {
      axios.get(`${GridData}/${id.asptblfabmasid}`)
        .then((res) => {
          if (res.data.length === 0) { alert("Invalid Data") } else {
            setActive(res.data[0].active === "T" ? true : false);
            setOraganic(res.data[0].organic === "T" ? true : false);
            setFab({
              asptblfabmasid: res.data[0].asptblfabmasid,
              fabrictype: res.data[0].asptblfabrictypemasid,
              per: res.data[0].per,
              per1: res.data[0].per1,
              per2: res.data[0].per2,
              per3: res.data[0].per3,
              per4: res.data[0].per4,
              per5: res.data[0].per5,
              yarnblend1: res.data[0].yarn1,
              yarnblend2: res.data[0].yarn2,
              yarnblend3: res.data[0].yarn3,
              yarnblend4: res.data[0].yarn4,
              yarnblend5: res.data[0].yarn5,
              fabric: res.data[0].fabric,
              aliasname: res.data[0].aliasname,
              hsn: res.data[0].hsn,
              active: active,
              organic: organic
            });


            //==========================

            setArtists({
              fabrictype: res.data[0].fabrictype,
              per: res.data[0].per,
              per1: res.data[0].per1,
              per2: res.data[0].per2,
              per3: res.data[0].per3,
              per4: res.data[0].per4,
              per5: res.data[0].per5,
              yarnblend1: res.data[0].yarnblend1,
              yarnblend2: res.data[0].yarnblend2,
              yarnblend3: res.data[0].yarnblend3,
              yarnblend4: res.data[0].yarnblend4,
              yarnblend5: res.data[0].yarnblend5,
              fabric: res.data[0].fabric,
              aliasname: res.data[0].aliasname,
              hsn: res.data[0].hsn,
            });


          }
        })
        .catch((error) => { setFetchError(error) });
    }
    catch (err) {
      if (err.response) {
        console.log(`Error ${err.message}`);
      }
    }
    finally {



    }
  }


  const FabricMaster_Save = async () => {
    if (parseInt(artists.per) === 100) {
      try {

        const CountryData = {
          asptblfabmasid: fab.asptblfabmasid > 0 ? fab.asptblfabmasid : 0,
          fabrictype: fab.fabrictype,
          per: fab.per,
          per1: fab.per1,
          per2: fab.per2 === "" ? undefined : fab.per2,
          per3: fab.per3 === "" ? undefined : fab.per3,
          per4: fab.per4 === "" ? undefined : fab.per4,
          per5: fab.per5 === "" ? undefined : fab.per5,
          yarnblend1: fab.yarnblend1 === "" ? undefined : fab.yarnblend1,
          yarnblend2: fab.yarnblend2 === "" ? undefined : fab.yarnblend2,
          yarnblend3: fab.yarnblend3 === "" ? undefined : fab.yarnblend3,
          yarnblend4: fab.yarnblend4 === "" ? undefined : fab.yarnblend4,
          yarnblend5: fab.yarnblend5 === "" ? undefined : fab.yarnblend5,
          fabric: artists.fabric,
          aliasname: fab.aliasname,
          hsn: fab.hsn,
          active: active === true ? "T" : "F",
          organic: organic === true ? "T" : "F"
        };
        axios.post(`${insert_update}`, CountryData)
          .then((respose) => {
            if (respose.data.asptblfabmasid === 0) {
              alert("Record Saved Successfully");
            }
            else {
              alert("Record Updated Successfully");
            }
            axios.get(`${GridData}`)
              .then((res) => { setFabItems(res.data); })
              .catch((error) => { setFetchError(error) });

          }).catch((error) => {
            alert(error);
            setFetchError(error)
          });
      }
      catch (err) {
        console.log(`Error . ${err}`);
      }
      finally {
        FabricMaster_New();
      }
    } else {
      if (parseInt(artists.per) > 100) {
        alert("Maximum % Exceed" + artists.per);
        return;
      }
      if (parseInt(artists.per) < 100) {
        alert("Minimum % Bleow" + artists.per);
        return;
      }
    }

  }



  const FabricMaster_Delete = async (id) => {
    try {
      if (fab.asptblfabmasid == '') { alert(`Empty Not Allowed`); return; }
      await axios.delete(`${deleteData}/${id.asptblfabmasid}`)
        .then((respose) => {
          if (respose.data.asptblfabmasid > 0) {
            axios.get(`${GetYarnBlendMaster}`)
              .then((res) => { setFabItems(res.data.reverse()); })
              .catch((error) => { alert(error); setFetchError(error) });
            alert("Record Deleted Successfully");
          }
          else {
            setFetchError(respose.error)
            alert(respose.error);
          }
        }).catch((error) => {
          alert(error);
          setFetchError(error)
        });
    }
    catch (err) {
      if (err.response) {
        console.log(`Error ${err.message}`);
        alert(err.error);
      }
    }
  }



  const FabricMaster_New = () => {
    setNewButton(1);totalper=0;
    setArtists({
      asptblfabmasid: "0", fabrictype: "", per1: "", per2: "", per3: "", per4: "", per5: "",
      yarnblend1: "", yarnblend2: "", yarnblend3: "", yarnblend4: "", yarnblend5: "", fabric: "",
      aliasname: "", hsn: "",per:0,organic:false
    }); setActive(false); setOraganic(false);  setFab([]); }

  const FabricMaster_Search = () => {



  }


  const commentsData = useMemo(() => {
    let computedComments = fabItems;
    if (fab_Search) {
      computedComments = computedComments.filter((item) => ((item.fabrictype).includes(fab_Search)) || ((item.fabric)).includes(fab_Search)
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
  }, [fabItems, currentPage, fab_Search, sorting])


  return (
    <form onSubmit={handleSubmit} >
      <div className='container-fluid animate-zoom' style={{ textAlign: "left", borderTop: "1px solid var(--bs-white)" }} >
        <div className='row' style={{ textAlign: "right" }}>
          <ul >
            <li> <button type='submit' onClick={() => FabricMaster_New()} style={{ backgroundColor: `${color1[0]}` }}>News</button></li>
            <li> <button type='submit' onClick={() => FabricMaster_Save()} style={{ backgroundColor: `${color1[1]}` }}>Save</button></li>
            <li> <button type='submit' onClick={() => FabricMaster_Delete()} style={{ backgroundColor: `${color1[2]}` }}>Delete</button></li>
            <li> <button type='submit' onClick={() => FabricMaster_Search()} style={{ backgroundColor: `${color1[3]}` }}> Search </button></li>
          </ul>
        </div>
        <div className='row'>
          <div className='col-md-5' style={{ backgroundColor: "var(--bs-white)", padding: "0" }}>

            <div className='bloc-tabs' >
              <div className="tabs active-tabs" style={{ color: `${colorValue}` }}> {title} </div>
            </div>
            <div className='content active-content' style={{ backgroundColor: "var(--bs-light)", paddingBottom: "30px" }}>

              <fieldset><legend></legend>
                <div className='container-fluid'>
                  <div className='row' style={{ display: HeadersColumn[0].visible }}>
                    <label className='col-md-2' > ID </label>
                    <input className='col-md-1' type='text' name='asptblfabmasid' value={fab.asptblfabmasid || '0'} readOnly />
                  </div>
                  <div className='row'>
                    <label className='col-md-2'  > Organic </label>
                    <label className='checkbox' style={{ padding: "0px", width: "60px" }}>
                      <input type="checkbox" name='organic' checked={organic} onChange={(e) => setOraganic(e.target.checked)} />
                      <span></span>
                      <i className='indicator'></i>
                    </label>
                  </div>
                  <div className='row py-1' >
                    <label className='col-md-2' > FabricType </label>
                    <select className='col-md-10' name='fabrictype' id="fabrictype" autoFocus value={fab.fabrictype || ""} onChange={handleChange} >
                      <option></option>
                      {
                        fabTypeData !== null &&
                        fabTypeData.map((result, index) => (
                          <option key={index} value={result.asptblfabrictypemasid}>
                            {result.fabrictype}
                          </option>))
                      }
                    </select>
                  </div>
                  <div className='row' >
                    <label className='col-md-2' > Per1 </label>
                    <input className='col-md-2' type='text' name="per1" id="per1"
                      value={fab.per1 || ""} onChange={handleChange}
                    />
                    <label className='col-md-3' > Yarn Blend </label>
                    <select className='col-md-5' name='yarnblend1' id="yarnblend1" value={fab.yarnblend1 || ""} onChange={handleChange} >
                      <option></option>
                      {
                        fabYarnBlend !== null &&
                        fabYarnBlend.map((result, index) => (
                          <option key={index} value={result.asptblyarblemasid}>
                            {result.yarnblend}
                          </option>))
                      }
                    </select>
                  </div>

                  <div className='row py-1' >
                    <label className='col-md-2' > Per2 </label>
                    <input className='col-md-2' type='text' name="per2" id="per2"
                      value={fab.per2 || ""} onChange={handleChange} />
                    <label className='col-md-3' > Yarn Blend </label>
                    <select className='col-md-5' name='yarnblend2' id="yarnblend2" value={fab.yarnblend2 || ""} onChange={handleChange} >
                      <option></option>
                      {
                        fabYarnBlend !== null &&
                        fabYarnBlend.map((result, index) => (
                          <option key={index} value={result.asptblyarblemasid}>
                            {result.yarnblend}
                          </option>))
                      }
                    </select>
                  </div>

                  <div className='row' >
                    <label className='col-md-2' > Per3 </label>
                    <input className='col-md-2' type='text' name="per3" id="per3"
                      value={fab.per3 || ""} onChange={handleChange}
                    />
                    <label className='col-md-3' > Yarn Blend </label>
                    <select className='col-md-5' name='yarnblend3' id="yarnblend3" value={fab.yarnblend3 || ""} onChange={handleChange} >
                      <option></option>
                      {
                        fabYarnBlend !== null &&
                        fabYarnBlend.map((result, index) => (
                          <option key={index} value={result.asptblyarblemasid}>
                            {result.yarnblend}
                          </option>))
                      }
                    </select>
                  </div>
                  <div className='row py-1' >
                    <label className='col-md-2' > Per4 </label>
                    <input className='col-md-2' type='text' name="per4" id='per4'
                      value={fab.per4 || ""} onChange={handleChange}
                    />
                    <label className='col-md-3' > Yarn Blend </label>
                    <select className='col-md-5' name='yarnblend4' id="yarnblend4" value={fab.yarnblend4 || ""} onChange={handleChange} >
                      <option></option>
                      {
                        fabYarnBlend !== null &&
                        fabYarnBlend.map((result, index) => (
                          <option key={index} value={result.asptblyarblemasid}>
                            {result.yarnblend}
                          </option>))
                      }
                    </select>
                  </div>
                  <div className='row' >
                    <label className='col-md-2' > Per5 </label>
                    <input className='col-md-2' type='text' name="per5" id='per5'
                      value={fab.per5 || ""} onChange={handleChange}
                    />
                    <label className='col-md-3' > Yarn Blend </label>
                    <select className='col-md-5' name='yarnblend5' id="yarnblend5" value={fab.yarnblend5 || ""} onChange={handleChange} >
                      <option></option>
                      {
                        fabYarnBlend !== null &&
                        fabYarnBlend.map((result, index) => (
                          <option key={index} value={result.asptblyarblemasid}>
                            {result.yarnblend}
                          </option>))
                      }
                    </select>
                  </div>
                  <div className='row py-1' >
                    <label className='col-md-2' > Fabric  </label>
                    <input className='col-md-10' type='text' name="fabric" id='tel'
                      value={artists.fabric || ""}
                    />
                  </div>
                  <div className='row' >
                    <label className='col-md-2' > AliasName </label>
                    <input className='col-md-10' type='text' name="aliasname"
                      value={fab.aliasname || ""} onChange={handleChange}
                    />
                  </div>
                  <div className='row py-1' >
                    <label className='col-md-2' > HSN </label>
                    <input className='col-md-10' type='text' name="hsn"
                      value={fab.hsn || ""} onChange={handleChange}
                    />
                  </div>
                  <div className='row'>
                    <label className='col-md-2'  > Active </label>
                    <label className='checkbox' style={{ padding: "0px", width: "60px" }}>
                      <input type="checkbox" name='active' checked={active} onChange={(e) => setActive(e.target.checked)} />
                      <span></span>
                      <i className='indicator'></i>
                    </label>
                    <input className='col-md-2' type='text' name="per"
                      value={artists.per || ""}
                      style={{ display: HeadersColumn[0].visible }} />
                  </div>
                </div>
              </fieldset>



            </div>
          </div>

          <div className='col-md-7' style={{ backgroundColor: "var(--bs-white)", padding: "0" }}>
            <div className='bloc-tabs' >
              <div className="tabs active-tabs" style={{ color: `${colorValue}` }}> {subTitle} </div>
            </div>
            <div className='content-tabs' >
              <Search colorValue={colorValue} searchs={fab_Search} setsearchs={setFab_Search}
                SearchLable1={searchLable1} SearchLable2={searchLable2}
                SearchLable3={searchLable3}
                handleChange={handleChange} ChangeValues={fab}
                searchCompCode={searchCompCode} searchUserName={searchUserName} />

              <DataTable heights={heights} colorValue={colorValue} headers={HeadersColumn}
                comments={fabItems} setComments={setFabItems}
                searches={fab_Search} setSearches={setFab_Search}
                totalItems={totalItems} setTotalItems={setTotalItems}
                currentPage={currentPage} setCurrentPage={setCurrentPage}
                sorting={sorting} setSorting={setSorting} ITEM_PER_PAGE={ITEM_PER_PAGE}
                EditData={FabMasterCheck}
                commentsData={commentsData} checkall={checkall} setCheckAll={setCheckAll} />

            </div>
          </div>
        </div>




      </div>

    </form>
  )
}

export default FabricMaster
