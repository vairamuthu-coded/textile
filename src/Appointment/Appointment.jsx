import React, { useContext, useEffect, useState } from "react";
import Home from "./Home";
import Edit from "./Edit";
import Delete from "./Delete";
import New from "./New";
import DataContext from "../context/CreateUserContext";
import { getDefaultUrl, testData, openModal, entry, filter } from "./Lib";

import axios from "axios";
const Appointment = () => {
  let { colorValue } = useContext(DataContext);
  const [dataList, setDataList] = useState([]);
  const [refreshdata, setrefreshdata] = useState(0);
  const [stateListener, setStateListener] = useState(0);
  const url = "http://192.168.101.15:8083/api/Appointments";

  useEffect(() => {
    getDefaultUrl(`${url}`).then((data) => {
      setStateListener(Math.random() * 500 * Math.random());
      setDataList(data);
    });
  }, [refreshdata]);

  const filterApp = (e) => {
    let { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      filter[name] = checked;
    }
    if (name === "period") {
      let sd = new Date(),
        ed = new Date();
      const daynum = sd.getDay();
      if (value === "1") {
           sd.setDate(daynum-1); 
      }
      if (value === "2") {
        let startDayInSec = (daynum - 1) * 24 * 60 * 60 * 1000;
        let endDayInSec = (7 - 1) * 24 * 60 * 60 * 1000;
        sd = new Date(Date.now() - startDayInSec);
        ed = new Date(Date.now() + endDayInSec);
      }
      if (value === "3") {
        let startDayInSec = daynum  * 24 * 60 * 60 * 1000;
        let endDayInSec = (6 + daynum) * 24 * 60 * 60 * 1000;
        ed = new Date(Date.now() - startDayInSec);
        sd = new Date(Date.now() - endDayInSec);
      }
       
            filter.startDate = value === '4' ? null : sd.getFullYear()+"-"+sd.getMonth()+"-"+sd.getDay();
            filter.endDate =  value === '4' ? null : ed.getFullYear()+"-"+ed.getMonth()+"-"+ed.getDay();
            filter.specifiedDate = null;
            
    }
    if (name === "specifiedDate") {
      filter.specifiedDate = value;
       filter.startDate = null;
       filter.endDate = null;
        
    }
    if (name === "specifiedTime" ) {
      filter.specifiedTime =value;      
    }
    if (name === "levelOfImportance") {
      filter.levelOfImportance = Number(value) === 9 ? null : Number(value);
    }
   
  axios.post(`${url}/${"filters"}`, filter).then((r) => {
     alert(JSON.stringify(filter))
        if (r.length < 1) {
          alert("Filter Result is Empty");
        }
        setDataList(r.data);
      }).catch((e) => alert(e));
  };

  // const postApp = async (url, filter) => {
    //  axios.post(`${url}/${"filters"}`,filter).then((r) => {
    //     if (r.length < 1) {
    //       alert("Filter Result is Empty");
    //     }
    //     setDataList(r);
    //   }).catch((e) => alert(e));
  //};

  useEffect(() => {
    getDefaultUrl(`${url}`).then((data) => {
      setDataList(data);
    });
  }, [refreshdata]);

 

  return (
    <>
      <div className="container-fluid">
        <div className="row" style={{ padding: "5px" }}>
          <h3>
            <label className="col-md-1">Filter </label>
            <input type="text" name="search" className="col-md-2"></input>
            <button className="col-md-2" onClick={() =>window.location.reload()}>
              Clear-Filters
            </button>
            <button
              type="submit"
              className="btn col-md-1 right"
              onClick={() => openModal("new_modal")}
            >
              <i class="fa fa-plus" aria-hidden="true"></i>
            </button>
          </h3>
          <div className="col-md-12">
            <label>All</label>
            <input
              className="col-md-1"
              type="checkbox"
              id="All_f"
              name="all"
              onChange={filterApp}
            />
            <label className="notifications">Done</label>
            <input
              className="col-md-1"
              type="checkbox"
              id="Done_f"
              name="done"
              onChange={filterApp}
            />
            <label>Deleted</label>
            <input
              className="col-md-1"
              type="checkbox"
              id="Deleted_f"
              name="deleted"
              onChange={filterApp}
            />
            <label className="col-md-1">Period</label>
            <select className="col-md-1" name="period" id="period" defaultValue={4} onChange={filterApp} >   
              <option value={4}>default</option>
              <option value={1}>Today</option>
              <option value={2}>This Week</option>
              <option value={3}>Last Week</option>
            </select>
            <label className="col-md-1" htmlFor="specifiedDate">
              {" "}
              Date
            </label>
            <input
              className="col-md-1"
              type="date"
              id="SpecifiedDate"
              name="specifiedDate"
              onChange={filterApp}
            />
            <label className="col-md-1" htmlFor="SpecifiedTime">
              {" "}
              Time
            </label>
            <input
              className="col-md-1"
              type="time"
              id="SpecifiedTime"
              name="specifiedTime"
              onChange={filterApp}
            />
            <label className='col-md-1' >Level-Of-Im</label>
        <select className='col-md-1' name='levelOfImportance' id='levelOfImportance'  defaultValue={4} onChange={filterApp} >
             <option value={0} disabled>level of importance </option>
            <option  value={1}>Very-Low </option>
            <option  value={2}>Low </option>
            <option  value={3}>Normal </option>
            <option  value={4}>Medium </option>
            <option  value={5}>High </option>
            <option  value={6}>Very-Hight </option>         
        </select>     
          </div>
        </div>
        <div style={{ border: `1px solid ${colorValue}` }}></div>
        <div className="row">
          <table className="row">
            <thead className="row">
              <th className="col-md-1">
                <label className="col-md-1" style={{ color: "white" }}>
                  #
                </label>
              </th>
              <th className="col-md-1">
                <label className="col-md-1" style={{ color: "white" }}>
                  Title
                </label>
              </th>
              <th className="col-md-2">
                <label className="col-md-2" style={{ color: "white" }}>
                  Description
                </label>
              </th>
              <th className="col-md-1">
                <label className="col-md-1" style={{ color: "white" }}>
                  {" "}
                  Importance
                </label>
              </th>
              <th className="col-md-1">
                <label className="col-md-1" style={{ color: "white" }}>
                  Date
                </label>
              </th>
              <th className="col-md-1">
                <label className="col-md-1" style={{ color: "white" }}>
                  Time
                </label>
              </th>
              <th className="col-md-3">
                <label className="col-md-3" style={{ color: "white" }}>
                  Address
                </label>
              </th>
              <th className="col-md-1">
                <label className="col-md-1" style={{ color: "white" }}>
                  {" "}
                  Edit
                </label>
              </th>
              <th className="col-md-1">
                <label className="col-md-1" style={{ color: "white" }}>
                  Delete
                </label>
              </th>
            </thead>
            {dataList.length === 0 ? (
              <div className="row">
                Loading...<div className="loading"> ... </div>
              </div>
            ) : (
              <tbody style={{ height: "390px", overflow: "auto" }}>
                <tr className="row">
                  {dataList.map((item) => (
                    <td key={item.asptblAppointmentmasid}>
                      <Home
                        item={item}
                        key={item.asptblAppointmentmasid}
                        stateListener={setStateListener} 
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
      <section className="modal new_modal hidden">
        <New refreshApp={setrefreshdata} url={url} setDataList={setDataList} />
      </section>
      <section className="modal edit_modal hidden">
        <Edit
          stateListener={stateListener}
          url={url}
          setDataList={setDataList}
        />
      </section>
      <section className="modal delete_modal hidden">
        <Delete
          stateListener={stateListener}
          url={url}
          setDataList={setDataList}
        />
      </section>
      {/*   */}
    </>
  );
};

export default Appointment;
