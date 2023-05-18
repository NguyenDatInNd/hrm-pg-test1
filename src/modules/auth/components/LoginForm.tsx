import { MouseEvent, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './LoginForm.scss';
import { ErrorMessage } from '@hookform/error-message';
import { Link } from 'react-router-dom';
import { IsLoginParam } from '../../../Types/auth';
import { useAppDispatch, useAppSelector } from '../../../store';
import { getCompany } from '../../../pages/Redux/company.slice';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

type LoginFormProps = {
    onLogin(values: IsLoginParam): void;
};

const LoginForm = ({ onLogin }: LoginFormProps) => {
    const dispatch = useAppDispatch();
    const { companyList, loadingCompany } = useAppSelector((state) => state.company);
    const [isShowPassWord, setIsShowPassWord] = useState(false);

    // call API to get company
    useEffect(() => {
        const promise = dispatch(getCompany());
        return () => {
            promise.abort();
        };
    }, [dispatch]);

    // useForm
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm<IsLoginParam>({
        criteriaMode: 'all',
    });

    // onSubmit
    const onSubmit: SubmitHandler<IsLoginParam> = (data) => {
        onLogin(data);
    };

    // Watch for changes if input changed
    const passwordValue = watch('password');
    useEffect(() => {
        if (!passwordValue) {
            setIsShowPassWord(false);
        }
    }, [passwordValue]);

    // handleShowPass
    const handleShowPassword = (e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        setIsShowPassWord((prev) => !prev);
    };

    return (
        <div className="login-form-content">
            <form className="form_container" action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex flex-column mt-2">
                    <label htmlFor="inputUser" className="">
                        UserName
                    </label>
                    <div className={errors.username?.message ? 'input-self  input-danger mt-3' : 'input-self  mt-3'}>
                        <input
                            id="inputUser"
                            type="text"
                            className=""
                            {...register('username', {
                                required: {
                                    value: true,
                                    message: 'Please enter username',
                                },
                                maxLength: {
                                    value: 32,
                                    message: 'Username must be at least 32 characters',
                                },
                            })}
                        />
                    </div>
                    {/* <span className="text-danger fs-5">Username required !</span> */}
                    <ErrorMessage
                        errors={errors}
                        name="username"
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
                    <label htmlFor="inputPass" className="">
                        Password
                    </label>
                    <div className={errors.password?.message ? 'input-self  input-danger mt-3' : 'input-self  mt-3'}>
                        <input
                            className="w-90"
                            id="inputPass"
                            type={isShowPassWord ? 'text' : 'password'}
                            {...register('password', {
                                required: {
                                    value: true,
                                    message: 'Please enter Password',
                                },
                                // pattern: {
                                //     value: /^(?!\s).*$/,
                                //     message: 'Passwords must not have asterisks',
                                // },
                                minLength: {
                                    value: 8,
                                    message: 'Password length must be 8 characters',
                                },
                                maxLength: {
                                    value: 16,
                                    message: 'Password length max 16 characters',
                                },
                            })}
                        />

                        {passwordValue ? (
                            <div className="display-pass">
                                <span onClick={(e) => handleShowPassword(e)}>
                                    {isShowPassWord ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                                </span>
                            </div>
                        ) : (
                            ''
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
                    <label htmlFor="inputFac" className="">
                        Factory
                    </label>
                    <div className="mt-3">
                        <select
                            className={errors?.company_id?.message ? 'select-self input-danger' : 'select-self'}
                            defaultValue={''}
                            id="inputFac"
                            {...register('company_id', {
                                required: 'Please choose factory',
                            })}
                        >
                            <option value="" hidden>
                                Select Factory
                            </option>
                            {!loadingCompany ? (
                                <>
                                    {companyList.map((company) => {
                                        return (
                                            <option key={company.id} value={company.id}>
                                                {company.name}
                                            </option>
                                        );
                                    })}
                                </>
                            ) : (
                                <>
                                    <option value={1}>SMB</option>
                                    <option value={2}>DMF</option>
                                </>
                            )}
                        </select>
                    </div>

                    <ErrorMessage
                        errors={errors}
                        name="company_id"
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
                    <button type="submit" className="btn btn-primary-fixer btn-primary font-semibold py-3 fs-4">
                        Sign In
                    </button>
                </div>

                <div className="d-flex flex-column mt-3 mb-4">
                    <Link to="/forgot-password" className="text-center  text-primary">
                        Forgot Your Password?
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
