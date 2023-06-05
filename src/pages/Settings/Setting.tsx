import React, { useState, useEffect, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { loginSuccess } from '../Redux/company.slice';
import SubHeader from '../../components/Header/SubHeader';
import { ErrorMessage } from '@hookform/error-message';
import { SubmitHandler, useForm } from 'react-hook-form';
import './Setting.scss';
import Copyright from '../../components/Copyright';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import axios from 'axios';
import { API_PATHS } from '../../configs/api';
import { ACCESS_TOKEN_KEY } from '../../utils/contants';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
type Ispassword = {
    password: string;
    password_confirmation: string;
};

const Setting = () => {
    const [isShowPassWord, setIsShowPassWord] = useState(false);
    const [isShowConfirmPassWord, setIsShowConfirmPassWord] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm<Ispassword>({
        criteriaMode: 'all',
    });
    const passwordValue = watch('password');
    const confirmPassword = watch('password_confirmation');

    // handle show password and confirm password
    const handleShowPassword = (e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        setIsShowPassWord((prev) => !prev);
    };
    const handleShowConfirmPassword = (e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        setIsShowConfirmPassWord((prev) => !prev);
    };

    // submit form data change password
    const onSubmit: SubmitHandler<Ispassword> = async (data) => {
        try {
            const res = await axios.post(API_PATHS.changepassword, data, {
                headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
            });
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    // Effect Active value
    useEffect(() => {
        if (!passwordValue) {
            setIsShowPassWord(false);
        }
        if (!confirmPassword) {
            setIsShowPassWord(false);
        }
    }, [passwordValue, confirmPassword]);

    return (
        <div className="mt-36 px-16">
            <div className="relative">
                <SubHeader category="General" title="Settings" subtitle={null} />
            </div>

            <div className="employee-container mt-4 pb-2 bg-white rounded-3xl">
                <div className="p-4 w-full">
                    <div className="border-b  pb-3">
                        <h3 className="font-semibold text-4xl">Change Password</h3>
                    </div>

                    <div>
                        <form onSubmit={handleSubmit(onSubmit)} action="" className="ml-2 w-full">
                            <div className="d-flex flex-column mt-3">
                                <label htmlFor="inputPass" className="font-medium">
                                    New Password
                                </label>
                                <div
                                    className={
                                        errors.password?.message
                                            ? 'input-settings input-danger mt-3'
                                            : 'input-settings mt-3'
                                    }
                                >
                                    <input
                                        className="w-full input-ss"
                                        id="inputPass"
                                        type={isShowPassWord ? 'text' : 'password'}
                                        {...register('password', {
                                            required: {
                                                value: true,
                                                message: 'Please enter New Password',
                                            },
                                            minLength: {
                                                value: 8,
                                                message: 'New Password length must be 8 characters',
                                            },
                                            maxLength: {
                                                value: 16,
                                                message: 'New Password length max 16 characters',
                                            },
                                        })}
                                    />
                                    {passwordValue && (
                                        <div className="display-pass mr-5 cursor-pointer">
                                            <span onClick={(e) => handleShowPassword(e)}>
                                                {isShowPassWord ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <ErrorMessage
                                    errors={errors}
                                    name="password"
                                    render={({ messages }) =>
                                        messages &&
                                        Object.entries(messages).map(([type, message]) => (
                                            <span className="text-danger ml-4 mt-2 text-lg font-medium" key={type}>
                                                {message}
                                            </span>
                                        ))
                                    }
                                />
                            </div>
                            <div className="d-flex flex-column mt-3">
                                <label htmlFor="inputPassConfirm" className="font-medium">
                                    Confirm Password
                                </label>
                                <div
                                    className={
                                        errors.password_confirmation?.message
                                            ? 'input-settings input-danger mt-3'
                                            : 'input-settings mt-3'
                                    }
                                >
                                    <input
                                        className="w-full input-ss"
                                        id="inputPassConfirm"
                                        type={isShowConfirmPassWord ? 'text' : 'password'}
                                        {...register('password_confirmation', {
                                            required: {
                                                value: true,
                                                message: 'Please enter Confirm Password',
                                            },
                                            minLength: {
                                                value: 8,
                                                message: 'Confirm Password length must be 8 characters',
                                            },
                                            maxLength: {
                                                value: 16,
                                                message: 'Confirm Password length max 16 characters',
                                            },
                                            validate: (value: any) => {
                                                if (value.length >= 8)
                                                    if (watch('password') !== value && value) {
                                                        return 'Confirm Password  do not match New Password';
                                                    }
                                            },
                                        })}
                                    />
                                    {confirmPassword && (
                                        <div className="display-pass mr-5 cursor-pointer">
                                            <span onClick={(e) => handleShowConfirmPassword(e)}>
                                                {isShowConfirmPassWord ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <ErrorMessage
                                    errors={errors}
                                    name="password_confirmation"
                                    render={({ messages }) =>
                                        messages &&
                                        Object.entries(messages).map(([type, message]) => (
                                            <span className="text-danger ml-4 mt-2 text-lg font-medium" key={type}>
                                                {message}
                                            </span>
                                        ))
                                    }
                                />
                            </div>

                            <div className="d-flex flex-column mt-5">
                                <button
                                    type="submit"
                                    className="w-1/4 btn btn-primary-fixer btn-primary font-semibold py-3 fs-4"
                                >
                                    Confirm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Copyright />
        </div>
    );
};

export default Setting;
