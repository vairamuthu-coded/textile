import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as AiCons from "react-icons/ai";
import * as RiICons from 'react-icons/ri';
import * as IoIcons from 'react-icons/io';
import { SubMenu } from '../component/SubMenu';
import '../component/Tree.css';
import DataContext from '../context/CreateUserContext';
const SidebarNav = styled.nav`left:${({ sidebar }) => (sidebar ? '0' : '-100%')};`;
const SidebarWrap = styled.div`width:100%; `;

const SidebarLink = styled(Link)`
  display:flex;
  color:white;
  justify-content:space-between;
  align-items:center;
  list-style:none;
  height:30px;
  text-decoration:none;
  font-size:var(--bs-font-sm);
  &:hover{
    background:var(--bs-warning);
    border-left:4px solid var(--bs-forecolor);
    cursor:pointer; color:var(--bs-white);
  }
`;

const SidebarLable = styled.span`
 margin-left:16px;align-items:center;
`;

const DropDownLink = styled(Link)`
  display:flex;
  background:var(--bs-danger);
  height:25px;margin:1px;margin-radius:1px;
  padding-left:1rem;

  align-items:none;
  text-decoration:none;
  color:var(--bs-white);
  font-size:var(--bs-font-sm);

  &:hover{
    background:var(--bs-primary);
    cursor:pointer;textAlign:center;
  }

`

const Sidebars = ({ menuheader, header_items}) => {
var data=[]
     const {handlepage,sidebar,colorValue,foreValue } = useContext(DataContext)
     const [subnav, setSubnav] = useState(false);
       const showSubNav = () => setSubnav(!subnav);
       const [subnav1, setSubnav1] = useState(false);
       const showSubNav1 = () => setSubnav(!subnav1);
     let data1 = [];
      //  header_items.map((item3, index) => {
     
      //    if (item3.title === item.menuname) {   
      //      data.push(item3);
      //    }
         
      //  })
  return (
    <>

          <SidebarNav  className='SidebarNav' sidebar={sidebar} style={{ backgroundColor:"white",  border: `1px solid ${foreValue}`, width: "24%",  overflow: "auto",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",marginLeft:"0.5%" }}> 
    
      <div className='row'>
        <label className='col-md-2 mt-2 me-2'>Search</label>
        <input type='text' className='col-md-9 mt-2'></input>
        <div className='col-md-8'>        
    <ul id="tree" className='tree animate-zoom'>      
      <li className='branch'>      
      
        <a href='#'>  {<AiCons.AiFillHome />}     Masters   {'Masters' && subnav ? <RiICons.RiArrowUpSFill /> : 'Masters' ? <RiICons.RiArrowDownSFill /> : null}  </a>
        <ul className='animate-zoom'>
         
        <li>CountryMaster </li>
        <li>StateMaster</li>
        <li>CityMaster
          <ul className='animate-zoom'>
            <li>CityMaster</li>
            <li>CompanyMaster
              <ul>
                <li>CompanyMaster</li>
                <li>DepartmentMaster</li>
              </ul>
            </li>            
          </ul>
        </li>
        <li>Yarn
          <ul className='animate-zoom'>
            <li>YarnMaster</li>
            <li>CountsMaster
              <ul className='animate-zoom'>
                 <li>CountsMaster</li>
                 <li>ContentMaster</li>
              </ul>
            </li>           
          </ul>
        </li>
     
      </ul>
      </li>
      
      <li className='branch'><a href='#'>  {<AiCons.AiFillHome />}    Transaction {'Transaction' && subnav ? <RiICons.RiArrowUpSFill /> : 'Transaction' ? <RiICons.RiArrowDownSFill /> : null}</a>
        <ul className='animate-zoom'>
            <li>Section 1</li>
            <li >Section 1-1
              <ul className='animate-zoom'>
                <li>Section 1-1-1
                  <ul className='animate-zoom'>
                    <li>Section-1-1-1-1</li>
                    <li>Section-1-1-1-2</li>
                    <li>Section-1-1-1-3</li>
                 </ul>
                </li>    
                <li>Section 1-1-2</li>                        
              </ul>                                   
            </li>   
             <li>Section 2</li>                     
          </ul>         
      </li>
           
      <li className='branch'><a href='#'>  {<AiCons.AiFillHome />}    TreeView {'TreeView' && subnav ? <RiICons.RiArrowUpSFill /> : 'TreeView' ? <RiICons.RiArrowDownSFill /> : null}</a>
        <ul className='animate-zoom'>
            <li>TreeView 1</li>
            <li >TreeView 1-1    
              <ul className='animate-zoom'>
                <li>TreeView 1-1-1
                  <ul className='animate-zoom'>
                    <li>TreeView-1-1-1-1</li>
                    <li>TreeView-1-1-1-2</li>
                    <li>TreeView-1-1-1-3</li>
                 </ul>
                </li>    
                <li>TreeView 1-1-2</li>                        
              </ul>     
                             
            </li>   
             <li>TreeView 2</li>                     
          </ul>         
      </li>
    </ul>
   </div>
      </div>
      
     </SidebarNav>  

    </>
  )
}

export default Sidebars


