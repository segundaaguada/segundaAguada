import styled from 'styled-components';
import {COLORS} from '../../Share/Colors'

const Div = styled.div`


    ${props => props.hide && (
        `
            @media (max-width: 950px) {
                display: none;
            }
        
        `
    )}

    ${props => props.show && (
        `

            display: none;
            word-break: break-word;

            @media (max-width: 950px) {
                display: flex;
                flex-direction: column;
                padding: 5% 10% 5% 15%;
            }
        
        `
    )}


    // No content

    &.no-content {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
    }

    
    // Botones noticia

    &.news-detail--buttons {
        height: 10vh;
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-top: 10vh;

        & > div {
            display: flex;
        }

        & button {
            margin: 5px;
        }

    }


    // DELETE confirmation

    &.confirmation-div--container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &.confirmation-div {
        display: flex;
        justify-content: center;
        margin-top: 5%;
    }

    
    // ABOUT US

    &.about-us--div {
        width: 50%;
        align-self: center;
        margin: 5vh 0 7vh 0;

        @media (max-width: 780px) {
            width: 80%;
        }

    }


    // BOTON SCROLL TO TOP

    &.scroll-top--button {

        display: flex;
        justify-content: center;
        align-items: center;
        clip-path: circle();
        padding: 1%;
        margin: 2.2%;
        background-color: ${COLORS.Blue};
        position: fixed;
        bottom: 0;
        right: 0;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            background-color: ${COLORS.LightBlue};
            transform: translateY(-10px);
            transition: all 0.2s ease;
        }

        @media (max-width: 780px) {
            margin: 3%;
            padding: 2%;
        }

        @media (max-width: 480px) {
            margin: 5%;
            padding: 2.5%;
        }

    }

    // GALLERY

    &.gallery-image--container {
        height: 25em;
        width: 25em;
        overflow: hidden;
        margin: 30px;
        cursor: pointer;
        border: 1px solid ${COLORS.Gray};
        border-radius: 0.5em;
        background-color: ${COLORS.Gray}4D;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
        transition: transform 0.2s ease;

        @media (max-width: 650px) {
            width: 22em;
            height: 22.5em;
        }

        @media (max-width: 480px) {
            width: 18em;
            height: 18.5em;
        }

        @media (max-width: 390px) {
            width: 16em;
            height: 16.5em;
        }

        &.carrousel {
            width: 100%;
            margin: 0;
            padding: 0;

            @media (max-width: 1220px) {
                width: 110%;
            }

            @media (max-width: 780px) {
                width: 100%;
            }

            @media (max-width: 380px) {
                height: 37vh;
            }

        }

        &:hover {
            transform: scale(1.05);
            transition: transform 0.2s ease;
        }

    }


    // OVERLAY CERRAR MENU DESPLEGABLE 
    // Y ABRIR FOTO GALERIA

    &.overlay {

        position: fixed;
        width: 100%;
        height: 100%;
        cursor: pointer;

        &.overlay-gallery {

            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(0,0,0,0.9);
            padding: 3% 5%;
            z-index: 5000;
            top: 0;

            & > img {
                max-width: 100%;
                height: 100%;
                object-fit: contain;
            }

        }

    }


    // HEADER

    &.header-title {
        display: flex;
        flex-direction: column;
        align-items: center;

        @media (max-width: 690px) {
            display: none;
        }

    }

    &.header-responsive {
        display: none;

        @media (max-width: 690px) {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding: 0 5%;
        }

    }

    &.header-responsive--boton {
        height: fit-content;
        width: 25px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        cursor: pointer;

        &.abierto {

            & > .responsive-div--uno {
                transform: rotate(-45deg) translate(-5px, 8px);
            }

            & > .responsive-div--dos {
                opacity: 0;
            }

            & > .responsive-div--tres {
                transform: rotate(45deg) translate(-4px, -8px);
            }

        }

    }

    &.responsive-div {
        width: 100%;
        height: 3px;
        margin: 3px 0;
        background-color: ${COLORS.White};
        border-radius: 0.5em;
        transition: all 0.5s;
        cursor: pointer;
    }


    // LIST

    &.list-container {

        margin-top: 5vh;

        @media (max-width: 780px) {
            margin-top: 5vh;
        }

    }

    &.list-map--container {
        height: 70vh;
        width: 80%;
        border-radius: 1em;
        overflow: hidden;
        margin-top: 10%;

        @media (max-width: 780px) {
            width: 100%;
            height: 50vh;
            margin-bottom: 20%;
        }

        @media (max-width: 480px) {
            height: 40vh;
        }

    }

    &.list-right--responsive {

        display: none;

        @media (max-width: 780px) {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        & form {
            width: 80%;

            @media (max-width: 404px) {
                width: 100%;
            }

        }

    }


    // ENTITY CARD

    &.entity-card--container {
        width: 85%;
        height: 15em;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
        border-radius: 1em;
        display: flex;
        padding: 30px 20px;
        line-height: 1.5;
        cursor: pointer;
        transition: transform 0.2s ease;
        margin: 30px;
        overflow: hidden;

        &:hover {
            transform: scale(1.05);
            transition: transform 0.2s ease;
        }

        @media (max-width: 780px) {
            height: 50vh;
            flex-direction: column;
            align-items: center;
            width: 65%;
        }

        @media (max-width: 650px) {
            width: 80%;
        }

        @media (max-width: 480px) {
            height: 35vh;
            width: 100%;
        }

    }

    &.entity-card--left {
        width: 30%;
        display: flex;
        border-radius: 0.7em;
        overflow: hidden;

        @media (max-width: 780px) {
            width: 90%;
            height: 100%;
        }

    }

    &.entity-card--right {
        margin: 15px 0 0 25px;
        width: 60%;
        display: flex;
        flex-direction: column;
        word-wrap: break-word;

        @media (max-width: 780px) {
            height: 40%;
            width: 100%;
        }

        @media (max-width: 480px) {
            justify-content: flex-end;
            height: auto;
            margin-top: 20px;
        }

    }

    &.entity-card--location {
        justify-self: flex-end;
        display: flex;
        margin-top: 10px;

        & > svg {
            margin-top: 3.5px;
        }

        @media (max-width: 780px) {
            display: none;
        }

    }


    // SEARCH BAR

    &.searchbar-div {
        background-color: ${COLORS.Blue};
        border-radius: 0.5em;
        height: 90%;
        padding: 0 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 15px;
    }

    // NEWS CARD

    ${
        props => props.background && (
            `
                background-image: url('${props.background}');
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
                width: 25em;
                height: 25.5em;
                position: relative;
                display: flex;
                box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
                border-radius: 1em;
                overflow: hidden;
                cursor: pointer;
                transition: transform 0.2s ease;

                &:hover {
                    transform: scale(1.05);
                    transition: transform 0.2s ease;
                }

                @media (max-width: 650px) {
                    width: 22em;
                    height: 22.5em;
                }

                @media (max-width: 480px) {
                    width: 18em;
                    height: 18.5em;
                }

                @media (max-width: 390px) {
                    width: 16em;
                    height: 16.5em;
                }

            `
        )
    }

    &.news-bottom {
        background: ${COLORS.Black}B3;
        align-self: flex-end;
        width: 100%;
        padding: 3% 5% 0.2% 5%;
        line-height: 1.5;

        & > p {
            margin-bottom: 10px;
        }
        
        & span {
            color: ${COLORS.White};
        }

    }


    // AUTH

    &.auth-div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &.auth-password--input {
        padding: 0 10px;
        outline: none;
        border: 2px solid #BCBCBC;
        border-radius: 0.5em;
        font-size: 1em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: text;
    }

    &.input-focus {
        border: 2px solid #4F8FCBCC;
        box-shadow: 0 0 5px 1px #4F8FCB;
        transition: all 0.2s ease-in;
    }

    // CARRUSEL IMAGENES HEADER

    &.carrousel-container {
        position: relative;
        top: -70px;

        @media (max-width: 768px) {
            display: none;
        }

    }

    &.carrousel-icons {
        ${
            props => props.newsCarrousel ? 'top: 45%;' : 'top: 50%;'
        }
        width: 100%;
        position: absolute;
        display: flex;
        justify-content: space-between;
        padding: 0 5px;
        pointer-events: none;

        & > svg {
            pointer-events: auto;
        }

    }

    &.logo-container {
        width: 50%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        overflow: hidden;

        @media (max-width: 780px) {
            width: 100%;
            justify-content: center;
        }

    }

    &.index-map--container {
        height: 50%;
        width: 40%;
        border-radius: 1em;
        overflow: hidden;
        margin-right: 5%;

        @media (max-width: 1220px) {
            height: 80%!important;
        }

        @media (max-width: 780px) {
            align-self: center;
            width: 95%;
            height: 100%;
            margin: 0;
        }

    }

    &.contact-map { 
        height: 50vh;
    }

    &.contact-map--container {
        background-color: ${COLORS.White};
        border-radius: 1em;
        overflow: hidden;
        width: 50%;
        margin-bottom: 20vh;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);

        @media(max-width: 780px) {
            width: 70%;
        }

    }

    &.contact-map--info {
        padding: 8% 10%;
        height: fit-content;
    }

    &.contact-map--sede {
        display: flex;
    }

    &.checkbox-content {
        flex-direction: row;
        text-align: left;
        width: fit-content;
    }

    &.contact-info--container {
        width: 50%;
        padding: 5% 10% 0 0;
        display: flex;
        flex-direction: column;

        @media (max-width: 950px) {
            width: 100%;
            padding: 0;
        }

    }

    &.contact-info {
        display: flex;
        padding: 20px 0;
    }

    &.contact-info--div {
        display: flex;
    }

    &.contact-info--content {
        margin-left: 10px;
    }

    &.contact-form--container {
        width: 38%;
        padding: 5% 0;
        border-radius: 1em;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.25);
        background-color: ${COLORS.White};

        @media (max-width: 950px) {
            align-self: center;
            margin: 10% 0;
            width: 80%;
            padding: 10% 0;
        }

        @media (max-width: 769px) {
            width: 90%;
        }

        @media (max-width: 480px) {
            width: 100%;
        }

    }

    &.section-div {
        width: 50%;
        padding-right: 5%;

        &.entity {
            margin-top: 2%;
            display: flex;
            flex-direction: column;
        }

        @media (max-width: 780px) {
            width: 100%;
            padding: 0;
            margin-bottom: 15%;
        }

    }

    // NOTICIA

    &.news-left {
        height: 100%;
        width: 50%;
        overflow: hidden;
        position: relative;
        background-color: ${COLORS.Gray};

        @media (max-width: 780px) {
            width: 100%;
        }

    }

    &.news-right {
        width: 50%;
        padding: 60px 40px;
        display: flex;
        flex-direction: column;

        @media (max-width: 780px) {
            height: 40%;
            width: 100%;
            padding: 5%;
        }

        @media (max-width: 480px) {
            height: 35%;
            padding: 8%;
        }

    }

    &.news-date {
        position: absolute;
        clip-path: circle(40%);
        padding: 4%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: ${COLORS.White}BF;
        border: 1px solid ${COLORS.LightBlue};
        top: 0;
        right: 0;
    }


    // DETALLE NOTICIA

    &.news-detail--div {
        display: flex;
        justify-content: space-between;
        margin: 0 2% 30px 2%;
    }


    // FOOTER

    &.footer-icons {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
    }

    &.footer-separator {

        ${
            props => props.contactFooter && `background: ${COLORS.Gray};`
        }

        position: absolute;
        left: 0;
        top: -48px;
        height: 48px;
        width: 100%;
        overflow: hidden;

        &:after {
            -webkit-clip-path: polygon(0 0,100% 100%,0 100%);
            clip-path: polygon(0 0,100% 100%,0 100%);
            background: ${COLORS.LightBlue};
            width: 110%;
        }

        &:before {
            -webkit-clip-path: polygon(0 100%,100% 100%,100% 0);
            clip-path: polygon(0 100%,100% 100%,100% 0);
            background: ${COLORS.Yellow};
            width: 100%;
        }

        &:after, &:before {
            content: "";
            position: absolute;
            height: 50px;
        }
    }

    // ADMIN

    &.div--admin-user {
        min-width: fit-content;
        max-width: 100%;
        display: flex;
        justify-content: flex-start;
        border-radius: 12px;
        background-color: rgba(145, 158, 171, 0.12);
        padding: 10px 20px;
        margin-bottom: 25px;
    }

    &.div--profile-picture {
        clip-path: circle();
        padding: 1.25em;
        display: flex;
        justify-content: center;
        align-items: center;

        &.usercard {
            padding: 1.65em;
        }

        &.blue {
            background-color: rgb(209, 233, 252);
            color: rgb(6, 27, 100);
        }

        &.purple {
            background-color: #f7d9ff;
            color: #3a004f;  
        }

        &.green {
            background-color: #dcffe6;
            color: #062800;
        }

        &.yellow {
            background-color: rgb(255, 247, 205);
            color: rgb(122, 79, 1);
        }

        &.pink {
            background-color: #fae3ef;
            color: #4b0030;
        }

        &.red {
            background-color: #ffdddf;
            color: #510018;
        }

        &.orange {
            background-color: rgb(255, 231, 217);
            color: rgb(122, 12, 46);
        }

        &.cyan {
            background-color: rgb(208, 242, 255);
            color: rgb(4, 41, 122);
        }

    }

    &.div--visitor-counter {
        display: flex;
    }

    &.admin-section--div {
        margin: 1% 2%;
    }

    &.div--usercard {
        width: 20%;
        min-width: 12em;
        padding: 2% 2% 20px 2%;
        border-radius: 1em;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
        display: flex;
        flex-direction: column;
        align-items: center;
        // transition: transform 0.2s ease;
        // cursor: pointer;
        margin: 20px 25px;
        position: relative;

        // &:hover {
        //     transform: scale(1.05);
        //     transition: transform 0.2s ease;
        // }

    }

    &.div--usercard-role {
        padding: 7px 15px;
        border-radius: 12px;
        align-self: flex-end;
        margin-top: 20px;
    }

    &.div--admin-users {
        margin: 20px 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    &.admin-button--div {

        @media (max-width: 680px) {
            margin: 30px 0!important;
        }

    }

    &.admin--responsive-info {
        
    }

`

export default Div;