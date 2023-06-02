import React, { ChangeEvent, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../store';
import './Input.scss';
import Box from '@mui/material/Box';
import DatePicker from 'react-datepicker';
import moment from 'moment-timezone';
import datePicker from '../../assets/datePicker.svg';
import { MdKeyboardArrowDown } from 'react-icons/md';
import * as Yup from 'yup';
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

    const { label, onChange, upload, value, name, isRp, isRequired, type, disable } = props;
    const [isValueCheck, setIsValueCheck] = useState([name]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateChange = (date: Date | null, event: React.SyntheticEvent<any> | undefined) => {
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
    };

    return (
        <div>
            <Box component="form" className="form" noValidate autoComplete="off">
                <div className="flex flex-col">
                    <div className="flex  items-center h-12">
                        <label
                            htmlFor={label}
                            className={`font-normal !text-2xl ${
                                type === 'number' ? 'min-w-[220px]' : 'min-w-[162px]'
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
                                    isValueCheck[name] === '' && !value && 'input-danger'
                                }   ${Number(isValueCheck[name]) < 0 && 'input-danger'}`}
                            >
                                <span
                                    style={{ zIndex: 20 }}
                                    className="absolute text-2xl text-[#006adc] font-medium  left-"
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
                                className={`flex input-type  ${
                                    isValueCheck[name] === '' && !value && 'input-danger'
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
                                            className=" input-width  h-12 min-w-290 max-w-300 "
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
                    {isRequired && isValueCheck[name] === '' && errors[name]?.message && !value && (
                        <span
                            className={`text-danger mt-4 text-lg -mb-[10px] font-normal ${
                                type === 'number' ? 'ml-[230px]' : 'ml-[172px]'
                            }`}
                        >
                            {errors[name]?.message?.toString()}
                        </span>
                    )}

                    {/* Check value when value < 0 */}
                    {isRp && isRequired && errors[name]?.message && (
                        <span
                            className={`text-danger mt-4 text-lg -mb-[10px] font-normal ${
                                type === 'number' ? 'ml-[230px]' : 'ml-[172px]'
                            }`}
                        >
                            {isValueCheck[name] === ''
                                ? ''
                                : Number(isValueCheck[name]) < 0
                                ? 'Please input value min is 0'
                                : null}
                        </span>
                    )}
                </div>
            </Box>
        </div>
    );
};
export default InputComponent;
