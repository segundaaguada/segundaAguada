import React, { useState, useEffect } from 'react';
import axios from 'axios'
import H2 from '../../components/H2/H2'
import Main from '../../components/Main/Main'
import Section from '../../components/Section/Section'
import Line from '../../components/Line/Line'
import P from '../../components/P/P'
import Div from '../../components/Div/Div'
import Img from '../../components/Img/Img'
import Map from '../../modules/Map/Map'
import NewsCarrousel from '../../modules/NewsCarrousel/NewsCarrousel'
import checkLoggedUser from '../../services/checkLoggedUser'
import countapi from 'countapi-js';
import { useDispatch, useSelector } from 'react-redux'
import { setPageVisited, setContactFooter, setUser } from '../../store/general/action'
import verifyToken from '../../services/verifyToken'
import logout from '../../services/logout'


const Home = () =>{

    const [newsList, setNewsList] = useState([])
    const dispatch = useDispatch()
    const pageVisited = useSelector(state => state.pageVisited)
    const user = useSelector(state => state.user)

    const getNewsList = async () => {
        try {
            document.querySelector('.bounce-loader').classList.add('active');
            const {data} = await axios.get('api/news?reverse=true');
            const newsList = data[0].data.map( news => {
                return (
                    {
                        id: news.id,
                        title: news.title,
                        image: news.imageUrl,
                        content: news.content,
                        date: new Date(news.date),
                        author: news.author,
                        association: news.association
                    }
                )
            })
            setNewsList(newsList)
            document.querySelector('.bounce-loader').classList.remove('active');
        }

        catch (err) {
            document.querySelector('.bounce-loader').classList.remove('active');
            console.log(err);
        }
    }

    useEffect(() => {
        // contador de visitas
        if (!pageVisited) {
            countapi.hit('segundaaguada', 'home')
            setPageVisited(dispatch, true)
        }

        setContactFooter(dispatch, false)

        document.title = 'AVV Segunda Aguada'

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

        getNewsList()
    }, [])


    return(
        <Main>
            <Section className='index-section' firstSection={true}>
                <Div className='section-div'>
                    <Div style={{width: 'fit-content'}}>
                        <H2 
                            className='section-heading' 
                            style={{width: '110%'}}
                        >
                            La asociación
                        </H2>
                        <Line 
                            backgroundColor='yellow'
                            margin='7% 0 10% 0'
                            width='120%'
                        />
                    </Div>
                    <P className='index-text'>
                        Somos una asociación dedicada a defender los intereses de los vecinos y vecinas del barrio de Segunda Aguada de Cádiz mediante reivindicaciones, acciones, etc. Así como a poner en valor su entorno mediante la realización de acciones culturales, lúdicas y recreativas.
                    </P>
                    <P className='index-text'>
                        Los que formamos parte de la Junta Directiva, trabajamos de manera voluntaria con el único objetivo de conseguir mejoras para nuestro barrio. Es por ello que estamos encantados de poder dar la bienvenida a cuantos vecinos y vecinas del barrio deseen colaborar y trabajar conjuntamente en los proyectos que ya realizamos o poniendo en marcha nuevas actividades.
                    </P>
                </Div>
                <Div className='logo-container'>
                    <Img src='/images/avv-logo.jpg' alt='Logo Asociación de Vecinos Segunda Aguada' className='index-logo' />
                </Div>
            </Section>
            <NewsCarrousel 
                newsArray={newsList}
                type='newsList'
            />
            <Section className='index-section map'>
                <Div className='section-div'>
                    <Div style={{width: 'fit-content'}}>
                        <H2 
                            className='section-heading' 
                            style={{width: '110%'}}
                        >
                            ¿Dónde encontrarnos?
                        </H2>
                        <Line 
                            backgroundColor='yellow'
                            margin='7% 0 10% 0'
                            width='120%'
                        />
                    </Div>
                    <P>
                        Podéis encontrarnos en nuestra nueva sede social, ubicada en la avenida homónima, en el edificio Hermanas Mirabal.
                    </P>
                </Div>
                <Div 
                    className='index-map--container' 
                    style={{height:'100%'}}
                >
                    <Map
                        coords={[{lat:'36.514210437505575', lng:'-6.2763813733612315', name:'AVV Segunda Aguada'}]}
                    />
                </Div>
            </Section>
        </Main>
    )
}

export default Home;