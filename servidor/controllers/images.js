const imagesRouter = require('express').Router()
const userExtractor = require('../middleware/userExtractor')
const Image = require('../models/Image')
const Association = require('../models/Association')
const upload = require('../middleware/storage')
// const fs = require('fs');
// const path = require('path')


imagesRouter.get("/", async (request, response, next) => 
{
    try
    {
        // const images = await Image.find({})
        const limit = Number(request.query.limit)
        const skip = Number(request.query.skip)
        const {reverse} = request.query

        const images = await Image.aggregate([
            {
                $sort: {created_at: reverse ? -1 : 1}
            },
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

        response.json(images)        
    }
    catch(err)
    {
        next(err)
    }
})

imagesRouter.get('/:id', async (request, response, next) => 
{   
    try
    {
        const {id} = request.params
        const image = await Image.findById(id)

        if (image) return response.json(image)
    }

    catch(err)
    {
        next(err)
    }

})

imagesRouter.put("/", userExtractor,async(request, response, next) =>
{
    try
    {
        const {id} = request.params

        const newImageInfo = 
        {
            
            updated_at: new Date()

        }
        
        const image = await Image.findByIdAndUpdate(id, newImageInfo, {new : true})

        response.json(image)
    }
    catch(err)
    {
        next(err)
    }
})

imagesRouter.delete("/:id",userExtractor,async (request,response, next) =>
{
    const {id} = request.params
    // const img = Image.findOne({id: id}, (err, result) => {
    //     if (err) console.log('error', err)
    //     else {
    //         const fileName = result.imageUrl.substring(result.imageUrl.lastIndexOf('/') + 1)
    //         const filePath = path.resolve(__dirname, '..') + '\\storage\\images\\' + fileName
    //         fs.unlinkSync(filePath)
    //     }
    // })
    const res = await Image.findByIdAndDelete(id)
    if (res === null) return response.sendStatus(404)
    response.status(204).end()
})

imagesRouter.post("/", userExtractor, upload.single('image'), async (request,response, next) =>{

    const {body} = request
    const {association} = body

    const findAssociation = await Association.findById(association)

    const newImageInfo = new Image ({
        created_at: new Date(),
        updated_at: new Date(),
        association: findAssociation._id
    })

    const {filename} = request.file
    newImageInfo.setImgUrl(filename)
  
    
    try 
    {
        const savedImage = await newImageInfo.save()
        // findAssociation.image  = findAssociation.image.concat(savedImage._id)
        // await findAssociation.save()
        await Association.findByIdAndUpdate(findAssociation.id, {image: findAssociation.image.concat(savedImage._id)}, (err, result) => {
            if (err) console.log('error', err)
            else console.log('resultado', result)
        }).clone()
        response.status(201).json(savedImage)
    }
    catch (err)
    {
        next(err)
    }

})

module.exports = imagesRouter