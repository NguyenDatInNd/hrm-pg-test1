import React, { ChangeEvent, useEffect, useState } from 'react';
import SubTitleTable from '../Header/SubTitleTable';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SelectInput from '../FormItem/SelectInput';
import { useAppDispatch, useAppSelector } from '../../store';
import { changeValueFormEmployeeInfo, getDepartment, getPosition } from '../../pages/Redux/employee.slice';
import { Employee } from '../../Types/employee';
import { SelectChangeEvent } from '@mui/material';
import BpCheckbox from '../Upload/CustomerChecked';

type PropsFormDataEmployee = {
    employee: Employee;
    handleChangeValueFormDataEmployee?: (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent) => void;
};

interface CheckboxValues {
    entitle_ot: boolean;
    meal_allowance_paid: boolean;
    operational_allowance_paid: boolean;
    attendance_allowance_paid: boolean;
}

const EmployeeDetails = (props: PropsFormDataEmployee) => {
    const dispatch = useAppDispatch();
    const { employee, handleChangeValueFormDataEmployee } = props;
    const { department, position } = useAppSelector((state) => state.employee);
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        if (name === 'entitle_ot') {
            dispatch(changeValueFormEmployeeInfo({ name, value: Number(checked) }));
            dispatch(changeValueFormEmployeeInfo({ name: 'operational_allowance_paid', value: Number(!checked) }));
            dispatch(changeValueFormEmployeeInfo({ name: 'attendance_allowance_paid', value: Number(!checked) }));
        } else {
            dispatch(changeValueFormEmployeeInfo({ name, value: Number(checked) }));
        }
    };

    // get API Departments,Position
    useEffect(() => {
        const deparment = dispatch(getDepartment());
        const position = dispatch(getPosition());
        return () => {
            deparment.abort();
            position.abort();
        };
    }, [dispatch]);

    return (
        <div>
            <SubTitleTable category="Employment Details" title="Required" />
            <div className="flex flex-col gap-11 px-2">
                <SelectInput
                    data={department}
                    label="Department"
                    placeholder="Choose Department"
                    value={employee.department_id}
                    onChange={handleChangeValueFormDataEmployee}
                    name="department_id"
                    isNa
                />
                <SelectInput
                    data={position}
                    label="Position"
                    placeholder="Choose Position"
                    value={employee.position_id}
                    onChange={handleChangeValueFormDataEmployee}
                    name="position_id"
                    isNa
                />
            </div>

            <div className="mt-5  px-2">
                <FormGroup className="flex flex-col gap-4">
                    <FormControlLabel
                        control={
                            <BpCheckbox
                                name="entitle_ot"
                                checked={!!employee.entitle_ot}
                                onChange={handleCheckboxChange}
                            />
                        }
                        label="Entitled OT"
                        sx={{
                            '& .MuiSvgIcon-root': {
                                fontSize: 24,
                                color: '#30a46c',
                            },
                            '& .MuiFormControlLabel-label': {
                                fontSize: 14,
                            },
                        }}
                    />
                    <FormControlLabel
                        control={
                            <BpCheckbox
                                name="meal_allowance_paid"
                                checked={!!employee.meal_allowance_paid}
                                onChange={handleCheckboxChange}
                            />
                        }
                        label="Meal Allowance Paid"
                        sx={{
                            '& .MuiSvgIcon-root': {
                                fontSize: 24,
                                color: '#30a46c',
                            },
                            '& .MuiFormControlLabel-label': {
                                fontSize: 14,
                            },
                        }}
                    />
                    <FormControlLabel
                        disabled
                        checked
                        control={
                            <BpCheckbox
                                name="operational_allowance_paid"
                                checked={!!employee.operational_allowance_paid}
                                onChange={handleCheckboxChange}
                            />
                        }
                        label="Operational Allowance Paid"
                        sx={{
                            '& .MuiSvgIcon-root': {
                                fontSize: 24,
                                color: '#c1c8cdcc',
                            },
                            '& .MuiFormControlLabel-label': {
                                fontSize: 14,
                            },
                        }}
                    />
                    <FormControlLabel
                        disabled
                        checked
                        control={
                            <BpCheckbox
                                name="attendance_allowance_paid"
                                checked={!!employee.attendance_allowance_paid}
                                onChange={handleCheckboxChange}
                            />
                        }
                        label="Attendance Allowance Paid"
                        sx={{
                            '& .MuiSvgIcon-root': {
                                fontSize: 24,
                                color: '#c1c8cdcc',
                            },
                            '& .MuiFormControlLabel-label': {
                                fontSize: 14,
                            },
                        }}
                    />
                </FormGroup>
            </div>
        </div>
    );
};
export default EmployeeDetails;
