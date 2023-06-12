import { MouseEvent, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './LoginForm.scss';
import { ErrorMessage } from '@hookform/error-message';
import { Link } from 'react-router-dom';
import { IsLoginParam } from '../../../Types/auth';
import { useAppDispatch, useAppSelector } from '../../../store';
import { getCompany } from '../../../pages/Redux/company.slice';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { ROUTES } from '../../../configs/router';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomInputSelect, { customPaperProps } from '../../../components/FormItem/StyleSelectInput';

type LoginFormProps = {
    onLogin(values: IsLoginParam): void;
    loading: boolean;
};

const LoginForm = ({ onLogin, loading }: LoginFormProps) => {
    const dispatch = useAppDispatch();
    const { companyList } = useAppSelector((state) => state.company);
    const [isShowPassWord, setIsShowPassWord] = useState(false);
    const [selectedCompanyId, setSelectedCompanyId] = useState('');

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
                        <FormControl fullWidth>
                            <InputLabel
                                shrink={false}
                                className={`${!selectedCompanyId ? '' : '!hidden'}  !text-[#687076] !font-medium `}
                            >
                                Select Factory
                            </InputLabel>
                            <Select
                                className={`${
                                    errors?.company_id?.message && !selectedCompanyId && 'input-danger'
                                } select-self`}
                                displayEmpty
                                {...register('company_id', {
                                    required: 'Please enter factory',
                                })}
                                value={selectedCompanyId}
                                onChange={(e) => setSelectedCompanyId(e.target.value)}
                                input={<CustomInputSelect />}
                                MenuProps={{
                                    PaperProps: customPaperProps,
                                }}
                                IconComponent={ExpandMoreIcon}
                            >
                                {companyList.map((company) => (
                                    <MenuItem key={company.id} value={company.id}>
                                        {company.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    {errors.company_id && !selectedCompanyId && (
                        <span className="text-danger ml-4 mt-2 text-lg font-medium">{errors.company_id.message}</span>
                    )}
                </div>

                <div className="d-flex flex-column mt-5">
                    <button
                        disabled={loading}
                        type="submit"
                        className={`btn btn-primary-fixer btn-primary font-semibold py-3 fs-4  ${
                            loading && 'button-loading'
                        } `}
                    >
                        {loading ? (
                            <div>
                                <svg
                                    aria-hidden="true"
                                    className="inline-block w-8 h-8 text-center text-white animate-spin dark:text-gray-600 fill-white"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        className="text-slate-300"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                            </div>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </div>

                <div className="d-flex flex-column mt-3 mb-4">
                    <Link to={ROUTES.forgotpassword} className="text-center text-primary hover:underline">
                        Forgot Your Password?
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
