import React, { useState } from "react";
import "./SignUp.css";
import google from "../../images/google.png";
import { useContext } from "react";
import { authContext } from "../../provider/UserContext";
import { Link } from "react-router-dom";






const SignUp = () => {

const { createUser,sendVerificationEmail,updateUserData, signWithGoogle}
 = useContext(authContext);
const [errorCheck, setErrorCheck] = useState('');

   const handleToSingUp = (event) => { 
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value
    const confirm = form.confirm.value
    const name = form.name.value
    console.log(email,password,confirm,name)

    // validity check:
    if(password !== confirm){
        setErrorCheck('please conform your password')
        return
    }
    else if(password.length < 6){
        setErrorCheck('password must be at least 6 characters')
        return
    }

//   context:
    createUser(email,password)
    .then(result =>{
        const register = result.user;
        console.log(register);
        sendVerificationEmail(register);
        updateUserData(register,name)
          form.reset();
      })
      .catch(error=>{
          console.error(error.message);
      })

    };

    const signInWithSocialGoogle =()=>{
      signWithGoogle()
      .then((result)=>{
        const loginGoogle = result.user;
        console.log(loginGoogle);
      })
      .catch((error)=>{
        console.log(error);
      })
    }


  return (
    <div className="w-2/4 mx-auto mt-20 ">
        <form
          onSubmit={handleToSingUp}
          className="flex flex-col bg-white m-20 border 
         border-yellow-700 rounded-2xl shadow-sign-In"
        >
          <h2
            className="text-black text-center mx-10 mt-10 
          text-4xl font-sans"
          >
            Sign Up
          </h2>
          {/* for-name */}
          <label htmlFor="name" className="text-gray-500 mx-14 mt-5">
          Your Name
          </label>
          <input
            className="bg-white mx-10 mt-1
             border-gray-400 border
              p-3 rounded-xl text-black"
            type="name"
            placeholder="Username "
            name="name"
            required
          />

          {/* for-email */}
          <label htmlFor="email" className="text-gray-500 mx-14 mt-5">
            Email
          </label>
          <input
            className="bg-white mx-10 mt-1
             border-gray-400 border
              p-3 rounded-xl text-black"
            type="email"
            placeholder="Enter Your Email Address"
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
            type="password"
            placeholder="Enter Your Password"
            name="password"
            required
          />
          <label
            htmlFor="confirm-password"
            className="text-gray-500 mx-14 mt-5"
          >
            Confirm Password
          </label>
          <input
            className="bg-white mx-10 mt-1
             border p-3 rounded-xl
              border-gray-400 text-black"
            type="password"
            name="confirm"
            required
          />
          <p className="text-red-700 text-center text-xs">{errorCheck}</p>
          <button type="submit" className="login-button mx-10 mt-5">
            Sign Up
          </button>
          <p className="mx-10 mt-2 text-center">
            <small className="text-black mr-2">Already have an account?</small>
            <Link  className="border-b border-blue-800" to='/login'>
                <span className="text-yellow-300">Login</span></Link>
          </p>
          <div className="mx-10 my-5  ">
            <p className="flex items-center justify-center">
              <span className="border w-40 border-gray-300"></span>
              <span>
                <small className="text-black mx-5">or</small>
              </span>
              <span className="border w-40 border-gray-300"></span>
            </p>
          </div>
          <button
          onClick={signInWithSocialGoogle}
            type="submit"
            className="login-google-button 
            border-gray-400 text-gray-500  mx-10 mt-4 mb-10 flex
             items-center justify-center "
          >
            <img src={google} className="w-5" alt="" />
            <span className="ml-2">Continue with Google</span>
          </button>
        </form>
    </div>
  );
};

export default SignUp;
