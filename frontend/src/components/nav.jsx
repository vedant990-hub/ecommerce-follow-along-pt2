import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinkClass = ({ isActive }) =>
        `px-4 py-2 rounded-lg transition-all duration-300 ${
            isActive
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "text-gray-700 hover:bg-blue-50"
        }`;

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg
                                transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <span className="sr-only">Toggle Menu</span>
                            {!isOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <div className="hidden md:flex md:items-center md:space-x-4">
                        <NavLink to="/" end className={navLinkClass}>Home</NavLink>
                        <NavLink to="/myproducts" className={navLinkClass}>My Products</NavLink>
                        <NavLink to="/product" className={navLinkClass}>Add Product</NavLink>
                        <NavLink to="/cart" className={navLinkClass}>Cart</NavLink>
                        <NavLink to="/profile" className={navLinkClass}>Profile</NavLink>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <NavLink to="/" end className={navLinkClass} onClick={() => setIsOpen(false)}>
                            Home
                        </NavLink>
                        <NavLink to="/myproducts" className={navLinkClass} onClick={() => setIsOpen(false)}>
                            My Products
                        </NavLink>
                        <NavLink to="/product" className={navLinkClass} onClick={() => setIsOpen(false)}>
                            Add Product
                        </NavLink>
                        <NavLink to="/cart" className={navLinkClass} onClick={() => setIsOpen(false)}>
                            Cart
                        </NavLink>
                        <NavLink to="/profile" className={navLinkClass} onClick={() => setIsOpen(false)}>
                            Profile
                        </NavLink>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;