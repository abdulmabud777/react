import React, { useState } from 'react';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBContainer
} from 'mdb-react-ui-kit';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';


const initialValues = {
    name: '',
    price: '',
    desc: '',
    file: ''
}

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    price: Yup.string().required('Price is required'),
    desc: Yup.string().required('Description is required'),
    file: Yup.string()
})

const products = [];

// const submit = (form)=> {
//     console.log(form);
// }

function AddProduct() {
    const [base64String, setBase64String] = useState('');
    const [formData, setFormData] = useState({});
    // const { setFieldValue } = useFormikContext();
    const handleFileChange = (event) => {
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
        }
      };

    const onSubmit = (values, action) => {
        // Your submit logic goes here
        for (var key in values) {
            if (values.hasOwnProperty(key)) {
                if (key == 'file') {
                    values.image = base64String;
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
          action.resetForm(); // Reset the submit state
        }, 500);
      };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
            <Form>
                <div className="container add-product-container">
                    <div className="text-center">
                        <NavLink to="/">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                style={{ width: '185px' }} alt="logo" />
                        </NavLink>
                        <h4 className="mt-1 mb-5 pb-1">Add Product</h4>
                    </div>
                    <div className="form-block">
                        <label className="form-label" htmlFor="name">Product Name</label>
                        <Field type="text" id="name" name="name"></Field>
                        <ErrorMessage name="name" component="div"></ErrorMessage>
                    </div>
                    <div className="form-block">
                        <label className="form-label" htmlFor="price">Product Price</label>
                        <Field type="text" id="price" name="price"></Field>
                        <ErrorMessage name="price" component="div"></ErrorMessage>
                    </div>
                    <div className="form-block">
                        <label className="form-label" htmlFor="desc">Product Description</label>
                        <Field as="textarea" className="text-area" id="desc" name="desc"></Field>
                        <ErrorMessage name="desc" component="div"></ErrorMessage>
                    </div>
                    <div className="form-block position-relative">
                        <label className="form-label" htmlFor="customFile">Product Image</label>
                        {/* <input type="file" name="file" class="form-control" id="customFile" /> */}
                        <Field type="file" id="file" name="file" onChange={handleFileChange}></Field>
                        <ErrorMessage name="file" component="div"></ErrorMessage>
                        {base64String? (<img className="preview-image" src={base64String} />): ''}
                    </div>
                    <div className="custom-btn-block">
                        <button className="gradient-custom-2 custom-btn" type="submit">Add Product</button>
                        <NavLink to="/">
                            <button className="gradient-custom-2 custom-btn ml-8">Product List ></button>
                        </NavLink>
                    </div>
                </div>
            </Form>
        </Formik>
    );
}

export default AddProduct