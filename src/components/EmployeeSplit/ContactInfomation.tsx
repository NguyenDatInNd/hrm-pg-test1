import React, { ChangeEvent, useEffect } from 'react';
import SubTitleTable from '../Header/SubTitleTable';
import { SelectChangeEvent } from '@mui/material/Select';
import SelectInput from '../FormItem/SelectInput';
import { employeeType } from '../../context/dataLink';
import { Employee } from '../../Types/employee';
import ContractUpload from '../Upload/ContractUpload';
import InputComponentDatePicker from '../FormItem/InputComponentDatePicker';
import { useParams } from 'react-router-dom';
type PropsFormDataEmployee = {
    employee: Employee;
    handleChangeValueFormDataEmployee?: (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent) => void;
};
const ContactInfomation = (props: PropsFormDataEmployee) => {
    const { employee, handleChangeValueFormDataEmployee } = props;
    const { idEmployee } = useParams();

    return (
        <div>
            <SubTitleTable category="Contract Information" title="Required" />
            <div className="flex flex-col gap-11">
                <InputComponentDatePicker
                    isRequired={true}
                    value={employee.contract_start_date}
                    name="contract_start_date"
                    label="Date Start"
                    size="medium"
                />
                <SelectInput
                    disable={Boolean(idEmployee) && true}
                    data={employeeType}
                    label="Employee Type"
                    placeholder="Choose Type"
                    isRequired={true}
                    value={employee.type}
                    onChange={handleChangeValueFormDataEmployee}
                    name="type"
                    isType
                />
            </div>

            <div className="mt-5">
                <ContractUpload />
                {/* contractList={contractListInfo} */}
            </div>
        </div>
    );
};

export default ContactInfomation;
