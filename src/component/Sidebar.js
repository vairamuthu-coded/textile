import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import * as AiCons from "react-icons/ai";
import * as RiICons from 'react-icons/ri';
import * as IoIcons from 'react-icons/io';
import { SubMenu } from '../component/SubMenu';
import DataContext from '../context/CreateUserContext';
const SidebarNav = styled.nav`left:${({ sidebar }) => (sidebar ? '0' : '-100%')};`;
const SidebarWrap = styled.div`width:100%;margin-Top:5%` ;
const Sidebar = ({ menuheader, header_items,showSidebar}) => {

var data=[]
     const {handlepage,sidebar,setSidebar,colorValue,foreValue } = useContext(DataContext)

  return (
    <>
      <SidebarNav  className='SidebarNav' sidebar={sidebar} style={{backgroundColor:`${foreValue}`,borderRight: `1px solid ${colorValue}`, width: "25%",  overflow: "auto",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}> 
     <SidebarWrap>     
       {
           menuheader.map((item, index) => {                  
           return <SubMenu  item={item} colorValue={colorValue} item1={header_items} 
           key={index} handlepage={handlepage} />;
        }) 
         }
      </SidebarWrap>
     </SidebarNav>  
    </>
  )
}

export default Sidebar


