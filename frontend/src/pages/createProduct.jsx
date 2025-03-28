import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CreateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState([]);
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [email, setEmail] = useState("");

    const categoriesData = [
        { title: "Electronics" },
        { title: "Clothing" },
        { title: "Books" },
        { title: "Home & Garden" },
    ];

    // Fetch existing product data if editing
    useEffect(() => {
        if (isEdit) {
            axios.get(`http://localhost:8000/api/v2/product/product/${id}`)
                .then((res) => {
                    const p = res.data.product;
                    setName(p.name);
                    setDescription(p.description);
                    setCategory(p.category);
                    setStock(p.stock);
                    setPrice(p.price);
                    setEmail(p.email);
                    setTags(p.tags || []);

                    if (p.images && p.images.length > 0) {
                        setPreviewImages(p.images.map((imgPath) => `http://localhost:8000${imgPath}`));
                    }
                })
                .catch((err) => {
                    console.log("Error fetching product:", err.message);
                });
        }
    }, [id]); // Only run when id changes

    // Handle image selection
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages((prevImages) => prevImages.concat(files));

        const imagePreviews = files.map((file) => URL.createObjectURL(file));
        setPreviewImages((prevPreviews) => prevPreviews.concat(imagePreviews));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("tags", JSON.stringify(tags)); // Convert tags to string
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("email", email);

        images.forEach((image) => {
            formData.append("images", image);
        });

        try {
            if (isEdit) {
                // UPDATE Product
                const res = await axios.put(
                    `http://localhost:8000/api/v2/product/update-product/${id}`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );

                if (res.status === 200) {
                    alert("Product updated successfully");
                    navigate("/product");
                    return;
                }
            } else {
                // CREATE New Product
                const res = await axios.post(
                    "http://localhost:8000/api/v2/product/create-product",
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );

                if (res.status === 201) {
                    alert("Product created successfully");
                    setImages([]);
                    setPreviewImages([]);
                    setName("");
                    setDescription("");
                    setCategory("");
                    setTags([]);
                    setPrice("");
                    setStock("");
                    setEmail("");
                }
            }
        } catch (err) {
            console.log("Error:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-12 flex flex-col justify-center items-center">
            <div className="w-[90%] max-w-[600px] bg-white shadow h-auto rounded-[4px] p-4 mx-auto">
                <h5 className="mt-6 text-center text-3xl font-bold text-gray-900">
                    {isEdit ? "Edit Product" : "Create Product"}
                </h5>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Email <span className="text-red-500">*</span>
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
                        <label className="block text-sm font-medium text-gray-700">
                            Product Name <span className="text-red-500">*</span>
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
                        <label className="block text-sm font-medium text-gray-700">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={description}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter product description"
                            rows={5}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">Select a category</option>
                            {categoriesData.map((category) => (
                                <option key={category.title} value={category.title}>
                                    {category.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Product Images <span className="text-red-500">*</span>
                        </label>
                        <input type="file" multiple onChange={handleImageChange} required />
                        <div className="flex flex-wrap mt-2">
                            {previewImages.map((image, index) => (
                                <img
                                    src={image}
                                    key={index}
                                    alt="Product Preview"
                                    className="w-[100px] h-[100px] object-cover m-2"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="mt-6 flex justify-center">
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                            {isEdit ? "Save Changes" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;