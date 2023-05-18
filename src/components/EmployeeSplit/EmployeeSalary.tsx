import React, { ChangeEvent } from 'react';
import SubTitleTable from '../Header/SubTitleTable';
import Input from '../FormItem/Input';
import { FormSalaryEmployee } from '../../Types/employee';
import { SelectChangeEvent } from '@mui/material';
type PropsTabEmployee = {
    formSalaryEmployee: FormSalaryEmployee;
    handleFormSalaryChange?: (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent) => void;
};

const EmployeeSalary = (props: PropsTabEmployee) => {
    const { formSalaryEmployee, handleFormSalaryChange } = props;

    console.log(formSalaryEmployee);

    return (
        <div>
            <SubTitleTable category="Salary & Wages" title="Required" />
            <div className="flex flex-col gap-9">
                <Input
                    type="number"
                    value={formSalaryEmployee.basic_salary}
                    name="basic_salary"
                    isRequired={true}
                    onChange={handleFormSalaryChange}
                    label="Basic Salary"
                    isRp
                />
                <Input
                    type="number"
                    value={formSalaryEmployee.audit_salary}
                    name="audit_salary"
                    isRequired={true}
                    onChange={handleFormSalaryChange}
                    label="Basic Salary (Audit)"
                    isRp
                />
                <Input
                    type="number"
                    value={formSalaryEmployee.safety_insurance}
                    name="safety_insurance"
                    isRequired={true}
                    onChange={handleFormSalaryChange}
                    label="Safety Insurance Amount"
                    isRp
                />
                <Input
                    type="number"
                    value={formSalaryEmployee.health_insurance}
                    name="health_insurance"
                    isRequired={true}
                    onChange={handleFormSalaryChange}
                    label="Healthy Insurance Amount"
                    isRp
                />
                <Input
                    type="number"
                    value={formSalaryEmployee.meal_allowance}
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
