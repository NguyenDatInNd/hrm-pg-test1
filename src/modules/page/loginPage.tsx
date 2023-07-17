/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IsLoginParam } from '../../Types/auth';
import logo from '../../assets/HRM_Logo.svg';
import Copyright from '../../components/Copyright';
import { API_PATHS } from '../../configs/api';
import { ROUTES } from '../../configs/router';
import { ACCESS_TOKEN_KEY } from '../../utils/contants';
import LoginForm from '../auth/components/LoginForm';
import '../auth/components/LoginForm.scss';

const loginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const onLogin = async (value: IsLoginParam) => {
        try {
            setLoading(true);
            const res = await axios.post(`${API_PATHS.API_FIXER}/login`, {
                username: value.username,
                password: value.password,
                company_id: Number(value.company_id),
            });
            Cookies.set(ACCESS_TOKEN_KEY, res.data.data.token);
            localStorage.setItem('accessToken', res.data.data.token);
            setLoading(false);
            toast.success('Login Successfully');
            setTimeout(() => {
                navigate(ROUTES.employee);
            }, 500);
        } catch (error) {
            setLoading(false);
            toast.error('Incorrect Username, Password or Factory. Please try again!');
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
                        <p className="mt-2">You can test it</p>
                        <p className="mt-2">{'{User: trieubuihai , password:123123123, fatory: SBM}'}</p>
                        <div className="w-100 mt-4">
                            <LoginForm onLogin={onLogin} loading={loading} />
                        </div>

                        <Copyright />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default loginPage;
// try {
//     setLoading(true);
//     const resultAction = await dispatch(loginAuthentication(value));
//     unwrapResult(resultAction);
//     console.log('no la gi', unwrapResult(resultAction));
//     setLoading(false);
//     navigate(ROUTES.employee);
// } catch (error) {
//     setLoading(false);
//     toast.error('Incorrect Username, Password or Factory. Please try again!');
// }
