import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../../provider/UserContext';


const PrivateRoute = ({children}) => {

    const {userData,loading} = useContext(authContext);
    const location = useLocation()
    
    if(loading){
        return <div><span className="loading loading-infinity loading-lg"></span></div>
    }
    if(userData){
        return children
    }
    return (
        <Navigate to='/login' state={{from:location}} replace >
            
        </Navigate>
    );
};

export default PrivateRoute;