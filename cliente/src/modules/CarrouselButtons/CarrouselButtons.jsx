import React from 'react'
import Div from '../../components/Div/Div'
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const CarrouselButtons = ({newsCarrousel, slider}) => {
    return (
        <Div className='carrousel-icons' newsCarrousel={newsCarrousel}>
                <IoIosArrowBack 
                    style={{ 
                        fill: 'rgba(255, 255, 255, 0.8)',
                        height: '40px',
                        width: '40px',
                        cursor: 'pointer',
                        filter: 'drop-shadow(4px 4px 5px rgb(0 0 0 / 0.4))'
                    }}
                    onClick={() => {
                        () => slider?.current?.slickPrev();
                    }}
                />
                <IoIosArrowForward 
                    style={{ 
                        fill: 'rgba(255, 255, 255, 0.8)',
                        height: '40px',
                        width: '40px',
                        cursor: 'pointer',
                        filter: 'drop-shadow(4px 4px 5px rgb(0 0 0 / 0.4))'
                    }}
                    onClick={() => {
                        () => slider?.current?.slickNext();
                    }}
                />
            </Div>
    )
}

export default CarrouselButtons