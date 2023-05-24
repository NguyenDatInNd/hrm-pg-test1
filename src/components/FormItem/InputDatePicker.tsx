import React, { ChangeEvent, memo, useState } from 'react';
import Box from '@mui/material/Box';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Input.scss';
import { useAppDispatch, useAppSelector } from '../../store';
import {
    ChangeValueDateFormEmployeeInfo,
    changeValueFormContractDate,
    changeValueFormContractDateInfo,
} from '../../pages/Redux/employee.slice';
import moment from 'moment-timezone';
import datePicker from '../../assets/datePicker.svg';
import { MdKeyboardArrowDown } from 'react-icons/md';

type PropsInput = {
    label: string;
    isRequired?: boolean;
    name: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string | number;
    type: string;
    isRp?: boolean;
    upload?: boolean;
};

const InputDatePicker = (props: PropsInput) => {
    const dispatch = useAppDispatch();
    const { label, upload, onChange, value, name, isRp, isRequired, type } = props;
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isValue, setIsValue] = useState(true);
    const { employee } = useAppSelector((state) => state.employee);

    const handleDateChange = (date: Date | null, event: React.SyntheticEvent<any> | undefined) => {
        const dateString = moment(date).format('YYYY/MM/DD');
        const formattedDate = dateString.replace(/\//g, '-');
        if (name === 'dob') {
            dispatch(ChangeValueDateFormEmployeeInfo(dateString));
        } else if (name === 'contract_start_date') {
            dispatch(changeValueFormContractDate(formattedDate));
        } else if (name === 'contract_dates') {
            dispatch(changeValueFormContractDateInfo(dateString));
        } else if (!value) {
            setSelectedDate(null);
        }
        setSelectedDate(date);
    };

    const handleDateBlur = () => {
        if (!selectedDate) {
            setIsValue(false);
        } else {
            setIsValue(true);
        }
    };

    const handleFillValueDate = () => {
        return name === 'dob'
            ? moment(employee.dob).format('YYYY/MM/DD')
            : name === 'contract_start_date'
            ? moment(employee.contract_start_date).format('YYYY/MM/DD')
            : value === 'Invalid date' || selectedDate === null
            ? ''
            : '';
    };
    return (
        <Box component="form" className="form" noValidate autoComplete="off">
            <div className="flex  items-center h-12">
                <label
                    htmlFor={label}
                    className={`font-normal !text-2xl ${type === 'number' ? 'min-w-[220px]' : 'min-w-[162px]'} 
                     ${upload && 'min-w-[120px]'} flex`}
                >
                    {label}
                    {isRequired ? <span className={`isRequired text-required font-normal `}>*</span> : ''}
                </label>
                {type === 'date' && (
                    <div className="relative">
                        <DatePicker
                            // showYearDropdown
                            name={name}
                            selected={selectedDate}
                            onChange={handleDateChange}
                            onBlur={handleDateBlur}
                            dateFormat="yyyy/MM/dd"
                            value={employee.dob && employee.contract_start_date && handleFillValueDate()}
                            isClearable
                            className={`input-type-date  h-12 min-w-290 max-w-300  ${
                                !isValue && !selectedDate && 'input-danger'
                            }  ${upload && 'max-w-[230px]'} `}
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

// eslint-disable-next-line react-refresh/only-export-components
export default memo(InputDatePicker);

{
    /* Cách 1 với input thuần có type là date */
    /* <input
                    type={type}
                    onChange={onChange}
                    value={value}
                    name={name}
                    className="input-type h-12 min-w-290 max-w-300 "
                /> */
    /* Cách 2 : sử dụng date picker */
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
                        <span style={{ zIndex: 20 }} className="absolute text-2xl text-[#006adc] font-medium  left-4">
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
