// ProductDetail.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './header';
import Footer from './footer';
import { addToCart } from './authActions';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
}
    from 'mdb-react-ui-kit';
import { NavLink } from 'react-router-dom';

const ProductDetail = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const handleAddToCart = () => {
        const itemToAdd = {
          id: 1, // Replace with the actual item ID
          name: 'Product Name', // Replace with the actual product name
          price: 19.99, // Replace with the actual product price
          // Add more details as needed
        };

        const isItemAvailable = cart.filter(element => {
            return element.id === itemToAdd.id
        });

        if (isItemAvailable && isItemAvailable.length) {
            setTimeout(() => {
                // Show a success toast
              toast.warning('Already item is added!', {
                  position: 'top-right',
                  autoClose: 1000, // Duration in milliseconds
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
              });
              }, 500);
        } else {
            dispatch(addToCart(itemToAdd));
        }
        
        
    }
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const products = [
        { id: 1, price: '$123', image: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(1).webp", name: 'Lorem Ipsum is simply dummy text of the printing and typesetting 1', desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book1` },
        { id: 2, price: '$239', image: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(2).webp", name: 'Lorem Ipsum is simply dummy text of the printing and typesetting 2', desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book2` },
        { id: 3, price: '$147', image: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(3).webp", name: 'Lorem Ipsum is simply dummy text of the printing and typesetting 3', desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book3` },
        { id: 4, price: '$83', image: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(4).webp", name: 'Lorem Ipsum is simply dummy text of the printing and typesetting 4', desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book4` },
        { id: 5, price: '$88', image: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(5).webp", name: 'Lorem Ipsum is simply dummy text of the printing and typesetting 5', desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book5` },
        { id: 6, price: '$58', image: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(6).webp", name: 'Lorem Ipsum is simply dummy text of the printing and typesetting 3', desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book3` },
    ];

    console.log('without effect');
    
    useEffect(() => {
        console.log('use EFFECT');
        const getProducts = JSON.parse(localStorage.getItem('products'));
        getProducts.forEach((element, index )=> {
            element.id = products.length + index + 1;
        });
        const totalProducts = [...products, ...getProducts]
        console.log('total products: ', totalProducts);
        // setProduct(totalProducts);
        totalProducts.map((element) => {
            if (element.id == id) {
                setProduct(element);
            }
        })
    }, [])

    console.log(product);

    return (
        <div>
            <Header />
            {/* <h1>Product Details</h1> */}
            <h1 className="text-center py-5"><strong>Product Details</strong></h1>

            <ul>
                {/* {products.map((item) =>
                    item.id == id ?  setProduct(item) ( */}

                <MDBContainer className="my-5 gradient-form">

                    <MDBRow>

                        <MDBCol col='7' className="mb-5">
                            <div className="d-flex flex-column  justify-content-center  h-100 mb-4">

                                <div className="product-detail-image text-white">
                                    <div className="bg-image hover-zoom ripple shadow-1-strong rounded">
                                        <img src={product.image? product.image: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(1).webp'}
                                            className="w-100 max-height-500" />
                                        {/* <a> */}
                                        <div className="mask" >
                                            <div className="d-flex justify-content-start align-items-start h-100">
                                                {/* <h5><span className="badge bg-light pt-2 ms-3 mt-3 text-dark">$123</span></h5> */}
                                            </div>
                                        </div>
                                        <div className="hover-overlay">
                                            <div className="mask" ></div>
                                        </div>
                                        {/* </a> */}
                                    </div>
                                    {/* <h4 class="mb-4">We are more than just a company</h4>
                                <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p> */}
                                </div>

                            </div>

                        </MDBCol>
                        <MDBCol col='5' className="mb-5">
                            <div className="d-flex flex-column ms-5">

                                <div className="title-product">{product.name}</div>
                                <div className="desc-product">{product.desc}</div>
                                <div className="price-product">{product.price}</div>

                                <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                                    <MDBBtn outline className='mx-2' color='danger' onClick={handleAddToCart}>
                                        {/* <NavLink to="/"> */}
                                        Add to Cart
                                        {/* </NavLink> */}
                                    </MDBBtn>
                                    <MDBBtn outline className='mx-2' color='danger'>
                                        <NavLink to="/">Buy Now</NavLink>
                                    </MDBBtn>
                                </div>

                            </div>

                        </MDBCol>



                    </MDBRow>

                </MDBContainer>
                {/* ) : ''
                )} */}
            </ul>
            <Footer />
        </div>

        // <div> hello
        //     {product.price}
        // </div>
    );
};

export default ProductDetail;
