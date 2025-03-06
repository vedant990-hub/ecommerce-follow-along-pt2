import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Nav from "../components/nav";
import { IoIosAdd } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";
const email = "coco@gmail.com";

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v2/product/product/${id}`);
                setProduct(response.data.product);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching product", err);
                setError(err);
                setLoading(false);
            }
        };
        fetchProduct();
    }, []);

    useEffect(() => {
        if (product?.images?.length > 1) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, []);

    const handleIncrement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecrement = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const addToCart = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/v2/product/cart",
                {
                    userId: email,
                    productId: id,
                    quantity: quantity,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            alert("Product added to cart successfully!");
            console.log("Added to cart:", response.data);
        } catch (err) {
            console.error("Error adding to cart:", err.response?.data || err.message);
            alert("Failed to add product to cart. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-xl text-gray-600">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-xl text-red-600">Error loading product. Please try again later.</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-xl text-gray-600">Product not found</div>
            </div>
        );
    }
    console.log(product.image)
    const currentImage = product.image && product.image.length > 0 
        ? `http://localhost:8000${product.image[currentImageIndex]}`
        : 'https://via.placeholder.com/400';

    return (
        <>
            <Nav />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="md:flex">
                        {/* Image Section */}
                        <div className="md:w-1/2">
                            <div className="relative aspect-square">
                                <img
                                    src={currentImage}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {product.images && product.images.length > 1 && (
                                <div className="flex justify-center gap-2 mt-4 p-4">
                                    {product.images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`w-3 h-3 rounded-full ${
                                                index === currentImageIndex 
                                                    ? 'bg-blue-600' 
                                                    : 'bg-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Details Section */}
                        <div className="md:w-1/2 p-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {product.name}
                            </h1>

                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                    Description
                                </h2>
                                <p className="text-gray-600">
                                    {product.description}
                                </p>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                    Category
                                </h2>
                                <p className="text-gray-600">
                                    {product.category}
                                </p>
                            </div>

                            {product.tags && product.tags.length > 0 && (
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                        Tags
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {product.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                    Price
                                </h2>
                                <p className="text-2xl font-bold text-blue-600">
                                    ${product.price.toFixed(2)}
                                </p>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                    Quantity
                                </h2>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={handleDecrement}
                                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                                    >
                                        <IoIosRemove className="text-xl" />
                                    </button>
                                    <span className="text-xl font-semibold w-12 text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={handleIncrement}
                                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                                    >
                                        <IoIosAdd className="text-xl" />
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={addToCart}
                                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold
                                    hover:bg-blue-700 transition-colors duration-200
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}