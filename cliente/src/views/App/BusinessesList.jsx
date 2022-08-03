import React, { useState, useEffect } from 'react'
import Main from '../../components/Main/Main'
import Section from '../../components/Section/Section'
import Div from '../../components/Div/Div'
import P from '../../components/P/P'
import H2 from '../../components/H2/H2'
import Line from '../../components/Line/Line'
import SearchBar from '../../modules/SearchBar/SearchBar'
import EntityCard from '../../modules/EntityCard/EntityCard'
import Map from '../../modules/Map/Map'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import checkLoggedUser from '../../services/checkLoggedUser'
import { removeSpaces } from '../../Share/utilities'
import ModalButton from '../../modules/ModalButton/ModalButton'
import Span from '../../components/Span/Span'
import Modal from '../../modules/Modal/Modal'
import EntityAndBusinessForm from "../../modules/EntityAndBusinessForm/EntityAndBusinessForm"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import NoContent from '../../modules/NoContent/NoContent'
import { useDispatch, useSelector } from 'react-redux'
import { setContactFooter, setPageVisited, setUser } from '../../store/general/action'
import verifyToken from '../../services/verifyToken'
import logout from '../../services/logout'
import countapi from 'countapi-js';


const BusinessesList = () => {

    const [businessesCount, setBusinessesCount] = useState(0)
    const [businessesList, setBusinessesList] = useState([])
    const [coordsList, setCoordsList] = useState([])
    const [modalState,SetModalState] = useState(false)
    const [limit, setLimit] = useState(4)
    const [page, setPage] = useState(1)
    const [pagesCount, setPagesCount] = useState(0)
    const [lastPageSize, setLastPageSize] = useState(0)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const pageVisited = useSelector(state => state.pageVisited)
    const user = useSelector(state => state.user)

    const getBusinessesList = async () => {
        try {
            document.querySelector('.bounce-loader').classList.add('active');
            const {data} = await axios.get(`api/bussines?limit=${limit}&skip=0`);
            const businessesList = data[0].data.map( business => {
                return (
                    {
                        id: business.id,
                        name: business.bussinessName,
                        image: business.imageUrl,
                        description: business.description,
                        streetAddress: business.streetAddress,
                        streetNumber: business.streetNumber
                    }
                )
            })

            setBusinessesList(businessesList)
            setPagesCount(Math.ceil(data[0].count / limit))
            setBusinessesCount(data[0].count)
            setLastPageSize(data[0].count % limit ? data[0].count % limit : limit)

            const coordsList = data[0].data.map( business => {
                return (
                    {
                        name: business.bussinessName,
                        lat: business.latitude,
                        lng: business.longitude,
                        id: business.id,
                        urlPath: 'comercios'
                    }
                )
            })
            setCoordsList(coordsList)
            document.querySelector('.bounce-loader').classList.remove('active');
        }

        catch (err) {
            console.log(err);
            document.querySelector('.bounce-loader').classList.remove('active');
        }
    }

    useEffect(() => {
        if (!pageVisited) {
            countapi.hit('segundaaguada', 'home')
            setPageVisited(dispatch, true)
        }

        setContactFooter(dispatch, false)
        
        document.title = 'Comercios | AVV Segunda Aguada'

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
        
        getBusinessesList()
    }, [])


    return (
        <Main className='list-main'>
            <Section className='list-section--left'>
                <Div>
                    <Div style={{ width: 'fit-content' }}>
                        <H2 className='list-heading'>
                            Comercios
                        </H2>
                        <Line
                            backgroundColor='yellow'
                            width='120%'
                            margin='10px 0 15px 0'
                        />
                    </Div>
                    {/* <P>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam assumenda, eligendi, nam ea iste, doloribus expedita totam error officiis accusantium nemo alias ex odit autem. Nobis similique autem laboriosam eos.</P> */}
                
                    <Div className="list-right--responsive">
                        <Div className='list-map--container'>
                            <Map
                                coords={coordsList}
                            />
                        </Div>
                        <SearchBar
                            placeholder={'Busca un comercio...'}
                            type={'businesses'}
                        />
                        {          
                            user?.role === 1 ?
                            <ModalButton 
                                onclick={()=> {navigate('/admin/registro/comercio')}}
                                tooltip='Agregar comercio'
                                position='relative'
                                type='add'
                                style={{margin: '0 3% 30px 0'}}
                                display='entity'
                            >
                                <Span>Agregar comercio</Span>
                            </ModalButton>
                            : null
                        }
                    </Div>
                
                </Div>
                {
                    pagesCount > 1 ? 
                    <Section className='pagination entities'>
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
                                        request = `api/bussines?limit=${limit}&skip=0`
                                        setPage(1)
                                        break
                                    case 'LastPageIcon':
                                        request = `api/bussines?limit=${limit}&skip=${businessesCount - lastPageSize}`
                                        setPage(pagesCount)
                                        break
                                    case 'NavigateBeforeIcon':
                                        request = `api/bussines?limit=${limit}&skip=${page * limit - (limit * 2)}`
                                        setPage(page -1)
                                        break
                                    case 'NavigateNextIcon':
                                        request = `api/bussines?limit=${limit}&skip=${page * limit}`
                                        setPage(page +1)
                                        break
                                    default:
                                        request = `api/bussines?limit=${limit}&skip=${limit * (params -1)}`
                                        setPage(params)
                                }

                                const {data} = await axios.get(request);
                                const businessesList = data[0].data.map( business => {
                                    return (
                                        {
                                            id: business.id,
                                            name: business.bussinessName,
                                            image: business.imageUrl,
                                            description: business.description,
                                            streetAddress: business.streetAddress,
                                            streetNumber: business.streetNumber
                                        }
                                    )
                                })
                                setBusinessesList(businessesList)

                                const coordsList = data[0].data.map( business => {
                                    return (
                                        {
                                            name: business.bussinessName,
                                            lat: business.latitude,
                                            lng: business.longitude,
                                            id: business.id,
                                            urlPath: 'comercios'
                                        }
                                    )
                                })
                                setCoordsList(coordsList)
                                document.querySelector('.bounce-loader').classList.remove('active');
                            }}
                        />
                    </Stack> 
                    </Section>
                    : null
                }
                <Div className='list-container' style={pagesCount === 1 ? {marginTop: '10vh'} : null}>
                    {
                        businessesList.length > 0 ?
                        businessesList.map( business => (
                            <Link
                                // to={`/comercios/${removeSpaces(element.name)}`}
                                to={`/comercios/${business.id}`}
                                key={business.id}
                                className='entity-link'
                            >
                                <EntityCard 
                                    key={business.id}
                                    name={business.name}
                                    description={business.description}
                                    streetAddress={business.streetAddress}
                                    streetNumber={business.streetNumber}
                                    image={business.image}
                                />
                            </Link>
                        )) :
                        <NoContent
                            type={'entities'}
                            message={'No hay comercios.'}
                        />
                    }
                </Div>
            </Section>
            <Section className='list-section--right'>
                {          
                    user?.role === 1 ?
                    <ModalButton 
                        onclick={()=> {navigate('/admin/registro/comercio')}}
                        tooltip='Agregar comercio'
                        position='relative'
                        type='add'
                        style={{margin: '0 3% 30px 0'}}
                        display='entity'
                    >
                        <Span>Agregar comercio</Span>
                    </ModalButton>
                    : null
                }
                <SearchBar
                    placeholder={'Busca un comercio...'}
                    type={'businesses'}
                />
                <Div className='list-map--container'>
                    <Map
                        coords={coordsList}
                    />
                </Div>
            </Section>
            <Modal
                titulo = "Agregar Entidad"
                state = {modalState}
                changeState = {SetModalState}
                mostrarHeader = {true}
                mostrarOverlay = {true}
                posicionModal={'center'}
            >
                <EntityAndBusinessForm 
                    type= "entity"   
                />
            </Modal>
        </Main>
    )
}

export default BusinessesList