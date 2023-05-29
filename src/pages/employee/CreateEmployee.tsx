/* eslint-disable react-hooks/exhaustive-deps */
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
    Employee,
} from '../../Types/employee';
import { Button, SelectChangeEvent } from '@mui/material';
import {
    addEmployee,
    changeValueEmployeeUpdate,
    changeValueFormEmployeeInfo,
    removeValueFormEmployeeInfo,
    updateEmployee,
} from '../Redux/employee.slice';
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
    const [valueTab, setValueTab] = React.useState(0);
    const [isActiveAdd, setIsActiveAdd] = useState(false);
    const [isActiveAddInfo, setIsActiveAddInfo] = useState(false);
    const [isActiveAddContract, setIsActiveAddContract] = useState(false);
    const [isActiveAddSalary, setIsActiveAddSalary] = useState(false);

    const dispatch = useAppDispatch();
    dispatch(loginSuccess(true));
    const loadingLogin = useAppSelector((state) => state.company.loadingLogin);
    const { employee } = useAppSelector((state) => state.employee);
    const { idEmployee } = useParams();

    // state employee Information form
    const [formEmployeeInfomation, setFormEmployeeInfomation] = useState<FormEmployeeInformation>({
        staff_id: '',
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

    // handle create or update employee
    const handleCreateOrUpdateEmployee = () => {
        if (idEmployee) {
            dispatch(updateEmployee(Number(idEmployee)));
        } else {
            dispatch(addEmployee());
        }
        setTimeout(() => {
            navigate(ROUTES.employee);
        }, 250);
    };

    // handle change TabPanel
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValueTab(newValue);

        if (
            !employee.name &&
            !employee.gender &&
            !employee.dob &&
            !employee.ktp_no &&
            !employee.nc_id &&
            newValue !== 0
        ) {
            setIsActiveAddInfo(true);
        }
        if (!employee.contract_start_date && !employee.type && newValue !== 1) {
            setIsActiveAddContract(true);
        }
        if (
            !String(employee.basic_salary) ||
            !String(employee.audit_salary) ||
            !String(employee.safety_insurance) ||
            !String(employee.health_insurance) ||
            (!String(employee.meal_allowance) && newValue !== 3)
        ) {
            setIsActiveAddSalary(true);
        }
    };

    // handle get data when update employee
    const handleCheckActiceTabPanel = () => {
        if (
            employee.name &&
            (employee.gender || employee.gender == 0) &&
            employee.dob &&
            employee.ktp_no &&
            employee.nc_id
        ) {
            setIsActiveAddInfo(false);
        } else {
            setTimeout(() => {
                setIsActiveAddInfo(true);
            }, 2000);
        }
        if (employee.contract_start_date && employee.type) {
            setIsActiveAddContract(false);
        }
        if (
            String(employee.basic_salary) &&
            String(employee.audit_salary) &&
            String(employee.safety_insurance) &&
            String(employee.health_insurance) &&
            String(employee.meal_allowance)
        ) {
            setIsActiveAddSalary(false);
        }
    };

    const handleActiveButtonAdd = () => {
        if (!isActiveAddInfo && !isActiveAddContract && !isActiveAddSalary) {
            setIsActiveAdd(true);
        } else {
            setIsActiveAdd(false);
        }
    };

    useEffect(() => {
        handleCheckActiceTabPanel();
        handleActiveButtonAdd();
    }, [handleCheckActiceTabPanel]);

    console.log('activeTab Button', isActiveAdd);

    useEffect(() => {
        if (idEmployee) {
            dispatch(changeValueEmployeeUpdate(Number(idEmployee)));
        } else {
            dispatch(removeValueFormEmployeeInfo());
        }
    }, [idEmployee, dispatch]);

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
                            <Button
                                onClick={handleCreateOrUpdateEmployee}
                                type="submit"
                                className="h-20 w-64 button-save-change"
                            >
                                Save Change
                            </Button>
                        ) : (
                            <Button
                                disabled={!isActiveAdd}
                                onClick={handleCreateOrUpdateEmployee}
                                type="submit"
                                className={`h-20 w-32 ${
                                    isActiveAdd ? 'button-save-change' : ' button-not-save-change'
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
                        value={valueTab}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                    >
                        <Tab
                            icon={
                                isActiveAddInfo ? (
                                    <ErrorOutlineRoundedIcon style={{ fontSize: 22, color: '#FFB7B9' }} />
                                ) : (
                                    ''
                                )
                            }
                            iconPosition={'end'}
                            className={` ${isActiveAddInfo ? 'tab-button-error' : 'tab-button'} `}
                            component="button"
                            label="Employee Information"
                            {...a11yProps(0)}
                        />
                        <Tab
                            icon={
                                isActiveAddContract ? (
                                    <ErrorOutlineRoundedIcon style={{ fontSize: 22, color: '#FFB7B9' }} />
                                ) : (
                                    ''
                                )
                            }
                            iconPosition={'end'}
                            className={` ${isActiveAddContract ? 'tab-button-error' : 'tab-button'} `}
                            component="button"
                            label="Contract Information"
                            {...a11yProps(1)}
                        />
                        <Tab className="tab-button" component="button" label="Employment Details" {...a11yProps(2)} />
                        <Tab
                            icon={
                                isActiveAddSalary ? (
                                    <ErrorOutlineRoundedIcon style={{ fontSize: 22, color: '#FFB7B9' }} />
                                ) : (
                                    ''
                                )
                            }
                            iconPosition={'end'}
                            className={` ${isActiveAddSalary ? 'tab-button-error' : 'tab-button'} `}
                            component="button"
                            label="Salary & Wages"
                            {...a11yProps(3)}
                        />
                        <Tab className="tab-button" component="button" label="Others" {...a11yProps(4)} />
                    </Tabs>
                </Box>

                <div className="employee-container mt-5 bg-white rounded-3xl">
                    <div className="px-0 w-full">
                        <div className="">
                            <TabPanel value={valueTab} index={0}>
                                <EmployeeInfomation
                                    FormEmployeeInformation={formEmployeeInfomation}
                                    handleFormEmployeeChange={handleFormEmployeeChange}
                                />
                            </TabPanel>
                            <TabPanel value={valueTab} index={1}>
                                <ContactInfomation
                                    formContractEmployee={formContractEmployee}
                                    handleFormContractChange={handleFormContractChange}
                                />
                            </TabPanel>
                            <TabPanel value={valueTab} index={2}>
                                <EmployeeDetails
                                    formDetailEmployee={formDetailEmployee}
                                    handleFormDetailChange={handleFormDetailChange}
                                />
                            </TabPanel>
                            <TabPanel value={valueTab} index={3}>
                                <EmployeeSalary
                                    formSalaryEmployee={formSalaryEmployee}
                                    handleFormSalaryChange={handleFormSalaryChange}
                                />
                            </TabPanel>
                            <TabPanel value={valueTab} index={4}>
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

// const handleFormDetailChange = useCallback(
//     debounce((e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
//       const { name } = e.target;
//       let value: any;
//       value = e.target.value;
//       setFormDetailEmployee((prevValues) => ({ ...prevValues, [name]: value }));
//       dispatch(changeValueFormEmployeeInfo({ name, value }));
//     }, 300), // Thay đổi thời gian chờ debounce tùy theo yêu cầu của bạn
//     [dispatch, setFormDetailEmployee]
//   );

//   useEffect(() => {
//     return () => {
//       handleFormDetailChange.cancel(); // Hủy bỏ debounce khi component bị unmount
//     };
//   }, [handleFormDetailChange]);

// check data when adding employee
// const handleActiveAddEmployee = () => {
//     if (
//         employee.name &&
//         (employee.gender || employee.gender === 0) &&
//         employee.dob &&
//         employee.ktp_no &&
//         employee.nc_id
//     ) {
//         setIsActiveAdd(true);
//     } else {
//         setIsActiveAdd(false);
//     }
// };
// const handleActiveAddEmployeeContact = () => {
//     if (employee.contract_start_date && employee.type) {
//         setIsActiveAddContract(true);
//     } else {
//         setIsActiveAddContract(false);
//     }
// };
// const handleActiveAddEmployeeSalary = () => {
//     if (
//         (employee.basic_salary || employee.basic_salary === 0) &&
//         (employee.audit_salary || employee.basic_salary === 0) &&
//         (employee.safety_insurance || employee.safety_insurance === 0) &&
//         (employee.health_insurance || employee.health_insurance === 0) &&
//         (employee.meal_allowance || employee.meal_allowance === 0)
//     ) {
//         setIsActiveAddSalary(true);
//     } else {
//         setIsActiveAddSalary(false);
//     }
// };

// useEffect(() => {
//     setTimeout(() => {
//         handleActiveAddEmployee();
//         handleActiveAddEmployeeContact();
//         handleActiveAddEmployeeSalary();
//     }, 500);
// }, [handleActiveAddEmployee, handleActiveAddEmployeeContact, handleActiveAddEmployeeSalary]);
