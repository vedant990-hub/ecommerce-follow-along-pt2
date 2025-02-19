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

    cart: [
            {
                    productId: {
                        type: String,
                        ref: "Product",
                        required: true,
                        unique: true,
                    },
                    quantity: {
                        type: Number,
                        required: true,
                        min: [0, "Quantity cannot be less than 1"],
                    },
                },
            ],
        },

{
    timestamps: true,
}
);

module.exports = mongoose.model("Product", productSchema);