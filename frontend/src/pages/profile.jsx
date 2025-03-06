import { useEffect, useState } from "react";
import Navbar from "../components/nav.jsx";
import AddressCard from "../components/addresscard.jsx";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const [personalDetails, setPersonalDetails] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        avatarUrl: "",
    });

    const [address, setAddress] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/api/v2/user/profile?email=${'coco@gmail.com'}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('HTTP ERROR');
                }
                return res.json();
            })
            .then((data) => {
                console.log(data.addresses)
                setPersonalDetails(data.user);
                setAddress(data.addresses || []);
            })
            .catch((error) => {
                console.error("Error fetching profile:", error);
            });
    }, []);

    // Fix the avatar URL construction
    const avatarUrl = personalDetails.avatar?.url
        ? `http://localhost:8000${personalDetails.avatar.url}`
        : 'https://via.placeholder.com/150';

    const handleAddAddress = () => {
        navigate('/create-address');
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Personal Details Section */}
                    <div className="p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-8">
                            Personal Details
                        </h1>
                        <div className="flex flex-col md:flex-row gap-10">
                            {/* Profile Picture */}
                            <div className="flex flex-col items-center space-y-4">
                                <h2 className="text-xl font-semibold text-gray-700">Profile Picture</h2>
                                <div className="relative">
                                    <img
                                        src={avatarUrl}
                                        alt="profile"
                                        className="w-40 h-40 rounded-full object-cover shadow-lg ring-4 ring-gray-100"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/150';
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Personal Information */}
                            <div className="flex-1 space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Name</h2>
                                    <p className="text-lg text-gray-600">{personalDetails.name || 'Not provided'}</p>
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Email</h2>
                                    <p className="text-lg text-gray-600">{personalDetails.email || 'Not provided'}</p>
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Phone Number</h2>
                                    <p className="text-lg text-gray-600">{personalDetails.phoneNumber || 'Not provided'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Addresses Section */}
                    <div className="border-t border-gray-200 p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900">Addresses</h1>
                            <button 
                                onClick={handleAddAddress}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold
                                    hover:bg-blue-700 transform hover:scale-105
                                    transition-all duration-200 shadow-md
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Add New Address
                            </button>
                        </div>

                        {address.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-lg">
                                <p className="text-xl text-gray-600">No addresses found</p>
                                <p className="mt-2 text-gray-500">Add a new address to get started</p>
                            </div>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {address.map((addr, index) => (
                                    <AddressCard key={index} {...addr} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}