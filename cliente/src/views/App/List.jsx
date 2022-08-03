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
import { Link } from 'react-router-dom'
import checkLoggedUser from '../../services/checkLoggedUser'
import { removeSpaces } from '../../Share/utilities'
import { useDispatch, useSelector } from 'react-redux'
import { setContactFooter, setPageVisited, setUser } from '../../store/general/action'
import verifyToken from '../../services/verifyToken'
import logout from '../../services/logout'
import countapi from 'countapi-js';


const List = ({type}) => {

    const [list, setList] = useState([])
    const [coordsList, setCoordsList] = useState([])
    const dispatch = useDispatch()
    const pageVisited = useSelector(state => state.pageVisited)
    const user = useSelector(state => state.user)

    const getEntitiesList = async () => {
        try {
            document.querySelector('.bounce-loader').classList.add('active');
            const response = await axios.get('api/associations');
            const entitiesList = response.data.map( entity => {
                return (
                    {
                        id: entity.id,
                        name: entity.name,
                        image: entity.imageUrl,
                        description: entity.description,
                        streetAddress: entity.streetAddress,
                        streetNumber: entity.streetNumber
                    }
                )
            })

            setList(entitiesList)

            const coordsList = response.data.map( entity => {
                return (
                    {
                        name: entity.name,
                        lat: entity.latitude,
                        lng: entity.longitude
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

    const getBusinessesList = async () => {
        try {
            document.querySelector('.bounce-loader').classList.add('active');
            const response = await axios.get('api/bussines');
            const businessesList = response.data.map( business => {
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

            setList(businessesList)

            const coordsList = response.data.map( business => {
                return (
                    {
                        name: business.bussinessName,
                        lat: business.latitude,
                        lng: business.longitude
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
        
        switch (type) {
            case 'entities':
                getEntitiesList()
                break
            case 'businesses':
                getBusinessesList()
                break
        }

    }, [])

    return (
        <Main className='list-main'>
            <Section className='list-section--left'>
                <Div>
                    <H2 className='list-heading'>
                        {
                            type === 'entities' ?
                            'Entidades' :
                            'Comercios'
                        }
                    </H2>
                    <Line 
                        backgroundColor='yellow'
                        width='40%'
                        margin='10px 0 15px 0'
                    />
                    <P>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam assumenda, eligendi, nam ea iste, doloribus expedita totam error officiis accusantium nemo alias ex odit autem. Nobis similique autem laboriosam eos.</P>
                </Div>
                <Div className='list-container'>
                    {
                        list.map( element => (
                            <Link
                                // to={type === 'entities' ? `/entidades/${removeSpaces(element.name)}` : `/comercios/${removeSpaces(element.name)}`}
                                to={type === 'entities' ? `/entidades/${element.id}` : `/comercios/${element.id}`}
                                key={element.id}
                            >
                                <EntityCard 
                                    key={element.id}
                                    name={element.name}
                                    description={element.description}
                                    streetAddress={element.streetAddress}
                                    streetNumber={element.streetNumber}
                                    image={element.image}
                                />
                            </Link>
                        ))
                    }
                </Div>
            </Section>
            <Section className='list-section--right'>
                <SearchBar
                    placeholder={type === 'entities' ?
                        'Busca una entidad...' :
                        'Busca un comercio...'
                    }
                    type={type}
                />
                <Div className='list-map--container'>
                    <Map
                        coords={coordsList}
                    />
                </Div>
            </Section>
        </Main>
    )
}

export default List