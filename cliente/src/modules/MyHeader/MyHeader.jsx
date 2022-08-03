
import React, { Fragment, useState, useEffect } from 'react';
import {Link, NavLink, useLocation} from 'react-router-dom'
import { extraRoutes } from '../../Share/utilities'
//IMPORTS COMPONENTS
import H1 from '../../components/H1/H1'
import Nav from '../../components/Nav/Nav'
import Line from '../../components/Line/Line'
import Ul from '../../components/Ul/Ul'
import Li from '../../components/Li/Li'
import Header from '../../components/Header/Header'
import Carrousel from '../../modules/Carrousel/Carrousel'
import Span from '../../components/Span/Span'
import Div from '../../components/Div/Div'
//END IMPORTS COMPONENTS
import {COLORS} from '../../Share/Colors'
import { carrouselImages } from '../../Share/utilities'
import { useSelector } from 'react-redux'

const MyHeader = () =>{

    const location = useLocation()

    const [activePage, setActivePage] = useState('')
    const user = useSelector(state => state.user)

    useEffect(() => {
        switch (activePage) {
            case 'la-asociacion':
                document.querySelector('.la-asociacion').classList.add('active')
                document.querySelector('.nuestro-barrio').classList.remove('active')
                break
            case 'nuestro-barrio':
                document.querySelector('.nuestro-barrio').classList.add('active')
                document.querySelector('.la-asociacion').classList.remove('active')
                break
            case '':
                if (!extraRoutes.includes(location.pathname)) {
                    document.querySelector('.la-asociacion').classList.remove('active')
                    document.querySelector('.nuestro-barrio').classList.remove('active')
                }
                break
        }
    }, [activePage])

    const toggleMenu = () => {
        document.querySelector('.header-responsive--boton').classList.toggle('abierto')
        document.querySelector('.responsive-nav').classList.toggle('abierto')
        document.querySelector('body').classList.toggle('scroll-desactivado')
        if (document.querySelector('.overlay').style.display === 'none') {
            document.querySelector('.overlay').style.display = 'flex'
        } else closeDropdownOptions()
    }

    const closeMenu = () => {
        document.querySelector('.header-responsive--boton').classList.remove('abierto')
        document.querySelector('.responsive-nav').classList.remove('abierto')
        document.querySelector('body').classList.remove('scroll-desactivado')
        document.querySelector('.overlay').style.display = 'none'
        closeDropdownOptions()        
    }

    const displayDropdownOptions = (event) => {
        event.target.classList.toggle('responsive-dropdown')
        event.target.nextSibling.classList.toggle('hidden')
        event.target.parentElement.classList.toggle('responsive-dropdown--parent')
    }

    const closeDropdownOptions = () => {
        document.querySelector('.overlay').style.display = 'none'
        const navUls = document.querySelectorAll('.responsive-nav--ul-child')
        navUls.forEach(ul => {
            if (!ul.classList.contains('hidden')) {
                ul.classList.add('hidden')
                ul.previousSibling.classList.remove('responsive-dropdown')
                ul.parentElement.classList.remove('responsive-dropdown--parent')
            }
        })
    }


    if (extraRoutes.includes(location.pathname)) return null;

    return (
        <Fragment>
            <Header>
                <Div className='header-title'>
                    <H1 className='header-heading'>
                        Asociación de vecinos Segunda Aguada
                    </H1>
                    <Line 
                        width='110%'
                        margin='0.8% 0 1% 0'
                        backgroundColor= {COLORS.White}
                    />
                </Div>
                <Nav className='header-nav'>
                    <Ul 
                        className='header-ul'
                        nav={true}
                    >
                        <Li className='nav-link'>
                            <NavLink 
                                to='/'
                                className='navlink'
                                onClick={() => setActivePage('')}
                            >
                                Inicio
                            </NavLink>
                        </Li>
                        <Li className='dropdown-parent nav-link'>
                            <Span className='dropdown la-asociacion'>La asociación</Span>
                            <Ul 
                                dropdown={true}
                                nav={true}
                            >
                                <Li>
                                    <NavLink 
                                        to='/nosotros'
                                        className='navlink dropdown'
                                        onClick={() => setActivePage('la-asociacion')}    
                                    >
                                        Sobre nosotros
                                    </NavLink>
                                </Li>
                                <Li>
                                    <NavLink 
                                        to='/galeria'
                                        className='navlink dropdown'
                                        onClick={() => setActivePage('la-asociacion')}
                                    >
                                        Galería
                                    </NavLink>
                                </Li>
                                <Li>
                                    <NavLink 
                                        to='/contacto'
                                        className='navlink dropdown'
                                        onClick={() => setActivePage('la-asociacion')}   
                                    >
                                        Contacto
                                    </NavLink>
                                </Li>
                                <Li>
                                    <a 
                                        href='https://drive.google.com/drive/folders/1g0uTcxQ1lH-6WQlA2jdPRh-vdh467hea?usp=sharing'
                                        className='navlink dropdown'
                                        target='blank' 
                                    >
                                        Boletines
                                    </a>
                                </Li>
                            </Ul>
                        </Li>
                        <Li className='nav-link'>
                            <NavLink 
                                to='/noticias'
                                className='navlink'
                                onClick={() => setActivePage('')}
                            >
                                Noticias
                            </NavLink>
                        </Li>
                        <Li className='dropdown-parent nav-link'>
                            <Span className='dropdown nuestro-barrio'>Nuestro barrio</Span>
                            <Ul 
                                dropdown={true}
                                nav={true}
                            >
                                <Li>
                                    <NavLink 
                                        to='/entidades'
                                        className='navlink dropdown'
                                        onClick={() => setActivePage('nuestro-barrio')} 
                                    >
                                        Entidades
                                    </NavLink>
                                </Li>
                                <Li>
                                    <NavLink 
                                        to='/comercios'
                                        className='navlink dropdown'
                                        onClick={() => setActivePage('nuestro-barrio')}    
                                    >
                                        Comercios
                                    </NavLink>
                                </Li>
                            </Ul>
                        </Li>
                        {
                            user ?
                            <Li className='nav-link'>
                                <NavLink 
                                    to='/admin'
                                    className='navlink'
                                    onClick={() => setActivePage('')}
                                >
                                    Admin
                                </NavLink>
                            </Li>
                            : null
                        }
                    </Ul>
                </Nav>
                <Div className='header-responsive'>
                    <H1 className='header-responsive--heading'>Asociación de vecinos Segunda Aguada</H1>
                    <Div 
                        className='header-responsive--boton'
                        onClick={() => toggleMenu()}
                    >
                        <Div className='responsive-div responsive-div--uno'/>
                        <Div className='responsive-div responsive-div--dos'/>
                        <Div className='responsive-div responsive-div--tres'/>
                    </Div>
                </Div>
            </Header>
            <Carrousel
                imagesArray={carrouselImages}
            />
            <Nav className='responsive-nav'>
                <Ul 
                    className='responsive-nav--ul'
                    nav={true}
                >
                    <Li className='responsive-nav--li'>
                        <Link
                            to='/'
                            className='responsive-link'
                            onClick={() => closeMenu()}
                        >
                            Inicio
                        </Link>
                    </Li>
                    <Li className='responsive-nav--li'>
                        <Span 
                            className='dropdown'
                            onClick={event => displayDropdownOptions(event)}    
                        >
                            La asociación
                        </Span>
                        <Ul 
                            className='responsive-nav--ul responsive-nav--ul-child hidden'
                            nav={true}
                        >
                            <Li className='responsive-nav--li-dropdown'>
                                <Link
                                    to='/nosotros'
                                    className='responsive-link'
                                    onClick={() => closeMenu()}
                                >
                                    Sobre nosotros
                                </Link>
                            </Li>
                            <Li className='responsive-nav--li-dropdown'>
                                <Link
                                    to='/galeria'
                                    className='responsive-link'
                                    onClick={() => closeMenu()}
                                >
                                    Galería
                                </Link>
                            </Li>
                            <Li className='responsive-nav--li-dropdown'>
                                <Link
                                    to='/contacto'
                                    className='responsive-link'
                                    onClick={() => closeMenu()}
                                >
                                    Contacto
                                </Link>
                            </Li>
                            <Li className='responsive-nav--li-dropdown'>
                                <a
                                    href='https://drive.google.com/drive/folders/1g0uTcxQ1lH-6WQlA2jdPRh-vdh467hea?usp=sharing'
                                    className='responsive-link'
                                    onClick={() => closeMenu()}
                                    target='blank'
                                >
                                    Boletines
                                </a>
                            </Li>
                        </Ul>
                    </Li>
                    <Li className='responsive-nav--li'>
                        <Link
                            to='/noticias'
                            className='responsive-link'
                            onClick={() => closeMenu()}
                        >
                            Noticias
                        </Link>
                    </Li>
                    <Li className='responsive-nav--li'>
                        <Span 
                            className='dropdown'
                            onClick={event => displayDropdownOptions(event)}
                        >
                            Nuestro barrio
                        </Span>
                        <Ul 
                            className='responsive-nav--ul responsive-nav--ul-child hidden'
                            nav={true}    
                        >
                            <Li className='responsive-nav--li-dropdown'>
                                <Link
                                    to='/entidades'
                                    className='responsive-link'
                                    onClick={() => closeMenu()}
                                >
                                    Entidades
                                </Link>
                            </Li>
                            <Li className='responsive-nav--li-dropdown'>
                                <Link
                                    to='/comercios'
                                    className='responsive-link'
                                    onClick={() => closeMenu()}
                                >
                                    Comercios
                                </Link>
                            </Li>
                        </Ul>
                    </Li>
                    {
                        user ? 
                        <Li className='responsive-nav--li'>
                            <Link
                                to='/admin'
                                className='responsive-link'
                                onClick={() => closeMenu()}
                            >
                                Admin
                            </Link>
                        </Li>
                        : null
                    }
                </Ul>
            </Nav>
            <Div 
                className='overlay'
                style={{display: 'none'}}
                onClick={() => closeMenu()}
            />
        </Fragment>
    )
}

export default MyHeader;

