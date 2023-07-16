import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import React, { ChangeEvent, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { MdKeyboardArrowDown } from 'react-icons/md';
import * as Yup from 'yup';
import datePicker from '../../assets/datePicker.svg';
import { setErrorsEmployee } from '../../pages/Redux/employee.slice';
import { useAppDispatch, useAppSelector } from '../../store';
import './Input.scss';
type PropsInput = {
    label: string;
    isRequired?: boolean;
    name: string | any;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string | number;
    type: string;
    isRp?: boolean;
    upload?: boolean;
    disable?: boolean;
};

const InputComponent = (props: PropsInput) => {
    const schema = Yup.object().shape({
        name: Yup.string().required('Please input Name'),
        gender: Yup.string().required('Please input Gender'),
        ktp_no: Yup.string().required('Please input KTP No'),
        nc_id: Yup.string().required('Please input National Card ID'),
        basic_salary: Yup.number().typeError('Please input Salary').required().min(1, 'Please input Salary'),
        audit_salary: Yup.number()
            .typeError('Please input Salary (Audit)')
            .required()
            .min(1, 'Please input Salary (Audit)'),
        safety_insurance: Yup.number()
            .typeError('Please input Safety Insurance Amount')
            .required()
            .min(1, 'Please input Safety Insurance Amount'),
        meal_allowance: Yup.number()
            .typeError('Please input Meal Allowance')
            .required()
            .min(1, 'Please input Meal Allowance'),
        health_insurance: Yup.number()
            .typeError('Please input Healthy Insurance Amount')
            .required()
            .min(1, 'Please input Healthy Insurance Amount'),
    });

    const dispatch = useAppDispatch();
    const { label, onChange, upload, value, name, isRp, isRequired, type, disable } = props;
    const [isValueCheck, setIsValueCheck] = useState([name]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const erorrsEmployee = useAppSelector((state) => state.employee.errorsEmployee);
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const {
        register,
        control,
        formState: { errors },
        trigger,
    } = useForm({ resolver: yupResolver(schema) });

    useEffect(() => {
        // Kiểm tra lỗi khi ô input blur
        trigger(name);
    }, [name, trigger]);

    const handleIsValueCheck = () => {
        setIsValueCheck((prevValues) => ({ ...prevValues, [name]: value }));
        trigger(name);
        dispatch(setErrorsEmployee(errors));
    };

    return (
        <div>
            <Box component="form" className="form" noValidate autoComplete="off">
                <div className="flex flex-col">
                    <div className="flex  items-center h-12">
                        <label
                            htmlFor={label}
                            className={`font-medium !text-2xl ${
                                type === 'number' ? 'min-w-[220px]' : 'min-w-[170px]'
                            }  ${upload && 'min-w-[120px]'} flex`}
                        >
                            {label}
                            {isRequired ? <span className={`isRequired text-required font-normal `}>*</span> : ''}
                        </label>

                        {type === 'date' ? (
                            <div className="relative">
                                <DatePicker
                                    name={name}
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    dateFormat="yyyy/MM/dd"
                                    isClearable
                                    className="input-type-date h-12 min-w-290 max-w-300 "
                                ></DatePicker>
                                <span className="absolute top-[1.35rem] left-5">
                                    <img src={datePicker} className="w-7" alt="" />
                                </span>
                                <span className="absolute top-6 right-3">
                                    <MdKeyboardArrowDown size={16} />
                                </span>
                            </div>
                        ) : isRp ? (
                            <div
                                className={`flex input-type  ${
                                    (!isValueCheck[name] || Number(isValueCheck[name]) < 0) &&
                                    (value === '' || Number(value) < 0) &&
                                    erorrsEmployee[name] &&
                                    'input-danger'
                                } `}
                            >
                                <span
                                    style={{ zIndex: 20 }}
                                    className="absolute text-2xl text-[#006adc] font-medium left-"
                                >
                                    Rp
                                </span>
                                <Controller
                                    control={control}
                                    name={name}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type={type}
                                            {...register(name, {
                                                required: `Please ${name} is not empty`,
                                            })}
                                            className=" input-width pl-10 text-2xl h-12 min-w-290 max-w-300 "
                                            value={value}
                                            onChange={onChange}
                                            onBlur={handleIsValueCheck}
                                            // onFocus={handleIsValueCheck}
                                        />
                                    )}
                                />
                            </div>
                        ) : isRequired ? (
                            <div
                                className={`flex input-type ${
                                    !isValueCheck[name] && erorrsEmployee[name] && !value && 'input-danger'
                                }  `}
                            >
                                <Controller
                                    control={control}
                                    name={name}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type={type}
                                            {...register(name, {
                                                required: {
                                                    value: true,
                                                    message: `Please ${name} is not empty`,
                                                },
                                                maxLength: {
                                                    value: 50,
                                                    message: 'Maximum length is 50 characters',
                                                },
                                                // required: `Please ${name} is not empty`,
                                            })}
                                            className=" input-width h-12 min-w-290 max-w-300 "
                                            value={value}
                                            onChange={onChange}
                                            onBlur={handleIsValueCheck}
                                            // onFocus={handleIsValueCheck}
                                        />
                                    )}
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <input
                                    disabled={disable && true}
                                    type={type}
                                    onChange={onChange}
                                    value={value}
                                    name={name}
                                    className={`input-type h-12 min-w-290 max-w-300  ${upload && 'max-w-[230px]'} ${
                                        disable && '!bg-[#0000001f]'
                                    }`}
                                />
                            </div>
                        )}
                    </div>
                    {isRequired && erorrsEmployee[name] && errors[name]?.message && !value && (
                        <span
                            className={`text-danger text-lg font-medium ${
                                type === 'number' ? 'ml-[230px]' : 'ml-[172px]'
                            } ${(isValueCheck[name] === '' || !value) && 'pl-4 pt-3 -mb-3'}`}
                        >
                            {erorrsEmployee ? erorrsEmployee[name] : ''}
                        </span>
                    )}

                    {/* Check value when value < 0 */}
                    {isRp &&
                        erorrsEmployee &&
                        isRequired &&
                        errors[name]?.message &&
                        (value === '' || Number(value) < 0) && (
                            <span
                                className={`text-danger mt-4 text-lg -mb-[10px] font-normal ${
                                    type === 'number' ? 'ml-[230px]' : 'ml-[172px]'
                                } `}
                            >
                                {!isValueCheck[name] ? '' : 'Please input value min is 0'}
                            </span>
                        )}
                </div>
            </Box>
        </div>
    );
};
export default InputComponent;
