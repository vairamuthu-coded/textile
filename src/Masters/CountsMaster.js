import React, { useContext, useReducer, useRef, useState } from "react";
import DataContext from "../context/CreateUserContext";
import Posts from "../hooks/Posts";
import { EditableText } from "@blueprintjs/core";
export const ACTION = {
  ADD_VALUE: "ADD",
  ADD_DELETE: "DELETE",
  ADD_UPDATE: "UPDATE",
  ADD_EDIT: "EDIT",
  TOOGLE_TODO: "field",
  DELETE_TODO: "delete",
};

const CountsMaster = ({ title }) => {
  const {
    newButton,
    setNewButton,
    userRights,
    setUserRights,
    currentPage,
    setCurrentPage,
    API_URL,
    colorValue,
    defaultDetails,
    counts,
    setCounts,
    handlepage,
    sorting,
    setSorting,
    tabindex,
    state_CountryData,
    CityParam,
    searchLable1,
    searchLable2,
    searchLable3,
    isloading,
    setIsLoading,
    setSearchLable1,
    setSearchLable2,
    setSearchLable3,
    color1,
  } = useContext(DataContext);
  const [names1, setNames1] = useState([]);

  const [names, setNames] = useState([{ id: Date.now(), counts: "aaa", email: "bbbb", age: "40", gender: "m", loggedIn: false, error: "" }]);
  const initialState = { id: names.length + 1, counts: "", email: "", age: "", gender: "", loggedIn: false, error: "" };
  const [formstate, dispacthForm] = useReducer(formReducer, initialState);
  const CountsMaster_New = (id) => {
    const updatepost = names.filter((item) => item.id === id);
    setNames1({ id: updatepost[0].id, counts: updatepost[0].counts, email: updatepost[0].email, age: updatepost[0].age, gender: updatepost[0].gender });
    console.log(names1);
  };

  const CountsMaster_Save = () => {
    const listItems = [...names, formstate];
    setNames(listItems);
  };

  const formChange = (e) => {
    const { name, value } = e.target;
    dispacthForm({ type: ACTION.ADD_VALUE, payload: { name: name, value: value } });
  };

  const tagRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
  }

  function formReducer(state, action) {
    switch (action.type) {
      case ACTION.ADD_VALUE: {
        return { ...state, id: names.length + 1, [action.payload.name]: action.payload.value, loggedIn: true };
      }
      case ACTION.ADD_DELETE: {
        return state.filter((item) => item.id !== action.payload);
      }
      case ACTION.ADD_UPDATE: {
        return state.map((item) => (item.id === action.payload.id ? { ...item, [item.name]: item.value } : item));
      }
      case ACTION.ADD_EDIT: {
        const updatepost = names.filter((item) => item.id === action.payload);
        setNames1({ id: updatepost[0].id, counts: updatepost[0].counts, email: updatepost[0].email, age: updatepost[0].age, gender: updatepost[0].gender });

        return state;
      }

      case "logIn": {
        return {
          ...state,
          error: "",
        };
      }
      case "success": {
        return {
          ...state,
          loggedIn: true,
          counts: "",
        };
      }
      case "error": {
        return {
          ...state,
          error: "Incorrect Password",
          loggedIn: false,
          counts: "",
        };
      }
      case "logOut": {
        return {
          ...state,
          loggedIn: false,
        };
      }
      case ACTION.TOOGLE_TODO: {
        return state.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, completed: !item.completed };
          } else {
            return item;
          }
        });
      }

      case ACTION.DELETE_TODO:
        return state.filter((item) => item.id !== action.payload.id);
      default:
        return state;
    }
  }

  return (
    <form onSubmit={handleSubmit} onChange={formChange}>
      {/* <Posts str={`${CountryParam}`} /> */}
      <div className="container-fluid animate-zoom">
        <div className="row">
          <ul style={{ backgroundColor: `${colorValue}`, borderBottom: "2px solid white", textAlign: "right" }}>
            <li>
              {" "}
              <button type="submit" style={{ backgroundColor: `${color1[0]}` }}>
                News
              </button>
            </li>
            <li>
              {" "}
              <button type="submit" onClick={() => CountsMaster_Save()} style={{ backgroundColor: `${color1[2]}` }}>
                Save
              </button>
            </li>
          </ul>
          <div className="bloc-tabs">
            <div className="tabs active-tabs" style={{ color: `${colorValue}` }}>
              {" "}
              {title}{" "}
            </div>
          </div>
          <div className="col-md-5" style={{ backgroundColor: "var(--bs-white)", padding: "0" }}>
            <h3 style={{ color: `${colorValue}` }}>CountsMaster {names.length}</h3>
            <div className="content-tabs">
              <div className="row">
                <label className="col-md-2"> Name </label>
                <input className="col-md-9" type="text" name="counts" value={formstate.counts} />
              </div>
              <div className="row  pt-1">
                <label className="col-md-2"> Email </label>
                <input className="col-md-9" type="text" name="email" value={formstate.email} />
              </div>
              <div className="row pt-1">
                <label className="col-md-2"> Age </label>
                <input className="col-md-9" type="number" name="age" value={formstate.age} />
              </div>
              <div className="row pt-1">
                <label className="col-md-2"> Gender </label>
                <select className="col-md-9" name="gender" value={formstate.gender}>
                  <option> </option>
                  <option value={1}>MALE </option>
                  <option value={2}>FEMALE </option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-7" style={{ backgroundColor: "var(--bs-white)", padding: "0" }}>
            <div className="content-tabs">
              <ul className="row">
                {names.length > 0 &&
                  names.map((fstate) => (
                    <li className="col-md-6" key={fstate.id} onClick={() => dispacthForm({ type: ACTION.ADD_EDIT, payload: fstate.id })}>
                      {fstate.id}-{fstate.counts}-{fstate.email}-{fstate.age}
                      <button onClick={() => dispacthForm({ type: ACTION.ADD_DELETE, payload: fstate.id })} style={{ color: "red" }}>
                        Detete
                      </button>
                      <button onClick={() => dispacthForm({ type: ACTION.ADD_UPDATE, payload: { id: fstate.id } })} style={{ color: "green" }}>
                        Update
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CountsMaster;
//https://www.google.com/search?sca_esv=982eb7504844ff8c&rlz=1C1GCEU_enIN1160IN1160&sxsrf=AHTn8zr3vi6PDglRDzsBSgI_Jo7YM68ESA:1747641090347&q=input+and+select+field+in+use+reducer&udm=7&fbs=ABzOT_CWdhQLP1FcmU5B0fn3xuWp6IcynRBrzjy_vjxR0KoDMp_4ut2Z3jppK72fzdIpWsBpYmR8fwcVczrRGmP-Hf4kG9vVz30NlEzdDjoPm1ohfVYI4JJIY4mUU2uX9gHpdGY0JiHT8oeTKOT2A5tuMr14DVpibcW5Mcbr_an2WG__XE4C33L2zGVfdIWt73W8Ep3brPaBew92Nl7IqpUGPXfKFSyp3g&sa=X&ved=2ahUKEwiOgIqzhq-NAxVA3jgGHZszLa0QtKgLegQIFhAB&biw=1280&bih=551&dpr=1#fpstate=ive&vld=cid:0f6f43ee,vid:vA_556hkqz4,st:0

//https://www.google.com/search?q=react+js+tutorial+in+tamil&sca_esv=3035b77ba2076880&rlz=1C1GCEU_enIN1160IN1160&udm=7&biw=1360&bih=599&sxsrf=AHTn8zqvBxyX58KDjpLYyhNnj45uxdg06g%3A1747900327192&ei=p9cuaJHBC5fuseMPh5e6yA0&oq=react+&gs_lp=EhZnd3Mtd2l6LW1vZGVsZXNzLXZpZGVvIgZyZWFjdCAqAggBMgQQIxgnMgQQIxgnMgQQIxgnMgoQABiABBhDGIoFMg4QABiABBiRAhixAxiKBTIKEAAYgAQYQxiKBTIKEAAYgAQYQxiKBTIKEAAYgAQYQxiKBTIQEAAYgAQYsQMYQxiDARiKBTIIEAAYgAQYsQNInjBQAFi4B3AAeACQAQCYAYcBoAGnBaoBAzAuNrgBAcgBAPgBAZgCBqAC6QXCAgsQABiABBiRAhiKBcICDhAAGIAEGLEDGIMBGIoFwgILEAAYgAQYsQMYgwGYAwCSBwMwLjagB_g5sgcDMC42uAfpBQ&sclient=gws-wiz-modeless-video#fpstate=ive&vld=cid:9f09f8cf,vid:2sVeyo2tYbE,st:0
