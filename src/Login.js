import React from 'react'
import { Responsive } from '.././src/ShoppingCart/Responsive';
import styled from 'styled-components';
import { destop, mobile, tablet } from '.././src/ShoppingCart/Responsive';
import { Link, useNavigate } from 'react-router-dom';
const Container = styled.div`

background-color:white;
align-items:center;
justify-content:center;
${mobile({ width: "100vw", height: "100wh",marginTop:"5%" })};
${tablet({ width: "100vw", height: "100vh" })};

`;

const Wrapper = styled.div`
width:100%;
padding:20px;
background-color:whitesmoke;
display:flex;
 align-items:center;
 justify-content:space-between; 
 ${mobile({ width: "100vw", height: "40%",marginTop:"5%" })};
  ${tablet({ width: "100vw", height: "40%" })};
`;

const Title = styled.h1`
font-size:24px;
font-weight:300;
${mobile({ width: "80%", height: "80%", padding: "0px", margin: "0px" })}
`;

const Form = styled.form`
display:flex;
flex-direction:column;
`;

const Input = styled.input`
flex:2;


  ${mobile({ width: "80%", height: "auto" })};
 ${tablet({ width: "80%", height: "auto" })};
  ${destop({ width: "80%", height: "auto" })};
`;

const Label = styled.label`
flex:1;

 ${mobile({ Width: "20%", height: "auto" })}
   ${tablet({ Width: "20%", height: "auto" })}
   ${destop({ Width: "10px", height: "auto" })}
`;



const Links = styled.a`
margin:5px 0px;
font-size:12px;
text-decoration:underline;
cursor:pointer;
`;

const Agreement = styled.span`
font-size:12px;
margin:20px 0px;
`

const Button = styled.button`
width:100%;
border:none;
margin:0px;padding:0px;
background-color:teal;
color:white;
cursor:pointer;
background-color:${props => props.color};
`
const Image = styled.img`
 ${mobile({ display: "none" })}
`;

const Login = ({defaultDetails,loginCompCode,loginPage,setLoginPage, setLoginCompCode,loginUser, setLoginUser,loginPass, setLoginPass,handleLoginSubmit}) => {
   

  return (
    <>
    {loginPage === false &&
      <Container onClick={(e) => setLoginPage(false)} className='overlay'>     
        <Wrapper onClick={(e) => { e.stopPropagation() }} className='modalContainer'>                 
           
            <Title>Login</Title> 
             <div className='modalRight'>
             {/* <Image src='Images/Anugraha_logo.jpg' ></Image> */}
               <div className='container-fluid'>
              <Input  name='compcode' type='text' placeholder='compcode' value={defaultDetails.Compcode} onChange={(e) => setLoginCompCode(e.target.value)}></Input>    
              <Input  name='UserName' type='text'  placeholder='UserName' value={defaultDetails.User} onChange={(e) => setLoginUser(e.target.value)}></Input>             
              <Input  name='Password' type='password' placeholder='password' value={defaultDetails.Pass} onChange={(e) => setLoginPass(e.target.value)} ></Input>
              <Button onClick= {handleLoginSubmit}>LOGIN</Button>
              <Link>do not remember the password ? </Link>
              <Link>create a new account </Link>
       </div>
       </div>
            
        </Wrapper>
      </Container>
    }
</>
  )
}



export default Login
