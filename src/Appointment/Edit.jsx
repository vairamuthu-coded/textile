import React, { useEffect, useState } from "react";
import {
  activeId,
  closeModal,
  entry,
  filter,
  getDefaultUrl,
  postappointment,
} from "./Lib";
import axios from "axios";

const Edit = (props) => {
  const url = props.url;
  const [done_, setDone] = useState(false);
  const [delete_, setDelete] = useState(false);
  const [importance_, setImportance] = useState(0);
  const [datas, setDatas] = useState({});

  const editApp = (e) => {
    let { name, value, type, checked } = e.target;

    if (name === "done") {
      entry[name] = checked;
      setDone(checked);
      alert(checked + "==" + done_);
    }
    if (name === "deleted") {
      entry[name] = checked;
      setDelete(checked);
    }
    if (name === "levelofImportance") {
      entry[name] = value;

      setImportance(value);
    } else {
      entry[name] = value;
    }
  };

  useEffect(() => {
    setDone(entry.done);
    setDelete(entry.deleted);
    setImportance(entry.levelofImportance);
    setDatas(entry);
  }, [props.stateListener]);

  const updateApp = async (url, entry) => {
    await axios
      .put(`${url}/${activeId.id}`, entry)
      .then((r) => {
        if (r != "") {
          getDefaultUrl(`${url}`).then((data) => {
            props.setDataList(data);
          });
          alert("Record Updated Successfully");
        }
      })
      .catch((e) => alert("error happened at position of newapp", e));
    closeModal("edit_modal");
  };

  const clearApp = () => {
    closeModal("edit_modal");
  };
  const defaultDate =
    typeof entry.date === "string" ? entry.date.split("T")[0] : "";
  return (
    <div className="modal-container">
      {" "}
      <p className="right " onClick={() => closeModal("edit_modal")}>
        <i className="fa fa-times"></i>
      </p>
      <h3 className="modal-title">Update Appointment </h3>
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-12 mt-1">
            <label className="col-md-2">Title</label>
            <input
              type="text"
              className="col-md-7"
              name="title"
              defaultValue={datas.title}
              maxLength={50}
              onChange={editApp}
            ></input>
          </div>
          <div className="col-md-12 mt-1">
            <label className="col-md-2">Desc</label>
            <textarea
              className="col-md-7"
              name="Description"
              defaultValue={datas.description}
              maxLength={100}
              cols={3}
              rows={6}
              onChange={editApp}
            ></textarea>
          </div>
          <div className="col-md-12 mt-1">
            <label className="col-md-2">Address</label>
            <input
              type="text"
              className="col-md-7"
              name="Address"
              defaultValue={datas.address}
              maxLength={50}
              onChange={editApp}
            ></input>
          </div>
          <div className="col-md-12 mt-1">
            <label className="col-md-2">Level-Of-Im</label>
            <select
              className="col-md-7"
              name="levelofImportance"
              id="levelofImportance"
              defaultValue={datas.levelofImportance}
              onChange={editApp}
            >
              <option value={0} disabled>
                level of importance{" "}
              </option>
              <option value={1}> Very-Low </option>
              <option value={2}>Low </option>
              <option value={3}>Normal </option>
              <option value={4}>Medium </option>
              <option value={5}>High </option>
              <option value={6}>Very-Hight </option>
            </select>
          </div>
          <div className="col-md-12 mt-1">
            <label className="col-md-2">Date</label>
            <input
              type="date"
              className="col-md-2 me-2"
              name="date"
              defaultValue={defaultDate}
              onChange={editApp}
            ></input>

            <label className="me-2">Time</label>
            <input
              type="time"
              className="col-md-2 me-2"
              name="time"
              defaultValue={datas.time}
              onChange={editApp}
            ></input>
            <label className="me-2">Deleted</label>
            <input
              type="checkbox"
              className="col-md-1 me-2"
              name="deleted"
              checked={delete_}
              onChange={editApp}
            ></input>
            <label className="me-2">Done</label>
            <input
              type="checkbox"
              className="col-md-1"
              name="done"
              checked={done_}
              onChange={editApp}
            ></input>
          </div>
          <div className="col-md-12 mt-1 center">
            <label className="col-md-3"></label>

            <button
              type="button"
              className="col-md-3"
              name="add_n"
              onClick={() => updateApp(url, entry)}
            >
              Add
            </button>
            <button
              type="button"
              className="col-md-3"
              onClick={() => clearApp()}
              name="Add_n"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Edit;
