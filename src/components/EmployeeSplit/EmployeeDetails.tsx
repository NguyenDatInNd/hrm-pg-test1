import React, { ChangeEvent, useEffect, useState } from 'react';
import SubTitleTable from '../Header/SubTitleTable';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SelectInput from '../FormItem/SelectInput';
import { useAppDispatch, useAppSelector } from '../../store';
import { getDepartment, getPosition } from '../../pages/Redux/employee.slice';
import { FormDetailsEmployee } from '../../Types/employee';
import { SelectChangeEvent } from '@mui/material';
import BpCheckbox from '../Upload/CustomerChecked';

type PropsTabEmployee = {
    formDetailEmployee: FormDetailsEmployee;
    handleFormDetailChange?: (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent) => void;
};

interface CheckboxValues {
    entitledOT: boolean;
    mealAllowancePaid: boolean;
    operationalAllowancePaid: boolean;
    attendanceAllowancePaid: boolean;
}

const EmployeeDetails = (props: PropsTabEmployee) => {
    const dispatch = useAppDispatch();
    const { formDetailEmployee, handleFormDetailChange } = props;
    const { department, position } = useAppSelector((state) => state.employee);

    const [checkboxValues, setCheckboxValues] = useState<CheckboxValues>({
        entitledOT: false,
        mealAllowancePaid: false,
        operationalAllowancePaid: true,
        attendanceAllowancePaid: true,
    });

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        let updatedValues: CheckboxValues;
        if (name === 'entitledOT') {
            updatedValues = {
                ...checkboxValues,
                [name]: checked,
                operationalAllowancePaid: checked ? false : true,
                attendanceAllowancePaid: checked ? false : true,
            };
        } else {
            updatedValues = {
                ...checkboxValues,
                [name]: checked,
            };
        }
        setCheckboxValues(updatedValues);
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
                    value={formDetailEmployee.department_id}
                    onChange={handleFormDetailChange}
                    name="department_id"
                    isNa
                />
                <SelectInput
                    data={position}
                    label="Position"
                    placeholder="Choose Position"
                    value={formDetailEmployee.position_id}
                    onChange={handleFormDetailChange}
                    name="position_id"
                    isNa
                />
            </div>

            <div className="mt-5  px-2">
                <FormGroup className="flex flex-col gap-4">
                    <FormControlLabel
                        control={
                            <BpCheckbox
                                name="entitledOT"
                                checked={checkboxValues.entitledOT}
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
                                name="mealAllowancePaid"
                                checked={checkboxValues.mealAllowancePaid}
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
                                name="operationalAllowancePaid"
                                checked={checkboxValues.operationalAllowancePaid}
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
                                name="attendanceAllowancePaid"
                                checked={checkboxValues.attendanceAllowancePaid}
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
