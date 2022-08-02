import React, { useState, useEffect } from 'react'
import Main from '../../components/Main/Main'
import AdminAside from '../../modules/AdminAside/AdminAside'
import AdminSection from '../../modules/AdminSection/AdminSection'
import { useDispatch, useSelector } from 'react-redux'
import { setContactFooter, setUser } from '../../store/general/action'
import checkLoggedUser from '../../services/checkLoggedUser'
import { useNavigate } from 'react-router-dom'
import verifyToken from '../../services/verifyToken'
import logoutService from '../../services/logout'


const Admin = () => {

    const [menuOption, setMenuOption] = useState('profile')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const logout = () => {
        logoutService()
        navigate('/')
    }

    useEffect(() => {
        
        setContactFooter(dispatch, false)

        document.title = 'Administración | AVV Segunda Aguada'

        const loggedUser = checkLoggedUser()
        if (!user && loggedUser) {
            const tokenVerified = verifyToken(loggedUser)
            tokenVerified.then(response => {
                if (typeof response === 'string') logout()
                else setUser(dispatch, loggedUser)
            })
        }
        else if (!loggedUser) {
            setUser(dispatch, undefined)
            navigate('/')
        }
        
    }, [])

    useEffect(() => {
        switch (menuOption) {
            case 'profile':
                document.querySelector('.admin-active').classList.remove('admin-active')
                document.querySelector('.profile').classList.add('admin-active')
                break
            case 'entity':
                document.querySelector('.admin-active').classList.remove('admin-active')
                document.querySelector('.entity').classList.add('admin-active')
                break
            case 'users':
                document.querySelector('.admin-active').classList.remove('admin-active')
                document.querySelector('.users').classList.add('admin-active')
                break
            case 'entities':
                document.querySelector('.admin-active').classList.remove('admin-active')
                document.querySelector('.entities').classList.add('admin-active')
                break
            case 'businesses':
                document.querySelector('.admin-active').classList.remove('admin-active')
                document.querySelector('.businesses').classList.add('admin-active')
                break
            // case 'images':
            //     document.querySelector('.admin-active').classList.remove('admin-active')
            //     document.querySelector('.images').classList.add('admin-active')
            //     break
            // case 'news':
            //     document.querySelector('.admin-active').classList.remove('admin-active')
            //     document.querySelector('.news').classList.add('admin-active')
            //     break
            // case 'messages':
            //     document.querySelector('.admin-active').classList.remove('admin-active')
            //     document.querySelector('.messages').classList.add('admin-active')
            //     break
        }
    }, [menuOption])
    
    return (
        <Main
            className='admin-main'
        >
            <AdminAside
                user={user ? user : {name: ''}}
                logout={logout}
                setMenuOption={setMenuOption}
            />
            <AdminSection
                user={user}
                menuOption={menuOption}
            />
        </Main>
    )
}

export default Admin