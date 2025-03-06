import { useState, useEffect } from 'react';
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const CreateProduct = () => {
    const { id } = useParams(); // Fixed missing parentheses
    const navigate = useNavigate(); // Fixed typo in variable name
    const isEdit = Boolean(id);

    const [images, setImages] = useState([]); // Fixed inconsistent state variable name
    const [previewImages, setPreviewImages] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [price, setPrice] = useState(''); // Changed to string for input handling
    const [stock, setStock] = useState(''); // Changed to string for input handling
    const [email, setEmail] = useState('');

    const categoriesData = [
        { title: "Electronics" },
        { title: "Fashion" },
        { title: "Books" },
        { title: "Home Appliances" }
    ];

    useEffect(() => {
        if (isEdit) {
            axios
                .get(`http://localhost:8000/api/v2/product/product/${id}`) // Fixed URL formatting
                .then((response) => {
                    const p = response.data.product;
                    console.log(p)
                    setName(p.name);
                    setDescription(p.description);
                    setCategory(p.category);
                    setTags(p.tags);
                    setPrice(p.price.toString());
                    setStock(p.stock.toString());
                    setEmail(p.email);
                    if (p.images && p.images.length > 0) { // Fixed condition check
                        setPreviewImages(p.images.map((imgPath) => `http://localhost:8000${imgPath}`));
                    }
                })
                .catch((error) => {
                    console.error("Error fetching product", error);
                });
        }
    }, [id, isEdit]);

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImages((prevImages) => prevImages.concat(files)); // Fixed state variable name

        const imagePreviews = files.map((file) => URL.createObjectURL(file));
        setPreviewImages((prevPreviews) => prevPreviews.concat(imagePreviews));
    };

    useEffect(() => {
        return () => {
            previewImages.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [previewImages]); // Added dependency array

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("tags", tags);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("email", email);

        images.forEach((img) => formData.append("images", img)); // Fixed field name

        try {
            if (isEdit) {
                const response = await axios.put(
                    `http://localhost:8000/api/v2/product/update-product/${id}`, // Fixed template string
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );
                if (response.status === 200) { // Fixed comparison operator
                    alert("Product Updated Successfully");
                    navigate("/my-products");
                }
            } else {
                const response = await axios.post(
                    "http://localhost:8000/api/v2/product/create-product", // Fixed API endpoint
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );
                if (response.status === 201) {
                    alert("Product Created Successfully");
                    // Reset form
                    setImages([]);
                    setPreviewImages([]);
                    setName("");
                    setDescription("");
                    setCategory("");
                    setTags("");
                    setPrice("");
                    setStock("");
                    setEmail("");
                }
            }
        } catch (error) {
            console.error("Error creating/updating product", error);
            alert("Error creating/updating product");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-300">
            <div className="w-[90%] max-w-[700px] bg-white shadow-md rounded-3xl p-10 mx-auto my-8 transform transition-all duration-500 hover:shadow-lg hover:scale-[1.02]">
                <h5 className="mb-8 text-center text-3xl font-semibold text-indigo-500 hover:text-indigo-600 transition-colors duration-500">
                    {isEdit ? "Edit Product" : "Create Product"}
                </h5>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Form Fields */}
                    <div className="space-y-2 group">
                        <label className="block text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
                                hover:border-indigo-400 transition-all duration-300
                                bg-white text-gray-800 placeholder-gray-400"
                            required
                        />
                    </div>

                    <div className="space-y-2 group">
                        <label className="block text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter product name"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
                                hover:border-indigo-400 transition-all duration-300
                                bg-white text-gray-800 placeholder-gray-400"
                            required
                        />
                    </div>

                    <div className="space-y-2 group">
                        <label className="block text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter product description"
                            rows="5"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
                                hover:border-indigo-400 transition-all duration-300
                                bg-white text-gray-800 placeholder-gray-400 resize-none"
                            required
                        />
                    </div>

                    <div className="space-y-2 group">
                        <label className="block text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
                                hover:border-indigo-400 transition-all duration-300
                                bg-white text-gray-800"
                            required
                        >
                            <option value="" disabled>
                                Choose a Category
                            </option>
                            {categoriesData.map((i) => (
                                <option value={i.title} key={i.title} className="bg-white">
                                    {i.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2 group">
                        <label className="block text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                            Tags <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="Enter product tags"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
                                hover:border-indigo-400 transition-all duration-300
                                bg-white text-gray-800 placeholder-gray-400"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2 group">
                            <label className="block text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                                Price <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Enter price"
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                                    focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
                                    hover:border-indigo-400 transition-all duration-300
                                    bg-white text-gray-800 placeholder-gray-400"
                                required
                            />
                        </div>
                        <div className="space-y-2 group">
                            <label className="block text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                                Stock <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                placeholder="Enter stock"
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                                    focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
                                    hover:border-indigo-400 transition-all duration-300
                                    bg-white text-gray-800 placeholder-gray-400"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2 group">
                        <label className="block text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                            Upload Images <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            id="upload"
                            className="hidden"
                            onChange={handleImagesChange}
                            multiple
                        />
                        <label
                            htmlFor="upload"
                            className="block w-full text-center p-4 border-2 border-dashed border-gray-400 
                                rounded-lg cursor-pointer bg-white hover:bg-gray-100
                                transition-all duration-300 group hover:scale-[1.02]"
                        >
                            <AiOutlinePlusCircle
                                size={30}
                                className="mx-auto text-indigo-500 group-hover:text-indigo-600 mb-2 transform group-hover:rotate-90 transition-transform duration-500"
                            />
                            <span className="text-indigo-500 group-hover:text-indigo-600 font-medium">
                                Upload Images
                            </span>
                        </label>
                    </div>

                    {previewImages.length > 0 && (
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            {previewImages.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt="Preview"
                                    className="w-full h-24 object-cover rounded-lg shadow-md"
                                />
                            ))}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full p-4 mt-8 text-white text-lg font-semibold
                            bg-gradient-to-r from-indigo-400 to-indigo-600
                            rounded-lg shadow-md hover:shadow-lg
                            transform hover:scale-[1.02]
                            transition-all duration-300
                            focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        {isEdit ? "Save Changes" : "Create Product"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;