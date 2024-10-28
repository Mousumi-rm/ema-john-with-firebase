import React from 'react';
import { createContext } from 'react';
import{
    createUserWithEmailAndPassword,
     getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendEmailVerification, 
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
    } from 'firebase/auth';
import app from '../firebase/firebase.init'
import { useState } from 'react';
import { useEffect } from 'react';



export const authContext = createContext(null)
const auth = getAuth(app)
const googleAuthProvider = new GoogleAuthProvider();


const UserContext = ({children}) => {
    const [userData, setUserData] =useState(null)
    const [loading,setLoading] = useState(true)


    // create-User-firebase-auth
    const createUser = (email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }


    //SineIn-User-firebase-auth
    const userSignIn =(email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    // verification send to email

    const sendVerificationEmail = (user)=>{
        if(user){
            alert('Verification your email')
        }
        return sendEmailVerification(user);
    }
    // update-displays:
    const updateUserData =(user,name)=>{
        return updateProfile(user,{
            displayName:name,
            email:user.email
        })
    }
   // logout-User-firebase-auth
   const userLogOut = ()=>{
    setLoading(true)
     return signOut(auth);
   }
    // signWithGoogle:
    const signWithGoogle =()=>{
        setLoading(true)
        return signInWithPopup(auth,googleAuthProvider);
    }

    // onAuth state changed observer:
 useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,user =>{
        if(user){
            console.log('user is authenticate',user);
            setUserData(user);
        }else{
            console.log('No user authenticate',user);
            setUserData(null)
        }
        setLoading(false);
     })
     return()=>{
        return unsubscribe();
     }
 },[])

    const authInfo = {
        loading,
        userData,
        createUser,
        userSignIn,
        userLogOut,
        updateUserData,
        signWithGoogle,
        sendVerificationEmail
    }
    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export default UserContext;