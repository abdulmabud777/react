import React, {useState} from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools'
import { useDispatch } from 'react-redux';
import { login } from './authActions';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const { register, handleSubmit, control, formState } = useForm();
  const {errors} = formState;
  // const onSubmit = (data) => {
  //   console.log(data);
  // }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const onSubmit = (data) => {
    console.log(data);
    // e.preventDefault();
    // Perform authentication logic and dispatch login action
    // dispatch(login({ email, password }));
    dispatch(login({email: data.email, password: data.password} ));
    // Implement your authentication logic here
    // console.log('Logging in with:', { email, password });

    // get user data from local
    const updateLocalStorage = async ()=> {
      // Retrieve existing form data from local storage
        const userDetails = await JSON.parse(localStorage.getItem('userDetails')) || {};
        if (userDetails.email === data.email && userDetails.password === data.password) {
          // Simulate an asynchronous action (e.g., API call)
            setTimeout(() => {
              // Show a success toast
            toast.success('Login successfully!', {
                position: 'top-right',
                autoClose: 3000, // Duration in milliseconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // Redirect to dashboard or another page on successful login
            navigate('/');
            }, 500);
        } else {
          // Simulate an asynchronous action (e.g., API call)
          setTimeout(() => {
            // Show a success toast
          toast.error('Wrong credentials!', {
              position: 'top-right',
              autoClose: 3000, // Duration in milliseconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          });
          }, 500);
        }
    }
    updateLocalStorage();
    

    
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
    <MDBContainer className="my-5 gradient-form">
    <MDBRow>

      <MDBCol col='6' className="mb-5">
        <div className="d-flex flex-column ms-5">

          <div className="text-center">
            <NavLink to="/">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
              style={{width: '185px'}} alt="logo" />
            </NavLink>
            <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
          </div>

          <p>Please login to your account</p>


          {/* <MDBInput wrapperClass='mb-4' label='Email address' id='form1'  type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/> */}
          <div wrapperClass='mb-4'>
            <MDBInput  label='Email address' id='form1'  type='email' {...register('email', { required: {value: true, message:"Email is required"} })} />
            <p className="error">{errors.email?.message}</p>
          </div>
          <div wrapperClass='mb-4'>
            <MDBInput label='Password' id='form2' type='password' {...register('password', { required: {value: true, message:"Password is required"} })} />
            <p className="error">{errors.password?.message}</p>
          </div>


          <div className="text-center pt-1 mb-5 pb-1">
            <MDBBtn className="mb-4 w-100 gradient-custom-2" onClick={handleSubmit(onSubmit)}>Sign in</MDBBtn>
            <a className="text-muted" href="#!">Forgot password?</a>
          </div>

          <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
            <p className="mb-0">Don't have an account?</p>
            <MDBBtn outline className='mx-2' color='danger'>
              <NavLink to="/register">Register</NavLink>
            </MDBBtn>
          </div>

        </div>

      </MDBCol>

      <MDBCol col='6' className="mb-5">
        <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

          <div className="text-white px-3 py-4 p-md-5 mx-md-4">
            <h4 className="mb-4">We are more than just a company</h4>
            <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

        </div>

      </MDBCol>

      </MDBRow>
    </MDBContainer>
    <DevTool control={control} />
    </form>
      

  );
}

export default Login;