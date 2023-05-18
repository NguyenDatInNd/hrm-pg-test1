import React, { ChangeEvent, useEffect } from 'react';
import SubTitleTable from '../Header/SubTitleTable';
import Input from '../FormItem/Input';
import SelectInput from '../FormItem/SelectInput';
import { useAppDispatch, useAppSelector } from '../../store';
import { getDepartment, getPosition } from '../../pages/Redux/employee.slice';
import { FormDetailsEmployee } from '../../Types/employee';
import { SelectChangeEvent } from '@mui/material';

type PropsTabEmployee = {
    formDetailEmployee: FormDetailsEmployee;
    handleFormDetailChange?: (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent) => void;
};

const EmployeeDetails = (props: PropsTabEmployee) => {
    const dispatch = useAppDispatch();
    const { formDetailEmployee, handleFormDetailChange } = props;
    const { department, position } = useAppSelector((state) => state.employee);

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
            <div className="flex flex-col gap-11">
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
        </div>
    );
};
export default EmployeeDetails;
