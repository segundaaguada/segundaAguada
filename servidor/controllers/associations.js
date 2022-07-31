const associationsRouter = require('express').Router()
const userExtractor = require('../middleware/userExtractor')
const Association = require('../models/Association')
const User = require('../models/User')
const News = require('../models/News')
const Image = require('../models/Image')
const upload = require('../middleware/storage')

associationsRouter.get("/", async (request,response, next)=>{
    try{
    
        // const associations = await Association.find({})
        // .populate("user")
        // .populate("news")

        const limit = Number(request.query.limit)
        const skip = Number(request.query.skip)
        const {search} = request.query

        let associations = null
        
        if (search) {
            associations = await Association.aggregate([
                {
                    $project: {
                        name: "$name",
                        id: "$_id"
                    },
                }
            ])
        }

        else {
            associations = await Association.aggregate([
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
                                $lookup: {
                                    from: "users",
                                    localField: "user",
                                    foreignField: "_id",
                                    as: "user"
                                }
                            },
                            {
                                $lookup: {
                                    from: "news",
                                    localField: "news",
                                    foreignField: "_id",
                                    as: "news"
                                }
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

        response.json(associations)
    }
    catch(err){
        next(err)
    }
       
})

associationsRouter.get("/:id", async (request,response, next)=>{
    try{
        const {id} = request.params
        const association = await Association.findById(id)
            .populate("news")
            .populate("image")
        if(association) return response.json(association)
        

    }
    catch(err){
        next(err)
    }

})

associationsRouter.put("/", userExtractor ,async (request, response, next) => {
    try {
        const {id} = request.params
        const {info} = request.body

        const newAssociationInfo = {
            name: info.name,
            description: info.description,
            streetAddress: info.streetAddress,
            streetNumber: info.streetNumber,
            postalCode: info.postalCode,
        }
        

       const association =  await Association.findByIdAndUpdate(id, newAssociationInfo, {new : true})
       
       response.json(association)


    }catch{
        next(err)
    }
})

associationsRouter.delete("/:id", userExtractor, async (request, response, next) => {
    const {id} = request.params
    const association = await Association.findById(id).select('news user image')
    
    association.news.forEach(async (news) => {
        await News.findByIdAndDelete(news)
    })

    association.user.forEach(async (user) => {
        await User.findByIdAndDelete(user)
    })

    association.image.forEach(async (image) => {
        await Image.findByIdAndDelete(image)
    })

    const res = await Association.findByIdAndDelete(id)

    if(res === null) return response.sendStatus(404)

    response.status(204).end()

})

associationsRouter.post("/" , upload.single('image'), async (request, response, next) => {
    
    const {
        name,
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

    
    const newAssociationInfo = new Association({
        name,
        description,
        streetAddress,
        postalCode,
        streetNumber,
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
    newAssociationInfo.setImgUrl(filename)

    try {
        const savedAssociation = await newAssociationInfo.save()
        response.status(201).json(savedAssociation)
    }
    catch(err){
        next(err)
        let errors = []
        Object.keys(err.errors).forEach(key => {
            if (err.errors[key].properties.type === 'unique') {
                switch (key) {
                    case 'name':
                        errors.push('Ya existe una entidad con ese nombre.')
                        break
                    case 'email':
                        errors.push('Ya existe una entidad con esa dirección de correo.')
                        break
                    case 'phone':
                        errors.push('Ya existe una entidad con ese número de teléfono.')
                        break
                    case 'mobile':
                        errors.push('Ya existe una entidad con ese número de móvil.')
                        break
                    case 'twitter':
                        errors.push('Ya existe una entidad con ese twitter.')
                        break
                    case 'instagram':
                        errors.push('Ya existe una entidad con ese instagram.')
                        break
                    case 'facebook':
                        errors.push('Ya existe una entidad con ese facebook.')
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
                message: 'No se pudo agregar la entidad.'
            })
        }
    }  
})

module.exports = associationsRouter