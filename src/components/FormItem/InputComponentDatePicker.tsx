import { ChangeEvent, forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import './Input.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { FilledInput } from '@mui/material';
import { styled } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import InputAdornment from '@mui/material/InputAdornment';
import moment from 'moment';
import { useAppDispatch } from '../../store';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { changeValueFormEmployeeInfo } from '../../pages/Redux/employee.slice';
import datePicker from '../../assets/datePicker.svg';

const StyledFilledInput = styled(FilledInput)({
    height: '46px',
    padding: '8px 0px 8px 32px',
    borderRadius: '6px',
    fontSize: '16px',
    backgroundColor: 'rgb(241, 243, 245)',
    '& .MuiFilledInput-input': {
        padding: '12px',
        paddingLeft: '0',
    },
    '&.Mui-focused': {
        backgroundColor: 'rgba(0, 0, 0, 0.06)',
    },
    '&.MuiFilledInput-root:hover': {
        backgroundColor: 'rgb(241, 243, 245)',
    },
    '& .MuiTypography-root': {
        color: 'rgb(0, 106, 220)',
    },
});

type PropsInputDatePicker = {
    label?: string;
    isRequired?: boolean;
    name?: string;
    onChange?: (date: Date, event: ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    size?: string;
};

const InputComponentDatePicker = (props: PropsInputDatePicker) => {
    const { label, onChange, value, name, isRequired, size } = props;
    const [isValue, setIsValue] = useState(true);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const dispatch = useAppDispatch();
    const handleChangeDate = (date: Date, event: ChangeEvent<HTMLInputElement>) => {
        setStartDate(date);
        const formattedDate = moment(date).format('YYYY-MM-DD');

        if (name != undefined) {
            dispatch(changeValueFormEmployeeInfo({ name: name, value: formattedDate }));
        }
    };

    const handleDateBlur = () => {
        if (!startDate) {
            setIsValue(false);
        } else {
            setIsValue(true);
        }
    };

    const CustomInput = forwardRef(({ value, onClick, onChange }: any, ref: any) => (
        <StyledFilledInput
            onClick={onClick}
            onChange={onChange}
            disableUnderline={true}
            value={value}
            onBlur={handleDateBlur}
            startAdornment={
                <InputAdornment position="start" sx={{ color: 'blue' }}>
                    <span className="absolute  left-5">
                        <img src={datePicker} className="w-7" alt="" />
                    </span>
                </InputAdornment>
            }
            className={`w-full ${size === 'medium' && '!w-[260px]'}  ${size === 'small' && '!w-[230px]'}   ${
                !isValue && !startDate && 'input-danger'
            } `}
            endAdornment={
                <>
                    <InputAdornment
                        position="start"
                        sx={{
                            color: 'blue',
                            cursor: 'pointer',
                            '&:hover': { backgroundColor: 'rgba(215, 219, 223, 0.08)' },
                        }}
                    >
                        <div
                            className="pointer"
                            onClick={(e) => {
                                setStartDate(null);
                                if (name != undefined) {
                                    dispatch(changeValueFormEmployeeInfo({ name: name, value: '' }));
                                }
                                e.stopPropagation();
                            }}
                        >
                            {startDate && <ClearIcon style={{ color: 'rgb(104, 112, 118)' }}></ClearIcon>}
                        </div>
                    </InputAdornment>
                    <InputAdornment position="start" sx={{ color: 'blue' }}>
                        <ExpandMoreIcon style={{ color: 'rgb(104, 112, 118)' }} />
                    </InputAdornment>
                </>
            }
        />
    ));
    return (
        <div className="flex items-center h-12 ">
            <label
                htmlFor={label}
                className={`font-normal !text-2xl  
                   min-w-[162px] flex`}
            >
                {label}
                {isRequired ? <span className={`isRequired text-required font-normal `}>*</span> : ''}
            </label>
            <DatePicker
                selected={value != undefined && value != '' && value != null ? new Date(String(value)) : startDate}
                onChange={onChange ? onChange : handleChangeDate}
                name={name}
                calendarStartDay={1}
                fixedHeight
                dateFormat="yyyy/MM/dd"
                customInput={<CustomInput />}
            />
        </div>
    );
};

export default InputComponentDatePicker;
