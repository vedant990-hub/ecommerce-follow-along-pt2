import {useEffect, useState} from "react";
import Navbar from "../components/nav.jsx";
import AddressCard from "../components/addresscard.jsx";


export default function Profile(){
    const [personalDetails,setPersonalDetails] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        avataruUrl: "",
    });


    const [address, setAddress] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8000/api/v2/user/profile?email=${'a@g.com'}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((res)=>{
                if(!res.ok){
                    throw new Error('HTTP ERROR')
                }
                return res.json()
            })
            .then((data)=>{
                setPersonalDetails(data.user);
                setAddress(data.addresses);
                console.log("User:-",data.user)
                console.log("Address:",data.addresses)
            })
    })

    return(
        <>
            <Navbar />
                <div className="w-full min-h-screen bg-neutral-800 p-5">
                    <div className="w-full h-full bg-neutral-700 rounded-lg">
                        <div className="w-full h-max my-2 p-5">
                            <div className="w-full h-max">
                                <h1 className="text-3xl text-neutral-100">
                                    Personal Details
                                </h1>
                            </div>
                            <div className="w-full h-max flex flex-col sm:flex-row p-5 gap-10">
                                <div className="w-40 h-max flex flex-col justify-center items-center gap-y-3">
                                    <div className="w-full h-max text-2xl text-neutral-100 text-left">
                                        PICTURE
                                    </div>
                                    <img
                                        src={personalDetails.avatarUrl
                                            ? `http://localhost:8000/${personalDetails.avatarUrl}`
                                            : `https://cdn.vectorstock.com/i/500p/17/61/male-avatar-profile-picture-vector-10211761.jpg`}
                                        alt="profile"
                                        className="w-40 h-40 rounded-full"
                                        onError={(e) => {
                                            e.target.onerror = null; // Prevent infinite loop if fallback image fails
                                            e.target.src = `https://cdn.vectorstock.com/i/500p/17/61/male-avatar-profile-picture-vector-10211761.jpg`;
                                        }}
                                    />
                                </div>
                                <div className="h-max md:flex-grow">
                                    <div className="w-full h-max flex flex-col justify-center items-center gap-y-3">
                                        <div className="w-full h-max">
                                            <div className="text-2xl text-neutral-100 text-left">
                                                NAME
                                            </div>
                                            <div className="text-lg font-light text-neutral-100 text-left break-all">
                                                {personalDetails.name}
                                            </div>
                                        </div>
                                        <div className="w-full h-max">
                                            <div className="text-2xl text-neutral-100 text-left">
                                                EMAIL
                                            </div>
                                            <div className="text-lg font-light text-neutral-100 text-left break-all">
                                                {personalDetails.email}
                                            </div>
                                        </div>
                                        <div className="w-full h-max">
                                            <div className="text-2xl text-neutral-100 text-left">
                                                MOBILE
                                            </div>
                                            <div className="text-lg font-light text-neutral-100 text-left break-all">
                                                {personalDetails.phoneNumber}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-max my-2 p-5">
                            <div className="w-full h-max">
                                <h1 className="text-3xl text-neutral-100">
                                    Addresses
                                </h1>
                            </div>
                            <div className="w-full h-max p-5">
                                <button className="w-max px-3 py-2 bg-neutral-600 text-neutral-100 rounded-md text-center hover:bg-neutral-100 hover:text-black transition-all duration-100">
                                    Add Address
                                </button>
                            </div>
                            <div className="w-full h-max flex flex-col gap-5 p-5">
                                {address.length === 0 ? (
                                    <div className="w-full h-max text-neutral-100 font-light text-left">
                                        No Addresses Found
                                    </div>
                                ) : null}
                                {address.map((address, index) => (
                                    <AddressCard key={index} {...address} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </>
    )

}