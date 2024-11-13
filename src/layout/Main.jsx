import React from 'react';
import Navbar2 from '../components/shared/Navbar2';
import { Outlet } from 'react-router-dom';
import Footer from '../components/shared/Footer';
import ScrollUpBtn from '../components/ScrollUpBtn/ScrollUpBtn';

const Main = () => {
    return (
        <div>
            <ScrollUpBtn/>
            <Navbar2/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Main;