import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Nav from "../components/nav";
import { IoAdd, IoRemove } from "react-icons/io5";
const email = "v@gmail.com"

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v2/product/product/${id}`);
        console.log("Fetched Product: ", response.data.product);
        setProduct(response.data.product);
      } catch (err) {
        console.error("Error fetching product: ", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);


  const addtocart = async () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  
    try{
      const response = await axios.post("http://localhost:8000/api/v2/product/cart",
        {
          userId: email,
          productId: id,
          quantity: quantity,
        }
      );
      console.log("Added to cart:", response.data);
    }
    catch(err) {
      console.error("Error adding to cart:",err);
    }

};

  if (loading) {
    return <div className="text-center text-gray-600 mt-10">Loading product...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error.message}</div>;
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500 text-xl">No Product Found</div>
      </div>
    );
  }

  // Handlers for quantity update
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <>
      <Nav />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
        <div className="bg-white drop-shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
          
          {/* Image Section */}
          <div className="md:w-1/2 p-4 flex justify-center items-center">
            {product.images && product.images.length > 0 ? (
              <img
                src={`http://localhost:8000${product.images[0]}`}
                alt={product.name}
                className="w-full h-auto max-h-[400px] object-contain rounded-lg"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                No Image Available
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-semibold text-gray-800">{product.name}</h1>

            <div className="mt-4">
              <h2 className="text-lg font-medium text-gray-700">Description</h2>
              <p className="text-gray-600 mt-1">{product.description}</p>
            </div>

            <div className="mt-4">
              <h2 className="text-lg font-medium text-gray-700">Category</h2>
              <p className="text-gray-600 mt-1">{product.category}</p>
            </div>

            {product.tags && product.tags.length > 0 && (
              <div className="mt-4">
                <h2 className="text-lg font-medium text-gray-700">Tags</h2>
                <div className="mt-2 flex flex-wrap">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Price & Quantity */}
            <div className="flex items-center gap-6 mt-6">
              <div>
                <h2 className="text-lg font-medium text-gray-700">Price</h2>
                <p className="text-xl font-bold text-gray-800">${product.price}</p>
              </div>

              {/* Quantity Selector */}
              <div>
                <h2 className="text-lg font-medium text-gray-700">Quantity</h2>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={handleDecrement}
                    className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition"
                  >
                    <IoRemove size={20} />
                  </button>
                  <span className="px-4 py-1 bg-gray-100 rounded-lg text-lg font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition"
                  >
                    <IoAdd size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-6">
              <button className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition transform hover:-translate-y-1"
              onClick = {addtocart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}