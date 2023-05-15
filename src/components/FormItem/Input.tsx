import React, { ChangeEvent, memo, useState } from 'react';
import Box from '@mui/material/Box';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Input.scss';
import { useAppDispatch } from '../../store';
import { ChangeValueDateFormEmployeeInfo } from '../../pages/Redux/employee.slice';
import moment from 'moment-timezone';
import datePicker from '../../assets/datePicker.svg';
import { MdKeyboardArrowDown } from 'react-icons/md';

type PropsInput = {
    label: string;
    isRequired?: boolean;
    name: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    type: string;
};

const Input = (props: PropsInput) => {
    const dispatch = useAppDispatch();
    const { label, onChange, value, name, isRequired, type } = props;

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateChange = (date: Date | null, event: React.SyntheticEvent<any> | undefined) => {
        const dateString = moment(date).format('YYYY/MM/DD');
        dispatch(ChangeValueDateFormEmployeeInfo(dateString));
        setSelectedDate(date);
    };

    return (
        <Box component="form" className="form" noValidate autoComplete="off">
            <div className="flex  items-center h-12">
                <label htmlFor={label} className="font-normal !text-2xl min-w-[162px] flex">
                    {label}
                    {isRequired ? <span className={`isRequired text-required font-normal `}>*</span> : ''}
                </label>

                {/* Cách 1 với input thuần có type là date */}
                {/* <input
                    type={type}
                    onChange={onChange}
                    value={value}
                    name={name}
                    className="input-type h-12 min-w-290 max-w-300 "
                /> */}

                {/* Cách 2 : sử dụng date picker */}
                {type === 'text' ? (
                    <input
                        type={type}
                        onChange={onChange}
                        value={value}
                        name={name}
                        className="input-type h-12 min-w-290 max-w-300 "
                    />
                ) : (
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
                )}
            </div>
        </Box>
    );
};

export default memo(Input);
