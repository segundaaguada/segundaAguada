import styled from 'styled-components'
import {COLORS} from '../../Share/Colors'

const Section = styled.section`

    // ABOUT US

    &.about-us--section {

        display: flex;
        flex-direction: column;
        padding: 0 5%;

        &.section-bottom {
            margin: 2.5% 0 10vh 0;
        }

        @media (max-width: 780px) {
            padding: 0 10%;
        }

    }


    // NEWS CARROUSEL

    &.section-gray {
        background-color: ${COLORS.Gray};
        height: 80vh;
        position: relative;
    }

    &.news-container {
        // box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
        border-radius: 20px;
        display: flex;
        overflow: hidden;
        height: 64vh;
        width: 70%;
        background-color: ${COLORS.White};

        @media (max-width: 780px) {
            flex-direction: column;
        }

        @media (max-width: 650px) {
            height: 75%;
        }

        @media (max-width: 480px) {
            height: 55%;
        }

    }

    // GALLERY

    &.gallery-section {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 4vh;
        margin-bottom: 15vh;
    }

    &.gallery-carrousel {
        position: relative;
        padding: 30vh 0 33vh 0;
        min-height: 80vh;
    }


    // ENTITIES AND BUSINESS

    &.contact-info {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        height: fit-content;
        padding: 5% 0;

        & > div {

            display: flex;
            align-items: flex-start;
            justify-content: center;
            width: 33%;

            @media (max-width: 650px) {
                width: 50%;
            }

            @media (max-width: 480px) {
                width: 100%;
            }

        }

    }

    &.entity-section--bottom {

        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 10%;

        @media (max-width: 780px) {
            padding-top: 20%;
        }

    }


    // ENTITIES AND BUSINESSES LIST

    &.list-section--left {

        width: 60%;

        @media (max-width: 780px) {
            width: 100%;
            padding: 0 10%;
        }

    }

    &.list-section--right {
        width: 40%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        // padding-right: 5%;

        @media (max-width: 780px) {
            display: none;
        }

    }

    // PAGINATION

    &.pagination {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-top: 10vh;

        &.entities {
            margin-top: 12vh;
        }

        &.admin {
            margin-top: 6vh;
            margin-bottom: 12vh;
        }

    }


    // NEWS LIST

    &.news-list--top {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-bottom: 4vh;
    }

    &.news-list--container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 15vh;
    }


    // AUTH

    &.section-auth {

        background-color: ${COLORS.White};
        border-radius: 20px;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.25);
        padding: 2.5%;
        width: 30%;

        &.register {
            margin: 10vh 0;
        }

        @media (max-width: 1024px) {
            width: 40%;
            padding: 3%;
        }

        @media (max-width: 780px) {
            width: 50%;
            padding: 4%;
        }

        @media (max-width: 650px) {
            width: 60%;
            padding: 5%;
        }

        @media (max-width: 480px) {
            width: 70%;
        }

        @media (max-width: 380px) {
            width: 80%;
        }

    }

    
    // NEWS

    &.news-detail--title {
        display: flex;
        flex-direction: column;
        width: 100%;
    }


    // CONTACT

    &.news-detail--content {
        margin-top: 60px;
        margin-bottom: 15vh;
    }

    &.contact-section--top {
        padding: 5% 0;
        display: flex;
        justify-content: center;
        background: linear-gradient(180deg, ${COLORS.White} 75%, ${COLORS.Gray} 25%);
    
        @media (max-width: 950px) {
            background: ${COLORS.White};
            flex-direction: column;
            padding: 0 10% 6% 10%;
        }
    
    }

    &.contact-section--bottom {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 10%;
        background-color: ${COLORS.Gray};
    }


    // HOME

    &.index-section {

        ${
            props => props.firstSection ?
                'padding: 0 5% 6% 5%;' :
                'padding: 6% 5%;'
        }
        display: flex;
        justify-content: space-between;
        height: fit-content;
        margin-bottom: 10vh;

        @media (max-width: 780px) {
            flex-direction: column;
            ${
                props => props.firstSection ?
                    'padding: 0 10% 6% 10%;' :
                    'padding: 15% 10%;'
            }
        }

        &.map {

            height: 70vh;

            @media (max-width: 780px) {
                height: 120vh;
            }

            @media (max-width: 580px) {
                height: 100vh;
            }

        }


    }


    // FOOTER

    &.footer-top-section {
        display: flex;
        flex-direction: row;
        padding: 5% 0;
        width: 100%;
        justify-content: space-around;

        @media (max-width: 690px) {

            flex-direction: column;
            margin-left: 30%;
            padding: 7% 0;

            & > Div:nth-of-type(2) {

                margin-top: 7%;

            }

        }
    }

    &.footer-bottom-section {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 2% 0;
        width: 80%;

        @media (max-width: 1404px) {
            flex-direction: column;
            align-items: center;
        }

        @media (max-width: 490px) {
            font-size: 11px;
            padding: 3% 0;
        }

    }

    // ADMIN

    &.admin-section {
        width: 81.5%;
        margin-left: auto;
        min-height: 100vh;

        @media (max-width: 1150px) {
            width: 100%;
            padding-left: 5%;
        }

    }

`
export default Section;