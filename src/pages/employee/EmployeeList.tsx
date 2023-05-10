import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { loginSuccess } from '../Redux/company.slice';
import SubHeader from '../../components/Header/SubHeader';
import { BiSearch } from 'react-icons/bi';
import './Employee.scss';
import EmployeeItem from './EmployeeItem';
import { getEmployeeList } from '../Redux/employee.slice';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    const dispatch = useAppDispatch();
    dispatch(loginSuccess(true));
    // const cookieValue = Cookies.get(ACCESS_TOKEN_KEY);
    // console.log(cookieValue);
    const loadingLogin = useAppSelector((state) => state.company.loadingLogin);
    const employeeList = useAppSelector((state) => state.employee.employeeList);
    console.log(loadingLogin);

    // API get list employee
    useEffect(() => {
        const promise = dispatch(getEmployeeList());
        return () => {
            promise.abort();
        };
    }, [dispatch]);

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
                                Add
                            </Link>
                            <button className="btn-employee">Delete</button>
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
