import React, { useState, useEffect } from 'react'
import Main from '../../components/Main/Main'
import H2 from '../../components/H2/H2'
import Line from '../../components/Line/Line'
import P from '../../components/P/P'
import Div from '../../components/Div/Div'
import Img from '../../components/Img/Img'
import Section from '../../components/Section/Section'
import { months } from '../../Share/utilities'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import checkLoggedUser from '../../services/checkLoggedUser'
import Modal from '../../modules/Modal/Modal'
import ModalButton from '../../modules/ModalButton/ModalButton'
import Span from '../../components/Span/Span'
import DeleteConfirmation from '../../modules/DeleteConfirmation/DeleteConfirmation'
import deleteNews from '../../services/deleteNews'
import NewsForm from '../../modules/NewsForm/NewsForm'
import { useDispatch, useSelector } from 'react-redux'
import { setPageVisited, setUser } from '../../store/general/action'
import verifyToken from '../../services/verifyToken'
import logout from '../../services/logout'
import countapi from 'countapi-js';


const News = () => {

    const [contentChange, setContentChange] = useState({})
    const [deleteModalState, setDeleteModalState] = useState(false);
    const [editModalState, setEditModalState] = useState(false);
    const navigate = useNavigate()
    const [news, setNews] = useState({})
    const { id } = useParams()
    const dispatch = useDispatch()
    const pageVisited = useSelector(state => state.pageVisited)
    const user = useSelector(state => state.user)
    
    const getNewsDetail = async () => {
        try {
            document.querySelector('.bounce-loader').classList.add('active');
            const {data} = await axios.get(`api/news/${id}`);

            document.title = data.title + ' | AVV Segunda Aguada'

            const auxDate = new Date(data.date)
            data.day = auxDate.getDate()
            data.month = months[auxDate.getMonth()]
            data.year = auxDate.getFullYear()

            data.content = data.content.split('\n')
            setNews(data)
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

    }, [])

    useEffect(async () => {
        getNewsDetail()
    }, [contentChange])


    return (
        <Main className='news-main'>
            <Section className='news-detail--title'>
                <H2 className='news-detail--title'>
                    {news.title}
                </H2>
                <Line
                    backgroundColor='yellow'
                    margin='25px 0 15px 0'
                />
                <Div className='news-detail--div'>
                    <P
                        className='news-detail--author'
                    >
                        {news.author}
                    </P>
                    <P
                        className='news-detail--date'
                    >
                        {news.day} de {news.month} de {news.year}
                    </P>
                </Div>
            </Section>
            <Img 
                src={news.imageUrl}
                alt={news.title}
                className='news-detail--image'
            />
            <Section className='news-detail--content'>
                {
                    news.content?.map(paragraph => (
                        <P 
                            className='news-detail--content'
                            key={paragraph}
                        >
                            {paragraph}
                        </P>
                    ))
                }
                <Div
                    className='news-detail--buttons'
                >
                    {
                        user && user?.role === 1 || news.association === user?.association ? 
                        <ModalButton
                            onclick={()=> setDeleteModalState(!deleteModalState)}
                            position='relative'
                            tooltip='Eliminar noticia'
                            type='delete'
                        >
                            <Span>Eliminar noticia</Span>
                        </ModalButton>
                        : null
                    }
                    <ModalButton
                        position='relative'
                        tooltip='Volver'
                        onclick={() => {window.history.go(-1)}}
                    >
                        <Span>Volver</Span>
                    </ModalButton>
                </Div>
            </Section>
            <Modal
                titulo = "Eliminar noticia"
                state = {deleteModalState}
                changeState = {setDeleteModalState}
                mostrarHeader = {true}
                mostrarOverlay = {true}
                posicionModal={'center'}
            >
                <DeleteConfirmation
                    type='news'
                    changeModalState={()=> setDeleteModalState(!deleteModalState)}
                    contentId={news.id}
                    deleteContent={deleteNews}
                />
            </Modal>
            <Modal
                titulo = "Editar noticia"
                state = {editModalState}
                changeState = {setEditModalState}
                mostrarHeader = {true}
                mostrarOverlay = {true}
                posicionModal={'center'}
            >
                <NewsForm 
                    user={user}
                    changeModalState={setEditModalState}
                    redirect={setContentChange}
                    initialValue={news}
                />
            </Modal>
        </Main>
    )
}

export default News