import React, { Fragment } from 'react'
import Nav from '../../components/Nav/Nav'
import Ul from '../../components/Ul/Ul'
import Li from '../../components/Li/Li'
import Span from '../../components/Span/Span'

import { FiUser } from 'react-icons/fi'
import { FiHome } from 'react-icons/fi'
import { FiImage } from 'react-icons/fi'
import { FiUsers } from 'react-icons/fi'
import { FiMessageCircle } from 'react-icons/fi'
import { BiBuildingHouse } from 'react-icons/bi'
import { BiBriefcase } from 'react-icons/bi'
import { BiNews } from 'react-icons/bi'

const AdminMenu = ({user, setMenuOption}) => {

    return (
        <Nav className='admin-menu--nav'>
            <Ul className='admin-menu--ul'>
                <Li 
                    className='admin-menu--li profile admin-active'
                    onClick={() => {
                        setMenuOption('profile')
                    }}
                >
                    <FiUser 
                        style={{
                            fontSize: 22,
                            verticalAlign: 'middle'
                        }}
                    />
                    <Span>Tu perfil</Span>
                </Li>
                <Li 
                    className='admin-menu--li entity'
                    onClick={() => {
                        setMenuOption('entity')
                    }}
                >
                    <FiHome
                        style={{
                            fontSize: 22,
                            verticalAlign: 'middle'
                        }}
                    />
                    <Span>Tu entidad</Span>
                </Li>
                {
                    user.role === 1 ?
                    <Fragment>
                        <Li 
                            className='admin-menu--li users'
                            onClick={() => {
                                setMenuOption('users')
                            }}
                        >
                            <FiUsers
                                style={{
                                fontSize: 22,
                                verticalAlign: 'middle'
                            }}
                            />
                            <Span>Usuarios</Span>
                        </Li>
                        <Li 
                            className='admin-menu--li entities'
                            onClick={() => {
                                setMenuOption('entities')
                            }}
                        >
                            <BiBuildingHouse
                                style={{
                                fontSize: 22,
                                verticalAlign: 'middle'
                            }}
                            />
                            <Span>Entidades</Span>
                        </Li>
                        <Li 
                            className='admin-menu--li businesses'
                            onClick={() => {
                                setMenuOption('businesses')}
                            }
                        >
                            <BiBriefcase
                                style={{
                                fontSize: 22,
                                verticalAlign: 'middle'
                            }}
                            />
                            <Span>Comercios</Span>
                        </Li>
                        {/* <Li 
                            className='admin-menu--li images'
                            onClick={() => {
                                setMenuOption('images')}
                            }
                        >
                            <FiImage
                                style={{
                                fontSize: 22,
                                verticalAlign: 'middle'
                            }}
                            />
                            <Span>Imágenes</Span>
                        </Li>
                        <Li 
                            className='admin-menu--li news'
                            onClick={() => {
                                setMenuOption('news')}
                            }
                        >
                            <BiNews
                                style={{
                                fontSize: 22,
                                verticalAlign: 'middle'
                            }}
                            />
                            <Span>Noticias</Span>
                        </Li>
                        <Li 
                            className='admin-menu--li messages'
                            onClick={() => {
                                setMenuOption('messages')}
                            }    
                        >
                            <FiMessageCircle
                                style={{
                                fontSize: 22,
                                verticalAlign: 'middle'
                            }}
                            />
                            <Span>Mensajes</Span>
                        </Li> */}
                    </Fragment>
                    : null
                }
            </Ul>
        </Nav>
    )
}

export default AdminMenu