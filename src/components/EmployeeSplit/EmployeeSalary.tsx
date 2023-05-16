import React from 'react';
import SubTitleTable from '../Header/SubTitleTable';
import Input from '../FormItem/Input';

const EmployeeSalary = () => {
    return (
        <div>
            <SubTitleTable category="Salary & Wages" title="Required" />
            <div className="flex flex-col gap-9">
                <Input
                    type="number"
                    value={''}
                    name="name"
                    isRequired={true}
                    onChange={() => {
                        return;
                    }}
                    label="Basic Salary"
                />
                <Input
                    type="number"
                    value={''}
                    name="name"
                    isRequired={true}
                    onChange={() => {
                        return;
                    }}
                    label="Basic Salary (Audit)"
                />
                <Input
                    type="number"
                    value={''}
                    name="name"
                    isRequired={true}
                    onChange={() => {
                        return;
                    }}
                    label="Safety Insurance Amount"
                />
                <Input
                    type="number"
                    value={''}
                    name="name"
                    isRequired={true}
                    onChange={() => {
                        return;
                    }}
                    label="Healthy Insurance Amount"
                />
                <Input
                    type="number"
                    value={''}
                    name="name"
                    isRequired={true}
                    onChange={() => {
                        return;
                    }}
                    label="Meal Allowance"
                />
            </div>
        </div>
    );
};

export default EmployeeSalary;
