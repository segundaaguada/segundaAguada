import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Div from '../../components/Div/Div'
import P from '../../components/P/P'
import Button from '../../components/Button/Button'
import logout from '../../services/logout'

const DeleteConfirmation = ({type, contentId, changeModalState, deleteContent, redirect, contentMessage, deleteList, removeChecked, removeCheckedAll}) => {
    
    const [content, setContent] = useState('')
    const [navigation, setNavigation] = useState('')
    const [info, setInfo] = useState('')
    const navigate = useNavigate()

    useEffect(() => {

        if (contentMessage) setContent(contentMessage)

        switch (type) {
            case 'image':
                setContent('esta imagen')
                break
            case 'news':
                setContent('esta noticia')
                setNavigation('/noticias')
                break
            case 'entity':
                setContent('esta entidad')
                setNavigation('/entidades')
                setInfo('Al eliminar, se eliminarán permanentemente todos los usuarios, imágenes y noticias asociados a ella.')
                break
            case 'business':
                setContent('este comercio')
                setNavigation('/comercios')
                break
            case 'user':
                setContent('esta cuenta')
                setNavigation('/')
                break
        }
    }, [])

    return (
        <Div
            className='confirmation-div--container'
        >
            <P style={{textAlign: 'center'}}>¿Estás seguro de que quieres eliminar {content}?</P>
            {info && <><br/><P style={{textAlign: 'center'}}>{info}</P></>}
            <Div className='confirmation-div'>
                <Button 
                    className='confirmation-button confirmation-button--delete'
                    onClick={async () => {
                        
                        if (!deleteList) {
                            const response = await deleteContent(contentId);
                            if (response.status === 204) {

                                if (type === 'user' || type === 'entity') {
                                    logout()
                                }
                                
                                if (redirect) {
                                    redirect(contentId);
                                    changeModalState(false);
                                } else {
                                    navigate(navigation);
                                }
                            }
                        } else {

                            await contentId.forEach(async (id) => {
                                await deleteContent(id);
                            })

                            // redirect(contentId);
                            // changeModalState(false);
                            navigate('/')

                            // removeChecked([])
                            // removeCheckedAll(false)

                        }
                        
                    }}
                >
                    Eliminar
                </Button>
                <Button 
                    className='confirmation-button confirmation-button--cancel'
                    onClick={changeModalState}
                >
                    Cancelar
                </Button>
            </Div>
        </Div>
    )
}

export default DeleteConfirmation