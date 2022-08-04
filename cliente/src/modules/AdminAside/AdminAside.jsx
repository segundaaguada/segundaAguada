import React from 'react'
import Aside from '../../components/Aside/Aside'
import AdminUser from '../AdminUser/AdminUser'
import AdminMenu from '../AdminMenu/AdminMenu'
import AdminLogout from '../AdminLogout/AdminLogout'

export const AdminAside = ({ user, logout, setMenuOption }) => {

    return (
        <Aside className='aside'>
            <AdminUser
                name={user.name}
            />
            <AdminMenu
                user={user}
                setMenuOption={setMenuOption}
            />
            <AdminLogout
                logout={logout}
            />
        </Aside>
    )
}

export default AdminAside