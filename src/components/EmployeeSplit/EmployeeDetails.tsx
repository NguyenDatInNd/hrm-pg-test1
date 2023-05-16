import React, { useEffect } from 'react';
import SubTitleTable from '../Header/SubTitleTable';
import Input from '../FormItem/Input';
import SelectInput from '../FormItem/SelectInput';
import { useAppDispatch, useAppSelector } from '../../store';
import { getDepartment, getPosition } from '../../pages/Redux/employee.slice';

const EmployeeDetails = () => {
    const dispatch = useAppDispatch();
    const { department, position } = useAppSelector((state) => state.employee);

    // get API Departments
    useEffect(() => {
        const promise = dispatch(getDepartment());
        return () => {
            promise.abort();
        };
    }, [dispatch]);

    // get API Position
    useEffect(() => {
        const promise = dispatch(getPosition());
        return () => {
            promise.abort();
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
                    value={''}
                    onChange={() => {
                        return;
                    }}
                    name="employee_id"
                    isNa
                />
                <SelectInput
                    data={position}
                    label="Position"
                    placeholder="Choose Position"
                    value={''}
                    onChange={() => {
                        return;
                    }}
                    name="employee_id"
                    isNa
                />
            </div>
        </div>
    );
};

export default EmployeeDetails;
