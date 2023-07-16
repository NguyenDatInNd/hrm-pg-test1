import { SelectChangeEvent } from '@mui/material/Select';
import { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Employee } from '../../Types/employee';
import { employeeType } from '../../context/dataLink';
import InputComponentDatePicker from '../FormItem/InputComponentDatePicker';
import SelectInput from '../FormItem/SelectInput';
import SubTitleTable from '../Header/SubTitleTable';
import ContractUpload from '../Upload/ContractUpload';
type PropsFormDataEmployee = {
    employee: Employee;
    handleChangeValueFormDataEmployee?: (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent) => void;
};
const ContactInfomation = (props: PropsFormDataEmployee) => {
    const { employee } = props;
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
                    name="type"
                    isType
                />
            </div>

            <div className="mt-5">
                <ContractUpload />
            </div>
        </div>
    );
};

export default ContactInfomation;
