import React from "react";
import Label from "./Label";

const Search = ({ colorValue, stylecolor, searchs, setsearchs, SearchLable1, SearchLable2, SearchLable3, searchCompCode, ChangeValues, handleChange, searchUserName }) => {
  return (
    <div className="container-fluid active-tabs">
      <div className="row p-1">
        {SearchLable1 !== "" ? <Label className={`col-md-2`} forecolor={colorValue} labelName={SearchLable1}></Label> : ""}
        {SearchLable1 !== "" ? <input className="col-md-3" type="text" name="SearchItem" placeholder="Search Items" aria-label="SearchItem" value={searchs} onChange={(e) => setsearchs(e.target.value)} /> : ""}
        {SearchLable2 !== "" ? <Label className={`col-md-1`} forecolor={colorValue} labelName={SearchLable2}></Label> : ""}
        {SearchLable2 !== "" ? (
          <select className="col-md-2" name="compcode" value={ChangeValues.compcode || ""} onChange={handleChange}>
            <option></option>
            {searchCompCode !== null &&
              searchCompCode.map((result, index) => (
                <option key={index} value={result.gtcompmastid}>
                  {result.compcode}
                </option>
              ))}
          </select>
        ) : (
          ""
        )}
        {SearchLable3 !== "" ? <Label className={`col-md-1`} forecolor={stylecolor} labelName={SearchLable3}></Label> : ""}
        {SearchLable3 !== "" ? (
          <select className="col-md-3" name="username" value={ChangeValues.username || ""} onChange={handleChange}>
            <option></option>
            {searchUserName !== null &&
              searchUserName.map((result, index) => (
                <option key={index} value={result.userid}>
                  {result.username}
                </option>
              ))}
          </select>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Search;
