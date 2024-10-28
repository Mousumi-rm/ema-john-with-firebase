import React from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from '../../provider/UserContext';

const Header = () => {
 const {userLogOut,userData} = useContext(authContext)


     const handleLoginOut =()=>{
        userLogOut()
        .then(()=>{
        })
        .catch(error=>{
            console.log(error);
        })
    }

    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to="/signUp">SignUp</Link>
                {
                 userData 
                 &&
                 <span className='ml-2 text-xs'>
                    {userData.email}
                    <Link><button className=' '
                  onClick={handleLoginOut}>LoginOut</button></Link>
                 </span>
                }
            </div>
        </nav>
    );
};

export default Header;