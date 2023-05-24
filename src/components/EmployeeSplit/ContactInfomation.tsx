import React, { ChangeEvent, useEffect } from 'react';
import SubTitleTable from '../Header/SubTitleTable';
import { SelectChangeEvent } from '@mui/material/Select';
import SelectInput from '../FormItem/SelectInput';
import { employeeType } from '../../context/dataLink';
import { FormContractEmployee } from '../../Types/employee';
import InputDatePicker from '../FormItem/InputDatePicker';
import ContractUpload from '../Upload/ContractUpload';
import { useAppDispatch, useAppSelector } from '../../store';

type PropsTabEmployee = {
    formContractEmployee: FormContractEmployee;
    handleFormContractChange?: (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent) => void;
};

const ContactInfomation = (props: PropsTabEmployee) => {
    const { formContractEmployee, handleFormContractChange } = props;
    const { contractListInfo } = useAppSelector((state) => state.employee);

    return (
        <div>
            <SubTitleTable category="Contract Information" title="Required" />
            <div className="flex flex-col gap-11">
                <InputDatePicker
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
                    value={formContractEmployee.type}
                    onChange={handleFormContractChange}
                    name="type"
                    isType
                />
            </div>

            <div className="mt-5">
                <ContractUpload contractList={contractListInfo} />
            </div>
        </div>
    );
};

export default ContactInfomation;
