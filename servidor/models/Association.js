const {Schema,model} = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const associationSchema = new Schema({

    name: {
        type: String,
        unique: true,
        required: true
    },

    imageUrl: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true,
    },

    streetAddress: {
        type: String,
        required: true
    },

    postalCode: {
        type: Number,
        required: true
    },
    
    streetNumber: {
        type: String,
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

    user: [{
        type : Schema.Types.ObjectId,
        ref: "User"
    }],

    news: [{
        type : Schema.Types.ObjectId,
        ref: "News"
    }],

    image: [{
        type : Schema.Types.ObjectId,
        ref: "Image"
    }]
    
})

associationSchema.set("toJSON",{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

associationSchema.methods.setImgUrl = function setImgUrl(filename){
    const host = process.env.APP_HOST 
    // const port = process.env.PORT
    this.imageUrl = `${host}/public/${filename}`
}

associationSchema.plugin(uniqueValidator)

const Association = model("Association", associationSchema)

module.exports = Association