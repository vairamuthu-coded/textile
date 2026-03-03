import React, { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ThreeDot } from 'react-loading-indicators';

import useFetch from '../../hooks/useFetch';
import { MdAddShoppingCart, MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../../store/cardSlice";
import NavbarDetails from './NavbarDetails';
import Announcement from './Announcement';
import Slider from './Slider';
import Categories from './Categories';

import Shop from './Shop';
import DataContext from '../../context/CreateUserContext';
import styled from 'styled-components';
import { destop, mobile, tablet } from '../Responsive';
import ProductDetails from './ProductDetails';
import ShopContext from '../../context/CreateShopContext';
import ColorSelector from './ColorSelector';


const Container =styled.div``;

const FilterContainer=styled.div`
display:flex;
justify-content:space-between;
`;

const Title=styled.h1`
marging:20px;
`;

const Filter=styled.div`
margin:20px;
${mobile({width:"0px 20px",display:"flex",flexDirection:"column"})};
${tablet({width:"0px 5px",display:"flex",flexDirection:"row"})};
${destop({width:"0px 5px",display:"flex",flexDirection:"row"})};
`;

const FilterText=styled.p`
font-size:20px;
font-weight:600;
margin-right:20px;
${mobile({marginRight:"0px"})};
${tablet({margin:"0px"})};
`;

const Select=styled.select`
padding:5px;
margin-right:20px;
${mobile({margin:"10px 0px"})};
${tablet({margin:"10px 0px"})}
`

const Option=styled.option`

`

const ProductList = () => {


  const {handleSubmit,dataFromWeb,error, isloading,setProducts,colorValue,localServerCart,API_URL,products}=useContext(ShopContext)
  const navigate = useNavigate();
let cartState = useSelector((state) => { return state.cart });

  let handleDelete = (id) => {
    axios.delete(`${localServerCart}/${id}`)
      .then((res) => Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes ",    
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your File has been Deleted.",
            icon: "Success"
          });
          let newproductlist = products.filter(item => item.id !== id);
          setProducts(newproductlist);
        }


      }

      ))
  }

   let dispatch = useDispatch();


  let addItemToCard = (product) => {

  let checkCartState = cartState.some(item => item.id === product.id);
if (!checkCartState) {
   dispatch(addItems(product))
  //  Swal.fire({
  //   title: "Success!",
  //   text: "Product Added Successfully.",
  //   icon: "success",
    
  // });
}else{
  Swal.fire({
    title: "Opps!",
    text: "Product Already added.",
    icon: "error",
    footer:"<p>Add Some other Product</p>"
  });
}   
}


const UpdateCart=(id)=>{
    let checkCartState = cartState.some(item => item.id === id);
if (!checkCartState) {
  

}else{
  Swal.fire({
    title: "Opps!",
    text: "Product Already added.",
    icon: "error",
    footer:"<p>Add Some other Product</p>"
  });
} 
}



  if (isloading) {
    return <div>
      <center>
        <ThreeDot color="#32cd32" size="large" text="Loading.." textColor="red" />
      </center>
    </div>
  } else {
    return (
      <form onClick={handleSubmit}> 
        <>      
         <NavbarDetails/>
        <Announcement/>
       
 <div style={{height:'70vh',  overflow:'auto'}}>
 <Slider/>     
      <Shop products={products} addItemToCard={addItemToCard}  />
    </div> 
    </> 
      </form>     
    )
  } 
}

export default ProductList
//https://www.youtube.com/watch?v=c1xTDSIXit8
//https://www.youtube.com/watch?v=5oh162ejPOQ

