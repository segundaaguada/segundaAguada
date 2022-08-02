import React, { useState, useEffect } from 'react'
import AdminCard from '../../modules/AdminCard/AdminCard'
import Span from '../../components/Span/Span'
import Button from '../../components/Button/Button'
import DeleteConfirmation from '../../modules/DeleteConfirmation/DeleteConfirmation'
import Section from '../../components/Section/Section'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Div from '../../components/Div/Div'
import axios from 'axios'
import deleteEntity from '../../services/deleteEntity'
import Modal from '../../modules/Modal/Modal'
import { useNavigate } from 'react-router-dom'
import { profilePictureColors } from '../../Share/utilities'

const AdminEntities = () => {

    const [deleteModalState, setDeleteModalState] = useState(false)
    const [contentChange, setContentChange] = useState({})
    const [entitiesCount, setEntitiesCount] = useState(0)
    const [entitiesList, setEntitiesList] = useState([])
    const [limit, setLimit] = useState(12)
    const [page, setPage] = useState(1)
    const [pagesCount, setPagesCount] = useState(0)
    const [lastPageSize, setLastPageSize] = useState(0)
    const [pictureColors, setPictureColors] = useState([])
    const [isCheckAll, setIsCheckAll] = useState(false)
    const [isChecked, setIsChecked] = useState([])
    const navigate = useNavigate()

    const getEntitiesList = async () => {
        try {
            const {data} = await axios.get(`api/associations?limit=${limit}&skip=0`);
            const entities = data[0].data.map( entity => {
                return (
                    {
                        id: entity.id,
                        name: entity.name
                    }
                )
            })

            setEntitiesList(entities)
            setPagesCount(Math.ceil(data[0].count / limit))
            setEntitiesCount(data[0].count)
            setLastPageSize(data[0].count % limit ? data[0].count % limit : limit)
        }

        catch (err) {
            console.log(err);
        }
    }

    const handleSelectAll = () => {
        setIsCheckAll(!isCheckAll);
        setIsChecked(entitiesList.map(li => li.id));
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
        getEntitiesList();
    }, [contentChange])

    useEffect(() => {
        let colors = []
        
        for (let i=0; i<entitiesCount; i++) {
            colors.push(profilePictureColors[Math.floor(Math.random()*profilePictureColors.length)])
        }
        
        setPictureColors(colors)
    }, [entitiesCount])


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
                <Button onClick={() => navigate('/admin/registro/entidad')} style={{margin: '0 2%'}}>
                    Agregar entidad
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
                            <Span>Eliminar {isChecked.length} entidad{isChecked.length > 1 ? 'es' : ''}</Span>
                        </Button>
                    }
                    <Button onClick={handleSelectAll} style={{margin: '0 2%'}}>
                        Seleccionar todos
                    </Button>
                </Div>
            </Div>
            <Div className='div--admin-users'>
                {
                    entitiesList?.map((entity, i) => {
                        return <AdminCard 
                                    key={entity.id}
                                    content={entity} 
                                    color={pictureColors[i + ((page-1) * limit)]}
                                    handleClick={handleClick}
                                    isChecked={isChecked.includes(entity.id)}
                                    type='entities'
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
                                        request = `api/associations?limit=${limit}&skip=0`
                                        setPage(1)
                                        break
                                    case 'LastPageIcon':
                                        request = `api/associations?limit=${limit}&skip=${entitiesCount - lastPageSize}`
                                        setPage(pagesCount)
                                        break
                                    case 'NavigateBeforeIcon':
                                        request = `api/associations?limit=${limit}&skip=${page * limit - (limit * 2)}`
                                        setPage(page -1)
                                        break
                                    case 'NavigateNextIcon':
                                        request = `api/associations?limit=${limit}&skip=${page * limit}`
                                        setPage(page +1)
                                        break
                                    default:
                                        request = `api/associations?limit=${limit}&skip=${limit * (params -1)}`
                                        setPage(params)
                                }

                                const {data} = await axios.get(request);
                                const entities = data[0].data.map( entity => {
                                    return (
                                        {
                                            id: entity.id,
                                            name: entity.name,
                                        }
                                    )
                                })

                                setEntitiesList(entities)
                            }}
                        />
                    </Stack> 
                </Section>
                : null
            }
            <Modal
                titulo = "Eliminar entidades"
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
                    deleteContent={deleteEntity}
                    contentMessage={`${isChecked.length} entidad${isChecked.length > 1 ? 'es' : ''}`}
                    deleteList
                    redirect={setContentChange}
                    removeChecked={setIsChecked}
                    removeCheckedAll={setIsCheckAll}
                />
            </Modal>
        </>
    )
}

export default AdminEntities