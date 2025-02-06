const express = require('express')
const Product = require('../model/product');
const User = require('../model/user');
const router = express.Router();
const {pupload} = require('../multer')
const path = require('path')
const validateProductsData = (data) => {
    const errors = [];

    if(!data.name) errors.push("Product name is required");
    if(!data.description) errors.push("Product description is required");
    if(!data.category) errors.push("Product category is required");
    if(!data.price || isNaN(data.price) || data.price <=0) errors.push("Valid price is required");
    if(!data.stock || isNaN(data.stock) || data.stock <=0) errors.push("Valid stock is required");
    if(!data.email) errors.push("Email is required");

    return errors;
};

router.post('/create-product', pupload.array('images',10), async (req, res) => {

    const {name, description, category, tags, price, stock, email} = req.body;
    const images = req.files.map((file) => {
            return `/products/${file.filename}`;
    });

    const validationErrors = validateProductsData({ name, description, category, price, stock, email});
    if(validationErrors.length > 0) {
        return res.status(400).json({errors: validationErrors})
    }

    if(images.length === 0) {
        return res.status(400).json({error: "Atleast one image is required"})
    }

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({error: "Email does not exist in the database"});
        }

        const newProduct = new Product({
            name,
            description,
            category,
            tags,
            price,
            stock,
            email,
            images,
        });

        await newProduct.save();

        res.status(201).json({
            message: "Product created successfully",
            product: newProduct,
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({error: "Server error. Could not create the product"});
    }
});

router.get('/get-products', async (req,res) => {
    try{
        const products = await Product.find();
        // const productWithFULLimageUrl = products.map(product => {
        //     if(product.images && product.images.length > 0) {
        //         product.images = product.images.map((imagePath) => {
        //             return imagePath;
        //         });
        //     }
        //     return product;
        // });
                res.status(200).json({product: products});
            }
            catch(err) {
                console.error('Server error: ',err);
                res.status(500).json({error: 'Server error. Could not fetch products.'})
            }
        });

    router.get('/my-products', async (req,res) => {
        const {email} = req.query;
        try{
            const products=await Product.find({email});
            res.status(200).json({products: products});
        }
        catch(err) {
            console.error('Server error: ',err);
            res.status(500).json({error: 'Server error. Could not fetch products.'})
        }
    });

module.exports = router;