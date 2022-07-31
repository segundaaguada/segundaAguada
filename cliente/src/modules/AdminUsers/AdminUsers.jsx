import React, { useState, useEffect } from 'react'
import AdminUserCard from '../../modules/AdminUserCard/AdminUserCard'
import Span from '../../components/Span/Span'
import Button from '../../components/Button/Button'
import { FiTrash2 } from 'react-icons/fi'
import Section from '../../components/Section/Section'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { profilePictureColors } from '../../Share/utilities'
import Div from '../../components/Div/Div'
import axios from 'axios'

const AdminUsers = () => {

    const [usersCount, setUsersCount] = useState(0)
    const [usersList, setUsersList] = useState([])
    const [limit, setLimit] = useState(12)
    const [page, setPage] = useState(1)
    const [pagesCount, setPagesCount] = useState(0)
    const [lastPageSize, setLastPageSize] = useState(0)
    const [pictureColors, setPictureColors] = useState([])
    const [isCheckAll, setIsCheckAll] = useState(false)
    const [isChecked, setIsChecked] = useState([])

    const getUsersList = async () => {
        try {
            const {data} = await axios.get(`api/users?limit=${limit}&skip=0`);
            const userList = data[0].data.map( user => {
                return (
                    {
                        id: user.id,
                        name: user.name,
                        surname: user.surname,
                        email: user.email,
                        role: user.role,
                        association: user.association
                    }
                )
            })

            setUsersList(userList)
            setPagesCount(Math.ceil(data[0].count / limit))
            setUsersCount(data[0].count)
            setLastPageSize(data[0].count % limit ? data[0].count % limit : limit)
        }

        catch (err) {
            console.log(err);
        }
    }

    const handleSelectAll = () => {
        setIsCheckAll(!isCheckAll);
        setIsChecked(usersList.map(li => li.id));
        if (isCheckAll) {
            setIsChecked([]);
        }
    }

    const handleClick = e => {
        const { id, checked } = e.target;
        console.log(id, checked)
        setIsChecked([...isChecked, id]);
        if (!checked) {
            setIsChecked(isChecked.filter(item => item !== id));
        }
        console.log('uh')
    }
    

    useEffect(() => {
        getUsersList();
    }, [])

    useEffect(() => {
        let colors = []

        for (let i=0; i<usersCount; i++) {
            colors.push(profilePictureColors[Math.floor(Math.random()*profilePictureColors.length)])
        }
        
        setPictureColors(colors)
    }, [usersCount])

    return (
        <>
            <Div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}
            >
                {
                    isChecked.length > 0 &&
                    <Button delete>
                        <FiTrash2 style={{fontSize: '24', marginRight: '5px'}} />
                        {
                            isChecked.length == 1 ? <Span>Eliminar {isChecked.length} usuario</Span>
                            : <Span>Eliminar {isChecked.length} usuarios</Span>
                        }
                    </Button>
                }
                <Button onClick={handleSelectAll} style={{margin: '0 2%'}}>
                    Seleccionar todos
                </Button>
            </Div>
            <Div className='div--admin-users'>
                {
                    usersList?.map((user, i) => {
                        return <AdminUserCard 
                                    key={user.id}
                                    user={user} 
                                    color={pictureColors[i + ((page-1) * limit)]}
                                    handleClick={handleClick}
                                    isChecked={isChecked.includes(user.id)}
                                />
                    })
                }
            </Div>
            {
                pagesCount > 1 ?
                <Section className='pagination admin'>
                    <Stack spacing={2}>
                        <Pagination 
                            count={pagesCount} 
                            color='primary' 
                            showFirstButton 
                            showLastButton 
                            onChange={async (e, params) => {

                                let request = ''

                                switch (e.target.dataset.testid) {
                                    case 'FirstPageIcon':
                                        request = `api/users?limit=${limit}&skip=0`
                                        setPage(1)
                                        break
                                    case 'LastPageIcon':
                                        request = `api/users?limit=${limit}&skip=${usersCount - lastPageSize}`
                                        setPage(pagesCount)
                                        break
                                    case 'NavigateBeforeIcon':
                                        request = `api/users?limit=${limit}&skip=${page * limit - (limit * 2)}`
                                        setPage(page -1)
                                        break
                                    case 'NavigateNextIcon':
                                        request = `api/users?limit=${limit}&skip=${page * limit}`
                                        setPage(page +1)
                                        break
                                    default:
                                        request = `api/users?limit=${limit}&skip=${limit * (params -1)}`
                                        setPage(params)
                                }

                                const {data} = await axios.get(request);
                                const userList = data[0].data.map( user => {
                                    return (
                                        {
                                            id: user.id,
                                            name: user.name,
                                            surname: user.surname,
                                            email: user.email,
                                            role: user.role,
                                            association: user.association
                                        }
                                    )
                                })

                                setUsersList(userList)
                            }}
                        />
                    </Stack> 
                </Section>
                : null
            }
        </>
    )
}

export default AdminUsers