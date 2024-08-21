import React,{useState,useEffect,useContext} from 'react'
import Header from './includes/Header'
import axios from 'axios';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import {BASE_URL} from '../../axiosConfig';
import { userContext } from '../../App';


export const Place = ({match}) => {
  const {id} =useParams();
  const [place,setplace]=useState({
    name:"",
    gallery:[],
  });
  const {userData} =useContext(userContext);
 
  useEffect(() => {
    console.log(userData);
    axios.get(`${BASE_URL}places/protected/${id}`,{
        headers:{
          Authorization:`Bearer ${userData?.access}`
        }
    })
        .then((response) => {
            setplace(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        });
}, []);



  return (
    <>
    <Helmet>
      <title>{place.name} | Travel Guide</title>
    </Helmet>
    <Header/>
    <MainContainer>
      <Title>{place.name}</Title>
        <InfoContainer>
          <CategoryName>{place.category_name} </CategoryName>
          <LocationContainer>
            <LocationIcon src={require("../../assets/images/location.png")} alt="location img"/>
            <LocationName>{place.location}</LocationName>
          </LocationContainer>
        </InfoContainer>
        <GalleryContainer>
          <GalleryImageItem>
            <GalleryImage src={place.image} alt="image"/>
          </GalleryImageItem>
          {
            place.gallery.map((image)=>(
              <GalleryImageItem>
              <GalleryImage src={image.image} alt="image"/>
              </GalleryImageItem>
            ))

          }
        
        </GalleryContainer>
        <SubHeading>Place Details</SubHeading>
        <Description>{place.description}</Description>
    </MainContainer>
    </>
  )
}

const MainContainer=styled.div`
width:70%;
margin:30px auto 0;

`;
const Title=styled.h1`
font-size:30px;
margin-bottom:15px;
`;
const InfoContainer=styled.div`
margin-bottom:25px;
display:flex;
`;
const CategoryName=styled.span`
padding:10px 30px;
border-radius:20px;
display:inline-block;
border:1px solid #9c9c9c;
color:#9c9c9c;
margin-right:15px;
`;
const LocationContainer =styled.div`
display:flex;
justify-content:space-between;
align-items:center;
`;
const LocationIcon=styled.img`
width:20px;
margin-right:5px;
`;
const LocationName=styled.span`
color:9c9c9c;
font-weight:bold;
font-size:14px;
`;
const GalleryContainer=styled.ul`
display:grid;
grid-template-columns:repeat(4,1fr);
grid-gap:20px;
border-radius:15px;
overflow:hidden;
margin-bottom:15px;
list-style:none;
`;
const GalleryImageItem=styled.li`
&:first-child{
grid-column-end:span 2;
grid-row-end:span 2;


}
`;
const GalleryImage=styled.img`
width:100%;
display:block;
`;
const SubHeading=styled.h3`
font-size:28px;
marin-bottom:20px;
`;
const Description=styled.p`
font-size:16px;
font-weight:1.6rem;
`;
