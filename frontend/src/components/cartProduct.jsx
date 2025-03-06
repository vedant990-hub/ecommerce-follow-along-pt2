import {IoIosAdd, IoIosRemove} from 'react-icons/io'
import {useEffect, useState} from "react";
import PropTypes from "prop-types";

export default function CartProduct({_id, name, image, quantity, price}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quantityVal, setQuantityVal] = useState(quantity);

    useEffect(() => {
        if (!image || image.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % image.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [image]);

    const handleIncrement = () => {
        const newQuantityVal = quantityVal + 1;
        setQuantityVal(newQuantityVal);
        updateQuantityVal(newQuantityVal);
    };

    const handleDecrement = () => {
        const newQuantityVal = quantityVal > 1 ? quantityVal - 1 : 1;
        setQuantityVal(newQuantityVal);
        updateQuantityVal(newQuantityVal);
    };

    const updateQuantityVal = (quantity) => {
        fetch('http://localhost:8000/api/v2/product/cartproduct/quantity', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'coco@gmail.com',
                productId: _id,
                quantity
            })
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error`);
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log('Error', err);
            });
    };

    const currentImage = image && image.length > 0 ? image[currentIndex] : null;
    const imageUrl = currentImage ? `http://localhost:8000${currentImage}` : 'https://via.placeholder.com/400';

    return (
        <div className="group bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center p-4 gap-4">
                {/* Image Container */}
                <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/400';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Product Details */}
                <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {name}
                    </h3>
                    
                    {/* Price and Quantity Controls */}
                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="text-xl font-bold text-blue-600">
                            ${(price * quantityVal).toFixed(2)}
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleDecrement}
                                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all duration-200"
                            >
                                <IoIosRemove className="text-xl text-gray-600" />
                            </button>
                            <span className="w-12 text-center font-semibold text-gray-900">
                                {quantityVal}
                            </span>
                            <button
                                onClick={handleIncrement}
                                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all duration-200"
                            >
                                <IoIosAdd className="text-xl text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

CartProduct.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.arrayOf(PropTypes.string),
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
};