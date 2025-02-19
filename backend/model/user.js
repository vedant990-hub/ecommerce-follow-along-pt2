const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        unique: true, // Ensures email uniqueness
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"],
        minlength: [4, "Password should be greater than 4 characters"],
        select: false, // Exclude password from query results by default
    },
    phoneNumber: {
        type: Number,
    },
    addresses: [
        {
            country: {
                type: String,
            },
            city: {
                type: String,
            },
            address1: {
                type: String,
            },
            address2: {
                type: String,
            },
            zipCode: {
                type: Number,
            },
            addressType: {
                type: String,
            },
        },
    ],
    role: {
        type: String,
        default: "user",
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    cart: [
            {
                    productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Product",
                        required: true,
                    },
                    quantity: {
                        type: Number,
                        required: true,
                        min: [1, "Quantity cannot be less than 1"],
                        default:1,
                    },
                },
            ],
    createdAt: {
        type: Date, // Fixed typo from `DataTransfer` to `Date`
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
});

// Hash password before saving user
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Generate JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};



module.exports = mongoose.model("User", userSchema);