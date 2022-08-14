import styled from 'styled-components';
import { COLORS } from '../../Share/Colors'

const Img = styled.img`

    // GALLERY

    &.gallery-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        transition: transform 0.5s ease;
    }

    &.entity-card--image {
        width: 100%;
        object-fit: cover;
        object-position: center;
    }

    &.index-logo {
        width: 100%;
        padding: 0 10% 0 30%;
        object-fit: contain;

        @media (max-width: 780px) {
            width: 50%;
            padding: 0;
        }

        &.entity-img {

            max-height: 60vh;
            background-color: ${COLORS.Gray}B3;
            border-radius: 0.5em;
            padding: 0;

            @media(max-width: 780px) {
                width: 100%;
                max-height: 40vh;
            }

        }

    }

    &.carrousel-image {
        width: 100%;
        height: 50vh;
        object-fit: cover;
    }

    &.news-img {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }

    &.news-detail--image {
        width: 100%;
        max-height: 80vh;
        object-fit: contain;
        background-color: ${COLORS.Gray};
        border-radius: 0.5em;
    }

    &.about-us--img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }


    ${props => props.maintenance && 
        `
            height: 85vh;
            margin-bottom: -15vh;
            filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.25));

            @media (max-width: 768px) {
                height: 50vh;
                margin-bottom: -10vh;
            }

        `
    }

`

export default Img;