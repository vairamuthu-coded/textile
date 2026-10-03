import React, { useRef } from "react";
import Label from "./Label";
import CustomSelect from "./CustomSelect";

const Search = ({ colorValue, stylecolor, searchs, setsearchs, SearchLable1, SearchLable2, SearchLable3, searchCompCode, ChangeValues, handleChange, searchUserName }) => {
  const refs = useRef([]);
  const handleEnter = (e, index) => {
    const { name } = e.target;

    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      refs.current[index + 1]?.focus();
    }
  };

  const handleFocus = (e) => {
    e.target.style.backgroundColor = `${colorValue}`;
    e.target.style.color = `${"var(--bs-light)"}`;
    e.target.style.fontWeight = "bolder";
  };

  const handleBlur = (e) => {
    e.target.style.backgroundColor = "";
    e.target.style.color = `${"var(--bs-dark)"}`;
  };
  return (
    <div className="container-fluid active-tabs">
      <div className="row p-1">
        {SearchLable1 !== "" ? <Label className={`col-md-2`} forecolor={colorValue} labelName={SearchLable1}></Label> : ""}
        {SearchLable1 !== "" ? <input className="col-md-3" type="text" name="SearchItem" placeholder="Search Items" aria-label="SearchItem" value={searchs} onChange={(e) => setsearchs(e.target.value)} /> : ""}
        {SearchLable2 !== "" ? <Label className={`col-md-1`} forecolor={colorValue} labelName={SearchLable2}></Label> : ""}
        {SearchLable2 !== "" ? (
          <CustomSelect
            visible="block"
            className="col-2 form-select"
            name="compcode"
            value={ChangeValues.compcode || ""}
            onChange={handleChange}
            colorValue={colorValue}
            tabIndex={1}
            ref={(el) => (refs.current[1] = el)}
            onKeyDown={(e) => handleEnter(e, 1)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {searchCompCode !== null &&
              searchCompCode.map((result, index) => (
                <option key={index} value={result.gtcompmastid}>
                  {result.compcode}
                </option>
              ))}
          </CustomSelect>
        ) : (
          // <select className="col-md-2" name="compcode" value={ChangeValues.compcode || ""} onChange={handleChange}>
          //   <option></option>
          //   {searchCompCode !== null &&
          //     searchCompCode.map((result, index) => (
          //       <option key={index} value={result.gtcompmastid}>
          //         {result.compcode}
          //       </option>
          //     ))}
          // </select>
          ""
        )}
        {SearchLable3 !== "" ? <Label className={`col-md-1`} forecolor={colorValue} labelName={SearchLable3}></Label> : ""}
        {SearchLable3 !== "" ? (
          <CustomSelect
            visible="block"
            className="col-2 form-select"
            name="username"
            value={ChangeValues.username || ""}
            onChange={handleChange}
            colorValue={colorValue}
            tabIndex={2}
            ref={(el) => (refs.current[2] = el)}
            onKeyDown={(e) => handleEnter(e, 2)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {searchUserName !== null &&
              searchUserName.map((result, index) => (
                <option key={index} value={result.userid}>
                  {result.username}
                </option>
              ))}
          </CustomSelect>
        ) : (
          // <select className="col-md-3" name="username" value={ChangeValues.username || ""} onChange={handleChange}>
          //   <option></option>
          //   {searchUserName !== null &&
          //     searchUserName.map((result, index) => (
          //       <option key={index} value={result.userid}>
          //         {result.username}
          //       </option>
          //     ))}
          // </select>
          ""
        )}
      </div>
    </div>
  );
};

export default Search;
