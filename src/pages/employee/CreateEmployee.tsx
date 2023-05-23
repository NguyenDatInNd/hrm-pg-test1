/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import React, { useState, useCallback, ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { loginSuccess } from '../Redux/company.slice';
import { useNavigate, useParams } from 'react-router-dom';
import SubHeader from '../../components/Header/SubHeader';
import './Employee.scss';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EmployeeInfomation from '../../components/EmployeeSplit/EmployeeInfomation';
import {
    FormEmployeeInformation,
    FormContractEmployee,
    FormSalaryEmployee,
    FormDetailsEmployee,
} from '../../Types/employee';
import { Button, SelectChangeEvent } from '@mui/material';
import { addEmployee, changeValueFormEmployeeInfo, removeValueFormEmployeeInfo } from '../Redux/employee.slice';
import ContactInfomation from '../../components/EmployeeSplit/ContactInfomation';
import EmployeeDetails from '../../components/EmployeeSplit/EmployeeDetails';
import EmployeeSalary from '../../components/EmployeeSplit/EmployeeSalary';
import EmployeeOthers from '../../components/EmployeeSplit/EmployeeOthers';
import Copyright from '../../components/Copyright';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { ROUTES } from '../../configs/router';
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const CreateEmployee = () => {
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const [isActiveAdd, setIsActiveAdd] = useState(false);
    const [isActiveAddContract, setIsActiveAddContract] = useState(false);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const dispatch = useAppDispatch();
    dispatch(loginSuccess(true));
    // const cookieValue = Cookies.get(ACCESS_TOKEN_KEY);
    // console.log(cookieValue);
    const loadingLogin = useAppSelector((state) => state.company.loadingLogin);
    const { employee } = useAppSelector((state) => state.employee);
    const { idEmployee } = useParams();

    // state employee Information form
    const [formEmployeeInfomation, setFormEmployeeInfomation] = useState<FormEmployeeInformation>({
        nik: '',
        name: '',
        gender: '',
        mother_name: '',
        dob: '',
        pob: '',
        ktp_no: '',
        nc_id: '',
        home_address_1: '',
        home_address_2: '',
        mobile_no: '',
        tel_no: '',
        marriage_id: '',
        card_number: '',
        bank_account_no: '',
        bank_name: '',
        family_card_number: '',
        safety_insurance_no: '',
        health_insurance_no: '',
    });

    // state contract information form
    const [formContractEmployee, setFormContractEmployee] = useState<FormContractEmployee>({
        contract_start_date: '',
        type: '',
        contract: [],
    });

    // state employee Salary information
    const [formSalaryEmployee, setFormSalaryEmployee] = useState<FormSalaryEmployee>({
        basic_salary: 0,
        audit_salary: 0,
        safety_insurance: 0,
        health_insurance: 0,
        meal_allowance: 0,
    });

    // state employee detail information
    const [formDetailEmployee, setFormDetailEmployee] = useState<FormDetailsEmployee>({
        department_id: '',
        position_id: '',
    });

    // handle Add employee information Submitted
    const handleFormEmployeeChange = useCallback(
        (e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
            const { name } = e.target;
            const value = e.target.value;
            setFormEmployeeInfomation((prevValues) => ({ ...prevValues, [name]: value }));
            dispatch(changeValueFormEmployeeInfo({ name, value }));
        },
        [dispatch],
    );

    // handle Add contract information Submitted
    const handleFormContractChange = useCallback(
        (e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
            const { name } = e.target;
            const value = e.target.value;
            setFormContractEmployee((prevValues) => ({ ...prevValues, [name]: value }));
            dispatch(changeValueFormEmployeeInfo({ name, value }));
        },
        [dispatch],
    );
    // handle Add Salary Employee Information Submitted
    const handleFormSalaryChange = useCallback(
        (e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
            const { name } = e.target;
            let value: any;
            value = e.target.value;
            setFormSalaryEmployee((prevValues) => ({ ...prevValues, [name]: value }));
            dispatch(changeValueFormEmployeeInfo({ name, value }));
        },
        [dispatch],
    );

    // handle Add Detail Employee Information Submitted
    const handleFormDetailChange = useCallback(
        (e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
            const { name } = e.target;
            let value: any;
            value = e.target.value;
            setFormDetailEmployee((prevValues) => ({ ...prevValues, [name]: value }));
            dispatch(changeValueFormEmployeeInfo({ name, value }));
        },
        [dispatch],
    );

    // handle add employee
    const handleAddEmployee = () => {
        dispatch(addEmployee());
        setTimeout(() => {
            navigate(ROUTES.employee);
        }, 250);
        dispatch(removeValueFormEmployeeInfo());
    };

    console.log(employee);
    const handleActiveAddEmployee = () => {
        if (employee[0].name && employee[0].gender && employee[0].dob && employee[0].ktp_no && employee[0].nc_id) {
            setIsActiveAdd(true);
        } else {
            setIsActiveAdd(false);
            setIsActiveAddContract(false);
        }
    };
    const handleActiveAddEmployeeContact = () => {
        if (employee[0].contract_start_date && employee[0].type) {
            setIsActiveAddContract(true);
        } else {
            setIsActiveAddContract(false);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            handleActiveAddEmployee();
            handleActiveAddEmployeeContact();
        }, 1000);
    });

    return (
        <div className="mt-36 px-16">
            <div className="relative">
                <SubHeader
                    category="General"
                    title="Employee Management"
                    subtitle={` ${idEmployee ? 'Edit employee' : 'Add new employee'}`}
                />
                <div className="search-employee absolute top-14 right-0">
                    <div className="">
                        {idEmployee ? (
                            <Button type="submit" className="h-20 w-64 button-save-change">
                                Save Change
                            </Button>
                        ) : (
                            <Button
                                onClick={handleAddEmployee}
                                type="submit"
                                className={`h-20 w-32 ${
                                    isActiveAdd && isActiveAddContract
                                        ? 'button-save-change'
                                        : ' button-not-save-change'
                                } `}
                            >
                                Add
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <Box sx={{ width: '100%' }}>
                <Box>
                    <Tabs
                        className="tab-container"
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                    >
                        <Tab
                            icon={!isActiveAdd ? <ErrorOutlineRoundedIcon style={{ fontSize: 22 }} /> : ''}
                            iconPosition={'end'}
                            className={` ${isActiveAdd ? 'tab-button' : 'tab-button-error'} `}
                            component="button"
                            label="Employee Information"
                            {...a11yProps(0)}
                        />
                        <Tab
                            icon={!isActiveAddContract ? <ErrorOutlineRoundedIcon style={{ fontSize: 22 }} /> : ''}
                            iconPosition={'end'}
                            className={` ${isActiveAddContract ? 'tab-button' : 'tab-button-error'} `}
                            component="button"
                            label="Contract Information"
                            {...a11yProps(1)}
                        />
                        <Tab className="tab-button" component="button" label="Employment Details" {...a11yProps(2)} />
                        <Tab className="tab-button" component="button" label="Salary & Wages" {...a11yProps(3)} />
                        <Tab className="tab-button" component="button" label="Others" {...a11yProps(4)} />
                    </Tabs>
                </Box>

                <div className="employee-container mt-5 bg-white rounded-3xl">
                    <div className="px-0 w-full">
                        <div className="">
                            <TabPanel value={value} index={0}>
                                <EmployeeInfomation
                                    FormEmployeeInformation={formEmployeeInfomation}
                                    handleFormEmployeeChange={handleFormEmployeeChange}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <ContactInfomation
                                    formContractEmployee={formContractEmployee}
                                    handleFormContractChange={handleFormContractChange}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <EmployeeDetails
                                    formDetailEmployee={formDetailEmployee}
                                    handleFormDetailChange={handleFormDetailChange}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                <EmployeeSalary
                                    formSalaryEmployee={formSalaryEmployee}
                                    handleFormSalaryChange={handleFormSalaryChange}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={4}>
                                <EmployeeOthers />
                            </TabPanel>
                        </div>
                    </div>
                </div>
            </Box>

            <Copyright />
        </div>
    );
};

export default CreateEmployee;
