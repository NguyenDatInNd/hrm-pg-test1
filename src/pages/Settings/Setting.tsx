import React from 'react';
import { useAppDispatch } from '../../store';
import { loginSuccess } from '../Redux/company.slice';
import SubHeader from '../../components/Header/SubHeader';
import { ErrorMessage } from '@hookform/error-message';
import { SubmitHandler, useForm } from 'react-hook-form';
import './Setting.scss';
import Copyright from '../../components/Copyright';

type Ispassword = {
    password: string;
    confirmPassword: string;
};

const Setting = () => {
    const dispatch = useAppDispatch();
    dispatch(loginSuccess(true));

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm<Ispassword>({
        criteriaMode: 'all',
    });

    const onSubmit: SubmitHandler<Ispassword> = (data) => {
        console.log(data);
    };

    return (
        <div className="mt-36 px-16">
            <div className="relative">
                <SubHeader category="General" title="Settings" subtitle={null} />
            </div>

            <div className="employee-container mt-4 bg-white rounded-3xl">
                <div className="p-4 w-full">
                    <div className="border-b border-gray-200 pb-3">
                        <h3 className="font-semibold text-4xl">Change Password</h3>
                    </div>

                    <div>
                        <form onSubmit={handleSubmit(onSubmit)} action="" className="form_container w-full">
                            <div className="d-flex flex-column mt-3">
                                <label htmlFor="inputPass" className="font-medium">
                                    New Password
                                </label>
                                <div
                                    className={
                                        errors.password?.message ? 'input-self  input-danger mt-3' : 'input-self  mt-3'
                                    }
                                >
                                    <input
                                        className="w-full input-ss "
                                        id="inputPass"
                                        type={'password'}
                                        {...register('password', {
                                            required: {
                                                value: true,
                                                message: 'Please enter New Password',
                                            },
                                            // pattern: {
                                            //     value: /^(?!\s).*$/,
                                            //     message: 'Passwords must not have asterisks',
                                            // },
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
                                        errors.confirmPassword?.message
                                            ? 'input-self  input-danger mt-3'
                                            : 'input-self  mt-3'
                                    }
                                >
                                    <input
                                        className="w-full input-ss"
                                        id="inputPassConfirm"
                                        type={'password'}
                                        {...register('confirmPassword', {
                                            required: {
                                                value: true,
                                                message: 'Please enter Confirm Password',
                                            },
                                            // pattern: {
                                            //     value: /^(?!\s).*$/,
                                            //     message: 'Passwords must not have asterisks',
                                            // },
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
                                </div>
                                <ErrorMessage
                                    errors={errors}
                                    name="confirmPassword"
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
