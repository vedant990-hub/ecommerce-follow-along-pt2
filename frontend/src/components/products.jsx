//eslint-disable-next-line

import React, {useState, useEffect} from "react";
import Proptypes from "prop-types";

export default function Product({name, images, description, price}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        if(!images || images.length === 0) return;
        const interval = setInterval (() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [images]);

    const currentImage = images.length > 0 ?images[currentIndex]: null;

    return (
        <div className="bg-neutral-200 p-4 rounded-lg shadow-md flex flex-col justify-between">
            <div className="w-full">
                <img 
                src={`http://localhost:8000${currentImage}`}
                alt={name}
                className="w-full h-56 object-cover rounded-lg mb-2"/>

                <h2 className="text-lg font-bold">{name}</h2>
                <p className="text-sm opacity-50 line-clamp-2">{description}</p>

            </div>

            <div className="w-full">
                <p className="text-lg font-bold my-2">${price.toFixed(2)}</p>
                <button className="w-full text-white px-4 py-2 rounded-md bg-neutral-900">
                    More info
                </button>
            </div>
        </div>
    );
}

Product.Proptypes = {
    name: Proptypes.string.isRequired,
    image: Proptypes.arrayOf(Proptypes.string).isRequired,
    description: Proptypes.string.isRequired,
    price: Proptypes.number.isRequired,
}