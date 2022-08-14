import styled from 'styled-components'
import {COLORS} from '../../Share/Colors'

const Aside = styled.aside`

    border-right: 1px dashed rgba(145, 158, 171, 0.24);
    // border-right: 1px dashed ${COLORS.Gray};
    width: 18.5%;
    height: 100vh;
    position: fixed;
    padding: 20px;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    background-color: #fff;
    z-index: 100000;
    // overflow-y: scroll;
    transition: transform 0.4s ease;
    // min-width: fit-content;

    &.open {
        transform: translateX(0);
        transition: transform 0.4s ease;
        position: absolute;
        top: 0;
        left: 0;

    }

    @media (max-width: 1150px) {
        transform: translateX(-100%);
    }

`

export default Aside