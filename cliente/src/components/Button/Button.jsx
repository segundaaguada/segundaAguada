import styled from 'styled-components';
import {COLORS} from '../../Share/Colors'

const Button = styled.button`

    width: fit-content;
    color: ${COLORS.White};
    font-size: 1em;
    letter-spacing: 0.5px;
    background-color: ${COLORS.LightBlue};
    padding: 10px 15px;
    margin-top: 5%;
    border-radius: 0.5em;
    border: 2px solid ${COLORS.LightBlue};
    transition: all ease 0.2s;
    cursor: pointer;

    &:hover {
        border: 2px solid ${COLORS.LightBlue};
        background-color: ${COLORS.White};
        color: ${COLORS.LightBlue};
        transition: all ease 0.2s;
    }

    &.password-button {
        background-color: ${COLORS.White};
        border: none;
        margin: 0;
        padding: 3%;

        &:hover {
            background-color: #E7E7E7CC;
        }

        &:focus {
            outline-color: ${COLORS.LightBlue};
        }
        
    }

    &.modal-button {

        &:hover {

            background-color: ${COLORS.White};
            transition: all ease 0.2s;

        }

        ${props => props.type === 'delete' ? 
            `
                background-color: ${COLORS.Red};
                border: 2px solid ${COLORS.Red};

                &:hover {

                    border: 2px solid ${COLORS.Red};
        
                    & > span {
                        color: ${COLORS.Red};
                    }
        
                    & > svg {
                        stroke: ${COLORS.Red};
                    }
        
                }

                @media (max-width: 888px) {
        
                    &:hover {
                        border: 2px solid ${COLORS.LightRed};
                        background-color: ${COLORS.LightRed};
                    }
                }

            `
            : 
            props => props.type === 'edit' ? 
            `
                background-color: ${COLORS.LightBlue};
                border: 2px solid ${COLORS.LightBlue};

                &:hover {

                    border: 2px solid ${COLORS.LightBlue};
    
                    & > span {
                        color: ${COLORS.LightBlue};
                    }
    
                    & > svg {
                        stroke: ${COLORS.LightBlue};
                    }
    
                }

                @media (max-width: 888px) {
    
                    &:hover {
                        border: 2px solid ${COLORS.LightBlueHover};
                        background-color: ${COLORS.LightBlueHover};
                    }
                }

            `
            :
            `
                background-color: ${COLORS.Blue};
                border: 2px solid ${COLORS.Blue};

                &:hover {

                    border: 2px solid ${COLORS.Blue};
    
                    & > span {
                        color: ${COLORS.Blue};
                    }
    
                    & > svg {
                        stroke: ${COLORS.Blue};
                    }
    
                }

                @media (max-width: 888px) {
    
                    &:hover {
                        border: 2px solid ${COLORS.LightBlue};
                        background-color: ${COLORS.LightBlue};
                    }
                }

        `
        }


        &.entity {

            @media (max-width: 888px) {
    
                &:hover {
                    border: 2px solid ${COLORS.Blue};
                    background-color: ${COLORS.White};
                }
            }

        }

        height: fit-content;
        transition: all ease 0.2s;
        display: flex;
        align-items: center;
        padding: 10px 15px;
        cursor: pointer;
        transition: 0.2s ease all;
        position: ${props => props.position === 'relative' ? 'relative' : 'absolute'};
        margin: 0;
        
        &.main {
            top: -50px;
            right: 40px;
        }

        &.overlay {
            top: 20px;
            left: 20px;

            z-index: 100000;

        }

        & > span {
            color: ${COLORS.White};
        }

        & > svg {
            stroke: ${COLORS.White};
            margin-right: 5px;
        }

        ${props => props.position === 'relative' ? 
            `
            margin-top: auto;
            `
            :
            `
            @media (max-width: 888px) {

                clip-path: circle();
                padding: 1%;
    
                & > span {
                    display: none;
                }
    
                & > svg {
                    margin: 0!important;
                }
    
                &:hover {
    
                    & > span {
                        color: ${COLORS.White};
                    }
        
                    & > svg {
                        stroke: ${COLORS.White};
                    }
                }
            }
    
            @media (max-width: 650px) {
                top: -30px;
                right: 30px;
                padding: 1.5%;
            }
    
            @media (max-width: 480px) {
                top: -20px;
                right: 20px;
            }
            `
        }

    }

    &.confirmation-button {
        padding: 5%;
        margin: 10px;

        &.confirmation-button--delete {
            background-color: ${COLORS.Red};
            border: 2px solid ${COLORS.Red};

            &:hover {
                background-color: ${COLORS.White};
                color: ${COLORS.Red};
            }

        }

        &.confirmation-button--cancel {
            background-color: ${COLORS.DarkGray};
            border: 2px solid ${COLORS.DarkGray};

            &:hover {
                background-color: ${COLORS.White};
                color: ${COLORS.DarkGray};
            }

        }

    }

    &.go-back--button {
        background-color: ${COLORS.DarkGray};
        border: 2px solid ${COLORS.DarkGray};

        &:hover {
            background-color: ${COLORS.White};
            color: ${COLORS.DarkGray};
        }
        
    }

    ${props => props.delete && 
        `
            margin: 0;
            display: flex;
            align-items: center;

            background-color: ${COLORS.Red};
            border: 2px solid ${COLORS.Red};

            & span {
                color: ${COLORS.White};
            }

            & svg {
                stroke: ${COLORS.White};
            }

            &:hover {
                background-color: ${COLORS.White};
                border: 2px solid ${COLORS.Red};

                & span {
                    color: ${COLORS.Red};
                }
    
                & svg {
                    stroke: ${COLORS.Red};
                }

            }

        `
    }


`

export default Button;