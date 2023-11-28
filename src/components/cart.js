// Cart.js
import React from 'react';
import { useSelector } from 'react-redux';
import Header from './header';
import Footer from './footer';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart);

    // if (cartItems.length === 0) {
    //     return (
    //     <>
    //         <Header />
    //         <p>Your cart is empty.</p>
    //         <Footer />
    //     </>
    //     )
    // }

    return (
        <>
            <Header />
            <div style={styles.container}>
                { cartItems.length === 0 ? (<p style={{textAlign:'center'}}>Your cart is empty.</p>): (
                    <>
                    <h2 style={styles.heading}>Shopping Cart</h2>
                    <ul style={styles.list}>
                        {cartItems.map((item) => (
                            <li key={item.id} style={styles.item}>
                                <div>
                                    <strong>{item.name}</strong>
                                    <p>Price: ${item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p style={styles.total}>Total: ${calculateTotal(cartItems).toFixed(2)}</p>
                    </>
                ) }
            </div>
            <Footer />
        </>
    );
};

const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: '30px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
    },
    heading: {
        textAlign: 'center',
        fontSize: '24px',
        marginBottom: '20px',
    },
    list: {
        listStyle: 'none',
        padding: '0',
    },
    item: {
        marginBottom: '20px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '8px',
    },
    total: {
        textAlign: 'right',
        fontSize: '18px',
        marginTop: '20px',
    },
};

export default Cart;
