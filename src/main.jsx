import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './components/Shop/Shop';
import Home from './components/Layout/Home';
import Orders from './components/Orders/Orders';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import cartProductsLoader from './loaders/cartProductsLoader';
import Checkout from './components/Checkout/Checkout';
import SignUp from './components/SignUp/SignUp';
import UserContext from './provider/UserContext';
import PrivateRoute from './components/privateRoute/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    children: [
      {
        path: '/',
        element: <Shop></Shop>,
      },
      {
        path: 'orders',
        element: <Orders></Orders>,
        loader: cartProductsLoader
      },
      {
        path: 'inventory',
        element: <PrivateRoute><Inventory></Inventory></PrivateRoute>,
      },
      {
        path:'checkout',
        element: <PrivateRoute><Checkout></Checkout></PrivateRoute>,
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path:'signUp',
        element:<SignUp/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContext>
    <RouterProvider router={router} />
    </UserContext>
  </React.StrictMode>,
)
