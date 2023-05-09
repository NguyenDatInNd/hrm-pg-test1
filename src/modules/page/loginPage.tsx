/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';
import LoginForm from '../auth/components/LoginForm';
import '../auth/components/LoginForm.scss';
import logo from '../../assets/HRM_Logo.svg';

import Cookies from 'js-cookie';
import { IsLoginParam } from '../../Types/auth';
import axios from 'axios';
import { API_PATHS } from '../../configs/api';
import { ACCESS_TOKEN_KEY } from '../../utils/contants';
import toast, { Toaster } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../store';
import { loginFailed, loginSuccess } from '../../pages/Redux/company.slice';

const loginPage = () => {
    // const navigate = useNavigate();
    const dispatch = useAppDispatch();
    dispatch(loginSuccess(false));

    const loadingLogin = useAppSelector((state) => state.company.loadingLogin);
    console.log(loadingLogin);

    const onLogin = async (value: IsLoginParam) => {
        try {
            const res = await axios.post(API_PATHS.signIn, {
                username: value.username,
                password: value.password,
                company_id: Number(value.company_id),
            });
            Cookies.set(ACCESS_TOKEN_KEY, res.data.data.token);
            toast.success('Login Successfully');

            setTimeout(() => {
                window.location.href = '/home';
            }, 500);
        } catch (error) {
            toast.error('Login Failed');
        }
    };
    return (
        <div style={{ background: '#f8f9fa' }}>
            <div className="container">
                <div className="d-flex  justify-content-center py-5">
                    <div className="d-flex mt-5 flex-column justify-content-center align-items-center contaienr-login-form">
                        <img src={logo} className="" alt="" />
                        <h1 className="mt-2">HR Management System</h1>
                        <h4 className="mt-5">Sing In</h4>
                        <div className="w-100 mt-4">
                            <LoginForm onLogin={onLogin} />
                        </div>

                        <div className="mt-4">
                            <p className="fs-5">Copyright © 2023. All Rights Reserved</p>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="top-right" reverseOrder={false} />
        </div>
    );
};

export default loginPage;
