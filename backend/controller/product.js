const express = require('express')
const product = require('../model/product');
const User = require('../model/user');
const router = express.Router();
const {pupload} =require("../middleware/multer")


const validateProductsData = (data) => {
    const errors =[];

    if(!data.name) errors.push('Product name is required');
    if(!data.description)  errors.push('Product description if required');
    if(!data.category) errors.push('Product category is required');
    if(!data.price || isNaN(data.price) || data.price<=0) errors.push('Valid product price is required')
    if(!data.stock || isNaN(data.stock) || data.price<=0) errors.push('Valid product stock is required')
    if(!data.email) errors.push('email is required');

    return errors;
    
};

router.post('/create-product', pupload.array('image', 10), async (req,res) =>{
     
    const { name, description, category, price , stock, email, tags } = req.body;
    const image =req.files.map((file) => file.path);

    const ValidatetionErrors = validateProductsData({name , description, category, price, stock, email});
    if(ValidatetionErrors.length > 0) {
        return res.status(400).json({errors: ValidatetionErrors});
    }
    if(image.length === 0){
        return res.status(400).json({errors: 'Product image is required'});
    }
    try{
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({error: 'User not found'});
        }
        const  newProduct = new product({
            name,
            description,
            category,
            price,
            stock,
            email,
            tags,
            image,
        });
        await newProduct.save();
        res.status(200).json({
            message: 'Product created successfully',
            product: newProduct,
        });

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Server error'});
    }
});

module.exports = router;