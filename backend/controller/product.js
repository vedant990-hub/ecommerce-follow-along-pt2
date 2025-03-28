const express = require("express");
const mongoose = require("mongoose");  // ✅ Added mongoose
const path = require("path"); 
const Product = require("../model/product");
const User = require("../model/userModel");  
const { pupload } = require("../middleware/multer");

const router = express.Router();

const validateProductData = (data) => {
    const errors = [];

    if (!data.name) errors.push("Product name is required");
    if (!data.description) errors.push("Product description is required");
    if (!data.category) errors.push("Product category is required");
    if (!data.price) errors.push("Product price is required");
    if (!data.stock) errors.push("Product stock is required");
    if (!data.email) errors.push("Product email is required");

    return errors;
};

// ✅ CREATE PRODUCT
router.post('/create-product', pupload.array('images', 10), async (req, res) => {
    const { name, description, category, tags, price, stock, email } = req.body;
    const images = req.files.map((file) => file.path);

    const validationErrors = validateProductData({ name, description, category, price, stock, email });
    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }

    if (images.length === 0) {
        return res.status(400).json({ errors: "At least one image is required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ errors: "User not found" });
        }

        const newProduct = new Product({
            name, description, category, tags, price, stock, images,
        });
        await newProduct.save();

        res.status(201).json({
            message: "Product created successfully",
            product: newProduct,
        });
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: "Server error" });
    }
});

// ✅ GET PRODUCT BY ID
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ errors: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Server error", error);
        res.status(500).json({ errors: "Server error" });
    }
});

// ✅ UPDATE PRODUCT
router.put('/update-product/:id', pupload.array('images', 10), async (req, res) => {
    const { id } = req.params;
    const { name, description, category, tags, price, stock, email } = req.body;

    try {
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ errors: "Product not found" });
        }
        
        let updatedImages = existingProduct.images;
        if (req.files && req.files.length > 0) {
            updatedImages = req.files.map((file) => `products/${path.basename(file.path)}`);
        }

        const validateErrors = validateProductData({
            name, description, category, price, stock, email
        });

        if (validateErrors.length > 0) {
            return res.status(400).json({ errors: validateErrors });
        }

        Object.assign(existingProduct, { name, description, category, tags, price, stock, email, images: updatedImages });

        await existingProduct.save();

        res.status(200).json({
            message: "Product updated successfully",
            product: existingProduct,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: "Server error" });
    }
});

// ✅ DELETE PRODUCT
router.delete('/delete-product/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ errors: "Product not found" });
        }

        await Product.deleteOne({ _id: id });  // ✅ Fixed deprecated remove() method

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        console.error("Server error", err);
        res.status(500).json({ errors: "Server error" });
    }
});

// ✅ ADD TO CART
router.post('/cart', async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const email = userId;

        if (!email) return res.status(400).json({ message: "Email is required" });

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid productId" });
        }

        if (!quantity || quantity < 1) {
            return res.status(400).json({ message: "Quantity should be more than 1" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const cartItemIndex = user.cart.findIndex(item => item.productId.toString() === productId);

        if (cartItemIndex > -1) {
            user.cart[cartItemIndex].quantity += quantity;
        } else {
            user.cart.push({ productId, quantity });
        }

        await user.save();

        res.status(200).json({ message: "Cart updated successfully" });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ GET CART PRODUCTS
router.get('/cartproducts', async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) return res.status(400).json({ error: "Email query parameter is required" });

        const user = await User.findOne({ email }).populate({
            path: 'cart.productId',
            model: 'Product'
        });

        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({
            message: 'Cart retrieved successfully',
            cart: user.cart
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ UPDATE CART PRODUCT QUANTITY
router.put('/cartproduct/quantity', async (req, res) => {
    const { email, productId, quantity } = req.body;

    if (!email || !productId || quantity === undefined) {
        return res.status(400).json({ error: "Email, productId, and quantity are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ error: "User not found" });

        const cartProduct = user.cart.find(item => item.productId.toString() === productId);

        if (!cartProduct) return res.status(404).json({ error: "Product not found in cart" });

        cartProduct.quantity = quantity;
        await user.save();

        res.status(200).json({ message: "Cart product quantity updated successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
