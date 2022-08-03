import React, { useState, useEffect } from 'react'
import Main from '../../components/Main/Main'
import Section from '../../components/Section/Section'
import Div from '../../components/Div/Div'
import Img from '../../components/Img/Img'
import H2 from '../../components/H2/H2'
import P from '../../components/P/P'
import Line from '../../components/Line/Line'
import ContactInfo from '../../modules/ContactInfo/ContactInfo'
import ContactMap from '../../modules/ContactMap/ContactMap'
import checkLoggedUser from '../../services/checkLoggedUser'
import {displaySocialMedia} from '../../Share/utilities'
import DeleteConfirmation from '../../modules/DeleteConfirmation/DeleteConfirmation'
import ModalButton from '../../modules/ModalButton/ModalButton'
import Modal from '../../modules/Modal/Modal'
import Span from '../../components/Span/Span'
import deleteBusiness from '../../services/deleteBusiness'
import verifyToken from '../../services/verifyToken'
import logout from '../../services/logout'
import countapi from 'countapi-js';
import { setPageVisited, setUser } from '../../store/general/action'
import { useDispatch, useSelector } from 'react-redux'

import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'


const Business = () => {

    const [deleteModalState, setDeleteModalState] = useState(false)
    const [socialMedia, setSocialMedia] = useState({})
    const [coords, setCoords] = useState([])
    const [business, setBusiness] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const pageVisited = useSelector(state => state.pageVisited)
    const user = useSelector(state => state.user)


    const getBusinessDetail = async () => {
        try {
            document.querySelector('.bounce-loader').classList.add('active');
            const {data} = await axios.get(`api/bussines/${id}`);

            document.title = data.bussinessName + ' | AVV Segunda Aguada'

            data.description = data.description.split('\n')
            setBusiness(data)

            const coords = [{
                name: data.bussinessName,
                lat: data.latitude,
                lng: data.longitude
            }]
            setCoords(coords)
            
            const socialMedia = {
                'email': data.email ? data.email : '',
                'phone': data.phone ? data.phone : '',
                'mobile': data.mobile ? data.mobile : '',
                'twitter': data.twitter ? displaySocialMedia(data.twitter) : '',
                'instagram': data.instagram ? displaySocialMedia(data.instagram) : '',
                'facebook': data.facebook
            }
            setSocialMedia(socialMedia)
            document.querySelector('.bounce-loader').classList.remove('active');
        } 
        
        catch (error) {
            document.querySelector('.bounce-loader').classList.remove('active');
            console.log(error)
            navigate('/404')
        }
    }

    useEffect(() => {
        if (!pageVisited) {
            countapi.hit('segundaaguada', 'home')
            setPageVisited(dispatch, true)
        }

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

        getBusinessDetail()
    }, [])


    return (
        <Main>
            <Section className='index-section' firstSection={true}>
                <Div className='section-div entity'>
                    <Div style={{width: 'fit-content' }}>
                        <H2 className='section-heading'>
                            {business.bussinessName}
                        </H2>
                        <Line
                            backgroundColor='yellow'
                            margin='10px 0 20px 0'
                            width='120%'
                        />
                    </Div>
                    <Div>
                        {
                            business.description?.map(paragraph => (
                                <P 
                                    className='entity-detail--description'
                                    key={paragraph}
                                >
                                    {paragraph}
                                </P>
                            ))
                        }
                    </Div>
                    {
                        user && user.role === 1 ?

                        <ModalButton
                            onclick={()=> setDeleteModalState(!deleteModalState)}
                            position='relative'
                            tooltip='Eliminar comercio'
                            type='delete'
                        >
                            <Span>Eliminar comercio</Span>
                        </ModalButton>
                        : null
                    }
                </Div>
                <Div className='logo-container'>
                    <Img src={business.imageUrl} alt={business.bussinessName} className='index-logo entity-img' />
                </Div>
            </Section>
            <Section className='section-gray contact-info'>
                {
                    Object.keys(socialMedia).map( key => {
                        return (
                            <ContactInfo
                                title={key}
                                content={socialMedia[key]}
                            />
                        )
                    })
                }
            </Section>
            <Section className='entity-section--bottom'>
                <ContactMap
                    streetAddress={business.streetAddress}
                    streetNumber={business.streetNumber}
                    postalCode={business.postalCode}
                    coords={coords}
                />
            </Section>
            <Modal
                titulo = "Eliminar comercio"
                state = {deleteModalState}
                changeState = {setDeleteModalState}
                mostrarHeader = {true}
                mostrarOverlay = {true}
                posicionModal={'center'}
            >
                <DeleteConfirmation
                    type='business'
                    changeModalState={()=> setDeleteModalState(!deleteModalState)}
                    contentId={business.id}
                    deleteContent={deleteBusiness}
                />
            </Modal>
        </Main>
    )
}

export default Business