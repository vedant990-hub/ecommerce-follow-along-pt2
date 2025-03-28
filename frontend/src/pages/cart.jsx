import Navbar from "../components/nav.jsx"
import CartProduct from '../components/cartProduct'
import {useEffect, useState} from "react";

const Cart = () => {

    const [product,setProduct]=useState([])

    useEffect(() => {
        fetch(`http://localhost:8000/api/v2/cartproducts?email=${'a@gmail.com'}`)
            .then((res)=>{
                if(!res.ok){
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json()
            })
            .then((data)=>{
                setProduct(data.cart.map(product=>({quantity:product['quantity'],...product['productId']})))
            })


    }, []);

    return (
        <>
        <Navbar />
            <div>
                <div className='w-full h-full justify-center items-center flex'>
                    <div className='w-full md:w-4/5 lg:w-4/6 2xl:w-2/3 h-full border-l border-r border-neutral-300 flex flex-col'>
                        <div className='w-full md:w-4/5 lg:w-4/6'>
                        <h1 className='text-2xl font-semibold text-gray-900'>CART</h1>
                    </div>
                    <div className='w-full flex-grow overflow-auto px-3 py-2 gap-y-2'>
                        {
                            product.map(product=>{
                                <CartProduct key={product._id}{...product}/>
                            })
                        }
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Cart;