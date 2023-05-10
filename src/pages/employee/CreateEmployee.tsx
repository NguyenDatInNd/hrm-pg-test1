import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { loginSuccess } from '../Redux/company.slice';
import { Link } from 'react-router-dom';
import SubHeader from '../../components/Header/SubHeader';

const CreateEmployee = () => {
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

                <div className="employee-container mt-5 bg-white rounded-3xl">
                    <div className="p-3 w-full">
                        <div className="border-b border-gray-200 pb-3">
                            <div className="flex items-center justify-end gap-2">
                                <Link className="btn-employee btn-e-add" to="/employee/create-or-update">
                                    Add
                                </Link>
                                <button
                                    className="btn-employee"
                                    onClick={(e) => {
                                        e.preventDefault();
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

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
