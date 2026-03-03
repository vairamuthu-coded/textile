import React, { useContext } from 'react'
import ProtoType from 'prop-types'
import { UserContext } from '../../App'
import styled from "styled-components"
import { MdCircle, MdOutlineAddShoppingCart, MdOutlineFavoriteBorder, MdOutlineSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import { FaEdit } from 'react-icons/fa';
const Info=styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;
const Container=styled.div`
   flex: 1;
  margin: 5px;
  min-width: 180px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle=styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image=styled.img`
 height:70%; width:auto;
 z-index:2;
`;


const Icon=styled.div`
width: 100%;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }

`;


const ProductDetails = ({product,addItemToCard}) => {
     const navigate = useNavigate();

     let handleExit=(()=>{  
          navigate("/Product")
      })    

   

 let receivedata= useContext(UserContext);

  return (
    <>
    
   <Container key={product.id}>


<Circle/>
    <Image src={product.image} /> 
      
      <Info>       
      <h3>{product.title}</h3>
        <Icon onClick={() => addItemToCard(product)} ><MdOutlineAddShoppingCart></MdOutlineAddShoppingCart></Icon>
        <Icon onClick={()=>navigate(`/UpdateProduct/${product.id}`)}><FaEdit></FaEdit></Icon>
        <Icon  ><MdOutlineFavoriteBorder>      </MdOutlineFavoriteBorder></Icon>
      </Info>
       
    </Container>     
   
    </> 
  )
}

export default ProductDetails

// ProductDetails.prototype={
//   names:ProtoType.string.isRequired,
//   price:ProtoType.number.isRequired,
//   description:ProtoType.string.isRequired,

// }
