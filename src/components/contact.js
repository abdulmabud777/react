import React from 'react'
import { useForm } from 'react-hook-form';
import Header from './header';
import Footer from './footer';
import { DevTool } from '@hookform/devtools'
const Contact = () => {
    const { register, handleSubmit, control, formState } = useForm();
    const {errors} = formState;
    const onSubmit = (data) =>

        console.log(data);
    return (
        <>
        <Header />
        <form onSubmit={handleSubmit(onSubmit)} className="add-product-container" noValidate>
            <div className="form-block">
                <label>Name:</label>
                <input type="text" placeholder="Enter your name" {...register('name', { required: {value: true, message:"Name is required"} })} />
                <p className="error">{errors.name?.message}</p>
            </div>
            <div className="form-block">
                <label>Email:</label>
                <input type="email" placeholder="Enter your email" {...register('email', 
                { 
                    required: {value: true, message:'Email is required'}, 
                    pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid format' },
                    validate: {
                        notAdmin: (fieldValue) => {
                            return (
                                fieldValue !== "admin@example.com" || 
                                "Enter a different email address"
                            )
                        },
                        notBlackListed: (fieldValue) => {
                            return (
                                !fieldValue.endsWith("baddomain.com") || 
                                "This domain is not supported"
                            )
                        }
                    },
                }
                )} />
                <p className="error">{errors.email?.message}</p>
            </div>
            <div className="form-block">
                <label>Description:</label>
                {/* <input type="password" placeholder="Enter your password" {...register('password', { required: true, minLength: 8 })} /> */}
                <textarea placeholder="Enter your password" {...register('description', { required: {value:true, message: 'Description required'}, maxLength:  {value: 200, message: 'Maximum 200 characters are allowed'}})}></textarea>
                <p className="error">{errors.description?.message}</p>
            </div>
            <button type="submit">Register</button>
        </form>
        <DevTool control={control} />
        <Footer />
        </>
    );
}
export default Contact
