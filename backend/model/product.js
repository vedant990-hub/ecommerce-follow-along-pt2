
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Provide the product name"],
            
        },
        description:{
            type: String,
            required: [true, "Provide a description for the product"],
        },
        
        category: {
            type: String,
            required: [true, "Provide the product category"],
        },
        tags: {
            type: [String],
            required: [],
        },
        price: {
            type: Number,
            required: [true, "Provide the product price"],
        },
        stock:{
            type: Number,
            required: [true, "Provide the initial stock of the product"],
        },
        image: {
            type: [String],
            required: [true, "Provide the product image URL"],
        },
        email: {
            type: String,
            required: [true, "Provide the email address of the seller"],
            match: [/.+@.+\..+/, "please provide a valid email address"]
        },
        createdAt:{
            type: Date,
            default: Date.now,
        },

    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Product", productSchema);