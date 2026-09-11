import React, { useContext, useEffect, useState } from 'react'
import ShopContext from '../../context/CreateShopContext';
import styled from "styled-components"
import { destop, mobile, tablet } from '../Responsive';
import { MdAdd, MdDeleteForever, MdRemove } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItems, removeItems } from '../../store/cardSlice';

import DataContext from '../../context/CreateUserContext';
import axios from 'axios';
import Label from '../../Custom/Label';
// const Container =styled.div`

// `;

// const Wrapper =styled.div`
// padding:20px;height:vh;
// ${mobile({padding:"10px"})};
// ${tablet({padding:"10px"})};
// ${destop({padding:"10px"})};
// `;

// const Title =styled.h1`
// font-widht:300;
// text-align:center;
// `;

// const Top =styled.div`
// display:flex;
// align-items:center;
// justify-content:space-between;
// padding:20px;
// `;

// const TopButton =styled.button`
// padding:10px;
// font-weight:600;
// cursor:pointer;width:auto;
// color:${props=>props.bgcolor};
// border:${props=>props.type==='filled' ? 'none' : '1px solid teal'};
// background-color:${props=>props.type==='filled' ? 'teal' : 'transparent'};
// color:${props=>props.type==='filled' && 'white'};
// padding:20px;
// &:hover{
// background-color:teal;
// color:white;
// }

// `;

// const Bottom =styled.div`
// display:flex;
// justify-content:space-between;
// ${mobile({flexDirection:"column"})};
//  ${tablet({flexDirection:"row"})};
//  ${destop({flexDirection:"row"})};
// `;

// const TopTexts =styled.div`
// ${mobile({display:"none"})};
//  ${tablet({display:"block"})};
//   ${destop({display:"block"})}
// `;
// const TopText =styled.span`
// text-decoration:underline;
// cursor:pointer;
// margin:0px 10px;
// `;

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

`;

const ProductAmountContainer = styled.div`
display:flex;
align-items:center;
justify-content:center;
margin-bottom:20px;
`;
const Amount = styled.span`
width:auto;
height:auto;
border-radius:10px;
border:1px solid teal;
display:flex;
align-items:center;
justify-content:center;
padding:10px;
`;
const ProductAmount = styled.div`
font-size:24px;
margin:5px;
${mobile({ margin: "5px 15px" })};
 ${tablet({ margin: "5px 15px" })};
`;

const ProductPrice = styled.div`
font-size:20px;
font-weight:200;text-align:left;
${mobile({ marginBottom: "20px" })};
 ${tablet({ marginBottom: "20px" })};
`;

const Summary = styled.div`
flex:1;
border:0.1px solid ${(props) => props.color};
border-radius:10px;
padding:20px;
height:60vh;
`;

const Hr = styled.div`
background-color:#eee;
border:1px solid ${(props) => props.color};
height:1px;
`;

const SummaryTitle = styled.h2`
font-weight:200;
color:${(props) => props.color};
`;

const SummaryItem = styled.div`
margin:30px 0px;
display:flex;
justify-content:space-between;
font-weight:${props => props.type === 'total' && '500'};
font-size:${props => props.type === 'total' && '24px'};
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

const AmountContainer = styled.div`
display:flex;
align-items:center;
font-weight:700;margin-left:10%;margin-right:10%;
`;

const CartItems = ({data,index}) => {

  //const { id, total, title, price, description, image,colorname,sizename } = props.data;
  const { API_URL } = useContext(DataContext)

  const { addToCart, handleChange,removeFromCart, handleDelete, dispatch, colorValue, dataFromWeb, cartItem,
    updateToCart, addItemss,cartProduct, sizeItems, colorItems, setSizeItems, setColorItems,addRows } = useContext(ShopContext);

  return (
    <>

      <Product key={index} className='container-fluid'  >
        <ProductDetails >
          <Image src={data.image} />
          <Details>
            <div className='row'  >
              <div className='col-md-7'  >
                <ProductName><b>ITEM  : </b>{data.title}</ProductName></div>
              <div className='col-md-5'  >
                <ProductID><b>ID :</b>{data.id}</ProductID>
                <ProductID ><b style={{ paddingLeft: "15px" }}>Stock :</b>{data.total}</ProductID>
              </div>
            </div>
            <div className='row'  >
              <div className='col-md-6' >
                <Label labelName={"COLOR : "} className={'col-md-5 col-sm-12'}  ></Label>
                <select name="colorname" value={data.colorname} className='col-md-7 col-sm-12'
                  autoFocus onChange={(e) => handleChange(e,data.id)} >
                  {
                    colorItems !== null &&
                    colorItems.map((result, index2) => (<option key={index2} value={result.colorname}>
                      {result.colorname}
                    </option>))
                  }
                </select> 
              </div>
              <div className='col-md-6'  >
                <Label labelName={"SIZE : "} className={'col-md-5 col-sm-12'}  ></Label>
                <select name="sizename" value={data.sizename} className='col-md-7 col-sm-12'
                  onChange={(e) => handleChange(e,data.id)} autoFocus>
                  {
                    sizeItems !== null &&
                    sizeItems.map((result, index1) => (<option key={index1} value={result.sizename}>
                      {result.sizename}
                    </option>))
                  }
                </select>
              </div>
            </div>

          </Details>

        </ProductDetails>

        <PriceDetails >

          <ProductPrice > Price: {data.price}</ProductPrice>
          <ProductAmountContainer>

            <button style={{ color: "black", fontSize: "xxlarge" }} onClick={() => removeFromCart(data.id)}>           <MdRemove /></button>
            <input style={{ width: "30px", height: "30px", textAlign: "center", margin: "15px", color: "red" }}
              onChange={(e) => updateToCart(Number(e.target.value), data.id)} value={cartItem[data.id]} />
            <button style={{ color: "black", fontSize: "xxlarge" }} onClick={(e) => addToCart(data.id)}>  <MdAdd /></button>

          </ProductAmountContainer>

        </PriceDetails>


        <MdDeleteForever style={{ fontSize: "xxx-Large", color: "red  " }} onClick={() => handleDelete(data.id)} />

      </Product>

      <Hr style={{ border: `1px solid whitesmoke`, backgroundColor: `${colorValue}`, width: "95%" }} />

    </>
  )

}

export default CartItems
