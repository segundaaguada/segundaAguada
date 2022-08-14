import styled from 'styled-components'

const Main = styled.main`

    min-height: 80vh;
    display: flex;
    flex-direction: column;

    &.add-button--main {
        position: relative;
    }

    &.auth-main {
        min-height: 100vh;
        align-items: center;
        justify-content: center;
        background-image: url(/images/carrusel3-min.jpg);
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: top center;
    }

    &.not-found--main {
        max-height: 100vh;
        align-items: center;
        justify-content: flex-start;
        margin-top: 7%;

        &.maintenance {
            height: 100vh;
            margin-top: 0;
            // justify-content: center;
        }

        @media (max-width: 780px) {
            margin-top: 15%;
        }

        @media (max-width: 480px) {
            margin-top: 25%;
        }

    }

    &.news-main {
        align-items: center;
        padding: 0 20%;
        // margin-bottom: 13%;

        @media (max-width: 768px) {
            padding: 0 10%;    
        }

    }

    &.list-main {
        flex-direction: row;
        padding: 0 5% 15vh 5%;
    }

    @media (max-width: 768px) {
        margin-top: 10%;

        &.auth-main, &.admin-main {
            margin: 0;
        }

    }

    &.admin-main {
        display: -webkit-box;
    }

`

export default Main

