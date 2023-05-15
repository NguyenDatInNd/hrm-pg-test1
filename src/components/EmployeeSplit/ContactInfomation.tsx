import React, { ChangeEvent, useEffect } from 'react';
import SubTitleTable from '../Header/SubTitleTable';
import Input from '../FormItem/Input';
import { SelectChangeEvent } from '@mui/material/Select';
import SelectInput from '../FormItem/SelectInput';
import { employeeType } from '../../context/dataLink';
import { FormContractEmployee } from '../../Types/employee';

type PropsTabEmployee = {
    formContractEmployee: FormContractEmployee;
    handleFormContractChange?: (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent) => void;
};

const ContactInfomation = (props: PropsTabEmployee) => {
    const { formContractEmployee, handleFormContractChange } = props;

    return (
        <div>
            <SubTitleTable category="Contract Information" title="Required" />
            <div className="flex flex-col gap-11">
                <Input
                    isRequired={true}
                    type="date"
                    value={formContractEmployee.contract_start_date}
                    name="contract_start_date"
                    onChange={handleFormContractChange}
                    label="Date Start"
                />
                <SelectInput
                    data={employeeType}
                    label="Employee Type"
                    placeholder="Choose Type"
                    isRequired={true}
                    value={formContractEmployee.employee_id}
                    onChange={handleFormContractChange}
                    name="employee_id"
                    isType
                />
            </div>
        </div>
    );
};

export default ContactInfomation;
