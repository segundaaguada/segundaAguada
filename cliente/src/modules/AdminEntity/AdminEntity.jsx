import React, { useState, useEffect } from 'react'
import deleteEntity from '../../services/deleteEntity'
import Modal from '../../modules/Modal/Modal'
import DeleteConfirmation from '../../modules/DeleteConfirmation/DeleteConfirmation'
import Div from '../../components/Div/Div'
import Button from '../../components/Button/Button'
import Span from '../../components/Span/Span'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Img from '../../components/Img/Img'
import P from '../../components/P/P'


const AdminEntity = () => {

    const [deleteModalState, setDeleteModalState] = useState(false)
    const [entity, setEntity] = useState({})
    const user = useSelector(state => state.user)


    const getEntity = async () => {
        const {data} = await axios.get(`api/users/${user.id}`);
        setEntity(data.association)
    }

    useEffect(() => {
        getEntity()
    }, [])


    return (
        <>
            <Div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginTop: '2%'
                }}
                className='admin-button--div'
            >
                <Button delete onClick={()=> {setDeleteModalState(!deleteModalState)}}>
                    <Span>Eliminar entidad</Span>
                </Button>
            </Div>
            <Div>
                <Div 
                    className='logo-container admin-entity--container'
                >
                    <Img src={entity.imageUrl} alt={entity.name} className='index-logo entity-img' style={{maxHeight: '35vh'}} />
                    <Div className='admin-entity--heading'>
                        <P className='admin-entity--name'>{entity.name}</P>
                        <P>{entity.streetAddress}, {entity.streetNumber}</P>
                    </Div>
                    <P style={{margin: '5% 0 0 2.5%'}}>{entity.description}</P>
                </Div>
            </Div>
            <Modal
                titulo = "Eliminar entidad"
                state = {deleteModalState}
                changeState = {setDeleteModalState}
                mostrarHeader = {true}
                mostrarOverlay = {true}
                posicionModal={'center'}
            >
                <DeleteConfirmation
                    type='entity'
                    changeModalState={()=> setDeleteModalState(!deleteModalState)}
                    contentId={entity.id}
                    deleteContent={deleteEntity}
                />
            </Modal>
        </>
    )
}

export default AdminEntity