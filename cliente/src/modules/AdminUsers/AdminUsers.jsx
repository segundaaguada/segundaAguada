import React, { useState, useEffect } from 'react'
import AdminCard from '../AdminCard/AdminCard'
import Span from '../../components/Span/Span'
import Button from '../../components/Button/Button'
import DeleteConfirmation from '../../modules/DeleteConfirmation/DeleteConfirmation'
import Section from '../../components/Section/Section'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { profilePictureColors } from '../../Share/utilities'
import Div from '../../components/Div/Div'
import axios from 'axios'
import deleteUser from '../../services/deleteUser'
import Modal from '../../modules/Modal/Modal'
import { useNavigate } from 'react-router-dom'

const AdminUsers = () => {

    const [deleteModalState, setDeleteModalState] = useState(false)
    const [contentChange, setContentChange] = useState({})
    const [usersCount, setUsersCount] = useState(0)
    const [usersList, setUsersList] = useState([])
    const [limit, setLimit] = useState(12)
    const [page, setPage] = useState(1)
    const [pagesCount, setPagesCount] = useState(0)
    const [lastPageSize, setLastPageSize] = useState(0)
    const [pictureColors, setPictureColors] = useState([])
    const [isCheckAll, setIsCheckAll] = useState(false)
    const [isChecked, setIsChecked] = useState([])
    const navigate = useNavigate()

    const getUsersList = async () => {
        try {
            document.querySelector('.bounce-loader').classList.add('active');
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
            document.querySelector('.bounce-loader').classList.remove('active');
        }

        catch (err) {
            document.querySelector('.bounce-loader').classList.remove('active');
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
        setIsChecked([...isChecked, id]);
        if (!checked) {
            setIsChecked(isChecked.filter(item => item !== id));
        }
    }
    

    useEffect(() => {
        getUsersList();
    }, [contentChange])

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
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '2%'
                }}
            >
                <Button onClick={() => navigate('/admin/registro')} style={{margin: '0 2%'}}>
                    Agregar usuario
                </Button>
                <Div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: '50%'
                    }}
                >
                    {
                        isChecked.length > 0 &&
                        <Button delete onClick={()=> {setDeleteModalState(!deleteModalState)}}>
                            {/* <FiTrash2 style={{fontSize: '24', marginRight: '5px'}} /> */}
                            <Span>Eliminar {isChecked.length} usuario{isChecked.length > 1 ? 's' : ''}</Span>
                        </Button>
                    }
                    <Button onClick={handleSelectAll} style={{margin: '0 2%'}}>
                        Seleccionar todos
                    </Button>
                </Div>
            </Div>
            <Div className='div--admin-users'>
                {
                    usersList?.map((user, i) => {
                        return <AdminCard 
                                    key={user.id}
                                    content={user} 
                                    color={pictureColors[i + ((page-1) * limit)]}
                                    handleClick={handleClick}
                                    isChecked={isChecked.includes(user.id)}
                                    type='users'
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

                                document.querySelector('.bounce-loader').classList.add('active');
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
                                document.querySelector('.bounce-loader').classList.remove('active');
                            }}
                        />
                    </Stack> 
                </Section>
                : null
            }
            <Modal
                titulo = "Eliminar usuarios"
                state = {deleteModalState}
                changeState = {setDeleteModalState}
                mostrarHeader = {true}
                mostrarOverlay = {true}
                posicionModal={'center'}
            >
                <DeleteConfirmation
                    type='users'
                    changeModalState={()=> setDeleteModalState(!deleteModalState)}
                    contentId={isChecked}
                    deleteContent={deleteUser}
                    contentMessage={`${isChecked.length} usuario${isChecked.length > 1 ?'s' : ''}`}
                    deleteList
                    redirect={setContentChange}
                    removeChecked={setIsChecked}
                    removeCheckedAll={setIsCheckAll}
                />
            </Modal>
        </>
    )
}

export default AdminUsers