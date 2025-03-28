//eslint-disable-next-line
import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';
import axios from 'axios'; // Missing import

export default function MyProduct({ _id, name, image, description, price }) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (!image || image.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % image.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [image]);

    const currentImage = image.length > 0 ? image[currentIndex] : null;

    const handleEdit = () => {
        navigate(`/product/${_id}`);
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/v2/product/delete-product/${_id}`
            );
            if (response.status === 200) {
                alert("Product deleted successfully");
                window.location.reload();
            }
        } catch (err) {
            console.error("Product deletion error", err);
        }
    }

    return (
        <div className="bg-neutral-200 p-4 rounded-lg shadow-md flex flex-col justify-between">
            <div className="w-full">
                {currentImage && (
                    <img 
                        src={`http://localhost:8000/${currentImage}`}
                        alt={name}
                        className="w-full h-56 object-cover rounded-lg mb-2"
                    />
                )}
                <h2 className="text-lg font-bold">{name}</h2>
                <p className="text-sm opacity-50 line-clamp-2">{description}</p>
            </div>
            <div className="w-full">
                <p className="text-lg font-bold my-2">${price.toFixed(2)}</p>
                <button 
                    className="w-full text-white px-4 py-2 rounded-md bg-neutral-900"
                    onClick={handleEdit}
                >
                    Edit
                </button>
                <button 
                    className="w-full text-white px-4 py-2 rounded-md bg-red-600 mt-2"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

MyProduct.propTypes = {
    _id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    image: propTypes.array.isRequired, // Change to array
    description: propTypes.string.isRequired,
    price: propTypes.number.isRequired
};
