/* eslint-disable react-hooks/rules-of-hooks */
import { ChangeEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SelectInput from '../FormItem/SelectInput';
import { SelectChangeEvent } from '@mui/material/Select';
import { FormEmployeeInformation } from '../../Types/employee';
import { useAppDispatch, useAppSelector } from '../../store';
import { getCompanyFixerLogin } from '../../pages/Redux/company.slice';
import { gender } from '../../context/dataLink';
import { getMarriageList } from '../../pages/Redux/employee.slice';
import SubTitleTable from '../Header/SubTitleTable';
import InputComponent from '../FormItem/InputComponent';

import InputComponentDatePicker from '../FormItem/InputComponentDatePicker';
type PropsTabEmployee = {
    FormEmployeeInformation: FormEmployeeInformation;
    handleFormEmployeeChange?: (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent) => void;
};

const EmployeeInfomation = (props: PropsTabEmployee) => {
    const dispatch = useAppDispatch();
    const { FormEmployeeInformation, handleFormEmployeeChange } = props;
    const { idEmployee } = useParams();
    const { marriageList, employee } = useAppSelector((state) => state.employee);
    // const { marriageList, employeeList } = useAppSelector((state) => state.employee);

    // get API Company
    useEffect(() => {
        const promise = dispatch(getCompanyFixerLogin());
        return () => {
            promise.abort();
        };
    }, [dispatch]);

    // Get API Marriage
    useEffect(() => {
        const promise = dispatch(getMarriageList());
        return () => {
            promise.abort();
        };
    }, [dispatch]);

    return (
        <div>
            <SubTitleTable category="Personal Information" title="Required" />
            <div className="flex pb-3 flex-wrap gap-32">
                <div className="flex flex-col gap-11 px-2.5">
                    {idEmployee ? (
                        <>
                            <InputComponent
                                disable
                                type="text"
                                value={employee.staff_id}
                                name="nik"
                                onChange={handleFormEmployeeChange}
                                label="NIK"
                            />
                        </>
                    ) : (
                        <></>
                    )}
                    <InputComponent
                        type="text"
                        value={employee.name}
                        name="name"
                        isRequired={true}
                        onChange={handleFormEmployeeChange}
                        label="Name"
                    />
                    <SelectInput
                        data={gender}
                        label="Gender"
                        placeholder="Choose Gender"
                        isRequired={true}
                        value={FormEmployeeInformation.gender}
                        onChange={handleFormEmployeeChange}
                        name="gender"
                    />
                    <InputComponent
                        type="text"
                        value={employee.mother_name}
                        name="mother_name"
                        onChange={handleFormEmployeeChange}
                        label="Mother Name"
                    />
                    <InputComponentDatePicker value={employee.dob} name="dob" label="Date of birth" isRequired />
                    <InputComponent
                        type="text"
                        value={employee.pob}
                        name="pob"
                        onChange={handleFormEmployeeChange}
                        label="Place of birth"
                    />
                    <InputComponent
                        type="text"
                        value={employee.ktp_no}
                        name="ktp_no"
                        isRequired={true}
                        onChange={handleFormEmployeeChange}
                        label="KTP No."
                    />
                    <InputComponent
                        type="text"
                        value={employee.nc_id}
                        name="nc_id"
                        isRequired={true}
                        onChange={handleFormEmployeeChange}
                        label="National Card ID"
                    />
                    <InputComponent
                        type="text"
                        value={employee.home_address_1}
                        name="home_address_1"
                        onChange={handleFormEmployeeChange}
                        label="Home Address 1"
                    />
                    <InputComponent
                        type="text"
                        value={employee.home_address_2}
                        name="home_address_2"
                        onChange={handleFormEmployeeChange}
                        label="Home Address 2"
                    />
                </div>
                <div className="flex flex-col gap-11 px-2.5">
                    <InputComponent
                        type="text"
                        value={employee.mobile_no}
                        name="mobile_no"
                        onChange={handleFormEmployeeChange}
                        label="Mobile No."
                    />
                    <InputComponent
                        type="text"
                        value={employee.tel_no}
                        name="tel_no"
                        onChange={handleFormEmployeeChange}
                        label="Tel No."
                    />
                    <SelectInput
                        data={marriageList}
                        label="Marriage Status"
                        placeholder="Choose Marriage Status"
                        value={FormEmployeeInformation.marriage_id}
                        onChange={handleFormEmployeeChange}
                        isNa
                        name="marriage_id"
                    />
                    <InputComponent
                        type="text"
                        value={employee.card_number}
                        name="card_number"
                        onChange={handleFormEmployeeChange}
                        label="Bank Card No."
                    />
                    <InputComponent
                        type="text"
                        value={employee.bank_account_no}
                        name="bank_account_no"
                        onChange={handleFormEmployeeChange}
                        label="Bank Account No."
                    />
                    <InputComponent
                        type="text"
                        value={employee.bank_name}
                        name="bank_name"
                        onChange={handleFormEmployeeChange}
                        label="Bank Name"
                    />
                    <InputComponent
                        type="text"
                        value={employee.family_card_number}
                        name="family_card_number"
                        onChange={handleFormEmployeeChange}
                        label="Family Card Number"
                    />
                    <InputComponent
                        type="text"
                        value={employee.safety_insurance_no}
                        name="safety_insurance_no"
                        onChange={handleFormEmployeeChange}
                        label="Safety Insurance No."
                    />
                    <InputComponent
                        type="text"
                        value={employee.health_insurance_no}
                        name="health_insurance_no"
                        onChange={handleFormEmployeeChange}
                        label="Health Insurance No."
                    />
                </div>
            </div>
        </div>
    );
};

export default EmployeeInfomation;
