// eslint-disable-next-line
import {IoIosAdd,IoIosRemove} from 'react-icons/io'
import {useEffect, useState} from "react";
import PropTypes from "prop-types";

export default function cartProducts({_id,name,images,quantity,price}){

    const [currentIndex,setCurrentIndex] = useState(0);
    const [quantityVal,setQuantityVal] = useState(quantity);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
        if(!images || !images.length===0)return;
        const interval=setInterval(() => {
            setCurrentIndex((prevIndex) =>(prevIndex + 1)%images.length)
        },2000)
    },[images])

    const handleIncrement=()=>{
        const newQuantityVal=quantityVal+1
        setQuantityVal(newQuantityVal)
        updateQuantityVal(newQuantityVal)
    }

    const handleDecrement=()=>{
        const newQuantityVal=quantityVal>1?quantityVal-1:1
        setQuantityVal(newQuantityVal)
        updateQuantityVal(newQuantityVal)
    }

    const updateQuantityVal=(quantity)=>{
        fetch('http://localhost:8000/api/v2/product/cartproduct/quantity',{
            method:'PUT',
            header:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email:'a@gmail.com',
                productId:_id,
                quantity
            })
        })
            .then((res)=>{
                if(!res.ok){
                    throw new Error(`HTTP error`)
                }
                return res.json()
            })
            .then((data)=>{
                console.log(data)
            })
            .catch((err)=>{
                console.log('Error',err)
            })
    }


    const currentImage=images[currentIndex]
    return (
        <div className="h-max w-full p-4 flex justify-between border-b border-neutral-300 bg-neutral-100 rounded-lg">
            <div className="flex flex-col gap-y-2">
                <img
                    src={`http://localhost:8000${currentImage}`} // Ensure the URL is correct\
                    alt={name}
                    className="w-32 h-32 object-cover rounded-lg border border-neutral-300"
                />
                <div className="flex flex-row items-center gap-x-2 md:hidden">
                    <div
                        onClick={handleIncrement}
                        className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:translate-y-1 p-2 rounded-xl cursor-pointer"
                    >
                        <IoIosAdd />
                    </div>
                    <div className="px-5 py-1 text-center bg-gray-100 rounded-xl pointer-events-none">
                        {quantityVal}
                    </div>
                    <div
                        onClick={handleDecrement}
                        className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:translate-y-1 p-2 rounded-xl cursor-pointer"
                    >
                        <IoIosRemove />
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col justify-start items-start md:flex-row md:justify-between md:items-center px-4">
                <p className="text-lg font-semibold">{name}</p>
                <p className="text-lg font-semibold">${price*quantityVal}</p>
                <div className="hidden md:flex flex-row items-center gap-x-2 ">
                    <div
                        onClick={handleIncrement}
                        className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:translate-y-1 p-2 rounded-xl cursor-pointer"
                    >
                        <IoIosAdd />
                    </div>
                    <div className="px-5 py-1 text-center bg-gray-100 rounded-xl pointer-events-none">
                        {quantityVal}
                    </div>
                    <div
                        onClick={handleDecrement}
                        className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:translate-y-1 p-2 rounded-xl cursor-pointer"
                    >
                        <IoIosRemove />
                    </div>
                </div>
            </div>

        </div>
    );
}

cartProducts.Proptypes = {
    _id: PropTypes.string.isRequired,
    name:PropTypes.string.isRequired,
    images:PropTypes.arrayOf(PropTypes.string),
    quantity:PropTypes.number.isRequired,
    price:PropTypes.number.isRequired,
}