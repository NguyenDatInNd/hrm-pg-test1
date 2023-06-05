import React from 'react';
import ForgotPassword from '../auth/components/ForgotPassword';
import { useAppDispatch } from '../../store';
import { loginSuccess } from '../../pages/Redux/company.slice';
import { forgotPassword } from '../../pages/Redux/user.slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../configs/router';
import { IForgotPasswordParams } from '../../Types/auth';
const ForgotPasswordPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleForgotPassword = React.useCallback(
        async (values: IForgotPasswordParams) => {
            const resultAction = await dispatch(forgotPassword(values.email));
            unwrapResult(resultAction);
            navigate(`/login`);
        },
        [dispatch, navigate],
    );

    return <ForgotPassword handleForgotPassword={handleForgotPassword} />;
};

export default ForgotPasswordPage;
