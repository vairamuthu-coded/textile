import styled from "styled-components"
import { mobile } from "../Responsive"
import { useContext } from "react"

import ShopContext from "../../context/CreateShopContext"


const Container=styled.div`
height:30px;
background-color:${(props)=>props.bgcolor};
color:${(props)=>props.color};
display:flex;
align-items:center;
justify-content:center;
font-size:14px;
font-weight:500;
 ${mobile({alignItems:"center"})};
`

const Announcement = () => {
  
              const { colorValue } = useContext(ShopContext)
  return (
    <Container bgcolor={`${colorValue}`} color='white'>
        Super Deal ! Free shipping on Order over Rs 50  
    </Container>
  )
}

export default Announcement
