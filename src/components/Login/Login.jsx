import React from "react";
import "./Login.css";
import google from "../../images/google.png"
import { useContext } from "react";
import { authContext } from "../../provider/UserContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";




const Login = () => {

    const { userSignIn} = useContext(authContext);
    const[show,setShow] = useState(false);
    const [error,setError] =useState('')
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const from = location.state?.from?.pathname || '/' ;

    const handleToLogIn = (event)=>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password);
        // validation
        if(password.length < 6){
            setError('password must be at least 6 characters')
            return
        }
        userSignIn(email,password)
        .then(result=>{
            const In = result.user;
            console.log(In);
            form.reset();
            navigate(from,{replace:true})
        })

        .catch(error=>{
            console.log(error);
        })

    }


  return (
    <div className="w-2/4 mx-auto mt-20 ">
      <form onSubmit={handleToLogIn}
      className="flex flex-col bg-white m-20 border
       border-yellow-700 rounded-2xl shadow-sign-In">
        <h2 className="text-black text-center mx-10 mt-10 text-4xl font-sans">Login</h2>
        {/* for-email */}
        <label htmlFor="email" className="text-gray-500 mx-14 mt-5">
          Email
        </label>
        <input
          className="bg-white mx-10 mt-1
           border-gray-400 border
            p-3 rounded-xl text-black"
          type="email"
          placeholder="Username"
          name="email"
          required
        />
        {/* for-password */}
        <label htmlFor="password" className="text-gray-500 mx-14 mt-5">
          Password
        </label>
        <input
          className="bg-white mx-10 mt-1
           border p-3 rounded-xl
            border-gray-400 text-black"
          type={show? 'text' : 'password'}
          placeholder="Enter Your Password"
          name="password"
          required
        />
        <p className="mx-16" onClick={()=> setShow(!show)}><small>
          {
            show?
            <span className="text-blue-500">hide Password</span>
            :
            <span className="text-blue-500">show password</span>
          }</small></p>
         <p className="error text-red-500 text-center text-xs mt-2">{error}</p>
        <button type="submit" className="login-button mx-10 mt-5">
          Login
        </button>
        <p className="mx-10 mt-2 text-center">
          <small className="text-black mr-2">New to Ema-john?</small>
          <Link className="border-b border-blue-800" to='/signUp'>
            <span className="text-yellow-300">
            Create New Account</span></Link>
        </p>
        <div className="mx-10 my-5  ">
          <p className="flex items-center justify-center">
            <span className="border w-40 border-gray-400"></span>
            <span>
              <small className="text-black mx-5">or</small>
            </span>
            <span className="border w-40 border-gray-400"></span>
          </p>
        </div>
        <button type="submit" className="login-google-button 
          border-gray-400 text-gray-500  mx-10 mt-4 mb-10 flex
           items-center justify-center ">
            <img src={google} className='w-5' alt="" />
         <span className="ml-2">Continue with Google</span> 
        </button> 
      </form>
    </div>
  );
};

 
export default Login;
