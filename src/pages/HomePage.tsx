import React from 'react';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../utils/contants';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import { useAppDispatch, useAppSelector } from '../store';
import { loginSuccess } from './Redux/company.slice';
const HomePage = () => {
    const dispatch = useAppDispatch();
    dispatch(loginSuccess(true));
    // const cookieValue = Cookies.get(ACCESS_TOKEN_KEY);
    // console.log(cookieValue);
    const loadingLogin = useAppSelector((state) => state.company.loadingLogin);
    return (
        <div className="mt-32">
            <div>This is homePage</div>
            <p>hehehheh</p>
        </div>
    );
};

export default HomePage;
