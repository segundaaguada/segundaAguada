import styled from 'styled-components'
import {COLORS} from '../../Share/Colors'
//styled d
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

`

export default Aside