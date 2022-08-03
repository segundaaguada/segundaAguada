import React, {useEffect,useState} from 'react'
import axios from 'axios'
import Main from '../../components/Main/Main'
import Section from '../../components/Section/Section'
import GalleryImage from '../../modules/GalleryImage/GalleryImage'
import ModalButton from '../../modules/ModalButton/ModalButton'
import Span from '../../components/Span/Span'
import Div from '../../components/Div/Div'
import Img from '../../components/Img/Img'
import { FiX } from 'react-icons/fi'
import checkLoggedUser from '../../services/checkLoggedUser'
import Modal from '../../modules/Modal/Modal'
import ImageForm from '../../modules/ImageForm/ImageForm'
import DeleteConfirmation from '../../modules/DeleteConfirmation/DeleteConfirmation'
import deleteImage from '../../services/deleteImage'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import NoContent from '../../modules/NoContent/NoContent'
import { useDispatch, useSelector } from 'react-redux'
import { setContactFooter, setPageVisited, setUser } from '../../store/general/action'
import verifyToken from '../../services/verifyToken'
import logout from '../../services/logout'
import countapi from 'countapi-js';


const Gallery = () => {

    const [imagesCount, setImagesCount] = useState(0)
    const [contentChange, setContentChange] = useState({})
    const [addModalState, setAddModalState] = useState(false);
    const [deleteModalState, setDeleteModalState] = useState(false);
    const [imageList, setImageList] = useState([])
    const [hover, setHover] = useState(false)
    const [image, setImage] = useState('')
    const [limit, setLimit] = useState(9)
    const [page, setPage] = useState(1)
    const [pagesCount, setPagesCount] = useState(0)
    const [lastPageSize, setLastPageSize] = useState(0)
    const dispatch = useDispatch()
    const pageVisited = useSelector(state => state.pageVisited)
    const user = useSelector(state => state.user)

    const openImage = (image) => {
        setImage(image)
        document.querySelector('.overlay-gallery').style.display = 'flex'
    }

    const closeImage = () => {
        document.querySelector('.overlay-gallery').style.display = 'none'
    }

    const getImageList = async () => {
        try {
            document.querySelector('.bounce-loader').classList.add('active');
            const {data} = await axios.get(`api/images?limit=${limit}&skip=0`);
            if (data.length > 0) {
                const imageList = data[0].data.map( image => {
                    return (
                        {
                            id: image.id,
                            imageUrl: image.imageUrl,
                            association: image.association
                        }
                    )
                })

                setImageList(imageList)
                setPagesCount(Math.ceil(data[0].count / limit))
                setImagesCount(data[0].count)
                setLastPageSize(data[0].count % limit ? data[0].count % limit : limit)
            }
            else {
                setImageList([])
                setPagesCount(0)
                setImagesCount(0)
                setLastPageSize(0)
            }

            document.querySelector('.bounce-loader').classList.remove('active');
        }

        catch (err) {
            console.log(err);
            document.querySelector('.bounce-loader').classList.remove('active');
        }
    }

    useEffect(() => {
        getImageList()
    }, [contentChange])

    useEffect(() => {
        if (!pageVisited) {
            countapi.hit('segundaaguada', 'home')
            setPageVisited(dispatch, true)
        }
        
        setContactFooter(dispatch, false)

        document.title = 'Galería | AVV Segunda Aguada'

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
        }
        
    }, [])


    return (
        <Main className='add-button--main'>
            {
                user && 
                <ModalButton
                    display='main'
                    onclick={()=> setAddModalState(!addModalState)}
                    tooltip='Agregar imagen'
                    type='add'
                >
                    <Span>Agregar imagen</Span>
                </ModalButton>
            }
            {
                pagesCount > 1 ? 
                <Section className='pagination'>
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
                                        request = `api/images?limit=${limit}&skip=0`
                                        setPage(1)
                                        break
                                    case 'LastPageIcon':
                                        request = `api/images?limit=${limit}&skip=${imagesCount - lastPageSize}`
                                        setPage(pagesCount)
                                        break
                                    case 'NavigateBeforeIcon':
                                        request = `api/images?limit=${limit}&skip=${page * limit - (limit * 2)}`
                                        setPage(page -1)
                                        break
                                    case 'NavigateNextIcon':
                                        request = `api/images?limit=${limit}&skip=${page * limit}`
                                        setPage(page +1)
                                        break
                                    default:
                                        request = `api/images?limit=${limit}&skip=${limit * (params -1)}`
                                        setPage(params)
                                }   

                                const {data} = await axios.get(request);
                                const imagesList = data[0].data.map( image => {
                                    return (
                                        {
                                            id: image.id,
                                            imageUrl: image.imageUrl,
                                            association: image.association
                                        }
                                    )
                                })               
                                setImageList(imagesList)
                                document.querySelector('.bounce-loader').classList.remove('active');
                            }}
                        />
                    </Stack> 
                </Section>
                : null
            }
            <Section className='gallery-section' style={ pagesCount === 1 ? {marginTop: '10vh'} : null}>
                {
                    imageList.length > 0 ?
                    imageList.map( image => (
                        <GalleryImage
                            key={image.id}
                            id={image.id}
                            imageUrl={image.imageUrl}
                            onclick={() => openImage(image)}
                            carrousel={false}
                        />
                    )) :
                    <NoContent
                        message={'No hay imágenes.'}
                    />
                }
            </Section>
            <Div 
                className='overlay overlay-gallery' 
                style={{display: 'none'}}
                onClick={() => closeImage()}
            >
                <Img 
                    src={image.imageUrl} 
                    alt={image.id}
                />
                <FiX 
                    style={{
                        stroke: '#FFF', 
                        fontSize: '28',
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        margin: '3% 4%',
                        borderRadius: '0.15em',
                        backgroundColor: hover ? '#4A4A4A59' : ''
                    }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                />
                {
                    // solo pueden borrar los administradores o usuarios de la asociacion
                    user?.role === 1 || image?.association === user?.association ? 
                    <ModalButton
                        onclick={()=> setDeleteModalState(!deleteModalState)}
                        tooltip='Eliminar imagen'
                        type='delete'
                        display='overlay'
                    >
                        <Span>Eliminar imagen</Span>
                    </ModalButton> 
                    : null
                }
            </Div>
            <Modal
                titulo = "Agregar imagen"
                state = {addModalState}
                changeState = {setAddModalState}
                mostrarHeader = {true}
                mostrarOverlay = {true}
                posicionModal={'center'}
            >
                <ImageForm 
                    user={user}
                    // cerrar el modal
                    changeModalState={setAddModalState}
                    // redirigir al listado y hacer que recargue
                    // para que aparezca la nueva imagen
                    redirect={setContentChange}    
                />
            </Modal>
            <Modal
                titulo = "Eliminar imagen"
                state = {deleteModalState}
                changeState = {setDeleteModalState}
                mostrarHeader = {true}
                mostrarOverlay = {true}
                posicionModal={'center'}
            >
                <DeleteConfirmation
                    type='image'
                    changeModalState={()=> setDeleteModalState(!deleteModalState)}
                    contentId={image.id}
                    deleteContent={deleteImage}
                    redirect={setContentChange}
                />
            </Modal>
        </Main>
    )
}

export default Gallery