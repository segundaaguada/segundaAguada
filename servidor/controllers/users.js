const bcrypt = require('bcrypt')
const { response } = require('express')
const { RegisterUser } = require('moongose/controller/user_controller')
const userExtractor = require('../middleware/userExtractor')
const usersRouter = require('express').Router()
const User = require('../models/User')
const Association = require('../models/Association')
const jwt = require('jsonwebtoken')

usersRouter.get('/', async (request, response, next) => {
    try {
        // const users = await User.find({})
        // .populate('association')

        const limit = Number(request.query.limit)
        const skip = Number(request.query.skip)

        const users = await User.aggregate([
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
                                from: "associations",
                                localField: "association",
                                foreignField: "_id",
                                as: "association"
                            }
                        },
                        {
                            $unwind: "$association"
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

        response.json(users)
    }
    catch (err) {
        next(err)
    }
})

usersRouter.get('/verify', async (request, response, next) => {
    try {
        const tokenVerified = jwt.verify(request.headers.authorization.substring(7), process.env.SECRET)
        response.json(tokenVerified)
    }

    catch (err) {
        next(err)
    }
})

usersRouter.get('/:id', async (request, response,next) => {
    try{
        const {id} = request.params
        const user = await User.findById(id).populate("association")
        if(user) return response.json(user)
    }
    catch (err) {
        next(err)
    }
})

usersRouter.put("/", userExtractor, async (request, response, next) => {
    try{
        const {id} = request.params
        const user = await User.findById(id)
        if(user) return response.json(user)
    }
    catch (err) {
        next(err)
    }
})

usersRouter.delete("/:id", async (request, response) => {
    const {id} = request.params
    const res = await User.findByIdAndDelete(id)
    if(res === null) return response.sendStatus(404)

    response.status(204).end()
})

usersRouter.post('/',async (request,response,next) => {
    const {body} = request
    const {name, surname, email, association, password, role } = body

    const saltRounds = 10 
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const findAssociation = await Association.findById(association) 

    const user = new User({
        
        passwordHash,
        name,
        surname,
        email,
        role,
        association: findAssociation._id
    })

    try {
        const savedUser = await user.save()
        // findAssociation.user = findAssociation.user.concat(savedUser._id)
        // await findAssociation.save()
        await Association.findByIdAndUpdate(findAssociation.id, {user: findAssociation.user.concat(savedUser._id)}, (err, result) => {
            if (err) console.log('error', err)
            else console.log('resultado', result)
        }).clone()
        response.status(201).json(savedUser)
    }

    catch(e) {
        next(e)
        if (e.errors.email && e.errors.email.properties.type === 'unique') {
            return response.status(422).json({
                message: 'Ya existe un usuario con esa dirección de correo.'
            })
        }
        else {
            return response.status(422).json({
                message: 'No se pudo registrar el usuario.'
            })
        }
    }

})

module.exports = usersRouter