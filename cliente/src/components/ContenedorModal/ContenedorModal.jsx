import styled from 'styled-components'

const ContenedorModal = styled.div`

    // margin: 5vh 0;
    margin-top: 25vh;
    width: 30%;
    min-height: 100px;
    background-color: #fff;
    position: relative;
    border-radius: 0.5em;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding: 30px;
    // z-index: 5000;

    @media (max-width: 1024px) {
        width: 50%;
    }

    @media (max-width: 780px) {
        width: 60%;
    }

    @media (max-width: 650px) {
        width: 70%;
    }

    @media (max-width: 480px) {
        width: 80%;
    }
    
    @media (max-width: 380px) {
        width: 90%;
    }

`
export default ContenedorModal