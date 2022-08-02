import styled from 'styled-components'
import {COLORS} from '../../Share/Colors'

const P = styled.p`
    
    display: flex;
    align-items: center;

    line-height: 1.5;

    color: ${props => props.white ? COLORS.White : COLORS.Black};

    ${
        props => props.marginBottom && `

        margin-bottom: ${props.marginBottom};

        @media (max-width: 690px) {
            margin-bottom: 1.5%;
        }

    `}

    &.index-text {
        margin-bottom: 3%;
    }

    &.news-date--text {
        font-family: Gabriela;
    }

    &.contact-text {
        margin-bottom: 35px;
    }

    &.contact-info--title {
        font-weight: bold;
    }

    &.contact-info--content {
        margin: 12px 0 25px 34px;
    }

    &.contact-map--sede-text {
        margin: 0 0 25px 10px;
        font-weight: bold;
        width: calc(100% - 35px);
    }

    &.contact-map--direccion-text {
        margin-bottom: 7px;
    }

    &.not-found--number {
        font-size: 10em;
        color: ${COLORS.Blue};
        text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
        margin-bottom: 1%;
    }

    &.news-detail--content {
        text-indent: 25px;
        margin-bottom: 25px;
    }

    &.entity-detail--description {
        text-indent: 25px;
        margin-bottom: 10px;
    }

    &.entity-card--text {
        vertical-align: middle;
        margin: 0;
    }

    &.tooltip {
        color: ${COLORS.White};
        font-size: 1rem;
    }

    &.footer-names {
        margin-right: 20px;
        width: 100%;

        @media (max-width: 1404px) {

            margin-bottom: 30px;
            margin-right: 0;
            justify-content: center;

            & svg {
                margin: 0 8px;
            }

        }

        @media (max-width: 451px) {
            display: none;
        }

    }

    &.footer-names--responsive {

        display: none;
        text-align: center;

        @media (max-width: 451px) {
            display: flex;
            margin-bottom: 10%;
            justify-content: center;
        }
        
    }

    &.footer-a--p {

        transition: background-color 0.2s ease;
        padding: 0 3px;
        border-radius: 0.2em;

        // &:hover {
        //     background-color: #6c9ecc;
        //     transition: background-color 0.2s ease;
        // }

    }

    &.news-detail--date {
        text-align: right;
    }

    &.about-us--p {
        margin: 20px 0;
    }

    &.about-us--list-p {
        margin: 20px 10px;
    }

    // ADMIN

    &.p--profile-name {
        padding-left: 15px;
        font-weight: 500;
    }

    &.p--usercard-name {
        font-weight: 600;
        margin: 13px 0 3px 0;
        text-align: center;
    }

    &.p--usercard-entity {
        font-weight: 300;
        text-align: center;
    }

`

export default P;