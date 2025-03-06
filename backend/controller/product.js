const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const User = require('../model/user');
const { pupload } = require('../multer');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const { isAuthenticated } = require('../middleware/auth');

// Validation helper
const validateProductData = (data) => {
    const errors = [];
    if (!data.name) errors.push("Please enter the product name!");
    if (!data.description) errors.push("Please enter the product description!");
    if (!data.category) errors.push("Please enter the product category!");
    if (!data.price || isNaN(data.price) || data.price <= 0) errors.push("Please enter a valid price!");
    if (!data.stock || isNaN(data.stock) || data.stock <= 0) errors.push("Please enter valid stock!");
    if (!data.email) errors.push("Please enter a valid email address!");
    return errors;
};

// Create product
router.post('/create-product', pupload.array('images', 10), catchAsyncErrors(async (req, res) => {
    const { name, description, category, tags, price, stock, email } = req.body;
    
    const image = req.files.map(file => `/products/${file.filename}`);
    
    const validationErrors = validateProductData({ name, description, category, tags, price, stock, email });
    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ error: "User not found!" });
    }

    const product = await Product.create({
        name,
        description,
        category,
        tags,
        price,
        stock,
        email,
        image,
        user: user._id
    });

    res.status(201).json({
        success: true,
        product
    });
}));

// Get all products
router.get('/get-products', catchAsyncErrors(async (req, res) => {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        products
    });
}));

// Get user's products
router.get('/my-products', catchAsyncErrors(async (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ error: "Email is required!" });
    }
    
    const products = await Product.find({ email }).sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        products
    });
}));

// Get single product
router.get('/product/:id', catchAsyncErrors(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ error: "Product not found!" });
    }
    
    res.status(200).json({
        success: true,
        product
    });
}));

// Update product
router.put('/update-product/:id', pupload.array('images', 10), catchAsyncErrors(async (req, res) => {
    const { name, description, category, tags, price, stock, email } = req.body;
    
    let product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ error: "Product not found!" });
    }

    if (req.files && req.files.length > 0) {
        const image = req.files.map(file => `/products/${file.filename}`);
        product.image = image;
    }

    product.name = name;
    product.description = description;
    product.category = category;
    product.tags = tags;
    product.price = price;
    product.stock = stock;
    product.email = email;

    await product.save();

    res.status(200).json({
        success: true,
        product
    });
}));

// Delete product
router.delete('/delete-product/:id', catchAsyncErrors(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ error: "Product not found!" });
    }

    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: "Product deleted successfully!"
    });
}));

// Get cart products
router.get('/cartproducts', catchAsyncErrors(async (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ error: "Email is required!" });
    }

    const user = await User.findOne({ email }).populate('cart.productId');
    if (!user) {
        return res.status(404).json({ error: "User not found!" });
    }

    res.status(200).json({
        success: true,
        cart: user.cart
    });
}));

// Add to cart
router.post('/cart', catchAsyncErrors(async (req, res) => {
    const { userId, productId, quantity } = req.body;
    
    const user = await User.findOne({ email: userId });
    if (!user) {
        return res.status(404).json({ error: "User not found!" });
    }

    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ error: "Product not found!" });
    }

    const cartItemIndex = user.cart.findIndex(
        item => item.productId.toString() === productId
    );

    if (cartItemIndex > -1) {
        user.cart[cartItemIndex].quantity += quantity;
    } else {
        user.cart.push({ productId, quantity });
    }

    await user.save();
    res.status(200).json({
        success: true,
        message: "Product added to cart successfully!",
        cart: user.cart
    });
}));

// Update cart product quantity
router.put('/cartproduct/quantity', catchAsyncErrors(async (req, res) => {
    const { email, productId, quantity } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ error: "User not found!" });
    }

    const cartItemIndex = user.cart.findIndex(
        item => item.productId.toString() === productId
    );

    if (cartItemIndex === -1) {
        return res.status(404).json({ error: "Product not found in cart!" });
    }

    user.cart[cartItemIndex].quantity = quantity;
    await user.save();

    res.status(200).json({
        success: true,
        message: "Cart updated successfully!",
        cart: user.cart
    });
}));

module.exports = router;