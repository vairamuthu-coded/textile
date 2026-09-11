import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md"
import styled from "styled-components"

import {sliderItems} from '../Shopping/Data';
import { useContext, useState } from "react";
import { destop, mobile, tablet } from '../Responsive';
import ShopContext from "../../context/CreateShopContext";

const Container=styled.div`
  width: auto;
   background-color:none;
  height: auto;
  display: flex;
 position: relative;
   overflow: hidden;
   ${mobile({ display: "none" })}
     ${tablet({padding:"0",height:"auto",width:"96vw",flexDirection:"row"})};
        ${destop({padding:"0",height:"auto",width:"96vw",flexDirection:"row"})};
`;

const Arrow=styled.div`
height:50px;
width:50px;
border-radius:50%;
display:flex;
 align-items:center;
 justify-content:center;
 position:absolute;
 top:0;
 bottom:0;
 left:${(props)=>props.direction==="left" && "10px"};
right:${(props)=>props.direction==="right" && "10px"};
 margin:auto;
 cursor:pointer;
 opacity:0.5;
 z-index:2;
   &:hover{
    opacity: 1;
    color:red;
  }
`;

const Wrapper=styled.div`
  height:100%;
 display:flex;padding:1em;
transition:all 1.5s ease;
 transform:translateX(${(props)=>props.slideIndex * -100}vw);
`;

const Slide=styled.div`
width:100vw;
 height:100%; 
 display:flex;
 align-items:center;
 background-color:#${(props)=>props.bg};
`;

const ImgContainer=styled.div`
 height:auto;
   width:auto;

`;

const InfoContainer=styled.div`
   width:100%;padding:0px;

`;

const Image=styled.img`
height:auto;width:5em;margin-right:5em;
`;

const Title=styled.h1`
font-size:20px;
`;

const Desc=styled.p`
margin:0px 0px;
 font-size:20px;
 font-weight:500;
 letter-spacing:3px;
`;

const Button=styled.button`
padding:10px;
font-size:20px;
background-color:transparent;
color:black;
cursor:pointer;width:auto; border:1px solid grey;
`;


const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0); 
  
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
    } else { setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0) }
  }
  const {colorValue}=useContext(ShopContext);
  return (
    <>
      <Container>

    <Arrow style={{backgroundColor:`${colorValue}`}}  direction="left" onClick={()=>handleClick("left")}>
    <MdOutlineKeyboardArrowLeft  />
  </Arrow>
  
      <Wrapper slideIndex={slideIndex} >
      {sliderItems.map((item)=>(     
        <Slide bg={item.bg} key={item.id} >
          <ImgContainer>
          <Image src={item.img}></Image>
          </ImgContainer>
           <InfoContainer>
            <Title>{item.title} </Title>
            <Desc>{item.desc}</Desc>
            <Button>SHOP NOW</Button>
          </InfoContainer>  
        </Slide>        
      ))}     
      </Wrapper>         
      <Arrow style={{backgroundColor:`${colorValue}`}} direction="right" onClick={()=>handleClick("right")}>
        <MdOutlineKeyboardArrowRight  />
      </Arrow>
      </Container>

    </>
  )
}

export default Slider
