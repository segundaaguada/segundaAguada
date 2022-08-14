import React from 'react';
import { FiSmartphone, FiPhone, FiClock, FiMail, FiTwitter, FiInstagram, FiFacebook } from 'react-icons/fi';

export const months = {
    0: 'Enero',
    1: 'Febrero',
    2: 'Marzo',
    3: 'Abril',
    4: 'Mayo',
    5: 'Junio',
    6: 'Julio',
    7: 'Agosto',
    8: 'Septiembre',
    9: 'Octubre',
    10: 'Noviembre',
    11: 'Diciembre'
}

export const contactTranslations = {
    'email': 'Correo',
    'phone': 'Teléfono',
    'mobile': 'Móvil',
    'schedule': 'Horario',
    'twitter': 'Twitter',
    'instagram': 'Instagram',
    'facebook': 'Facebook'
}

export const adminSectionTranslations = {
    'profile': 'Tu perfil',
    'entity': 'Tu entidad',
    'users': 'Usuarios',
    'entities': 'Entidades',
    'businesses': 'Comercios',
    'images': 'Imágenes',
    'news': 'Noticias',
    'messages': 'Mensajes'
}

export const socialMediaIcons = {
    'email': <FiMail style={{ fontSize: 24 }} />,
    'phone': <FiPhone style={{ fontSize: 24 }} />,
    'mobile': <FiSmartphone style={{ fontSize: 24 }} />,
    'schedule': <FiClock style={{ fontSize: 24 }} />,
    'twitter': <FiTwitter style={{ fontSize: 24 }} />,
    'instagram': <FiInstagram style={{ fontSize: 24 }} />,
    'facebook': <FiFacebook style={{ fontSize: 24 }} />,
}

// receives a 9 digit number without spaces
// returns number with format 111 11 11 11
export const formatPhoneNumber = (phoneNumber) => {
    phoneNumber = phoneNumber.replace(/\s+/g, '')
    return phoneNumber.substring(0, 3) + ' ' + 
           phoneNumber.substring(3, 5) + ' ' +
           phoneNumber.substring(5, 7) + ' ' +
           phoneNumber.substring(7, 9)
}

export const removeSpaces = (text) => {
    return text.replace(/\s+/g, '-')
}

export const addSpaces = (text) => {
    return text.replace('-', ' ')
}

export const displaySocialMedia = (text) => {
    if (text === '' || text === null) return text
    if (text.startsWith('@')) return text
    else return `@${text}`
}

export const formatSocialMedia = (text) => {
    if (text.startsWith('@')) return text.substring(1)
    else return text
}

export const extraRoutes = [
    '/404',
    '/404/',
    '/admin/login',
    '/admin/login/',
    '/admin/registro',
    '/admin/registro/',
    '/admin/registro/comercio',
    '/admin/registro/comercio/',
    '/admin/registro/entidad',
    '/admin/registro/entidad/',
    '/admin',
    '/admin/',
    '/mantenimiento',
    '/mantenimiento/',
]

export const carrouselImages = [
    {
        id: 1,
        src: '/images/carrusel-min.jpg'
    },
    {
        id: 2,
        src: '/images/carrusel2-min.jpg'
    },
    {
        id: 3,
        src: '/images/carrusel3-min.jpg'
    },
    {
        id: 4,
        src: '/images/carrusel4-min.jpg'
    },
]

export const profilePictureColors = [
    'blue',
    'purple',
    'green',
    'yellow',
    'pink',
    'red',
    'orange',
    'cyan'
]
