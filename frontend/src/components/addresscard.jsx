import PropTypes from "prop-types";

export default function AddressCard({
    country,
    city,
    address1,
    address2,
    zipCode,
    addressType,
}) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {addressType}
                    </span>
                </div>

                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Country</h3>
                        <p className="mt-1 text-lg text-gray-900">{country}</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-500">City</h3>
                        <p className="mt-1 text-lg text-gray-900">{city}</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Address Line 1</h3>
                        <p className="mt-1 text-lg text-gray-900">{address1}</p>
                    </div>

                    {address2 && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Address Line 2</h3>
                            <p className="mt-1 text-lg text-gray-900">{address2}</p>
                        </div>
                    )}

                    <div>
                        <h3 className="text-sm font-medium text-gray-500">ZIP Code</h3>
                        <p className="mt-1 text-lg text-gray-900">{zipCode}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

AddressCard.propTypes = {
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    address1: PropTypes.string.isRequired,
    address2: PropTypes.string,
    zipCode: PropTypes.number.isRequired,
    addressType: PropTypes.string.isRequired,
};