import React, { useState, useEffect } from 'react'
import Label from '../../components/Label/Label'
import SelectField from '../SelectField/SelectField'
import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const SearchBar = ({placeholder, type}) => {

    const [options, setOptions] = useState([])
    const navigate = useNavigate()

    const getNewsList = async () => {
        try {
            document.querySelector('.bounce-loader').classList.add('active');
            const {data} = await axios.get('api/news?search=true');
            const newsList = data.map( news => {
                return (
                    {
                        value: news.id,
                        label: news.title
                    }
                )
            })
            
            setOptions(newsList)
            document.querySelector('.bounce-loader').classList.remove('active');
        }

        catch (err) {
            console.log(err);
            document.querySelector('.bounce-loader').classList.remove('active');
        }
    }

    const getEntitiesList = async () => {
        try {
            document.querySelector('.bounce-loader').classList.add('active');
            const {data} = await axios.get('api/associations?search=true');
            const entitiesList = data.map( entity => {
                return (
                    {
                        value: entity.id,
                        label: entity.name
                    }
                )
            })
            setOptions(entitiesList)
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
            const {data} = await axios.get('api/bussines?search=true');
            const businessesList = data.map( business => {
                return (
                    {
                        value: business.id,
                        label: business.name
                    }
                )
            })
            setOptions(businessesList)
            document.querySelector('.bounce-loader').classList.remove('active');
        }

        catch (err) {
            console.log(err);
            document.querySelector('.bounce-loader').classList.remove('active');
        }
    }


    useEffect(() => {
        switch(type) {
            case 'news':
                getNewsList()
                break
            case 'entities':
                getEntitiesList()
                break
            case 'businesses':
                getBusinessesList()
                break
        }
    }, [])


    return (
        <Formik
            initialValues={{
                news: '',
                entity: '',
                business: ''
            }}
            onSubmit={(values)=> {
                switch (type) {
                    case 'news':
                        navigate(`/noticias/${values.news}`)
                        break
                    case 'entities':
                        navigate(`/entidades/${values.entity}`)
                        break
                    case 'businesses':
                        navigate(`/comercios/${values.business}`)
                        break
                }
            }}
        >
            {
                ({handleSubmit}) =>
                <Form 
                    onSubmit={handleSubmit}
                    className={type === 'news' ? 'news-list--form' : 'entity-list--form'}
                >
                    <Label className='news-list--label'>
                        <Field
                            name={type === 'news' ? 'news' : type === 'entities' ? 'entity' : 'business'}
                            component={SelectField}
                            options={options}
                            placeholder={placeholder}
                            noOptionsMessage={type === 'news' ? 'No hay noticias' : type === 'entities' ? 'No hay entidades' : 'No hay comercios'}
                            searchBar={true}
                            type={type}
                        />
                    </Label>
                </Form>
            }
        </Formik>
    )
}

export default SearchBar