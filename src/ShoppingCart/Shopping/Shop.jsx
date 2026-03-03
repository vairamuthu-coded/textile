import React, { useContext, useState } from 'react'
import ProductDetails from './ProductDetails'
import {popularProducts} from '../Shopping/Data';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import DataContext from '../../context/CreateUserContext';

const Container=styled.div`
padding:20px;
  display:flex;
  flex-wrap:wrap;
  justify-content:space-between; 
`;

const Shop = ({products,addItemToCard}) => {
   // let [product, setProduct] = useState({ name: "iPhone", price: 200, description: "8GB RAM With 128GB" })
    return (

        <Container>
            {     products.map((product)=>(          
               
                    <ProductDetails key={product.id} product={product} addItemToCard={addItemToCard} 
                     />
                ))}
           
        </Container>
    )
}

export default Shop
