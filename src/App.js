// import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import Cart from './components/cart';
import Contact from './components/contact';
// import Navigatoin from './components/navigatoin';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Register from './components/register';
import Home from './components/home';
import ProductDetail from './components/productdetails';
import AddProduct from './components/addproduct';
import AddProduct2 from './components/addproduct2';
import AddProduct3 from './components/addproduct3';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
// import store from './components/store';



function App() {
  const user = useSelector((state) => state);
  return (
    // <Provider store={store}>
      <BrowserRouter>
      <ToastContainer />
        {console.log(user)}
        {/* <div className="container"> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            {/* <Route path="addproduct" element={<AddProduct />} />
            <Route path="addproduct2" element={<AddProduct2 />} /> */}
            <Route path="addproduct" element={<AddProduct3 />} />
            <Route path="/productDetails/:id" element={<ProductDetail />} />
          </Routes>
        {/* </div> */}

      </BrowserRouter>
    // </Provider>
    
  );
}

export default App;
