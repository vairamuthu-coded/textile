import React, { useContext } from 'react'
import DataContext from './context/CreateUserContext'
import * as FaICons from "react-icons/fa";
import Select from './Custom/Select';
import styled from "styled-components"
import { mobile } from '.././src/ShoppingCart/Responsive';
import Marquee from 'react-fast-marquee';
import { MdOutlineDashboardCustomize } from 'react-icons/md';

const Title=styled.div`
width:100%;  font-size:18px;
  color:${props=>props.color};
   ${mobile({width:"100%",fontSize:"12px"})};

`

const Header = ({titlename,TitleCompCode, TitleUser,setColorValue,setMode}) => {
  const { width ,  header_items,headerdrop, setHeaderDrop,sidebar,
    setSelectedTitle,  setHeaderItems, setHeaderFilterData, showSidebar,
    handlepage, header_search, setHeaderSearch,colorValue,foreValue,
     headerfilterdata,
     setSidebar,selectedTitle} = useContext(DataContext)
  
     const modehandleChange = (e) => {
    const { name, value,checked,type } = e.target;  
    if(checked ===true)
      {
      setColorValue('var(--bs-info-text-emphasis)');
      setMode('dark')
    }
    else {
       setColorValue('var(--bs-primary-text-emphasis)');
        setMode('light')
      }
}

 
  return (

     <div   className='container-fluid' style={{  background:`${colorValue}` }}>
      
    <div className='d-flex justify-content-between'>
        <div className='col-md-4' style={{ color:`${foreValue}`, textAlign: "left", display:"d-flex", justifyContent:"space-evenly" }} >
        <Title onClick={() => setHeaderDrop(false)} className='tooltip container-fluid' data-tooltip="" style={{ color:`${foreValue}`, }} >
          <FaICons.FaBars onClick={showSidebar}  className='me-3' /> {titlename}</Title>
      </div>
     
      <div className='col-md-3' >
        <Select sidebar={sidebar} setSidebar={setSidebar} items={header_items} userrights_search={header_search} setUserRightsSearch={setHeaderSearch}
         colorValue={colorValue} handlepage={handlepage} drop={headerdrop} setDrop={setHeaderDrop}  />
      </div> 
     <div className='col-md-5'>
        <div className='row'>
          <h3 className='col-md-9 mt-1' style={{ color:`${foreValue}`, display:"flex", justifyContent:"space-evenly" }}  >
            <label style={{ color: `${foreValue}`, }}>{TitleCompCode}</label>
            <label style={{ color: `${foreValue}` }}> {TitleUser}</label>
          </h3>
          <div className='col-md-3' style={{ alignItems: "right" }} >
                          <div className='float-end me-2 mt-2'  >                  
                    <label className='checkbox' style={{ padding: "0px",  }}>
                      <input type="checkbox" name='active'  onChange={modehandleChange} />
                      <span></span>
                      <i className='indicator'></i>
                    </label>
                  </div>
                     </div>

        </div>
      </div>  
    </div> 
    </div>
  )
}

export default Header
