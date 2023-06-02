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
import { debounce } from 'lodash';

import { Button, SelectChangeEvent } from '@mui/material';
import {
    addEmployee,
    changeValueFormEmployeeInfo,
    getIdEmployeeUpdate,
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
import { addDataContract, getIdEmployeeContract } from '../Redux/contractUpload.slice';
import { addDataDocument } from '../Redux/documentUpload.slice';

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
    const dispatch = useAppDispatch();
    const { idEmployee } = useParams();
    const [valueTab, setValueTab] = React.useState(0);
    const [isActiveAdd, setIsActiveAdd] = useState(false);
    const [isActiveAddInfo, setIsActiveAddInfo] = useState(false);
    const [isActiveAddSalary, setIsActiveAddSalary] = useState(false);
    const [isActiveAddContract, setIsActiveAddContract] = useState(false);
    dispatch(loginSuccess(true));
    const loadingLogin = useAppSelector((state) => state.company.loadingLogin);
    const { employee, statusAdd, idEmployeeAdd } = useAppSelector((state) => state.employee);
    const { contractInfo, contractList } = useAppSelector((state) => state.contractUpload);
    const { dataFormDocument } = useAppSelector((state) => state.documentUpload);

    // handle Change Value FormData Employee in Redux
    const handleChangeValueFormDataEmployee = useCallback(
        (e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
            const { name, value } = e.target;
            dispatch(changeValueFormEmployeeInfo({ name, value }));
        },
        [dispatch],
    );

    // handle create or update employee
    const handleCreateOrUpdateEmployee = async () => {
        if (idEmployee) {
            await dispatch(updateEmployee(Number(idEmployee)));
            await dispatch(addDataContract({ id: idEmployee, formData: contractInfo }));
        } else {
            await dispatch(addEmployee());
            if (dataFormDocument.documents && dataFormDocument.documents.length > 0) {
                dispatch(addDataDocument({ formData: dataFormDocument }));
            }
        }

        navigate(ROUTES.employee);
    };

    console.log('formdata updated', dataFormDocument);

    // handle change TabPanel
    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
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
            !employee.basic_salary ||
            employee.basic_salary < 0 ||
            !employee.audit_salary ||
            employee.audit_salary < 0 ||
            !employee.safety_insurance ||
            employee.safety_insurance < 0 ||
            !employee.health_insurance ||
            employee.health_insurance < 0 ||
            !employee.meal_allowance_paid ||
            employee.meal_allowance_paid < 0
        ) {
            setIsActiveAddSalary(true);
            console.log('hihihi');
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
            }, 700);
        }
        if (employee.contract_start_date && employee.type) {
            setIsActiveAddContract(false);
        }
        if (
            String(employee.basic_salary) &&
            employee.basic_salary >= 0 &&
            String(employee.audit_salary) &&
            employee.audit_salary >= 0 &&
            String(employee.safety_insurance) &&
            employee.safety_insurance >= 0 &&
            String(employee.health_insurance) &&
            employee.health_insurance >= 0 &&
            String(employee.meal_allowance) &&
            employee.meal_allowance >= 0
        ) {
            setIsActiveAddSalary(false);
        }
    };

    // Effect salary & Wages
    const handleActiveButtonAdd = () => {
        if (!isActiveAddInfo && !isActiveAddContract && !isActiveAddSalary) {
            setIsActiveAdd(true);
        } else {
            setIsActiveAdd(false);
        }
    };

    // effect check tabpanel
    useEffect(() => {
        handleCheckActiceTabPanel();
        handleActiveButtonAdd();
        // if (
        //     !String(employee.basic_salary) ||
        //     employee.basic_salary < 0 ||
        //     !String(employee.audit_salary) ||
        //     employee.audit_salary < 0 ||
        //     !String(employee.safety_insurance) ||
        //     employee.safety_insurance < 0 ||
        //     !String(employee.health_insurance) ||
        //     employee.health_insurance < 0 ||
        //     !String(employee.meal_allowance_paid) ||
        //     employee.meal_allowance_paid < 0
        // ) {
        //     setTimeout(() => {
        //         setIsActiveAddSalary(true);
        //     }, 300);
        // }
    }, [handleCheckActiceTabPanel]);

    // effect find id employ when update
    useEffect(() => {
        if (idEmployee) {
            dispatch(getIdEmployeeUpdate(Number(idEmployee)));
        } else {
            dispatch(removeValueFormEmployeeInfo());
        }
    }, [idEmployee, dispatch]);

    // Effect Add contract upload
    console.log('contractInfo', contractInfo);

    // Effect get Data Contract upload, AddDataContract Upload
    useEffect(() => {
        if (idEmployee) {
            dispatch(getIdEmployeeContract(Number(idEmployee)));
        }

        if (statusAdd && employee.id > 0 && contractInfo.documents.length > 0) {
            dispatch(addDataContract({ id: String(employee.id), formData: contractInfo }));
        }
    }, [statusAdd, employee.id]);

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
                        onChange={handleChangeTab}
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
                                    employee={employee}
                                    handleChangeValueFormDataEmployee={handleChangeValueFormDataEmployee}
                                />
                            </TabPanel>
                            <TabPanel value={valueTab} index={1}>
                                <ContactInfomation
                                    employee={employee}
                                    handleChangeValueFormDataEmployee={handleChangeValueFormDataEmployee}
                                />
                            </TabPanel>
                            <TabPanel value={valueTab} index={2}>
                                <EmployeeDetails
                                    employee={employee}
                                    handleChangeValueFormDataEmployee={handleChangeValueFormDataEmployee}
                                />
                            </TabPanel>
                            <TabPanel value={valueTab} index={3}>
                                <EmployeeSalary
                                    employee={employee}
                                    handleChangeValueFormDataEmployee={handleChangeValueFormDataEmployee}
                                />
                            </TabPanel>
                            <TabPanel value={valueTab} index={4}>
                                <EmployeeOthers employee={employee} />
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
