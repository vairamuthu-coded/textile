import React from 'react'
import { FaFacebook, FaInstagram, FaPhone, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { MdContactMail, MdMail, MdPhone, MdRoom } from 'react-icons/md';
import styled from 'styled-components';
import { mobile, tablet } from '../Responsive';
const Container=styled.div`
display:flex;
${mobile({flexDirection:"column"})}
${tablet({flexDirection:"space-between"})}
`;


const Left=styled.div`
flex:1;
display:flex;
flex-direction:column;
padding:20px;
`;

const Title=styled.h3`
margin-bottom:30px;
`;


const List=styled.ul`
margin:0;padding:0;
list-style:none;
display:flex;color:black;
flex-wrap:wrap;background-color:white;
`;

const Listitem=styled.li`
width:50%;
margin-bottom:20px;
`;


const Center=styled.div`
flex:1;
padding:20px;
${mobile({display:"none"})}
${tablet({display:"block"})}
`;

const Right=styled.div`
flex:1;
padding:20px;
${mobile({backgroundColor:"#fff8f8"})}
${tablet({backgroundColor:"#fff8f8"})}
`;

const Logo=styled.h5`

`;

const Desc=styled.p`
margin:20px 0px;
`;

const SocialContainer=styled.div`
display:flex;
`;
const SocialIcon=styled.div`
width:40px;
height:40px;
border-radius:50%;
color:white;
background-color:#${(props)=>props.color};
display:flex;
align-items:center;
justify-content:center;
margin-right:20px;
`;

const ContactItem = styled.div`
margin-bottom:20px;
display:flex;
align-items:center;
`

const Payment=styled.img`
width:10%;
`
const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>AVARNAS</Logo>
        <Desc>Avarnas, Our Organic & Traditional Collection features garments crafted from sustainably sourced organic fabrics, emphasizing our commitment to environmental responsibility. Shyam Garments is dedicated to providing high-quality, stylish clothing while preserving traditional techniques and supporting sustainable practices. Discover timeless fashion and eco-friendly choices at Avarnas Garments, where heritage meets modernity in every stitch.</Desc>
        <SocialContainer>
            <SocialIcon color='3B5999'>
                    <FaFacebook/>
            </SocialIcon>
            <SocialIcon color='E4405F'>
                    <FaInstagram/>
            </SocialIcon>
            <SocialIcon color='55ACEE'>
                    <FaTwitter/>
            </SocialIcon>
            <SocialIcon color='3B5999'>
                    <FaWhatsapp/>
            </SocialIcon>
        </SocialContainer>
      </Left>
  <Center>
    <Title>Useful Links</Title>
    <List>
        <Listitem> Home </Listitem>
        <Listitem> Cart  </Listitem>
        <Listitem> Man Fashion </Listitem>
        <Listitem> Woman Fashion  </Listitem>
        <Listitem> Accessories  </Listitem>
    </List>
  </Center>
      <Right>
      <Title>Contacts</Title>
      <ContactItem style={{marginRight:'20px'}}>
       <MdRoom/>
        ABT ROAD,NEW EXTERNSION
      </ContactItem>
      <ContactItem style={{marginRight:'20px'}}>
        SURIYAN NAGER,TIRUPUR.
      </ContactItem>
     
      <ContactItem style={{marginRight:'20px'}}>
        <MdMail/>
       Contact: www.anugrahafashion.com
      </ContactItem>
      <ContactItem style={{marginRight:'20px'}}>
      <MdPhone/>
       Mobile:91+ 9751828323
      
      </ContactItem>
      <Payment src='./Images/google-pay.png' />
      </Right>
    </Container>
  )
}

export default Footer
