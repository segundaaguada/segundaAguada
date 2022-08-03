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

    useEffect(() => {
        countapi.get('segundaaguada', 'home').then( result => {
            setViews(result.value)
        });
    }, [])

    return (
        <Header
            admin={true}
        >
            <Div 
                className='header-responsive--boton'
                style={{alignSelf: 'center', margin: '0 20px', marginRight: 'auto'}}
                // onClick={() => toggleMenu()}
            >
               <Div className='responsive-div responsive-div--uno' style={{backgroundColor: '#222'}} />
                <Div className='responsive-div responsive-div--dos' style={{backgroundColor: '#222'}} />
                <Div className='responsive-div responsive-div--tres' style={{backgroundColor: '#222'}} />
            </Div>
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
                        <FiArrowRight/>
                    </Link>
                </Li>
            </Ul>
        </Header>
    )
}

export default AdminHeader