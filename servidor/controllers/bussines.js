const bussinesRouter = require('express').Router()
const userExtractor = require('../middleware/userExtractor')
const Bussines = require('../models/Bussines')
const User = require('../models/User')
const upload = require('../middleware/storage')

bussinesRouter.get('/', async (request, response) => {

    try {
        // const bussines = await Bussines.find({})

        const limit = Number(request.query.limit)
        const skip = Number(request.query.skip)
        const {search} = request.query

        let bussines = null

        if (search) {
            bussines = await Bussines.aggregate([
                {
                    $project: {
                        name: "$bussinessName",
                        id: "$_id"
                    },
                }
            ])
        }

        else {
            bussines = await Bussines.aggregate([
                {
                    $facet: {
                        'stage1': [{'$group': {_id: null, count: {$sum:1}}}],
                        'stage2': [
                            {  
                                "$skip": skip ? skip : 0
                            }, 
                            {
                                "$limit": limit ? limit : 9
                            }, 
                            {
                                $set: {id: "$_id"}
                            }
                        ]
                    }
                },
                {
                    $unwind: "$stage1"
                },
                {
                    $project: {
                        count: "$stage1.count",
                        data: "$stage2"
                    },
                }
            ])
        }

        response.json(bussines)
    }
    catch (err) {
        next(err)
    }

})

bussinesRouter.get('/:id', async (request, response, next) => {
    try {
        const {id} = request.params
        const bussines = await Bussines.findById(id)
        if(bussines) return response.json(bussines)
    }
    catch (err) {
        next(err)
    }
})

bussinesRouter.put('/', userExtractor ,async (request, response, next) => {
    try {
        const {id} = request.params
        const info = request.body 

        const newBussinesInfo = {
            bussinesName : info.bussinesName,
            description : info.description,
            streetAddress : info.streetAddress,
        }

        

        const bussines = await Bussines.findByIdAndUpdate(id, newBussinesInfo,{new : true})
        response.json(bussines)
    
    }   
    catch (err) {
        next(err)
    }
})

bussinesRouter.delete('/:id', userExtractor ,async (request, response, next) => {
    const {id} = request.params
    const res = await Bussines.findByIdAndDelete(id)
    if (res === null) return response.sendStatus(404)
    response.status(204).end()
})

bussinesRouter.post('/', userExtractor, upload.single('image'),async (request, response, next) =>{
    const {
        bussinessName,
        description,
        streetAddress,
        streetNumber,
        postalCode,
        latitude,
        longitude,
        email,
        mobile,
        phone,
        instagram,
        twitter,
        facebook
    } = request.body

    const newBussinesInfo = new Bussines({
        bussinessName,
        description,
        streetAddress,
        streetNumber,
        postalCode,
        latitude,
        longitude,
        email,
        mobile,
        phone,
        instagram,
        twitter,
        facebook
    })

    const {filename} = request.file 
    newBussinesInfo.setImgUrl(filename)

    try{
        const savedBussines = await newBussinesInfo.save()
        response.status(201).json(savedBussines)
    }
    catch(err){
        next(err)
        let errors = []
        Object.keys(err.errors).forEach(key => {
            if (err.errors[key].properties.type === 'unique') {
                switch (key) {
                    case 'bussinessName':
                        errors.push('Ya existe un comercio con ese nombre.')
                        break
                    case 'email':
                        errors.push('Ya existe un comercio con esa dirección de correo.')
                        break
                    case 'phone':
                        errors.push('Ya existe un comercio con ese número de teléfono.')
                        break
                    case 'mobile':
                        errors.push('Ya existe un comercio con ese número de móvil.')
                        break
                    case 'twitter':
                        errors.push('Ya existe un comercio con ese twitter.')
                        break
                    case 'instagram':
                        errors.push('Ya existe un comercio con ese instagram.')
                        break
                    case 'facebook':
                        errors.push('Ya existe un comercio con ese facebook.')
                        break
                }
            }
        })

        if (errors !== []) {
            return response.status(422).json({
                message: errors
            })
        }
        else {
            return response.status(422).json({
                message: 'No se pudo agregar el comercio.'
            })
        }
        
    }
})

module.exports = bussinesRouter
