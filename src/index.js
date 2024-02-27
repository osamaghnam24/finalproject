import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import UserContextProvider, { UserContext } from './Context/UserContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider } from 'react-query';
import CartContextProvider from './Context/CartContext';
import {ReactQueryDevtools} from 'react-query/devtools'
import WhishListContexProvider from './Context/WhishListContext';

let queryClient=new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WhishListContexProvider>
    <CartContextProvider>
        <UserContextProvider>
            <QueryClientProvider client={queryClient}>
                 <App />  
                <ReactQueryDevtools/>
            </QueryClientProvider>
        </UserContextProvider>
    </CartContextProvider>
  </WhishListContexProvider>
  
        
   
    
);
export default App;
// App.jsx
// import React from 'react';
// import QueryClientProvider from './QueryClientProvider'; // Assuming this is where you use QueryClientProvider
// import UserContextProvider from './UserContextProvider'; // Assuming this is where you use UserContextProvider
// import CartContextProvider from './CartContextProvider'; // Assuming this is where you use CartContextProvider
// import WhishListContexProvider from './WhishListContexProvider'; // Assuming this is where you use WhishListContexProvider

// function App() {
//   return (
//     <WhishListContexProvider>
//      <CartContextProvider>
//          <UserContextProvider>
//              <QueryClientProvider client={queryClient}>
//                   <App />  
//                  <ReactQueryDevtools/>
//              </QueryClientProvider>
//          </UserContextProvider>
//      </CartContextProvider>
//    </WhishListContexProvider>
//   );
// }



