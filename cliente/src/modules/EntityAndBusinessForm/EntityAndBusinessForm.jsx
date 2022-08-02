import React, { useState } from 'react'
import Label from '../../components/Label/Label'
import Span from '../../components/Span/Span'
import Textarea from '../../components/Textarea/Textarea'
import Button from '../../components/Button/Button'
import Abbr from '../../components/Abbr/Abbr'
import addBusiness from '../../services/addBusiness'
import addEntity from '../../services/addEntity'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { formatSocialMedia } from '../../Share/utilities'
import Geocode from "react-geocode";
import { googleMapKey } from "../../env/env";

const BusinessForm = ({type}) => {

    const [error, setError] = useState('')
    const navigate = useNavigate()

    const navigateToList = () => {
        switch (type) {
            case 'entity': 
                navigate("/entidades")
                break
            case 'business': 
                navigate("/comercios")
                break
        }
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Campo obligatorio.'),

        description: Yup.string()
            .required('Campo obligatorio.'),

        email: Yup.string()
            .email('Dirección de correo inválida.'),
        
        streetAddress: Yup.string()
            .required('Campo obligatorio.'),
        
        streetNumber: Yup.string()
            .required('Campo obligatorio.'),

        postalCode: Yup.string()
            .matches(/^\d{5}$/, 'Debe ser un número de 5 dígitos.')
            .required('Campo obligatorio.'),
        
        phone: Yup.string()
            .matches(/^\d{9}$/, 'Debe ser un número de 9 dígitos.'),

        mobile: Yup.string()
            .matches(/^\d{9}$/, 'Debe ser un número de 9 dígitos.'),

        instagram: Yup.string(),

        twitter: Yup.string(),

        facebook: Yup.string(),

        image: Yup.mixed()
            .required('Campo obligatorio.')
    })

    return (
        <Formik
            initialValues={{
                name: '',
                description: '',
                email: undefined,
                streetAddress: '',
                streetNumber: '',
                latitude: '',
                longitude: '',
                postalCode: '',
                mobile: undefined,
                phone: undefined,
                instagram: undefined,
                twitter: undefined,
                facebook: undefined,
                image: ''
            }}
            validationSchema={validationSchema}
            onSubmit={ async (values) => {

                let serverResponse

                try {

                    if (type === 'business') {

                        let businessValues = {...values}
                        businessValues.bussinessName = values.name
                        delete businessValues.name

                        if (businessValues.twitter) businessValues.twitter = formatSocialMedia(businessValues.twitter)
                        if (businessValues.instagram) businessValues.instagram = formatSocialMedia(businessValues.instagram)
                        
                        serverResponse = addBusiness(businessValues)

                    }
                    else {
                        
                        if (values.twitter) values.twitter = formatSocialMedia(values.twitter)
                        if (values.instagram) values.instagram = formatSocialMedia(values.instagram)

                        serverResponse = addEntity(values)
                    }

                    serverResponse.then(res => {
                        if (res.status && res.status === 201) {
                            setError('')
                            navigateToList()
                        }
    
                        else if (res.response && res.response.status === 422) {
                            setError(res.response.data.message[0])
                        }

                    })
                }

                catch (err) {
                    console.log(err)
                }

            }}
        >
            {
                ({handleChange, handleSubmit, errors, touched, setFieldValue, values}) =>
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
                        htmlFor = "image"
                        className="auth-label"
                    >
                        {
                            (errors.image && touched.image) && (
                                <Span className="error">{errors.image}</Span>
                            )
                        }
                        <Field
                            // para que se pueda asignar la imagen al valor del input
                            value={undefined}
                            type="file"
                            name="image"
                            id="image"
                            className="form-input"
                            onChange={(event) => {                     
                                setFieldValue('image', event.target.files[0]);
                            }}
                        />
                        <Span className="form-label">Imagen <Abbr title="Campo requerido">*</Abbr></Span>
                    </Label>
                    <Label
                        htmlFor = "description"
                        className="auth-label"
                    >
                        {
                            (errors.description && touched.description) && (
                                <Span className="error">{errors.description}</Span>
                            )
                        }
                        <Textarea 
                            name='description' 
                            id='description' 
                            placeholder='descripción...' 
                            onChange={handleChange}
                            className='form-input'
                        />
                        <Span className="form-label">Descripción <Abbr title="Campo requerido">*</Abbr></Span>
                    </Label>
                    <Label 
                        htmlFor='streetAddress'
                        className='auth-label'
                    >
                        {
                            (errors.streetAddress && touched.streetAddress) && (
                                <Span className='error'>{errors.streetAddress}</Span>
                            )
                        }
                        <Field
                            type='text'
                            name='streetAddress'
                            id='streetAddress'
                            placeholder='calle'
                            className='form-input'
                            onChange={handleChange}
                            onBlur={event => {
                                if (event.target.value && values.streetNumber) {

                                    Geocode.setApiKey(googleMapKey);
                                    Geocode.setLanguage("es");

                                    Geocode.fromAddress(`${event.target.value}, ${values.streetNumber}, Cádiz`).then(
                                        response => {
                                            const { lat, lng } = response.results[0].geometry.location;
                                        
                                            setFieldValue('latitude', lat.toString())
                                            setFieldValue('longitude', lng.toString())
                                        },
                                        err => {
                                            console.log(err)
                                        }
                                    )
                                }
                            }}
                        />
                        <Span className='form-label'>Dirección (calle) <Abbr title="Campo requerido">*</Abbr></Span>
                    </Label>
                    <Label 
                        htmlFor='streetNumber'
                        className='auth-label'
                    >
                        {
                            (errors.streetNumber && touched.streetNumber) && (
                                <Span className='error'>{errors.streetNumber}</Span>
                            )
                        }
                        <Field
                            type='text'
                            name='streetNumber'
                            id='streetNumber'
                            placeholder='número'
                            className='form-input'
                            onChange={handleChange}
                            onBlur={event => {
                                if (event.target.value && values.streetAddress) {

                                    Geocode.setApiKey(googleMapKey);
                                    Geocode.setLanguage("es");

                                    Geocode.fromAddress(`${values.streetAddress}, ${event.target.value}, Cádiz`).then(
                                        response => {
                                            const { lat, lng } = response.results[0].geometry.location;
                                        
                                            setFieldValue('latitude', lat.toString())
                                            setFieldValue('longitude', lng.toString())
                                        },
                                        err => {
                                            console.log(err)
                                        }
                                    )
                                }
                            }}
                        />
                        <Span className='form-label'>Dirección (número) <Abbr title="Campo requerido">*</Abbr></Span>
                    </Label>
                    <Label 
                        htmlFor='postalCode'
                        className='auth-label'
                    >
                        {
                            (errors.postalCode && touched.postalCode) && (
                                <Span className='error'>{errors.postalCode}</Span>
                            )
                        }
                        <Field
                            type='text'
                            name='postalCode'
                            id='postalCode'
                            placeholder='código postal'
                            className='form-input'
                            onChange={handleChange}
                        />
                        <Span className='form-label'>Código postal <Abbr title="Campo requerido">*</Abbr></Span>
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
                            onChange={handleChange}
                            className='form-input'
                        />
                        <Span className='form-label'>Dirección de correo</Span>
                    </Label>
                    <Label 
                        htmlFor='phone'
                        className='auth-label'
                    >
                        {
                            (errors.phone && touched.phone) && (
                                <Span className='error'>{errors.phone}</Span>
                            )
                        }
                        <Field 
                            type='text' 
                            name='phone' 
                            id='phone' 
                            placeholder='número de teléfono' 
                            onChange={handleChange}
                            className='form-input'
                        />
                        <Span className='form-label'>Número de teléfono</Span>
                    </Label>
                    <Label 
                        htmlFor='mobile'
                        className='auth-label'    
                    >
                        {
                            (errors.mobile && touched.mobile) && (
                                <Span className='error'>{errors.mobile}</Span>
                            )
                        }
                        <Field 
                            type='text' 
                            name='mobile' 
                            id='mobile' 
                            placeholder='número de teléfono móvil' 
                            onChange={handleChange}
                            className='form-input'
                        />
                        <Span className='form-label'>Número de teléfono móvil</Span>
                    </Label>
                    <Label 
                        htmlFor='instagram'
                        className='auth-label'
                    >
                        {
                            (errors.instagram && touched.instagram) && (
                                <Span className='error'>{errors.instagram}</Span>
                            )
                        }
                        <Field
                            type='text'
                            name='instagram'
                            id='instagram'
                            placeholder='instagram'
                            className='form-input'
                            onChange={handleChange}
                        />
                        <Span className='form-label'>Instagram</Span>
                    </Label>
                    <Label 
                        htmlFor='twitter'
                        className='auth-label'
                    >
                        {
                            (errors.twitter && touched.twitter) && (
                                <Span className='error'>{errors.twitter}</Span>
                            )
                        }
                        <Field
                            type='text'
                            name='twitter'
                            id='twitter'
                            placeholder='twitter'
                            className='form-input'
                            onChange={handleChange}
                        />
                        <Span className='form-label'>Twitter</Span>
                    </Label>
                    <Label 
                        htmlFor='facebook'
                        className='auth-label'
                    >
                        {
                            (errors.facebook && touched.facebook) && (
                                <Span className='error'>{errors.facebook}</Span>
                            )
                        }
                        <Field
                            type='text'
                            name='facebook'
                            id='facebook'
                            placeholder='facebook'
                            className='form-input'
                            onChange={handleChange}
                        />
                        <Span className='form-label'>Facebook</Span>
                    </Label>

                    <Field
                        type='hidden'
                        name='latitude'
                        id='latitude'
                    />
                    <Field
                        type='hidden'
                        name='longitude'
                        id='longitude'
                    />

                    {
                        error && <Span className='error'>{error}</Span>
                    }

                    <Button
                        type='submit'
                        value={type === 'business' ? 'Registrar comercio' : 'Registrar entidad'}
                    >
                        {
                            type === 'business' ? 'Registrar comercio' : 'Registrar entidad'
                        }
                    </Button>
                    <Button
                        type='button'
                        onClick={() => window.history.go(-1)}
                        className='go-back--button'
                    >
                        Volver
                    </Button>
                </Form>
            }
        </Formik>
    )
}

export default BusinessForm