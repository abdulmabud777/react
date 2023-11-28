import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ConfirmationModal from './confirmationModal';
import { logout } from './authActions';
import { toast } from 'react-toastify';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const cart = useSelector((state) => state.cart);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirm = () => {
        // Perform action on confirmation
        dispatch(logout());
        localStorage.removeItem('userDetails');
        console.log('Confirmed!');
        closeModal();
        toast.success('Logout successfully!', {
            position: 'top-right',
            autoClose: 3000, // Duration in milliseconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        // Remove user details from local storage
        // localStorage.removeItem('userDetails');
        navigate('/');
    };
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-white">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarExample01"
                        aria-controls="navbarExample01"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarExample01">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item active">
                                {/* <a className="nav-link" aria-current="page">Home</a> */}
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link">Features</a>
                            </li>
                            */}
                            {/* <li className="nav-item">
                                <NavLink className="nav-link" to="/addproduct">Add Product</NavLink>
                            </li>  */}
                            <li className="nav-item">
                                {/* <a className="nav-link">Contact Us</a> */}
                                <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='right-nav collapse navbar-collapse mr-16'>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {user ? (<a className="nav-link pointer" onClick={openModal}>Logout</a>) : (<NavLink className="nav-link" to="/login">Login</NavLink>)}
                        </li>
                        <li className="nav-item">
                            {user ? (<NavLink className="nav-link width-120" to="/addproduct">Add product</NavLink>) : ''}
                        </li>
                        <li className="nav-item">
                            {user ? (<NavLink className="nav-link width-120" to="/cart">
                            <div id="cart-icon">
                                🛒
                                <span id="cart-badge">{cart && cart.length}</span>
                            </div>
                            </NavLink>) : ''}
                        </li>
                        {/* <li className="nav-item">
                            <NavLink className="nav-link" to="/register">Register</NavLink>
                        </li> */}
                    </ul>
                </div>
            </nav>
            {/* <div className="p-5 text-center bg-light">
                <h1 className="mb-3">Heading</h1>
                <h4 className="mb-3">Subheading</h4>
                <a className="btn btn-primary" href="" role="button">Call to action</a>
            </div> */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                onConfirm={handleConfirm}
                message="Are you sure you want to log out?"
            />
        </header>
    )
}

export default Header
