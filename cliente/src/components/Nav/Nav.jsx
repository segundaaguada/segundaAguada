import styled from 'styled-components';
import { COLORS } from '../../Share/Colors'

const Nav = styled.nav `

    &.header-nav {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        @media (max-width: 690px) {
            display: none;
        }

    }

    &.responsive-nav {
        background-color: ${COLORS.Blue};
        text-transform: uppercase;
        transition: transform 0.5s ease;
        position: absolute;
        width: 100%;
        top: -70vh;
        z-index: 1000;

        &.abierto {
            transform: translateY(89.9vh);
            transition: transform 0.5s ease;
        }

    }
    
    &.footer-nav {
        width: -webkit-fill-available;
        display: flex;
        justify-content: space-between;
    }

`
export default Nav;