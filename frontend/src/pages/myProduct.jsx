import React, { useEffect, useState } from 'react';
import MyProduct from '../components/myProducts';
import Nav from '../components/Nav';

export default function MyProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const email = "coco@gmail.com"; 

    useEffect(() => {
        fetch(`http://localhost:8000/api/v2/product/my-products?email=${email}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Network response was not ok: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                if (!data.products) {
                    throw new Error("API response does not contain 'products'");
                }
                setProducts(data.products);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <Nav />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
                    My Products
                </h1>

                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                )}

                {error && (
                    <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg">
                        Error: {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {!loading && !error && products.length === 0 && (
                        <div className="col-span-full text-center text-gray-600 py-12">
                            No products found.
                        </div>
                    )}
                    
                    {products.map((product) => (
                        <MyProduct key={product._id} {...product} />
                    ))}
                </div>
            </div>
        </div>
    );
}