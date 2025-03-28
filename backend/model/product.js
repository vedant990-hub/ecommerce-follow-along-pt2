const mongoose = require('mongoose')

    const productSchema = new mongoose.Schema({
        name:{
            type: String,
            required: [true, "Provide the name of the product"],
        },
        description: {
            type: String,
            required: [true, "Provide the description of the product"],
        },
        category: {
            type: String,
            required: [true, "Provide the category of the product"],
        },
        tags: {
            type: [String],
            default: [],
        },
        price: {
            type: Number,
            required: [true, "Provide the price of the product"],
        },
        stock: {
            type: Number,
            required: [true, "Provide the stock of the product"],
        },
        images: {
            type: [String],
            required: [true, "Provide at least one image for the product"],
        },
        email: {
            type: String,
            required: [true, "Provide the email of the product owner"],
            unique: true,
            match: [/.+@.+\..+/, "Provide a valid email address"],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },        
        },
        {timestamps: true})

module.exports = mongoose.model('Product', productSchema)