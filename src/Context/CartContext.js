import axios from "axios";
import { createContext } from "react";


export let CartContext= createContext();

export default function CartContextProvider(props){

    let headers={
        token : localStorage.getItem('user token') /// Authorization Bearer
    }
   async function checkOutSession(cartId , shippingAddress) { 
     return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000` ,
     { 
     shippingAddress
     },{
         headers
     })
        .then((response)=>response)
        .catch((err)=>err)
        
    }
   async function addToCart(productId) { 
     return axios.post(`https://ecommerce.routemisr.com/api/v1/cart` ,{ // send to API
        productId
     },{
         headers
     })
        .then((response)=>response)
        .catch((err)=>err)
        
    }
   async function getCartItems() { 
     return axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {  // send to API,
         headers
     })
        .then((response)=>response)
        .catch((err)=>err)
    }
   async function deleteCartItems(productId) { 
     return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {  // delete,
         headers
     })
        .then((response)=>response)
        .catch((err)=>err)
    }
   async function updateCartItems(productId , count) { 
     return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , 
     {
        count
     }, {  // delete,
         headers
     })
        .then((response)=>response)
        .catch((err)=>err)
    }
    return<CartContext.Provider value={{addToCart , getCartItems , deleteCartItems , updateCartItems ,checkOutSession}}>
        {props.children}
    </CartContext.Provider>
}
