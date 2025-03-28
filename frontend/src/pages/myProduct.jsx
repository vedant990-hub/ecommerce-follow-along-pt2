//eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import Product from '../components/products';

export default function MyProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/v2/product/get-products')
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Network response was not ok: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                console.log("📦 API Response:", data);
                if (!data.products) {
                    throw new Error("API response does not contain 'products'");
                }
                setProducts(data.products);
                setLoading(false);
            })
            .catch((err) => {
                console.error("❌ Error fetching products", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className="w-full min-h-screen bg-gray-800 p-6">
            <h1 className="text-3xl text-center text-white py-6">Product List</h1>

            {loading && <p className="text-white text-center">Loading...</p>}
            {error && <p className="text-red-500 text-center">Error: {error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.length > 0 ? (
                    products.map((product) => (
                        <Product key={product._id || product.id} {...product} />
                    ))
                ) : (
                    !loading && !error && (
                        <p className="text-center text-white">No products found.</p>
                    )
                )}
            </div>
        </div>
    );
}

