const {Schema, model} = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const bussinesSchema = new Schema({

    bussinessName: {
        type: String,
        unique: false,
        required: true
    },

    imageUrl: {
        type: String,
        unique: false,
        required: true
    },

    description: {
        type: String,
        unique: false,
        required: true
    },

    streetAddress: {
        type: String,
        required: true
    },

    streetNumber: {
        type: String,
        required: true
    },

    postalCode: {
        type: Number,
        required: true
    },
    

    latitude: {
        type: String,
        unique: false,
        required: false
    },

    longitude: {
        type: String,
        unique: false,
        required: false
    },

    email: {
        type: String,
        unique: true,
        sparse: true
    },

    mobile: {
        type: String,
        unique: true,
        sparse: true
    },

    phone: {
        type: String,
        unique: true,
        sparse: true
    },

    instagram: {
        type: String,
        unique: true,
        sparse: true
    },

    facebook: {
        type: String,
        unique: true,
        sparse: true
    },

    twitter: {
        type: String,
        unique: true,
        sparse: true
    },

})

bussinesSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

bussinesSchema.methods.setImgUrl = function setImgUrl(filename){
    
    const host = process.env.APP_HOST 
    // const port = process.env.PORT

    this.imageUrl = `${host}/public/${filename}`

    
}

bussinesSchema.plugin(uniqueValidator)

const Bussines = model("Bussines", bussinesSchema)

module.exports = Bussines