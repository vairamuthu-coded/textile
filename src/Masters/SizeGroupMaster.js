import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import DataContext from '../context/CreateUserContext';
import DataTable from '../Custom/DataTable';
import axios from 'axios';
import SocialMissing from '../Social/SocialMissing';

const SizeGroupMaster = ({ title, subTitle, colorValue }) => {
    const { API_URL, newButton, handleSubmit, tabindex,  currentPage, setCurrentPage,
         CountryParam,
        sorting, setSorting, setNewButton, sizeGroup, setSizeGroup ,color1} = useContext(DataContext)
    let ITEM_PER_PAGE = 15;
    const insert_update = API_URL + "/SizeGroupMasters/PostSizeGroupMaster";
    const insert_update1 = API_URL + "/SizeGroupMasters/PostSizeGroupDetMaster";
    const sizeparam = API_URL + "/SizeMasters/GetSizeMaster";
    const sizeGroupParam = API_URL + "/SizeGroupMasters/GetSizeGroupMaster";
    const deleteData = API_URL + "/SizeGroupMasters/DeleteSizeGroupMaster";
    const sizeGroupdetParam = API_URL + "/SizeGroupMasters/GetSizeGroupDetMaster";
    const sizeGroupMaxID = API_URL + "/SizeGroupMasters/GetMaxSizeGroupID";
    const [fetchError, setFetchError] = useState(null)
    const [data, setData] = useState([])
      const [totalItems,setTotalItems]=useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [search, setSearch] = useState('');
    const [items, setItems] = useState([])
    const [sizeItems, setSizeItems] = useState([])
    const [active, setActive] = useState(false)
    const [sizeGroup_FilterSearch, setSizeGroup_FilterSearch] = useState([]);
    const [sizeGroupGrid, setSizeGroupGrid] = useState([])
    const [addRows, setAddRows] = useState([{ asptblsizgrpDetid: '0', asptblsizgrpid: '0', sizename: '', sizegroup: '', notes: '' }])


    setNewButton(1);



    let validcheck = true;
    const validate = (sizeGroup) => {
        if (!sizeGroup.sizegroup.trim()) {
            alert("Invalid Country Name");
            validcheck = false;
            return;
        }
        if (/^[a-zA-Z]$/.test(sizeGroup.sizegroup)) {
            alert("Special Charector not allowed");
            validcheck = false;
            return;
        }
        return validcheck;
    }

    useEffect(() => {
        axios.get(`${sizeGroupParam}`)
            .then((res) => {
                setItems(res.data); setNewButton(1);
                axios.get(`${sizeparam}`).then((res) => {
                    setSizeItems(res.data);
                });
            })
            .catch((error) => { setFetchError("Service does't running. pls check (Country Master) API in Country Controller") });
    }, [])

    useEffect(() => {
        const filterResult = items.filter((post) => ((post.sizegroup).includes(search)))
        setSizeGroup_FilterSearch(filterResult);
    }, [items, search]);

    const HeadersColumn =
        [
            { headername: "",field: "visible" },
            { headername: "id", field: "asptblsizgrpid" },
            { headername: "SizeGroup", field: "sizegroup" },
            { headername: "Active", field: "active" }
        ]

    // const HeadersColumnGrid =
    //     [
    //         { headername: "S.No", field: "SNo", fields: "SNo", types: "text", widths: "20px", readonly: "block", },
    //         { headername: "ID", field: "asptblsizgrpDetid", fields: "asptblsizgrpDetid", types: "text", widths: "30px", readonly: "none" },
    //         { headername: "ID1", field: "asptblsizgrpid", fields: "asptblsizgrpid", types: "text", widths: "50px", readonly: "none" },
    //         { headername: "SizeName", field: "sizename", fields: "sizename", types: "text", widths: "50px", readonly: "block" },
    //         { headername: "SizeGroup", field: "sizegroup", fields: "sizegroup", types: "text", widths: "30px", readonly: "block" },
    //         { headername: "Notes", field: "notes", fields: "notes", types: "text", widths: "30px", readonly: "block" },
    //     ]

    const heights = "420px";




    const SizeGropupMaster_Check = (id) => {
        try {

            const myitem = items.filter(item => item.asptblsizgrpid == id.asptblsizgrpid);
            const updatepost = { asptblsizgrpid: myitem[0].asptblsizgrpid, sizegroup: myitem[0].sizegroup, Active: myitem[0].active === "T" ? true : false };
            setActive(updatepost.Active);
            setSizeGroup({ asptblsizgrpid: updatepost.asptblsizgrpid, sizegroup: updatepost.sizegroup, active: active })
            if (updatepost.asptblsizgrpid > 0) {
                axios.get(`${sizeGroupdetParam}/${updatepost.asptblsizgrpid}`).then((res) => {
                    setAddRows(res.data);
                }).catch((error) => { alert(error) });
            }
        }
        catch (err) {
            if (err.response) {

                setFetchError(err.response)
            }
        }
        finally {
            setNewButton(1)

        }
    }
    let maxid = "";
    function ListData(useStateItems) {
        var data = [];
       
                useStateItems.forEach((obj) => {

                    var alldata = {                       
                        asptblsizgrpDetid: obj.asptblsizgrpDetid==='' || obj.asptblsizgrpDetid===null ? 0 : obj.asptblsizgrpDetid,
                        asptblsizgrpid: maxid,
                        sizename: obj.sizename,
                        sizegroup: sizeGroup.sizegroup,
                        notes: obj.notes,
                    }
                    data.push(alldata);
                })
           
  
        return data;
    }



    const SizeGropupMaster_Save = async () => {

        try {
            if(sizeGroup.asptblsizgrpid===0){
           await axios.get(`${sizeGroupMaxID}`).then((res) => {maxid = res.data[0].asptblsizgrpid; }).catch((error) => { });
            }else{
                maxid=sizeGroup.asptblsizgrpid;
            }
            if (maxid > 0) {
                var users = ListData(addRows);
                var splitdata = ""; var i = 0;
                const CountryData = { asptblsizgrpid: sizeGroup.asptblsizgrpid > 0 ? sizeGroup.asptblsizgrpid : 0, sizegroup: sizeGroup.sizegroup, Active: active === true ? "T" : "F" };
                await axios.post(`${insert_update}`, CountryData)
                    .then((respose) => {
                        if (respose.data !== "") {                   
                            return users.forEach((obj) => {
                                i++;
                                return axios.post(`${insert_update1}/${i}`, obj).then((respose1) => {                                   
                                    splitdata = respose1.data.split('-');
                                    if (splitdata[0].toString() === users.length.toString()) {
                                        alert(splitdata[1]);
                                        SizeGropupMasterNew();
                                    }
                                })
                            });

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
            setFetchError(`Error . ${err}`);
        }


    }

    const SizeGropupMaster_Delete = async () => {
        try {
            if (sizeGroup.sizegroup === '') { alert(`Empty Not Allowed`); return; }
            if (sizeGroup.asptblsizgrpid >= 1) {
                const asptblsizgrpid = sizeGroup.asptblsizgrpid;
                await axios.delete(`${deleteData}/${asptblsizgrpid}`)
                    .then((respose) => {
                        alert(JSON.stringify(respose.data));
                        if (respose.data !== "") {
                            axios.get(`${sizeGroupParam}`)
                                .then((res) => { setItems(res.data); setNewButton(1); })
                                .catch((error) => { alert(error); setFetchError(error) });
                            alert("Record Deleted Successfully");
                            SizeGropupMasterNew();
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



    const SizeGropupMasterNew = () => {
        setNewButton(1); setAddRows([{ asptblsizgrpDetid: '', asptblsizgrpid: '', sizename: '', sizegroup: '', notes: '' }]);
        setSizeGroup({ asptblsizgrpid: '0', sizegroup: "", active: active }); setActive(false)
        axios.get(`${sizeGroupParam}`)
            .then((res) => {
                setItems(res.data);


            })
            .catch((error) => { });


    }

    const commentsData = useMemo(() => {
        let computedComments = items;
        if (search) {
            computedComments = computedComments.filter((item) => ((item.sizegroup).includes(search)))
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
    }, [items, currentPage, search, sorting])


    const handleChangeCheckbox = (e, index, id) => {
        const { name, value, checked } = e.target;
        const newContacts = [...sizeGroupGrid];
    }
    const handleChange = (e) => {
        ;
        const { name, value } = e.target;
        setSizeGroup((previousValue) => {
            return {
                ...previousValue, [name]: value.toUpperCase(),
            }
        })
    };


    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const values = [...addRows];
        if (name === "sizename") {
            values[index].sizename = value;
        }        
        if (name === "notes") {
            values[index].notes = value.toUpperCase();
           
           
        }
       
        setAddRows(values);
    };

    const handleAddRow = () => {
        setAddRows([...addRows, { asptblsizgrpDetid: '', asptblsizgrpid: '', sizename: '', sizegroup: '', notes: '' }]);
    };

    return (
        <form onSubmit={handleSubmit}  >
            <div className='container-fluid animate-zoom' >

                <div className='row' style={{ backgroundColor: "white" }}>
                    {/* {!fetchError ? (
    <> */}
                    <div className='col-md-12' style={{ textAlign: "right" }}>
                        <div style={{ background: "var(--bs-header)" }}>
                            <ul >
                                <li> <button type='submit' onClick={() => SizeGropupMasterNew()}  style={{ backgroundColor: `${color1[0]}` }}>News</button></li>
                                <li> <button type='submit' onClick={() => SizeGropupMaster_Save()} style={{ backgroundColor: `${color1[1]}` }}>Save</button></li>
                                <li> <button type='submit' onClick={(e) => SizeGropupMaster_Delete()} style={{ backgroundColor: `${color1[2]}` }}>Delete</button></li>
                                <li> <button type='submit' onClick={() => SizeGropupMasterNew()} style={{ backgroundColor: `${color1[3]}` }}> Search </button></li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-md-9' style={{ backgroundColor: "var(--bs-white)", padding: "0" }}>
                        <div className='bloc-tabs' >
                            <div className="tabs active-tabs" style={{ color: `${colorValue}` }}> {title} </div>
                        </div>

                        <div className='content-tabs' >
                            <div className={newButton === 1 ? "content active-content" : "content"}>

                                <div className='content active-content' >
                                    <div className='row py-1' style={{display:"none"}}>
                                        <label className='col-md-2' > ID </label>
                                        <input className='col-md-1' type='text' name="asptblsizgrpid" value={sizeGroup.asptblsizgrpid} readOnly onChange={handleChange} />
                                    </div>
                                    <div className='row' >
                                        <label className='col-md-2' > SizeGroup </label>

                                        <input className='col-md-3' name="sizegroup" type='text' autoFocus value={sizeGroup.sizegroup} onChange={handleChange} />
                                    </div>
                                    <div className='row py-1'>
                                        <label className='col-md-2' > Active </label>
                                        <label className='checkbox' style={{ padding: "0px", width: "60px" }}>
                                            <input type="checkbox" name="active" checked={active} onChange={(e) => setActive(e.target.checked)} />
                                            <span></span>
                                            <i className='indicator'></i>
                                        </label>
                                    </div>
                                </div>


                            </div>
                            <div style={{ overflow: "hidden", height: "390px" }} className='col-md-12'>
                                <div style={{ overflow: "auto", height: "360px" }}  >
                                    <table className='table table-responsive table-striped' id='maintable' >
                                        <thead style={{ backgroundColor: `${colorValue}`, position: "sticky" }}   >
                                            <tr>

                                                <div style={{ color: `var(--bs-white)`, width: "10px" }}>S.No </div>
                                                <th style={{ color: `var(--bs-white)`, width: "50px", display: "none" }}>asptblsizgrpDetid </th>
                                                <th style={{ color: `var(--bs-white)`, width: "50px", display: "none" }}>asptblsizgrpid </th>
                                                <th style={{ color: `var(--bs-white)`, width: "100px" }}>SizeName </th>
                                                <th style={{ color: `var(--bs-white)`, width: "100px",display: "none" }} >sizegroup </th>
                                                <th style={{ color: `var(--bs-white)`, width: "20px" }}>Notes </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                addRows.map((row, index) => (
                                                    <tr key={index} style={{ border: "none", padding: "0", margin: "0" }}   >
                                                       <td style={{ backgroundColor: `${colorValue}`, color: `var(--bs-white)`}}width={"1px"} > {index + 1}</td>
                                                        <td style={{ display: "none" }}  ><input type='text' name='asptblsizgrpDetid' value={row.asptblsizgrpDetid} onChange={(e) => handleInputChange(e, index)} style={{ border: "none", padding: "0px", margin: "0px" }} className='col-md-12' />                                </td>
                                                        <td style={{ display: "none" }} ><input type='text' name='asptblsizgrpid' value={row.asptblsizgrpid} onChange={(e) => handleInputChange(e, index)} style={{ border: "none", padding: "0px", margin: "0px" }} className='col-md-12' />                                </td>
                                                        <td>
                                                            <select name='sizename' value={row.sizename} onChange={(e) => handleInputChange(e, index)} style={{ border: "none", padding: "0px", margin: "0px" }} className='col-md-12' autoFocus>
                                                                <option></option>
                                                                {
                                                                    sizeItems !== null &&
                                                                    sizeItems.map((result, index) => (<option key={index} value={result.asptblsizmasid}>
                                                                        {result.sizename}
                                                                    </option>))
                                                                }
                                                            </select>                                </td>
                                                        <td style={{ display: "none" }}><input type='text' name='sizegroup' value={row.sizegroup} onChange={(e) => handleInputChange(e, index)} style={{ border: "none", padding: "0px", margin: "0px" }} className='col-md-12' />                                </td>
                                                        <td><input type='text' name='notes' value={row.notes} onChange={(e) => handleInputChange(e, index)} style={{ border: "none", padding: "0px", margin: "0px" }} className='col-md-12' />                                </td>

                                                    </tr>

                                                ))}
                                        </tbody>

                                    </table>

                                </div>
                                <div className='row' >

                                    <div className='col-md-12' style={{backgroundColor: `${colorValue}`}} >
                                        <h3 style={{ backgroundColor: `${colorValue}`,color:"var(--bs-white)", float: "right" }} onClick={handleAddRow} >AddRows</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3' style={{ backgroundColor: "var(--bs-white)", padding: "0" }}>

                        <div className='bloc-tabs' >
                            <div className="tabs active-tabs" style={{ color: `${colorValue}` }}> {subTitle} </div>
                        </div>
                        <div className={newButton === 1 ? "content active-content" : "content"} >
                            <DataTable heights={heights} colorValue={colorValue} headers={HeadersColumn}
                                comments={items} setComments={setItems}
                                searches={search} setSearches={setSearch}
                                totalItems={totalItems} setTotalItems={setTotalItems}
                                currentPage={currentPage} setCurrentPage={setCurrentPage}
                                sorting={sorting} setSorting={setSorting} ITEM_PER_PAGE={ITEM_PER_PAGE}
                                EditData={SizeGropupMaster_Check}
                                commentsData={commentsData}
                            />

                        </div>
                    </div>
                    {/* </>
) : <SocialMissing colorValue={colorValue} fetchError={fetchError} ></SocialMissing> } */}

                </div>
            </div>
        </form>
    )


}



export default SizeGroupMaster
