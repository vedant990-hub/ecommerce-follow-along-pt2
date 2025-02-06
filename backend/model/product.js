const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Provide the product name"],
    },

    description:{
        type: String,
        required:[true, "[Please provide the description of the product"],
    },

    category:{
        type: String,
        required:[true, "[Please provide the product category"],
    },

    tags:{
        type: [String], //array of tags
        default: [],
    },

    price:{
        type: Number,
        required: [true, "Please provide the product price"],
    },

    stock:{
        type: Number,
        require: [true, "Please provide the product stock"],
    },

    images:{
        type: [String],
        required: [true, "Please upload product images"],
    },

    email:{
        type: String,
        required: [true, "Please provide you email id"],
        match: [/.+@.+\..+/, "Please provide a valid email address"],
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