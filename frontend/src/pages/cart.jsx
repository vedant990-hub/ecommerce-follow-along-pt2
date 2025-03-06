import Navbar from "../components/nav.jsx"
import CartProduct from '../components/cartProduct'
import {useEffect, useState} from "react";

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/api/v2/product/cartproducts?email=${'coco@gmail.com'}`)
            .then((res) => {
                if(!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            // console.log(object)
            .then((data) => {
                setProducts(data.cart.map(product => ({
                    quantity: product.quantity,
                    ...product.productId
                })));
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching cart:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const calculateTotal = () => {
        return products.reduce((total, product) => total + (product.price * product.quantity), 0);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
                    Shopping Cart
                </h1>

                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                )}

                {error && (
                    <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg mb-6">
                        Error: {error}
                    </div>
                )}

                <div className="max-w-4xl mx-auto">
                    {!loading && !error && products.length === 0 && (
                        <div className="text-center text-gray-600 py-12 bg-white rounded-lg shadow">
                            Your cart is empty.
                        </div>
                    )}

                    <div className="space-y-4">
                        {products.map(product => (
                            <CartProduct key={product._id} {...product} />
                        ))}
                    </div>

                    {products.length > 0 && (
                        <div className="mt-8 bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-lg font-semibold text-gray-700">Total:</span>
                                <span className="text-2xl font-bold text-blue-600">
                                    ${calculateTotal().toFixed(2)}
                                </span>
                            </div>
                            <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold
                                hover:bg-blue-700 transition-colors duration-200
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                Proceed to Checkout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Cart;