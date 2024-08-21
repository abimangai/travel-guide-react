
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from './includes/Header';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import himalaya from '../../assets/images/himalaya';
import location from '../../assets/images/location.png';
import axios from 'axios';
import {BASE_URL} from '../../axiosConfig';

export default function Places() {
    const [places, setPlaces] = useState([]); // Initialize with an empty array

    useEffect(() => {
        axios.get(`${BASE_URL}places/`)
            .then((response) => {
                setPlaces(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const renderPlaces = () => {
        return places.map((place) => (
            <PlaceCard key={place.id}> {/* Add a unique key */}
                <PlaceLink to={`place/${place.id}`}>
                    <PlaceImage src={place.image} alt={place.name} /> {/* Replace with dynamic data */}
                    <PlaceBottomContainer>
                        <PlaceTitle>{place.name}</PlaceTitle> {/* Replace with dynamic data */}
                        <Location>
                            <LocationIcon src={location} alt={place.location_name + ' image'} /> {/* Replace with dynamic data */}
                            <LocationName>{place.location_name}</LocationName> {/* Replace with dynamic data */}
                        </Location>
                    </PlaceBottomContainer>
                </PlaceLink>
            </PlaceCard>
        ));
    };

    return (
        <>
            <Helmet>
                <title>Places | Travel Guide</title>
            </Helmet>
            <Header />

            <TopContainer>
                <Heading>Welcome Guys...</Heading>
                <Paragraph>Just Explore the world around us.....</Paragraph>
            </TopContainer>

            <PlaceContainer>
                {renderPlaces()}
            </PlaceContainer>
        </>
    );
}


const TopContainer = styled.div`
    width: 100%;
    margin: 40px 10px;
    text-align: center;
`;

const Heading = styled.h1`
    font-size: 48px;
    margin-bottom: 10px;
    color: #333;
    font-weight: bold;
    letter-spacing: 1px;
`;

const Paragraph = styled.p`
    font-size: 20px;
    color: #666;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
`;

const PlaceContainer = styled.ul`
    display: flex;
    flex-wrap: wrap;
    width: 85%;
    margin: 50px auto 0 50px;
    gap: 20px;
    justify-content: center;
`;

const PlaceCard = styled.li`
    width: 23%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    }
    @media (max-width: 768px) {
        width: 48%;
    }
    @media (max-width: 480px) {
        width: 100%;
    }
`;

const PlaceLink = styled(Link)`
    display: block;
    appearance: none;
    text-decoration: none;
    color: inherit;
`;

const PlaceImage = styled.img`
    display: block;
    width:100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transition: opacity 0.3s ease;
    &:hover {
        opacity: 0.9;
    }
`;

const PlaceBottomContainer = styled.div`
    padding: 5px;
`;

const PlaceTitle = styled.h2`
    margin-bottom: 10px;
    font-size: 16px;
    color: #333;
    font-weight: bold;
    text-transform: capitalize;
`;

const Location = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
`;

const LocationIcon = styled.img`
    margin-right: 10px;
    width: 10%;
`;

const LocationName = styled.span`
    font-size: 16px;
    color: #777;
    font-weight: 500;

`;
