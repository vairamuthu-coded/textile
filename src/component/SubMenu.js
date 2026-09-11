import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as AiCons from 'react-icons/ai';
import * as RiICons from 'react-icons/ri';
import * as IoIcons from 'react-icons/io';

const SidebarLink = styled(Link)`
  display:flex;
  color:var(--bs-danger);
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

export const SubMenu = ({ item, colorValue,item1,handlepage}) => {


  const [subnav, setSubnav] = useState(true);
  const showSubNav = () => setSubnav(!subnav);
  const [subnav1, setSubnav1] = useState(false);
  const showSubNav1 = () => setSubnav(!subnav1);
  let data = []; 
      const matches = item1.filter(item3 => Number(item3.menunameid) === Number(item.menunameid));
      data.push(...matches);  
      
  return (

    <ul className='animate-zoom'>
      <SidebarLink onClick={item.menuname && showSubNav}  >
        <li style={{margin: "1px",fontFamily:"roboto" , fontWeight:"bold"}}>
          {<AiCons.AiFillHome />}
          <SidebarLable>{item.menuname}</SidebarLable>
        </li>
        <li >
          {item.menuname && subnav ? <RiICons.RiArrowUpSFill /> : item.menuname ? <RiICons.RiArrowDownSFill /> : null}
        </li>

      </SidebarLink>
      {
        subnav && data.map((item2, index) => {         
        
          return (      
              <DropDownLink  className='animate-zoom' style={{ backgroundColor: `${colorValue}`, padding: "5px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} to={`/${item2.menuname}`} onClick={(e) => handlepage(item2.menuname)}
                key={index} >               
                {<IoIcons.IoIosPaper />}               
                <SidebarLable> {item2.menuname}</SidebarLable>
              </DropDownLink>   
          )
        })



      }
    </ul>


  )


}

