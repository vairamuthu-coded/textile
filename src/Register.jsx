import React from 'react'
import { Responsive } from '.././src/ShoppingCart/Responsive';
import styled from 'styled-components';

const Container =styled.div`
width:100vw;
height:100vh;
background:linear-gradient (rgba(255,255,255,0.5),rgba(255,255,255,0.5));
// background-image: url("Images/Anugraha_logo.jpg");
//background-size:cover; 
display:flex;
align-items:center;
justify-content:center;
`;

const Wrapper =styled.div`
width:40%;
padding:20px;
background-color:whitesmoke;
`;

const Title =styled.h1`
font-size:24px;
font-weight:300;

`;

const Form =styled.form`
display:flex;
flex-wrap:wrap;
`;

const Input =styled.input`
flex:1;
min-width:40%;
margin:20px 10px 0px 0px;
padding:10px;

`;



const Link =styled.a`
margin:5px 0px;
font-size:12px;
text-decoration:underline;
cursor:pointer;
`

const Agreement=styled.span`
font-size:12px;
margin:20px 0px;
`

const Button =styled.button`
width:40%;
border:none;
padding:15px 20px;
background-color:teal;
color:white;
cursor:pointer;
margin-bottom:10px;
`

const Register = () => {
  return (
   
      <Container>
        <Wrapper>
            <Title>Create on Account</Title>
            <Form>
              <Input placeholder='name'></Input>
              <Input placeholder='lastname'></Input>
              <Input placeholder='username'></Input>
              <Input placeholder='email'></Input>
              <Input placeholder='password'></Input>
              <Input placeholder='confirm password'></Input>
              <Agreement>By creating an account I consent of processing of my personal data in accordance with  the <b>Privacy Policy</b></Agreement>
              <Button>Create</Button>
            </Form>
        </Wrapper>
      </Container>

  )
}

export default Register
