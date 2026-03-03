import React, { useContext, useEffect, useState } from 'react'
import styled from "styled-components"
import NavbarDetails from './NavbarDetails';
import Announcement from './Announcement';
import Footer from './Footer';
import useFetch from '../../hooks/useFetch';
import { MdAdd, MdDeleteForever, MdRemove } from 'react-icons/md';
import DataContext from '../../context/CreateUserContext';

import { destop, mobile, tablet } from '../Responsive';
import Newsletter from './Newsletter';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux"
import { removeItems } from '../../store/cardSlice';

import CartItems from './CartItems';
import ShopContext from '../../context/CreateShopContext';
import Swal from 'sweetalert2';
import axios from 'axios';
import Label from '../../Custom/Label';
import { Alert } from 'react-bootstrap';
const Container = styled.div`

`;

const Wrapper = styled.div`
padding:20px;height:vh;
${mobile({ padding: "10px" })};
${tablet({ padding: "10px" })};
${destop({ padding: "10px" })};
`;

const Title = styled.h1`
font-widht:300;
text-align:center;
`;

const Top = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
padding:20px;
`;

const TopButton = styled.button`
padding:10px;
font-weight:600;
cursor:pointer;width:auto;
color:${props => props.bgcolor};
border:${props => props.type === 'filled' ? 'none' : '1px solid teal'};
background-color:${props => props.type === 'filled' ? 'teal' : 'transparent'};
color:${props => props.type === 'filled' && 'white'};
padding:20px;
&:hover{
background-color:teal;
color:white;
}

`;

const Bottom = styled.div`
display:flex;
justify-content:space-between;
${mobile({ flexDirection: "column" })};
 ${tablet({ flexDirection: "row" })};
 ${destop({ flexDirection: "row" })};
`;

const TopTexts = styled.div`
${mobile({ display: "none" })};
 ${tablet({ display: "block" })};
  ${destop({ display: "block" })}
`;
const TopText = styled.span`
text-decoration:underline;
cursor:pointer;
margin:0px 10px;
`;

const Info = styled.div`
flex:3;
`;



const Product = styled.div`
display:flex;width:95%; box-shadow: 5px 10px 8px lightgrey;
justify-content:space-between;margin:5px;
${mobile({ flexDirection: "column" })};
${tablet({ flexDirection: "row" })};
${destop({ flexDirection: "row" })};
`;

const ProductDetails = styled.div`
flex:2;
display:flex;
`;

const Image = styled.img`
 
`;



const ProductName = styled.span`


`;

const ProductID = styled.span`


`;
const Details = styled.span`
padding:20px;
display:flex;
flex-direction:column;
justify-content:space-around;
`;
const ProductColor = styled.div`
height:20px;
width:20px;
border-radius:50%;
background-color:${(props) => props.color};
`;




const ProductSize = styled.span`

`;

const PriceDetails = styled.div`
flex:1;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
`;

const ProductAmountContainer = styled.div`
display:flex;
align-items:center;
justify-content:center;
margin-bottom:20px;
`;

const ProductAmount = styled.div`
font-size:large;
margin:5px;
${mobile({ margin: "5px 15px" })};
 ${tablet({ margin: "5px 15px" })};
`;

const ProductPrice = styled.div`
font-size:20px;
font-weight:bold;
${mobile({ marginBottom: "20px" })};
 ${tablet({ marginBottom: "20px" })};
`;

const Summary = styled.div`
flex:1;
border:0.1px solid ${(props) => props.color};
border-radius:10px;
padding:20px;
height:100%;
`;

const Hr = styled.div`
background-color:#eee;
border:1px solid ${(props) => props.color};
height:1px;
`;

const SummaryTitle = styled.h2`
font-weight:bold;
color:${(props) => props.color};
`;

const SummaryItem = styled.div`
margin:10px 0px;
display:flex;
justify-content:space-between;
font-weight:${props => props.type === 'total' && 'bold'};
font-size:${props => props.type === 'total' && 'large'};
`;

const SummaryItemText = styled.span`

`;

const SummaryItemPrice = styled.span`

`;




const Button = styled.button`
width:100%;
padding:10px;
background-color:${(props) => props.bgcolor};
color:${(props) => props.color};
font-weight:600;
${mobile({ margin: "5px 15px" })};
 ${tablet({ margin: "5px 15px" })};
`;

const Cart = () => {
 
  const navigate = useNavigate();
  const { cartColors,colorValue,cartProduct, count, dispatch, dataFromWeb, setCartItem, addToCart,
     getTotalCartAmount,complete, setComplete,handleSubmit,
     updateToCart, addItemss,placeOrderHandler,sizeItems, colorItems,
     cartItem, getTotalQty, total,products,setProducts,addRows } = useContext(ShopContext);
  // const { API_URL,localServerCart } = useContext(DataContext)

  let totalamount =getTotalCartAmount();
  let totalqty = getTotalQty();   
//  let cartProduct = useSelector((state) => { return state.cart })
  return (

    <form onClick={handleSubmit}> 
      {
        cartProduct.length !== 0 ? (

          <Container>
            <NavbarDetails />
            <Announcement />
            <div style={{ height: "73vh", overflow: "auto" }}>
              <Wrapper>

    
                <Bottom>
                  <Info>
                    {
                      cartProduct.map((item,index) => {
                    
                     
                         
               return <CartItems  data={item} index={index}  />
                        
                      
                      })}

                  </Info>
                  <Summary color={`${colorValue}`}>
                    <SummaryTitle color={`${colorValue}`}>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                      <SummaryItemText>Total Qty </SummaryItemText>
                      <SummaryItemPrice>{totalqty}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                      <SummaryItemText>Estimated Shipping</SummaryItemText>
                      <SummaryItemPrice>$15.50</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                      <SummaryItemText>Shipping Discount</SummaryItemText>
                      <SummaryItemPrice>$-5.50</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem type='total'>
                      <SummaryItemText >Total</SummaryItemText>
                      <SummaryItemPrice>{totalamount}</SummaryItemPrice>
                    </SummaryItem>
                    <Button onClick={()=>placeOrderHandler(cartItem)} bgcolor={`${colorValue}`} color='white'>Place Order</Button>
                  </Summary>
                </Bottom>
              </Wrapper>
              <Newsletter />
              <Footer />
            </div>
          </Container>
        ) : <h1> {complete===true ? "test" : "false"}Your Cart is Empty</h1>}

    </form>
  )
}

export default Cart
