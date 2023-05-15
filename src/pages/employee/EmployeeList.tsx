import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { loginSuccess } from '../Redux/company.slice';
import SubHeader from '../../components/Header/SubHeader';
import { BiSearch } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
import './Employee.scss';
import EmployeeItem from './EmployeeItem';
import { getEmployeeList } from '../Redux/employee.slice';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import addIcon from '../../assets/addIcon.svg';
import deleteIcon from '../../assets/deleteIcon.svg';
import deleteIconActive from '../../assets/deleteIconAction.svg';

const EmployeeList = () => {
    const dispatch = useAppDispatch();
    dispatch(loginSuccess(true));
    // const cookieValue = Cookies.get(ACCESS_TOKEN_KEY);
    // console.log(cookieValue);
    const loadingLogin = useAppSelector((state) => state.company.loadingLogin);
    const { employeeList, employeeIddelete } = useAppSelector((state) => state.employee);

    // API get list employee
    useEffect(() => {
        const promise = dispatch(getEmployeeList());
        return () => {
            promise.abort();
        };
    }, [dispatch]);

    console.log(employeeIddelete);

    return (
        <div className="mt-36 px-16">
            <div className="relative">
                <SubHeader category="General" title="Employee Management" subtitle={null} />
                <div className="search-employee absolute top-14 right-0">
                    <form action="">
                        <div className="search-action">
                            <div>
                                <BiSearch size={17} />
                            </div>
                            <div className="ml-2">
                                <input type="text" className="" placeholder="Search..." />
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="employee-container mt-5 bg-white rounded-3xl">
                <div className="p-3 w-full">
                    <div className="border-b border-gray-200 pb-3">
                        <div className="flex items-center justify-end gap-2">
                            <Link className="btn-employee btn-e-add" to="/employee/create-or-update">
                                <img src={addIcon} className="" alt="" />
                                <span className="ml-2">Add</span>
                            </Link>
                            <Button
                                className={`flex items-center btn-employee ${
                                    employeeIddelete.length > 0 ? 'btn-e-delete' : ''
                                }`}
                            >
                                {/* <img
                                    className="w-4 -mt-1"
                                    src={employeeIddelete.length > 0 ? deleteIconActive : deleteIcon}
                                    alt=""
                                /> */}
                                <MdDeleteOutline size={16} className=" -mt-1" />
                                <span className="ml-2">Delete</span>
                            </Button>
                        </div>
                    </div>
                    <EmployeeItem employeeList={employeeList} />
                    {/* employeeList={employeeList} */}
                </div>
            </div>

            <div className="mt-5 mb-5">
                <p className="fs-6 font-semibold text-gray-500 text-center">Copyright © 2022. All Rights Reserved</p>
            </div>
        </div>
    );
};
export default EmployeeList;
