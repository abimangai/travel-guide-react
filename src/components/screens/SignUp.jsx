import React, { useState,useContext } from 'react';
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { BASE_URL } from '../../axiosConfig';
import {userContext} from "../../App"

export const SignUp = () => {
    const [name, setName] = useState("");
    const [email,setEmail]=useState("");
    const [password, setPassword] = useState("");
    const [message,setMessage]=useState("");

    const {updateUserData} =useContext(userContext);
    const history=useNavigate();
    const handleSubmit = (e) => {
        setMessage("");
        e.preventDefault();
        axios.post(`${BASE_URL}auth/register/`, 
            {
             email, 
             password,
             first_name:name,
            })
            .then((response) => {
                console.log(response.data.data);
                let data = response.data;
                let status_code=response.data.Statuscode;
                if(status_code ===6000){
                    console.log(data);
                    localStorage.setItem("user_data", JSON.stringify(data));
                    updateUserData({type:"LOGIN",payload:data});
                    history("/");
                }
                else{
                    setMessage(response.data.message);
                }
               
            })
            .catch((error) => {
                console.log(error.response);
                
                    if (error.response.status === 401) {
                        setMessage(error.response.data.detail);
                    }
                
            });
    };
    return (
        <>
            <Container>
                <LeftContainer>
                    <HeaderContainer>
                        <Logo
                            src={require('../../assets/images/Moke-logo1.png')}
                            alt='logo' />
                    </HeaderContainer>
                    <MainHeading>Travel to the beautiful places</MainHeading>
                </LeftContainer>

                <RightContainer>
                    <LoginContainer>
                        <LoginHeading>Register to Account</LoginHeading>
                        <LoginInfo>Create an account to access all the features..</LoginInfo>
                        <Form  onSubmit={handleSubmit}>
                            <InputContainer>
                                <TextInput  onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    type="text" placeholder="Name" />
                            </InputContainer>

                            <InputContainer>
                                <TextInput  onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    type="email" placeholder="Email" />
                            </InputContainer>

                            <InputContainer>
                                <TextInput  onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    type="password" placeholder="Password" />
                            </InputContainer>

                            <LoginButton to="/auth/login">Login Now</LoginButton>
                            {message && <ErrorMessage>{message}</ErrorMessage>}
    
                            <ButtonContainer>
                                <SubmitButton>Create an account</SubmitButton>
                            </ButtonContainer>
                        </Form>
                    </LoginContainer>

                </RightContainer>
            </Container>



        </>
    );
}

const Container = styled.div`
min-height:100vh;
display:flex;
width:100%;
`;
const LeftContainer = styled.div`
width:55%;
padding:0px 40px 70px;
`;
const HeaderContainer = styled.div`
`;
const Logo = styled.img`
width:20%;
top:0;
left:0;
`;
const MainHeading = styled.h1`
font-size:70px;
color:#090e7e;
line-height:5rem;
margin-top:150px;
`;
const RightContainer = styled.div`
border-radius:20px;
padding:30px 70px 70px;
background-color:#ADD8E6;
`;
const LoginContainer = styled.div`
width:100%;
`;
const LoginHeading = styled.h3`
 font-size:32px;
 font-weight:bold;
 margin-bottom:20px;
`;
const LoginInfo = styled.p`
font-size:18px;
margin-bottom:35px;

`;
const Form = styled.form`
width:100%;
display:block;

`;
const InputContainer = styled.div`
margin-bottom:15px;
positon:relative;
&:before{
}
`;
const TextInput = styled.input`
padding:20px 25px 20px 30px;
width:85%;
display:block;
border-radius:10px;
font-size:15px;
border:none;
outline:none;

`;
const ButtonContainer = styled.div`
display:flex;
justify-content:center;

`;
const LoginButton = styled(Link)`
display:flex;
justify-content:flex-end;
margin-bottom:35px;
color:#046bf6;
font-size:20px;
`;

const SubmitButton = styled.button`
background:#046bf6;
border:0;
outline:none;
color:#fff;
padding:25px 40px;
border-radius:8px;
font-size:20px;
cursor:pointer;

`;
const ErrorMessage= styled.p`
font-size:17px;
color:red;
margin-bottom:25px;
text-align:center;
`;





