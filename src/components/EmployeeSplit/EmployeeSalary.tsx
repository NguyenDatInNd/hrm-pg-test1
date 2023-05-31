import React, { ChangeEvent } from 'react';
import SubTitleTable from '../Header/SubTitleTable';
import { Employee } from '../../Types/employee';
import { SelectChangeEvent } from '@mui/material';
import InputComponent from '../FormItem/InputComponent';

type PropsFormDataEmployee = {
    employee: Employee;
    handleChangeValueFormDataEmployee?: (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent) => void;
};

const EmployeeSalary = (props: PropsFormDataEmployee) => {
    const { employee, handleChangeValueFormDataEmployee } = props;
    return (
        <div>
            <SubTitleTable category="Salary & Wages" title="Required" />
            <div className="flex flex-col gap-9">
                <InputComponent
                    type="number"
                    value={employee.basic_salary}
                    name="basic_salary"
                    isRequired={true}
                    onChange={handleChangeValueFormDataEmployee}
                    label="Basic Salary"
                    isRp
                />
                <InputComponent
                    type="number"
                    value={employee.audit_salary}
                    name="audit_salary"
                    isRequired={true}
                    onChange={handleChangeValueFormDataEmployee}
                    label="Basic Salary (Audit)"
                    isRp
                />
                <InputComponent
                    type="number"
                    value={employee.safety_insurance}
                    name="safety_insurance"
                    isRequired={true}
                    onChange={handleChangeValueFormDataEmployee}
                    label="Safety Insurance Amount"
                    isRp
                />
                <InputComponent
                    type="number"
                    value={employee.health_insurance}
                    name="health_insurance"
                    isRequired={true}
                    onChange={handleChangeValueFormDataEmployee}
                    label="Healthy Insurance Amount"
                    isRp
                />
                <InputComponent
                    type="number"
                    value={employee.meal_allowance}
                    name="meal_allowance"
                    isRequired={true}
                    onChange={handleChangeValueFormDataEmployee}
                    label="Meal Allowance"
                    isRp
                />
            </div>
        </div>
    );
};

export default EmployeeSalary;
