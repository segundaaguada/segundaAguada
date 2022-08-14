import React, { useState, useEffect } from 'react'
import Main from '../../components/Main/Main'
import Section from '../../components/Section/Section'
import SearchBar from '../../modules/SearchBar/SearchBar'
import NewsCard from '../../modules/NewsCard/NewsCard'
import { Link } from 'react-router-dom'
import ModalButton from '../../modules/ModalButton/ModalButton'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Modal from '../../modules/Modal/Modal'
import NewsForm from '../../modules/NewsForm/NewsForm'
import Span from '../../components/Span/Span'
import NoContent from '../../modules/NoContent/NoContent'
import checkLoggedUser from '../../services/checkLoggedUser'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setContactFooter, setPageVisited, setUser } from '../../store/general/action'
import verifyToken from '../../services/verifyToken'
import logout from '../../services/logout'
import countapi from 'countapi-js';


const NewsList = () => {

    const [newsCount, setNewsCount] = useState(0)
    const [addedNews, setAddedNews] = useState({})
    const [newsList, setNewsList] = useState([])
    const [modalState, setModalState] = useState(false);
    const [limit, setLimit] = useState(9)
    const [page, setPage] = useState(1)
    const [pagesCount, setPagesCount] = useState(0)
    const [lastPageSize, setLastPageSize] = useState(0)
    const dispatch = useDispatch()
    const pageVisited = useSelector(state => state.pageVisited)
    const user = useSelector(state => state.user)
    
    
    const getNewsList = async () => {
        try {
            document.querySelector('.bounce-loader').classList.add('active');
            const {data} = await axios.get(`api/news?limit=${limit}&skip=0&reverse=true`);
            const newsList = data[0].data.map( news => {
                return (
                    {
                        id: news.id,
                        title: news.title,
                        image: news.imageUrl,
                        content: news.content,
                        date: new Date(news.date)
                    }
                )
            })

            setNewsList(newsList)
            setPagesCount(Math.ceil(data[0].count / limit))
            setNewsCount(data[0].count)
            setLastPageSize(data[0].count % limit ? data[0].count % limit : limit)
            document.querySelector('.bounce-loader').classList.remove('active');
        }

        catch (err) {
            console.log(err);
            document.querySelector('.bounce-loader').classList.remove('active');
        }
    }

    useEffect(() => {
        getNewsList()
    }, [addedNews])

    useEffect(() => {
        if (!pageVisited) {
            countapi.hit('segundaaguada', 'home')
            setPageVisited(dispatch, true)
        }
        
        setContactFooter(dispatch, false)

        document.title = 'Noticias | AVV Segunda Aguada'

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
                    onclick={()=> {setModalState(!modalState)}}
                    tooltip='Agregar noticia'
                    type='add'
                >
                    <Span>Agregar noticia</Span>
                </ModalButton>
            }
            <Section className='news-list--top' style={pagesCount === 1 ? {marginBottom: '5vh'} : null}>
                <SearchBar
                    placeholder='Busca una noticia...'
                    type='news'
                />
                {
                    pagesCount > 1 ? 
                    <Stack spacing={2} style={{marginTop: '5vh'}}>
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
                                        request = `api/news?limit=${limit}&skip=0&reverse=true`
                                        setPage(1)
                                        break
                                    case 'LastPageIcon':
                                        request = `api/news?limit=${limit}&skip=${newsCount - lastPageSize}&reverse=true`
                                        setPage(pagesCount)
                                        break
                                    case 'NavigateBeforeIcon':
                                        request = `api/news?limit=${limit}&skip=${page * limit - (limit * 2)}&reverse=true`
                                        setPage(page -1)
                                        break
                                    case 'NavigateNextIcon':
                                        request = `api/news?limit=${limit}&skip=${page * limit}&reverse=true`
                                        setPage(page +1)
                                        break
                                    default:
                                        request = `api/news?limit=${limit}&skip=${limit * (params -1)}&reverse=true`
                                        setPage(params)
                                }

                                const {data} = await axios.get(request);
                                const newsList = data[0].data.map( news => {
                                    return (
                                        {
                                            id: news.id,
                                            title: news.title,
                                            image: news.imageUrl,
                                            content: news.content,
                                            date: new Date(news.date)
                                        }
                                    )
                                })               
                                setNewsList(newsList)
                                document.querySelector('.bounce-loader').classList.remove('active');
                            }}
                        />
                    </Stack> 
                    : null
                }
            </Section>
            <Section className='news-list--container' style={pagesCount === 1 ? {marginBottom: '20vh'} : null}>
                {
                    newsList.length > 0 ?
                    newsList.map(news => (
                        <Link 
                            to={`/noticias/${news.id}`}
                            key={news.id}
                            className='news-link'
                        >
                            <NewsCard
                                title={news.title}
                                image={news.image}
                                content={news.content}
                                date={news.date}
                            />
                        </Link>
                    )) :
                    <NoContent
                        message={'No hay noticias.'}
                    />
                }
            </Section>
            <Modal
                titulo = "Agregar noticia"
                state = {modalState}
                changeState = {setModalState}
                mostrarHeader = {true}
                mostrarOverlay = {true}
                posicionModal={'center'}
            >
                <NewsForm 
                    user={user}
                    changeModalState={setModalState}
                    changeAddedNews={setAddedNews}    
                />
            </Modal>
        </Main>
    )
}

export default NewsList