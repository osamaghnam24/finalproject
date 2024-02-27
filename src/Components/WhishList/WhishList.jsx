import React, { useContext, useEffect, useState } from 'react';
import styles from './WhishList.module.css';
import { WhishListContex } from '../../Context/WhishListContext';
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios';
import { Helmet } from 'react-helmet';
export default function WhishList() {
   let {getWhishListItems}= useContext(WhishListContex);
  // async function addToWhishList(productId) { 
  //   return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` ,{ // send to API
  //      productId
  //   },{
  //       headers
  //   })
  //      .then((response)=>response)
  //      .catch((err)=>err)
       
  //  }
  const [whishList, setWhishList] = useState([])
  console.log(whishList);
  
  async function getWhish() {


    let {data}=await getWhishListItems()
    setWhishList(data)
    setLoading(false)

   }
   useEffect(()=>{
    getWhish()
   },[])

   const [wishlistItems, setWishlistItems] = useState([]);
   const [loading, setLoading] = useState(true);
 
   useEffect(() => {
    async function fetchWishlist() {
      try {
        let headers={
          token : localStorage.getItem('user token') /// Authorization Bearer
      }
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Y2JkMjA3ODQ2MmFiMDJjNzIwNzViZCIsIm5hbWUiOiJvc2FtYSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA4Nzk1MDg3LCJleHAiOjE3MTY1NzEwODd9._Gjh0-v8jySHwygRSHWK3Z8tUZz7BjYqqi1IyMR1jVg'; // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
          headers

        });
        setWishlistItems(response.data.data); // Assuming 'data' is the array of wishlist items
        setLoading(false);
        console.log(wishlistItems);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        setLoading(false);
      }
    }

    fetchWishlist();
  }, []);
  const handleDeleteItem = async (itemId) => {
    try {
         let headers={
          token : localStorage.getItem('user token') /// Authorization Bearer
      }
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${itemId}`, {
        headers
      });
      // Remove the deleted item from the wishlistItems state
      setWishlistItems(wishlistItems.filter(item => item._id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
   return (
    <div>
<div className="title text-center fw-bold py-5 text-main ">
    <h1 className='fw-bold'>Wish List</h1>
    </div>      <div className="bg-main-light p-2 mt-5">

      {loading?<div className="loading"> 
      <ThreeDots
     visible={true}
     height="100"
     width="100"
     color="#4fa94d"
     radius="9"
     ariaLabel="three-dots-loading"
     wrapperStyle={{}}
     wrapperClass=" d-flex justify-content-center mt-5"
 />
  </div> : (
    
        <ul>
          <Helmet>
                <meta charSet="utf-8" />
                <title>Wish List Shop</title>
            </Helmet>
          {wishlistItems.map((item) => (
            <div key={item._id} className='row p-2 m-0 border-1 bottom d-flex justify-content-center align-items-center'>
              {/* Render wishlist item properties */}
              <div className="col-md-2">
                    <div className="img">
                    <img src={item.imageCover} width={100} alt={item.brand.name} />
                    </div>
                  </div>
                  
                  <div className="col-md-10">
                    <div className="item ">
                      <h3 className='h5 fw-bold'>{item.brand.name.split(' ').splice(0,3).join(' ')}</h3>
                      <p className='text-main fw-bold'>Ratings Quantity : {item.ratingsQuantity}</p>
                      <button onClick={() => handleDeleteItem(item._id)} className='btn'><i className='fas fa-trash-can text-danger'></i> Delete</button>
                    </div>
                  </div>
              {/* <h1>Name:{item.brand.name}</h1>
              <p>Sold: {item.sold}</p>
              <p>Ratings Quantity: {item.ratingsQuantity}</p> */}
              {/* <img src={item.imageCover} alt={item.brand.name} srcset="" /> */}
              {/* Add more properties as needed */}
              {/* <button onClick={() => handleDeleteItem(item._id)}>Delete</button> */}
            </div>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
}


