import axios from "axios";
import { createContext } from "react";


export let WhishListContex= createContext();

export function WhishListContexProvider(props){
    

    let headers={
        token : localStorage.getItem('user token') /// Authorization Bearer
    }
   async function addToWhishList(productId) { 
     return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` ,{ // send to API
        productId
     },{
         headers
     })
        .then((response)=>response)
        .catch((err)=>err)
        
    }
   async function getWhishListItems(productId) { 
     return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` ,{
         headers
     })
        .then((response)=>response)
        .catch((err)=>err)
        
    }
    return<WhishListContex.Provider value={{addToWhishList , getWhishListItems}}>
        {props.children}
    </WhishListContex.Provider>
}
export default WhishListContexProvider;