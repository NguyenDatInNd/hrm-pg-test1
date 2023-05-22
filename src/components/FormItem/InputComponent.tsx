import React, { ChangeEvent, useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../store';
import './Input.scss';
import Box from '@mui/material/Box';
import DatePicker from 'react-datepicker';
import moment from 'moment-timezone';
import datePicker from '../../assets/datePicker.svg';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { ChangeValueDateFormEmployeeInfo, changeValueFormContractDate } from '../../pages/Redux/employee.slice';
type PropsInput = {
    label: string;
    isRequired?: boolean;
    name: string | any;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string | number;
    type: string;
    isRp?: boolean;
    upload?: boolean;
};

const InputComponent = (props: PropsInput) => {
    const dispatch = useAppDispatch();
    const { label, onChange, upload, value, name, isRp, isRequired, type } = props;
    const [isValueCheck, setIsValueCheck] = useState([name]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateChange = (date: Date | null, event: React.SyntheticEvent<any> | undefined) => {
        const dateString = moment(date).format('YYYY/MM/DD');
        const formattedDate = dateString.replace(/\//g, '-');
        if (name === 'dob') {
            dispatch(ChangeValueDateFormEmployeeInfo(dateString));
        } else if (name === 'contract_start_date') {
            dispatch(changeValueFormContractDate(formattedDate));
        }

        setSelectedDate(date);
    };

    const {
        register,
        control,
        formState: { errors },
        trigger,
    } = useForm({});

    useEffect(() => {
        // Kiểm tra lỗi khi ô input blur
        trigger(name);
    }, [name, trigger]);
    const error = String(errors[name]?.message);

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
                                    // showYearDropdown
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
                            <div className="relative flex items-center">
                                <span
                                    style={{ zIndex: 20 }}
                                    className="absolute text-2xl text-[#006adc] font-medium  left-4"
                                >
                                    Rp
                                </span>

                                <input
                                    style={{ zIndex: 10 }}
                                    type={type}
                                    onChange={onChange}
                                    value={value}
                                    name={name}
                                    className="input-type !text-2xl !pl-14 h-12 min-w-290 max-w-300 "
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
                                                required: `Please ${name} is not empty`,
                                            })}
                                            className=" h-12 min-w-290 max-w-300 "
                                            value={value}
                                            onChange={onChange}
                                            onBlur={handleIsValueCheck}
                                            onFocus={handleIsValueCheck} // Kiểm tra lỗi khi ô input blur
                                        />
                                    )}
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <input
                                    type={type}
                                    onChange={onChange}
                                    value={value}
                                    name={name}
                                    className={`input-type h-12 min-w-290 max-w-300  ${upload && 'max-w-[230px]'}`}
                                />
                            </div>
                        )}
                    </div>
                    {isRequired && isValueCheck[name] === '' && errors[name]?.message && !value && (
                        <span
                            className={`text-danger mt-4 text-lg -mb-[10px] font-normal ${
                                type === 'number' ? 'ml-[220px]' : 'ml-[172px]'
                            }`}
                        >
                            {error}
                        </span>
                    )}
                </div>
            </Box>
        </div>
    );
};

export default InputComponent;

{
    /* {type === 'date' ? (
                            <div className="relative">
                                <DatePicker
                                    // showYearDropdown
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
                            <div className="relative flex items-center">
                                <span
                                    style={{ zIndex: 20 }}
                                    className="absolute text-2xl text-[#006adc] font-medium  left-4"
                                >
                                    Rp
                                </span>

                                <input
                                    style={{ zIndex: 10 }}
                                    type={type}
                                    onChange={onChange}
                                    value={value}
                                    name={name}
                                    className="input-type !text-2xl !pl-14 h-12 min-w-290 max-w-300 "
                                />
                            </div>
                        ) : isRequired ? (
                            <div className="flex">
                                <Controller
                                    control={control}
                                    name={name}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type={type}
                                            {...register(name, {
                                                required: `${name} is not empty`,
                                            })}
                                            className="input-type h-12 min-w-290 max-w-300 "
                                            value={value}
                                            onChange={onChange}
                                            onBlur={handleIsValueCheck}
                                            onFocus={handleIsValueCheck} // Kiểm tra lỗi khi ô input blur
                                        />
                                    )}
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <input
                                    type={type}
                                    onChange={onChange}
                                    value={value}
                                    name={name}
                                    className="input-type h-12 min-w-290 max-w-300 "
                                />
                            </div>
                        )} */
}
