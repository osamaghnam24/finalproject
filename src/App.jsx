import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Categories from './Components/Categories/Categories'
import Layout from './Components/Layout/Layout'
import NotFound from './Components/NotFound/NotFound'
import { CounterContextProvider } from './Context/counterContext'; // Corrected import
import { useContext } from 'react';
import { UserContext } from './Context/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import WhishList from './Components/WhishList/WhishList';
import { Toaster } from 'react-hot-toast';
import ShippingAddress from './Components/ShippingAddress/ShippingAddress';
import AllOrders from './Components/AllOrders/AllOrders';


function App() {

  let routes = createBrowserRouter([
    { path: '/', element: <Layout />, children: [
      {index:true , element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'Products' , element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:'productdetails/:id' , element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:'Cart' , element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'whishlist' , element:<ProtectedRoute><WhishList/></ProtectedRoute>},
      {path:'Categories' , element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:'allorders' , element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
      {path:'shippingaddress/:cartId' , element:<ProtectedRoute><ShippingAddress/></ProtectedRoute>},
      {path:'Brands' , element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:'Login' , element:<Login/>},
      {path:'Register' , element:<Register/>},
      {path:'*' , element:<NotFound/>},
    ] }
  ])

  let {setUserToken}= useContext(UserContext)
  if (localStorage.getItem('user token')) {
    setUserToken(localStorage.getItem('user token'))
  }

  return <>
  <CounterContextProvider>
  <RouterProvider router={routes}></RouterProvider>
  <Toaster/>
  </CounterContextProvider>
</>
}
export default App;