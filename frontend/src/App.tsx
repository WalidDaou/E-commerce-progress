import React, { useEffect, useState } from 'react';
import './App.css';
import Register from "./components/Forms/Register";
import Login from "./components/Forms/Login";
import { useCommerceStore } from "./store";
import Review from "./components/Forms/Review";
import AddProduct from "./components/Forms/AddProduct";
import CreateStore from "./components/Forms/CreateStore";
import ProductList from "./components/Products/ProductList";
import Header from "./components/Header";
import FiltersBar from "./components/Filters/FiltersBar";
import { Routes, Route, useLocation, RouteProps, useNavigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import CreateStorePage from "./pages/CreateStorePage";
import MyOrders from "./pages/MyOrders";
import CartModal from "./components/Cart/CartModal";
import AdminApprove from './components/admin/AdminApprove';
import { superAdmins } from '../../backend/shared/constants'

function App() {
  const {
    token,
    setToken,
    showCart,
    setShowCart,
    decodedToken,
    setDecodedToken
  } = useCommerceStore()
  const location = useLocation()
  const [showFilters, setShowFilters] = useState(false)

  const handelLOGOUT = () => {
    if (!token) {
      alert('You are not login ')
      window.location.href = '#auth/login';

    } else {
      alert(`bye bye  ${decodedToken?.user.name}`)
      setToken(''),
      setDecodedToken(null),
      window.location.href = '#auth/login';
    }


  }
  useEffect(() => {
    fetchDecodedToken()
    // setInterval(fetchDecodedToken, 20000);
  }, [])

  const fetchDecodedToken = () => {
    console.log(decodedToken?.user.name)
    alert(decodedToken?.user.email)

  }


  useEffect(() => {
    const pathsToShowFilters = [
      '/home'
    ]
    if (pathsToShowFilters.includes(location.pathname)) {
      setShowFilters(true)
    } else {
      setShowFilters(false)
    }
  }, [location])


  return (
    <div className="App">
      <div className='flex  justify-between items-center px-4 py-2'>
        <a href='#dashboard'>admin</a>
        <button onClick={fetchDecodedToken}>hehehe</button>
        <button type='button' onClick={handelLOGOUT}>LOGOUT</button>
      </div>
      {showCart && <CartModal />}
      {/* {!token &&
        <>
          <Register />
          <br />
          <Login />
        </>
      } */}
      <Header />
      {showFilters && <FiltersBar />}
      {/* <Review />
      
      <AddProduct/>
      
      <CreateStore/> */}
      <Routes>

        <Route path="/dashboard" element={<AdminApprove _id={''} />} />
        <Route path="/home" element={<ProductList />} />
        <Route path="/sell" element={<CreateStorePage />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/auth/*" element={<AuthPage />} />
        <Route path="/*" element={<ProductList />} />
        <Route path='/MyProduct'element={<AddProduct/>} />

      </Routes>

    </div>
  );
}

export default App;
