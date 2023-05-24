import React, { ChangeEvent } from 'react';
import SubTitleTable from '../Header/SubTitleTable';
import Input from '../FormItem/InputDatePicker';
import { FormSalaryEmployee } from '../../Types/employee';
import { SelectChangeEvent } from '@mui/material';
import InputComponent from '../FormItem/InputComponent';
import { useAppSelector } from '../../store';
type PropsTabEmployee = {
    formSalaryEmployee: FormSalaryEmployee;
    handleFormSalaryChange?: (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent) => void;
};

const EmployeeSalary = (props: PropsTabEmployee) => {
    const { formSalaryEmployee, handleFormSalaryChange } = props;
    const { employee } = useAppSelector((state) => state.employee);
    return (
        <div>
            <SubTitleTable category="Salary & Wages" title="Required" />
            <div className="flex flex-col gap-9">
                <InputComponent
                    type="number"
                    value={employee.basic_salary}
                    name="basic_salary"
                    isRequired={true}
                    onChange={handleFormSalaryChange}
                    label="Basic Salary"
                    isRp
                />
                <InputComponent
                    type="number"
                    value={employee.audit_salary}
                    name="audit_salary"
                    isRequired={true}
                    onChange={handleFormSalaryChange}
                    label="Basic Salary (Audit)"
                    isRp
                />
                <InputComponent
                    type="number"
                    value={employee.safety_insurance}
                    name="safety_insurance"
                    isRequired={true}
                    onChange={handleFormSalaryChange}
                    label="Safety Insurance Amount"
                    isRp
                />
                <InputComponent
                    type="number"
                    value={employee.health_insurance}
                    name="health_insurance"
                    isRequired={true}
                    onChange={handleFormSalaryChange}
                    label="Healthy Insurance Amount"
                    isRp
                />
                <InputComponent
                    type="number"
                    value={employee.meal_allowance}
                    name="meal_allowance"
                    isRequired={true}
                    onChange={handleFormSalaryChange}
                    label="Meal Allowance"
                    isRp
                />
            </div>
        </div>
    );
};

export default EmployeeSalary;
