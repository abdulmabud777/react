import React, { useState } from 'react';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBContainer
} from 'mdb-react-ui-kit';
// import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
// import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import Header from './header';
import Footer from './footer';
import { DevTool } from '@hookform/devtools'
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';


const products = [];

// const submit = (form)=> {
//     console.log(form);
// }

function AddProduct3() {
    const { register, handleSubmit, setValue, control, formState, append, getValues, watch } = useForm();
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [editStatus, setEditStatus] = useState(false);
    const { errors } = formState;
    const [base64String, setBase64String] = useState('');
    const [formData, setFormData] = useState({});
    const [addresses, setAddresses] = useState([]);
    const selectedAddress = watch('addressLine1');
    const addressLine2Values = watch(['addressLine2']);
    const cityValues = watch(['city']);
    const stateValues = watch(['state']);
    const zipCodeValues = watch(['zipCode']);
    // const { setFieldValue } = useFormikContext();
    const handleFileChange = (event) => {
        console.log(23);
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                // Set the Base64-encoded string to state
                setBase64String(reader.result);
                // Set the file in Formik's state
                // setFieldValue('file', file);
            };

            // Read the file as a Data URL (Base64-encoded)
            reader.readAsDataURL(file);
        } else {
            return null;
        }
        setValue('fileError', null); // Clear error message
        return null;
    };

    const onSubmit = (values) => {
        console.log(values)
        // console.log(getValues)
        // Your submit logic goes here
        for (var key in values) {
            if (values.hasOwnProperty(key)) {
                if (key == 'file') {
                    values.image = base64String;
                    values.id = Math.floor(Math.random() * 100);
                    setFormData(values);
                    const updateLocalStorage = async () => {
                        // Retrieve existing form data from local storage
                        const existingFormData = await JSON.parse(localStorage.getItem('products')) || [];
                        // Add new form data
                        const newFormData = await [...existingFormData, values];

                        // Update local storage with the combined form data
                        localStorage.setItem('products', JSON.stringify(newFormData));
                    }
                    updateLocalStorage();
                    // console.log(key + " -> " + values[file]);
                }
            }
        }

        // Simulate an asynchronous action (e.g., API call)
        setTimeout(() => {
            // Show a success toast
            toast.success('Form submitted successfully!', {
                position: 'top-right',
                autoClose: 3000, // Duration in milliseconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            //   action.resetForm(); // Reset the submit state
        }, 500);
    };

    const addNewAddress = () => {
        // Get the form values
        const addressData = {
            addressId: Math.floor(Math.random() * 100),
            addressLine1: getValues('addressLine1'),
            addressLine2: getValues('addressLine2'),
            city: getValues('city'),
            state: getValues('state'),
            zipCode: getValues('zipCode'),
        };

        // Add the address data to the addresses array
        setAddresses([...addresses, addressData]);

        // Reset the form fields
        setValue('addressLine1', '');
        setValue('addressLine2', '');
        setValue('city', '');
        setValue('state', '');
        setValue('zipCode', '');
    };

    const handleEditAddress = (address, addressId) => {
        setEditStatus(true);
        setValue('addressLine1', address.addressLine1);
        setValue('addressLine2', address.addressLine2);
        setValue('city', address.city);
        setValue('state', address.state);
        setValue('zipCode', address.zipCode);
        console.log(selectedAddress);
        const item = addresses.find((item) => item.addressId === addressId);
        console.log(`Edit clicked for item: ${item.addressLine1}`);
        setSelectedItemId(addressId);
        if (selectedItemId === address.addressId) {
            console.log('34');
        }

    };

    const handleSaveAddress = (addressSelected) => {
        setEditStatus(false);
        const updatedAddresses = addresses.map((address) => {
            // address.addressLine1 = selectedAddress
            if (address.addressId === addressSelected.addressId) {
                address.addressLine1 = selectedAddress;
                address.addressLine2 = addressLine2Values;
                address.city = cityValues;
                address.state = stateValues;
                address.zipCode = zipCodeValues;
                // return { ...address, ...address };
                return address;
            } else {
                return address;
            }

        });

        setAddresses(updatedAddresses);
        setValue('selectedAddress', null);
        setSelectedItemId(null);
        // Reset the form fields
        setValue('addressLine1', '');
        setValue('addressLine2', '');
        setValue('city', '');
        setValue('state', '');
        setValue('zipCode', '');
    };


    return (
        <>
            {/* <Header /> */}
            <div className="text-center">
                <NavLink to="/">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        style={{ width: '185px' }} alt="logo" />
                </NavLink>
                <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="add-product-container" noValidate>
                <div className="form-block">
                    <label>Product Name:</label>
                    <input type="text" placeholder="Enter product name" {...register('name',
                        {
                            required: { value: true, message: "Product name is required" }
                        }
                    )} />
                    <p className="error">{errors.name ?.message}</p>
                </div>
                <div className="form-block">
                    <label>Price:</label>
                    <input type="text" placeholder="Enter price" {...register('price',
                        {
                            required: { value: true, message: 'Price is required' },
                        }
                    )} />
                    <p className="error">{errors.price ?.message}</p>
                </div>
                <div className="form-block">
                    <label>Description:</label>
                    <textarea placeholder="Enter your password" {...register('description',
                        {
                            required: { value: true, message: 'Description required' },
                            maxLength: { value: 200, message: 'Maximum 200 characters are allowed' }
                        }
                    )}></textarea>
                    <p className="error">{errors.description ?.message}</p>
                </div>
                <div className="form-block position-relative">
                    <label className="form-label" htmlFor="customFile">Product Image</label>
                    <input type="file" className="form-control" {...register('file', { required: { value: false, message: 'Product image is required' } })} onChange={handleFileChange} />
                    <p className="error">{errors.file ?.message}</p>
                    {base64String ? (<img className="preview-image" src={base64String} />) : ''}
                </div>
                {(
                    !editStatus && <div className="address-form">
                        <div className="form-block">
                            <label>Address Line 1:</label>
                            <input
                                type="text"
                                {...register('addressLine1', { required: {value: true, message: "Address Line 1 required"} })}
                            />
                            <p className="error">{errors.addressLine1 ?.message}</p>
                        </div>
                        <div className="form-block">
                            <label>Address Line 2:</label>
                            <input
                                type="text"
                                {...register('addressLine2', { required: {value: true, message: "Address Line 2 is required"} })}
                            />
                            <p className="error">{errors.addressLine2 ?.message}</p>
                        </div>
                        <div className="form-block">
                            <label>City:</label>
                            <input
                                type="text"
                                {...register('city', { required: {value: true, message: "City is required"} })}
                            />
                            <p className="error">{errors.city ?.message}</p>
                        </div>

                        <div className="form-block">
                            <label>State:</label>
                            <input
                                type="text"
                                {...register('state', { required: {value: true, message: "State is required"} })}
                            />
                            <p className="error">{errors.state ?.message}</p>
                        </div>

                        <div className="form-block">
                            <label>Zip Code:</label>
                            <input
                                type="text"
                                {...register('zipCode', { required: {value: true, message: "Zip Code is required"} })}
                            />
                            <p className="error">{errors.zipCode ?.message}</p>
                        </div>
                        <button type="button" onClick={() => addNewAddress()}>Add More Address</button>
                    </div>
                )}

                {addresses.map((address, index) => (
                    <div key={address.addressId}>
                        {(
                            (selectedItemId !== address.addressId) && <div className="address address-priview add-product-container">
                                <p>Address Line 1: {address.addressLine1}</p>
                                <p>Address Line 2: {address.addressLine2}</p>
                                <p>City: {address.city}</p>
                                <p>State: {address.state}</p>
                                <p>Zip Code: {address.zipCode}</p>
                                <button className="edit-button" onClick={() => handleEditAddress(address, address.addressId)}>Edit</button>
                            </div>
                        )}
                        <div className="edit-arress-from-parent add-product-container">
                            {(
                                (selectedItemId === address.addressId) && selectedItemId && <div className="edit-address-form">
                                    <div>
                                        <div className="form-block">
                                            <label>Address Line 1:</label>
                                            <input
                                                type="text"
                                                {...register('addressLine1', { required: true })}
                                                defaultValue={selectedAddress}
                                            />
                                        </div>
                                        <div className="form-block">
                                            <label>Address Line 2:</label>
                                            <input
                                                type="text"
                                                {...register('addressLine2', { required: true })}
                                                defaultValue={addressLine2Values}
                                            />
                                        </div>
                                        <div className="form-block">
                                            <label>City:</label>
                                            <input
                                                type="text"
                                                {...register('city', { required: true })}
                                            />
                                        </div>
                                        <div className="form-block">
                                            <label>State:</label>
                                            <input
                                                type="text"
                                                {...register('state', { required: true })}
                                            />
                                        </div>
                                        <div className="form-block">
                                            <   label>Zip Code:</label>
                                            <input
                                                type="text"
                                                {...register('zipCode', { required: true })}
                                            />
                                        </div>
                                        <button onClick={(event) => {
                                            event.preventDefault()
                                            handleSaveAddress(address)
                                        }
                                        }>Save Address</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}


                <button className="mt-20 width-100" type="submit">Register</button>
            </form>


            <DevTool control={control} />
            {/* <Footer /> */}
        </>
    );
}

export default AddProduct3