import React from 'react'

import styled from "styled-components"
import {categories} from '../Shopping/Data';
import CategoryItems from '../Shopping/CategoryItems'
import { destop, mobile, tablet } from '../Responsive';

const Container = styled.div`
    display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}
  //  ${tablet({padding:"0",flexDirection:"row"})};
  //     ${destop({padding:"0",flexDirection:"row"})}
`;
 
const Categories = () => {
  return (
    <Container>      
         {
           categories.map((item)=>(
            <CategoryItems item={item}  />
           ))
                         } 

    </Container>
  )
}

export default Categories
