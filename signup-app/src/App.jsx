import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product'; // Line 7: Ensured path case matches file
import Cart from './pages/Cart';
import Login from './pages/Login';
// import PlaceOrder from './pages/PlaceOrder';
// import Orders from './pages/Orders';
import Collection from './pages/Collection';
import Logout from './COMPONENTS/Logout';

import Navbar from './COMPONENTS/Navbar';
import Footer from './COMPONENTS/Footer';
import SearchBar from './COMPONENTS/SearchBar';
import CheckoutPage from './pages/CheckoutPage';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/checkoutPage' element={<CheckoutPage/>} />
        {/* <Route path='/orders' element={<Orders />} /> */}
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Footer /> 
    </div>
  );
};

export default App;