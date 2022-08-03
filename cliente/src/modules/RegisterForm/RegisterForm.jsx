import React, { useState, useEffect } from 'react'
import Div from '../../components/Div/Div'
import Label from '../../components/Label/Label'
import Span from '../../components/Span/Span'
import Button from '../../components/Button/Button'
import SelectField from '../SelectField/SelectField'
import Abbr from '../../components/Abbr/Abbr'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import registerService from '../../services/register'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {

    const [associationName, setAssociationName] = useState('')
    const [error, setError] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false)
    const [associationOptions, setAssociationOptions] = useState([])
    const navigate = useNavigate()

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible)
    }

    const navigateToLogin = () => {
        navigate("/admin/login")
    }

    const getAssociationsData = async () => {
        try {
            document.querySelector('.bounce-loader').classList.add('active');
            const response =  await axios.get("/api/associations?search=true");
            let associationList = response.data.map(association =>{
                return (
                    {
                        label: association.name,
                        value: `${association.id}%%${association.name}`
                    }
                )
            })
          setAssociationOptions(associationList)
          document.querySelector('.bounce-loader').classList.remove('active');
        }catch(e) {
            console.log(e)
            document.querySelector('.bounce-loader').classList.remove('active');
        }
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Campo obligatorio.'),

        surname: Yup.string()
            .required('Campo obligatorio.'),

        email: Yup.string()
            .email('Dirección de correo inválida.')
            .required('Campo obligatorio.'),

        association: Yup.string()
            .required('Campo obligatorio.')
            .nullable(),

        password: Yup.string()
            .matches(/^[a-zA-Z\d]{8,}$/, 'Debe contener al menos 8 caracteres.')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Debe contener al menos una minúscula, una mayúscula y un número.')
            .required('Campo obligatorio.'),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden.')
            .required('Campo obligatorio.')
    })

    useEffect(() => {
        getAssociationsData()
    },[])

    return (
        <Formik
            initialValues={{
                name: '',
                surname: '',
                email: '',
                association: null,
                password: '',
                confirmPassword: '',
                role: ''
            }}
            validationSchema={validationSchema}
            onSubmit={ async (values) => {

                if (associationName !== '') {
                    values.role = associationName.includes('Segunda Aguada') ? 1 : 2
                    values.association = values.association
                }
                else {
                    setAssociationName(values.association.split('%%')[1])
                    values.role = values.association.split('%%')[1].includes('Segunda Aguada') ? 1 : 2
                    values.association = values.association.split('%%')[0]
                }

                const registerResponse = registerService(values)
                
                registerResponse.then(res => {
                    
                    if (res.status && res.status === 201) {
                        setError('')
                        navigateToLogin()
                    }

                    else if (res.response && res.response.status === 422) {
                        setError(res.response.data.message)
                    }
                })
                
            }}
        >
            {
                ({handleChange, handleSubmit, errors, touched}) =>
                <Form 
                    onSubmit={handleSubmit}
                    className='auth-form'
                >
                    <Label 
                        htmlFor='name'
                        className='auth-label'
                    >
                        {
                            (errors.name && touched.name) && (
                                <Span className='error'>{errors.name}</Span>
                            )
                        }
                        <Field
                            type='text'
                            name='name'
                            id='name'
                            placeholder='nombre'
                            className='form-input'
                            onChange={handleChange}
                        />
                        <Span className='form-label'>Nombre <Abbr title="Campo requerido">*</Abbr></Span>
                    </Label>
                    <Label 
                        htmlFor='surname'
                        className='auth-label'
                    >
                        {
                            (errors.surname && touched.surname) && (
                                <Span className='error'>{errors.surname}</Span>
                            )
                        }
                        <Field
                            type='text'
                            name='surname'
                            id='surname'
                            placeholder='apellidos'
                            className='form-input'
                            onChange={handleChange}
                        />
                        <Span className='form-label'>Apellidos <Abbr title="Campo requerido">*</Abbr></Span>
                    </Label>
                    <Label 
                        htmlFor='email'
                        className='auth-label'
                    >
                        {
                            (errors.email && touched.email) && (
                                <Span className='error'>{errors.email}</Span>
                            )
                        }
                        <Field
                            type='text'
                            name='email'
                            id='email'
                            placeholder='dirección de correo'
                            className='form-input'
                            onChange={handleChange}
                        />
                        <Span className='form-label'>Dirección de correo <Abbr title="Campo requerido">*</Abbr></Span>
                    </Label>
                    <Label 
                        htmlFor='association'
                        className='auth-label'
                    >
                        {
                            (errors.association && touched.association) && (
                                <Span className='error'>{errors.association}</Span>
                            )
                        }
                        <Field
                            name='association'
                            component={SelectField}
                            options={associationOptions}
                            placeholder='asociación'
                            noOptionsMessage='No hay asociaciones.'
                            searchBar={false}
                        />
                        <Span className='form-label'>Entidad <Abbr title="Campo requerido">*</Abbr></Span>
                    </Label>
                    <Label 
                        htmlFor='password'
                        className='auth-label'
                    >
                        {
                            (errors.password && touched.password) && (
                                <Span className='error'>{errors.password}</Span>
                            )
                        }
                        <Div 
                            className={
                                passwordFocus ? 
                                    'auth-password--input input-focus' : 
                                    'auth-password--input'
                            }
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        >
                            <Field
                                type={ passwordVisible ? 'text' : 'password' }
                                name='password'
                                id='password'
                                placeholder='contraseña'
                                className='form-input--password'
                                onChange={handleChange}
                                onCopy={e => e.preventDefault()}
                                onPaste={e => e.preventDefault()}
                            />
                            <Button 
                                type='button'
                                className='password-button'
                                onClick={togglePasswordVisibility}
                            >
                                {
                                    passwordVisible ?
                                        <FiEyeOff /> :
                                        <FiEye />
                                }
                            </Button>
                        </Div>
                        <Span className='form-label'>Contraseña <Abbr title="Campo requerido">*</Abbr></Span>
                    </Label>
                    <Label 
                        htmlFor='confirmPassword'
                        className='auth-label'
                    >
                        {
                            (errors.confirmPassword && touched.confirmPassword) && (
                                <Span className='error'>{errors.confirmPassword}</Span>
                            )
                        }
                        <Div 
                            className={
                                confirmPasswordFocus ? 
                                    'auth-password--input input-focus' : 
                                    'auth-password--input'
                            }
                            onFocus={() => setConfirmPasswordFocus(true)}
                            onBlur={() => setConfirmPasswordFocus(false)}
                        >
                            <Field
                                type={ confirmPasswordVisible ? 'text' : 'password' }
                                name='confirmPassword'
                                id='confirmPassword'
                                placeholder='confirmar contraseña'
                                className='form-input--password'
                                onChange={handleChange}
                                onCopy={e => e.preventDefault()}
                                onPaste={e => e.preventDefault()}
                            />
                            <Button 
                                type='button'
                                className='password-button'
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {
                                    confirmPasswordVisible ?
                                        <FiEyeOff /> :
                                        <FiEye />
                                }
                            </Button>
                        </Div>
                        <Span className='form-label'>Confirmar contraseña <Abbr title="Campo requerido">*</Abbr></Span>
                    </Label>
                    {
                        error && <Span className='error'>{error}</Span>
                    }
                    <Button
                        type='submit'
                        value='Registrarse'
                    >
                        Registrarse
                    </Button>
                </Form>
            }
        </Formik>
    )
}

export default RegisterForm