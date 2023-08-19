import React from 'react';
import './Navbar.css';
import {NavLink} from "react-router-dom";
//import Logo from '../../assets/img/navbar-logo.svg'

const Navbar = () => {
    return (
        <div className='navbar'>
            <img src="" alt="" className='navbar logo'/>
            <div className='navbar loader'>Lotus Students</div>
            <div className="navbar__login"><NavLink to="/login">Войти</NavLink></div>
            <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div>
        </div>
    );
};

export default Navbar;