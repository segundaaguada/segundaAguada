import React, { useEffect } from 'react'
import Main from '../../components/Main/Main'
import P from '../../components/P/P'
import Img from '../../components/Img/Img'

const Maintenance = () => {

    useEffect(() => {
        document.title = 'Mantenimiento | AVV Segunda Aguada'
    }, [])

    return (
        <Main className='not-found--main maintenance'>
            <Img src='/images/mantenimiento.png' alt="Web en mantenimiento" maintenance />
            <P className='not-found--text'>Lo sentimos, este espacio se encuentra actualmente en mantenimiento.</P>
            <P className='not-found--text'>Pronto estará disponible de nuevo.</P>
            <P maintenanceFooter>Desarrollado por&nbsp;<a href='https://www.linkedin.com/in/alberto-bulpe/' target='blank' className='footer-link linkedin maintenance'>Alberto Bulpe Martínez</a>&nbsp;y&nbsp;<a href='https://www.linkedin.com/in/beaconde/' target='blank' className='footer-link linkedin maintenance'>Beatriz Conde Cerón.</a></P>
        </Main>
    )
}

export default Maintenance