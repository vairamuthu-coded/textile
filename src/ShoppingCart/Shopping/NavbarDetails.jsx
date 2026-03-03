 
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { MdOutlineAddShoppingCart, MdSearch } from 'react-icons/md';
import styled from 'styled-components'
import Slider from './Slider';
import { Badge } from '@mui/material';
import { useDispatch, useSelector } from "react-redux"
import { destop, mobile, tablet } from '../Responsive';
import { useNavigate } from 'react-router-dom';
import DataContext from '../../context/CreateUserContext';
import ShopContext from '../../context/CreateShopContext';
import Select from '../../Custom/Select';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';
const Container=styled.div`
  height:auto; width:100%;


`
const Wrapper=styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })};
   ${tablet({padding:"10px 0px",flexDirection:"row"})};
    ${destop({padding:"10px 0px",flexDirection:"row"})};
`;

const Left=styled.div`
flex:1;
display:flex;
align-items:center;
`;

const Center=styled.div`
  flex: 1;
  text-align: center;
`;

const Right=styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })};
${tablet({flex:2,justifyContent:"center"})};
${destop({flex:2,justifyContent:"center"})};
`;




const Language=styled.span`
cursor:pointer;
font-size:15px;padding:5px;
 ${mobile({display:"none"})};
  ${tablet({display:"none"})};
   ${destop({display:"block"})};
`;

const Input=styled.input`
  border: none;width:100%;padding:10px;
  ${mobile({ width: "100%" })}
  ${tablet({width:"100%"})}
    ${destop({width:"100%"})}
`;



const Logo=styled.h5`
font-weight:bold;
 ${mobile({fontSize:"20px"})}
  ${tablet({fontSize:"20px"})}
`;

const SearchContainer=styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  padding: 5px;
width:100%;
`;

const MenuItem=styled.h1`
 font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  
${mobile({fontSize:"12px",marginLeft:"10px"})}
${tablet({fontSize:"12px",marginLeft:"10px"})}
`;

function NavbarDetails() {
    const navigate = useNavigate();
      const { colorValue,localServerCart } = useContext(DataContext)
     const {placeOrderHandler,products,setProducts,cartProduct,handleSubmit}=useContext(ShopContext);
const [searchvalue,setSearchValue]=useState();

 let handleSearch=(e)=>{
  const {name,value}=e.target;
    // setSearchValue(value);  

 
          axios.get(`${localServerCart}`).then((res) => {      
            let listItemss = res.data.filter((item) => ((item.title).includes(value)) )     
            setProducts(listItemss)
      
      }).catch((error) => { alert(error) });

 }





let onload=()=>{
  axios.get(`${localServerCart}`).then((res) => {      
             
            setProducts(res.data)
      
      }).catch((error) => { alert(error) });
}

  
  return (
    <form onSubmit={handleSubmit}>
      
    <Container >
      <Wrapper>
        <Left>
        <Language >SEARCH  </Language>     
        </Left>
      <Center>
  <SearchContainer>    
    {/* <Select items={products}          colorValue={colorValue}   />     */}
            <Input placeholder='search' name="search"  onChange={(e)=>handleSearch(e)}  /> <MdSearch onClick={()=>onload()}   style={{fontSize:'xx-large'}} ></MdSearch>
          </SearchContainer>   
      </Center>
        <Right>
   
         <MenuItem onClick={()=>navigate("/Cart")}>
         <Badge badgeContent={cartProduct.length} color='primary' >
        <MdOutlineAddShoppingCart  ></MdOutlineAddShoppingCart>
         </Badge>
         </MenuItem> 
          </Right>   
       </Wrapper>

       </Container>
    </form>
  )
}

export default NavbarDetails
