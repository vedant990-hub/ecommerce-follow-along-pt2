const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the product name!"],
    },
    description: {
        type: String,
        required: [true, "Please enter a product description!"],
    },
    category: {
        type: String,
        required: [true, "Please select a product category!"],
    },
    tags: {
        type: [String],
        required: [true, "Please enter product tags!"],
    },
    price: {
        type: Number,
        required: [true, "Please enter the product price!"],
    },
    stock: {
        type: Number,
        required: [true, "Please enter the product stock!"],
    },
    image: {
        type: [String],
        required: [true, "Please upload product images!"],
    },
    email: {
        type: String,
        required: [true, "Please enter the product owner's email!"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address!"]

    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },


},
    {
        timestamps: true,
    });

module.exports = mongoose.model("Product", productSchema);