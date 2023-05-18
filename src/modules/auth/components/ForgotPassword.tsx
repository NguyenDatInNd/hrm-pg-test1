import React from 'react';
import logo from '../../../assets/HRM_Logo.svg';
import { ErrorMessage } from '@hookform/error-message';
import './LoginForm.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { IForgotPasswordParams } from '../../../Types/auth';
import Copyright from '../../../components/Copyright';

type IForgotPasswordType = {
    handleForgotPassword(values: IForgotPasswordParams): void;
};
const ForgotPassword = ({ handleForgotPassword }: IForgotPasswordType) => {
    // useForm
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm({
        defaultValues: {
            email: '',
        },
        mode: 'onChange',
        criteriaMode: 'all',
    });

    // submmit
    const onSubmitForgotPassword: SubmitHandler<IForgotPasswordParams> = (data) => {
        handleForgotPassword(data);
    };

    return (
        <div style={{ background: '#f8f9fa', height: '100vh' }}>
            <div className="container">
                <div className="d-flex  justify-content-center py-5">
                    <div className="d-flex mt-5 flex-column justify-content-center align-items-center contaienr-login-form">
                        <img src={logo} className="" alt="" />
                        <h1 className="mt-2">HR Management System</h1>
                        <h4 className="mt-40">Forgot password</h4>
                        <div className="w-100 mt-4">
                            <div className="login-form-content">
                                <form
                                    onSubmit={handleSubmit(onSubmitForgotPassword)}
                                    className="form_container"
                                    action=""
                                >
                                    <div className="d-flex flex-column mt-2">
                                        <label htmlFor="inputUser" className="">
                                            Your work email :
                                        </label>
                                        <div
                                            className={
                                                errors.email?.message
                                                    ? 'input-self  input-danger mt-3'
                                                    : 'input-self  mt-3'
                                            }
                                        >
                                            <input
                                                id="inputUser"
                                                type="text"
                                                className=""
                                                {...register('email', {
                                                    required: 'The email not empty',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: 'invalid email address',
                                                    },
                                                })}
                                            />
                                        </div>
                                        {/* <span className="text-danger fs-5">Username required !</span> */}
                                        <ErrorMessage
                                            errors={errors}
                                            name="email"
                                            render={({ messages }) =>
                                                messages &&
                                                Object.entries(messages).map(([type, message]) => (
                                                    <span
                                                        className="text-danger ml-4 mt-2 text-lg font-medium"
                                                        key={type}
                                                    >
                                                        {message}
                                                    </span>
                                                ))
                                            }
                                        />
                                    </div>

                                    <div className="d-flex flex-column mt-4">
                                        <button
                                            type="submit"
                                            className="btn btn-primary-fixer btn-primary !rounded-lg font-semibold py-[12px] fs-4"
                                        >
                                            Confirm & Send OTP
                                        </button>
                                    </div>

                                    <div className="d-flex flex-column mt-3 mb-4">
                                        <Link to="/login" className="text-center  text-primary">
                                            Back to Sign In
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <Copyright />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
