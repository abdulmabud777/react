import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';


const Listing = () => {
    var totalProducts = [];
    // const [activeProducts, setActiveProduct] = useState();
    const [data, setData] = useState([]);
    const products = [
        { id: 1, price: '$123', image: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(1).webp", name: 'Lorem Ipsum is simply dummy text of the printing and typesetting 1', description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book1` },
        { id: 2, price: '$239', image: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(2).webp", name: 'Lorem Ipsum is simply dummy text of the printing and typesetting 2', description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book2` },
        { id: 3, price: '$147', image: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(3).webp", name: 'Lorem Ipsum is simply dummy text of the printing and typesetting 3', description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book3` },
        { id: 4, price: '$83', image: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(4).webp", name: 'Lorem Ipsum is simply dummy text of the printing and typesetting 4', description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book4` },
        { id: 5, price: '$88', image: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(5).webp", name: 'Lorem Ipsum is simply dummy text of the printing and typesetting 5', description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book5` },
        { id: 6, price: '$58', image: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(6).webp", name: 'Lorem Ipsum is simply dummy text of the printing and typesetting 3', description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book3` },
    ];

    useEffect(() => {
        console.log('use EFFECT');
        const getProducts = async()=> {
            localStorage.setItem('products', JSON.stringify(products))
            const productFromLocal =  await JSON.parse(localStorage.getItem('products')) || [];
            console.log(`products from local ${productFromLocal}`);
            // productFromLocal.forEach((element, index )=> {
            //     element.id = products.length + index + 1;
            // });
            // const totalProducts = [...products, ...productFromLocal]
            const totalProducts = [...productFromLocal]
            console.log('total products: ', totalProducts);
            const htmlElement = totalProducts.map((element, index) =>
            (
                <div className="col-lg-4 col-md-12 mb-4" key={index}>
                    <NavLink to={`/productDetails/${element.id}`}>
                        <div className="bg-image hover-zoom ripple shadow-1-strong rounded">
                            <img src={element.image? element.image: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(1).webp'}
                                className="w-100 product-image" />
                            {/* <a> */}
                            <div className="mask" >
                                <div className="d-flex justify-content-start align-items-start h-100">
                                    <h5><span className="badge bg-light pt-2 ms-3 mt-3 text-dark">{element.price}</span></h5>
                                </div>
                            </div>
                            <div className="hover-overlay">
                                <div className="mask" ></div>
                            </div>
                            {/* </a> */}
                        </div>
                    </NavLink>
                </div>
            )
            )
            setData(htmlElement);
        }
        getProducts();
    }, [])

    return (
        <section style={{ background: '#eee' }}>
            <div className="container py-5">
                <h4 className="text-center mb-5"><strong>Product listing</strong></h4>

                <div className="row">
                    {
                      data 
                    }

                </div>
            </div>
        </section>
    )
}

export default Listing
