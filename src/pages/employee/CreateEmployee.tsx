import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { loginSuccess } from '../Redux/company.slice';
import { Link } from 'react-router-dom';
import SubHeader from '../../components/Header/SubHeader';
import './Employee.scss';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const dispatch = useAppDispatch();
    dispatch(loginSuccess(true));
    // const cookieValue = Cookies.get(ACCESS_TOKEN_KEY);
    // console.log(cookieValue);
    const loadingLogin = useAppSelector((state) => state.company.loadingLogin);
    console.log(loadingLogin);

    return (
        <div className="mt-36 px-16">
            <form action="">
                <div className="relative">
                    <SubHeader category="General" title="Employee Management" subtitle="Add new employee" />
                    <div className="search-employee absolute top-14 right-0">
                        <div className="">
                            <button type="submit" className="h-20 w-32 text-gray-400 bg-gray-200 rounded-xl">
                                Add
                            </button>
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
                                className="tab-button"
                                component="button"
                                label="Employee Information"
                                {...a11yProps(0)}
                            />
                            <Tab
                                className="tab-button"
                                component="button"
                                label="Contract Information"
                                {...a11yProps(1)}
                            />
                            <Tab
                                className="tab-button"
                                component="button"
                                label="Employment Details"
                                {...a11yProps(2)}
                            />
                            <Tab className="tab-button" component="button" label="Salary & Wages" {...a11yProps(3)} />
                            <Tab className="tab-button" component="button" label="Others" {...a11yProps(4)} />
                        </Tabs>
                    </Box>

                    <div className="employee-container mt-5 bg-white rounded-3xl">
                        <div className="p-3 w-full">
                            <div className="border-b border-gray-200 pb-3">
                                <TabPanel value={value} index={0}>
                                    Employee Information
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    Contract Information
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    Employment Details
                                </TabPanel>
                                <TabPanel value={value} index={3}>
                                    Salary & Wages
                                </TabPanel>
                                <TabPanel value={value} index={4}>
                                    Others
                                </TabPanel>
                            </div>
                        </div>
                    </div>
                </Box>

                <div className="mt-5 mb-5">
                    <p className="fs-6 font-semibold text-gray-500 text-center">
                        Copyright © 2022. All Rights Reserved
                    </p>
                </div>
            </form>
        </div>
    );
};

export default CreateEmployee;
