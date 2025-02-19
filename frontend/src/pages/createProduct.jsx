import React, { useState, useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [image, setImage] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [name, setName] = useState('');   
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [email, setEmail] = useState("");

    const categoriesData = [
        { title: "Electronics" },
        { title: "Fashion" },
        { title: "Books" },
        { title: "Home Appliances" }
    ];

    useEffect(() => {
        if (isEdit) {
            axios.get(`http://localhost:8000/api/v2/product/product/${id}`)
                .then((response) => {
                    const p = response.data.product;
                    setName(p.name);
                    setDescription(p.description);
                    setCategory(p.category);
                    setTags(p.tags);
                    setPrice(p.price);
                    setStock(p.stock);
                    setEmail(p.email);

                    if (p.images && p.images.length > 0) {
                        setPreviewImages(
                            p.images.map((imgPath) => `http://localhost:8000${imgPath}`)
                        );
                    }
                })
                .catch((err) => {
                    console.error("Error fetching product:", err);
                });
        }
    }, [id, isEdit]);

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImage((prevImages) => prevImages.concat(files));
        const imagePreviews = files.map((file) => URL.createObjectURL(file));
        setPreviewImages((prevPreviews) => prevPreviews.concat(imagePreviews));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("email", email);
        formData.append("price", price);
        formData.append("tags", tags);
        formData.append("category", category);
        formData.append("stock", stock);

        image.forEach((img) => {
            formData.append("images", img);
        });

        try {
            if (isEdit) {
                const response = await axios.put(
                    `http://localhost:8000/api/v2/product/update-product/${id}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );

                if (response.status === 200) {
                    alert("Product updated successfully");
                    navigate("/my-products");
                }
            } else {
                const response = await axios.post(
                    "http://localhost:8000/api/v2/product/create-product",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    }
                );

                if (response.status === 201) {
                    alert("Product created successfully!");
                    setImage([]);
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
        } catch (err) {
            console.error("Error creating/updating product:", err);
            alert("Failed to save product. Please check the data and try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-12 flex flex-col justify-center items-center sm:px-6 lg:px-8">
            <div className="w-[90%] max-w-[600px] bg-white shadow h-auto rounded-[4px] p-4 mx-auto">
                <h5 className="mt-6 text-center text-3xl font-bold text-gray-900">{isEdit ? "Edit Product" : "Create Product"}</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <label className="block text-sm font-bold text-gray-700">
                            Email <span className="text-sm text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-bold text-gray-700">
                            Name <span className="text-sm text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter product name"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-bold text-gray-700">
                            Description <span className="text-sm text-red-500">*</span>
                        </label>
                        <textarea
                            value={description}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter product's description"
                            rows="5"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-bold text-gray-700">
                            Category <span className="text-sm text-red-500">*</span>
                        </label>
                        <select
                            value={category}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option className="text-gray-200">Choose a Category</option>
                            {categoriesData.map((cat) => (
                                <option value={cat.title} key={cat.title}>
                                    {cat.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-bold text-gray-700">
                            Tags <span className="text-sm text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={tags}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="Enter product's Tags"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-bold text-gray-700">
                            Price <span className="text-sm text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            value={price}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Enter product's price"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-bold text-gray-700">
                            Stock <span className="text-sm text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            value={stock}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setStock(e.target.value)}
                            placeholder="Enter stock quantity"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-bold text-gray-700">
                            Upload Images <span className="text-sm text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            id="upload"
                            className="hidden"
                            onChange={handleImagesChange}
                            multiple
                        />
                        <label htmlFor="upload" className="cursor-pointer p-2">
                            <AiOutlinePlusCircle size={20} color="#555" />
                        </label>
                        <div className="flex flex-wrap items-center justify-center p-2">
                            {previewImages.map((img, index) => (
                                <img
                                    src={img}
                                    key={index}
                                    alt="Preview"
                                    className="object-cover object-center h-24 w-24 m-1 rounded"
                                />
                            ))}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="flex items-center justify-center p-2 bg-pink-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-pink-600 transition w-fit mx-auto"
                    >
                        {isEdit ? "Save Changes" : "Create"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;