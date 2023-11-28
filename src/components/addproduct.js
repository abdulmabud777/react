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


// const initialValues = {
//     name: '',
//     price: '',
//     desc: '',
//     file: ''
// }

// const validationSchema = Yup.object({
//     name: Yup.string().required('Name is required'),
//     price: Yup.string().required('Price is required'),
//     desc: Yup.string().required('Description is required'),
//     file: Yup.string()
// })

const products = [];

// const submit = (form)=> {
//     console.log(form);
// }

function AddProduct() {
    const { register, handleSubmit, setValue, control, formState, append, getValues  } = useForm();
    console.log(getValues)
    const {errors} = formState;
    const [base64String, setBase64String] = useState('');
    const [formData, setFormData] = useState({});
    const [addresses, setAddresses] = useState([]);
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
                    values.id = Math.floor(Math.random()*100);
                    setFormData(values);
                    const updateLocalStorage = async ()=> {
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
       
        // setFormData(values);
        
        

        // updateLocalStorage();

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
      

      return (
        <>
        {/* <Header /> */}
        <form onSubmit={handleSubmit(onSubmit)} className="add-product-container" noValidate>
            <div className="form-block">
                <label>Product Name:</label>
                <input type="text" placeholder="Enter product name" {...register('name', 
                    { 
                        required: {value: true, message:"Product name is required"} 
                    }
                )} />
                <p className="error">{errors.name?.message}</p>
            </div>
            <div className="form-block">
                <label>Price:</label>
                <input type="text" placeholder="Enter price" {...register('price', 
                    { 
                        required: {value: true, message:'Price is required'}, 
                    }
                )} />
                <p className="error">{errors.price?.message}</p>
            </div>
            <div className="form-block">
                <label>Description:</label>
                <textarea placeholder="Enter your password" {...register('description', 
                    { 
                        required: {value:true, message: 'Description required'}, 
                        maxLength:  {value: 200, message: 'Maximum 200 characters are allowed'}
                    }
                )}></textarea>
                <p className="error">{errors.description?.message}</p>
            </div>
            <div className="form-block position-relative">
                <label className="form-label" htmlFor="customFile">Product Image</label>
                <input type="file" className="form-control" {...register('file', { required: {value: false, message: 'Product image is required'} })} onChange={handleFileChange} />
                <p className="error">{errors.file?.message}</p>
                {base64String? (<img className="preview-image" src={base64String} />): ''}
            </div>
            {/* <div className="form-block">
                <label>Address:</label>
                <textarea placeholder="Enter your password" {...register('address', 
                    { 
                        required: {value:true, message: 'Address required'}, 
                        maxLength:  {value: 200, message: 'Maximum 200 characters are allowed'
                    }
                })}></textarea>
                <p className="error">{errors.address?.message}</p>
                <button>Add Address</button>
            </div> */}
            <div className="address-form">
            <div className="form-block">
                <label>Address Line 1:</label>
                <input
                    type="text"
                    {...register('addressLine1', { required: true })}
                />
            </div>
            <div className="form-block"> 
                <label>Address Line 2:</label>
                <input
                    type="text"
                    {...register('addressLine2', { required: true })}
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
                <label>Zip Code:</label>
                <input
                    type="text"
                    {...register('zipCode', { required: true })}
                />
            </div> 
            <button type="button" onClick={() => addNewAddress()}>Add Address</button>
            </div>

            
            {addresses.map((address) => (
            <div className="address address-priview" key={address.addressLine1}>
                <p>Address Line 1: {address.addressLine1}</p>
                <p>Address Line 2: {address.addressLine2}</p>
                <p>City: {address.city}</p>
                <p>State: {address.state}</p>
                <p>Zip Code: {address.zipCode}</p>
            </div>
            ))}
            <button className="mt-20" type="submit">Register</button>
        </form>
        <DevTool control={control} />
        {/* <Footer /> */}
        </>
    );

    // return (
        // <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
        //     <Form>
        //         <div className="container add-product-container">
        //             <div className="text-center">
        //                 <NavLink to="/">
        //                     <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
        //                         style={{ width: '185px' }} alt="logo" />
        //                 </NavLink>
        //                 <h4 className="mt-1 mb-5 pb-1">Add Product</h4>
        //             </div>
        //             <div className="form-block">
        //                 <label className="form-label" htmlFor="name">Product Name</label>
        //                 <Field type="text" id="name" name="name"></Field>
        //                 <ErrorMessage name="name" component="div"></ErrorMessage>
        //             </div>
        //             <div className="form-block">
        //                 <label className="form-label" htmlFor="price">Product Price</label>
        //                 <Field type="text" id="price" name="price"></Field>
        //                 <ErrorMessage name="price" component="div"></ErrorMessage>
        //             </div>
        //             <div className="form-block">
        //                 <label className="form-label" htmlFor="desc">Product Description</label>
        //                 <Field as="textarea" className="text-area" id="desc" name="desc"></Field>
        //                 <ErrorMessage name="desc" component="div"></ErrorMessage>
        //             </div>
        //             <div className="form-block position-relative">
        //                 <label className="form-label" htmlFor="customFile">Product Image</label>
        //                 {/* <input type="file" name="file" class="form-control" id="customFile" /> */}
        //                 <Field type="file" id="file" name="file" onChange={handleFileChange}></Field>
        //                 <ErrorMessage name="file" component="div"></ErrorMessage>
        //                 {base64String? (<img className="preview-image" src={base64String} />): ''}
        //             </div>
        //             <div className="custom-btn-block">
        //                 <button className="gradient-custom-2 custom-btn" type="submit">Add Product</button>
        //                 <NavLink to="/">
        //                     <button className="gradient-custom-2 custom-btn ml-8">Product List ></button>
        //                 </NavLink>
        //             </div>
        //         </div>
        //     </Form>
        // </Formik>
    // );
}

export default AddProduct