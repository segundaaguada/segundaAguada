import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import VisitorCounter from '../VisitorCounter/VisitorCounter'
import { Link } from 'react-router-dom'
import Ul from '../../components/Ul/Ul'
import Li from '../../components/Li/Li'
import countapi from 'countapi-js'
import { FiArrowRight } from 'react-icons/fi'
import Div from '../../components/Div/Div'

const AdminHeader = ({user}) => {

    const [views, setViews] = useState('')
    const [hoveredLink, setHoveredLink] = useState(false)


    const toggleMenu = () => {
        document.querySelector('.aside').classList.toggle('open');
        document.querySelector('.header-responsive--boton').classList.toggle('abierto')

        if (document.querySelector('.header-responsive--boton').classList.contains('abierto')) {
            document.querySelector('.header-responsive--boton').style.transform = `translateX()`
        } else {
            document.querySelector('.header-responsive--boton').style.transform = `translateX(0)`
        }

        document.querySelector('body').classList.toggle('scroll-desactivado')
        if (document.querySelector('.overlay').style.display === 'none') {
            document.querySelector('.overlay').style.display = 'flex'
        }

    }

    const closeMenu = () => {
        document.querySelector('.aside').classList.remove('open');
        document.querySelector('body').classList.remove('scroll-desactivado')
        document.querySelector('.overlay').style.display = 'none'
        document.querySelector('.header-responsive--boton').classList.remove('abierto')
    }


    useEffect(() => {
        countapi.get('segundaaguada', 'home').then( result => {
            setViews(result.value)
        });
    }, [])

    return (
        <>
            <Header
                admin={true}
            >
                <Ul
                    admin={true}
                >
                    {
                        user?.role === 1 ?
                            <Li
                                style={{
                                    padding: '10px 20px',
                                    margin: '0 1.5%'
                                }}
                            >
                                <VisitorCounter
                                    views={views}
                                />
                            </Li>
                            : null
                    }
                    <Li
                        style={{
                            backgroundColor: hoveredLink ? '#e8eef7' : '',
                            textDecoration: hoveredLink ? 'underline' : '',
                            transition: 'background-color 0.2s ease-in'
                        }}
                        onMouseEnter={() => setHoveredLink(true)}
                        onMouseLeave={() => setHoveredLink(false)}
                    >
                        <Link
                            to='/'
                            className='admin-link'
                        >
                            Ir al inicio
                            <FiArrowRight />
                        </Link>
                    </Li>
                    <Div
                        className='header-responsive--boton admin'
                        style={{ alignSelf: 'center', margin: '0 20px', marginRight: 'auto' }}
                        onClick={() => toggleMenu()}
                    >
                        <Div className='responsive-div responsive-div--uno' style={{ backgroundColor: '#222' }} />
                        <Div className='responsive-div responsive-div--dos' style={{ backgroundColor: '#222' }} />
                        <Div className='responsive-div responsive-div--tres' style={{ backgroundColor: '#222' }} />
                    </Div>
                </Ul>

            </Header>
            <Div
                className='overlay'
                style={{ display: 'none', position: 'absolute', top: '0', right: '0' }}
                onClick={() => closeMenu()}
            />
        </>
    )
}

export default AdminHeader