import React, { useContext } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Nav from './components/Nav'
import { userDataContext } from './context/UserContext'
import About from './pages/About'
import Collection from './pages/Collection'
import Product from './pages/Product'
import Contact from './pages/Contact'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Placeholder from './pages/Placeholder'
import Order from './pages/Order'
import { ToastContainer, toast } from 'react-toastify';
import NotFound from './pages/NotFound'
import Ai from './components/Ai'


const App = () => {
  const {userData}=useContext(userDataContext)
  
  let location=useLocation();


  return (
    <>
    <ToastContainer />
    {userData && <Nav/>}
    <Routes>

      <Route path='/signup' element={userData?(<Navigate to={location.state?.from || "/"}/>)
        :(<Signup/>)
       }/>

      <Route path='/login'
       element={userData?(<Navigate to={location.state?.from || "/"}/>)
        :(<Login/>)
       }/>

       <Route path='/' element={userData?<Home/> : <Navigate to="/login" state={{from:location.pathname}}/>}/>

      <Route path='/about' element={userData?<About/> : <Navigate to="/login" state={{from:location.pathname}}/>}/>

      <Route path='/collection' element={userData?<Collection/> : <Navigate to="/login" state={{from:location.pathname}}/>}/>

      <Route path='/product' element={userData?<Product/> : <Navigate to="/login" state={{from:location.pathname}}/>}/>

      <Route path='/contact' element={userData?<Contact/> : <Navigate to="/login" state={{from:location.pathname}}/>}/>

      <Route path='/productdetail/:productId' element={userData?<ProductDetails/> : <Navigate to="/login" state={{from:location.pathname}}/>}/>

      <Route path='/cart' element={userData?<Cart/> : <Navigate to="/login" state={{from:location.pathname}}/>}/>

      <Route path='/placeorder' element={userData?<Placeholder/> : <Navigate to="/login" state={{from:location.pathname}}/>}/>

      <Route path='/order' element={userData?<Order/> : <Navigate to="/login" state={{from:location.pathname}}/>}/>

      <Route path='*' element={<NotFound/>}/>

    </Routes>

    <Ai/>
    </>
  )
}

export default App
