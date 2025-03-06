import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/nav';
import { useNavigate } from 'react-router-dom';

function CreateAddress() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        country: "",
        city: "",
        address1: "",
        address2: "",
        zipcode: 0,
        addresstype: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const addressData = {
            ...formData,
            email: "coco@gmail.com"
        };

        try {
            const res = await axios.post(
                "http://localhost:8000/api/v2/user/add-address",
                addressData,
                {
                    headers: { "Content-Type": "application/json" }
                }
            );

            if (res.status === 201) {
                alert("Address added successfully");
                navigate("/profile");
            }
        } catch (err) {
            console.error(err.message);
            alert("Failed to add address");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                        Add New Address
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter country"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter city"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Address Line 1
                            </label>
                            <input
                                type="text"
                                name="address1"
                                value={formData.address1}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter address line 1"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Address Line 2 (Optional)
                            </label>
                            <input
                                type="text"
                                name="address2"
                                value={formData.address2}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter address line 2"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    ZIP Code
                                </label>
                                <input
                                    type="number"
                                    name="zipcode"
                                    value={formData.zipcode}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter ZIP code"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Address Type
                                </label>
                                <select
                                    name="addresstype"
                                    value={formData.addresstype}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Select type</option>
                                    <option value="Home">Home</option>
                                    <option value="Work">Work</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => navigate('/profile')}
                                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold
                                    hover:bg-gray-50 transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold
                                    hover:bg-blue-700 transform hover:scale-105
                                    transition-all duration-200 shadow-md"
                            >
                                Add Address
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateAddress;