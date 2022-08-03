import styled from 'styled-components';
import {COLORS} from '../../Share/Colors'

const Header = styled.header`

    display: flex;
    align-items: center; 

    ${
        props => props.admin ?
        `
            height: 13vh;
            justify-content: flex-end;
            // background-color:pink;
            padding-right: 3em;
            display: flex;
            flex-direction: space-between;
            flex-wrap: wrap;
            width: 100%;
        `
        :
        `
            background-color: ${COLORS.Blue};
            width: 100%;
            height: 20vh;
            justify-content: center;
            flex-direction: column;
            text-transform: uppercase;
            z-index: 2000;
            position: relative;
            border-bottom-left-radius: 50% 40%;
            border-bottom-right-radius: 50% 40%;
            letter-spacing: 0.5px;
      
            @media (max-width: 960px) {
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
            }
        `
    }

`

export default Header;