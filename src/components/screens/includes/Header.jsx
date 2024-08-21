import React,{useContext} from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { userContext } from '../../../App';


export default function Header() {
    const{userData,updateUserData} =useContext(userContext);
    const handleLogout=()=>{
        updateUserData({type:"LOGOUT"});

    }
    return (

        <HeaderContainer>
            <Logo
                src={require('../../../assets/images/Moke-logo1.png')}
                alt='logo' />

            <RightBox>
                {userData ? (
                    <Button onClick={()=>{ handleLogout()}}>Logout </Button>
                ) : (
                    <Button to='/auth/login/'>Login</Button>
                    )}
            </RightBox>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div
    `
    width:90%;
    display:flex;
    justify-content:space-between;
    margin: 0 auto;
    padding:20px 0;
    align-items:center;

    `;


const Logo = styled.img`
      width:150px;
    `;

const RightBox = styled.div`
    display:flex;
    align-items:center;
    `;

const Button = styled(Link)`
    background-color:#046bf6;
    border: 0px solid #046bf6;
    border-radius:5px;
    padding:10px 18px;
    color:#fff;
    font-size:18px;
    text-decoration:none;
  


    `;



