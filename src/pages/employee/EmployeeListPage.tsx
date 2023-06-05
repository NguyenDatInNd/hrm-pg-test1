import React, { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { loginSuccess } from '../Redux/company.slice';
import SubHeader from '../../components/Header/SubHeader';
import { MdDeleteOutline } from 'react-icons/md';
import './Employee.scss';
import EmployeeItem from './EmployeeItem';
import { deleteEmployeeEncode, getEmployeeList, getEmployeeListSearch } from '../Redux/employee.slice';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import addIcon from '../../assets/addIcon.svg';
import ClearIcon from '@mui/icons-material/Clear';
import { debounce } from 'lodash';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import SearchEmployee from '../../components/Search/SearchEmployee';
import { EmployeeList } from '../../Types/employee';
import { unwrapResult } from '@reduxjs/toolkit';
import Copyright from '../../components/Copyright';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const EmployeeListPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search');
    const page = searchParams.get('page');
    const { employeeList, employeeIddelete } = useAppSelector((state) => state.employee);
    const [openFirstModal, setOpenFirstModal] = React.useState(false);
    const [dataTables, setDataTables] = useState<EmployeeList>(employeeList);

    // API get list employee
    useEffect(() => {
        const promise = dispatch(getEmployeeList());
        return () => {
            promise.abort();
        };
    }, [dispatch]);

    // handle open/close modal
    const handleOpenFirstModal = () => {
        setOpenFirstModal(true);
    };
    const handleCloseFirstModal = () => {
        setOpenFirstModal(false);
    };

    // delete table
    const handleDeleteEmploy = () => {
        try {
            const updatePage =
                Number(page) === dataTables.last_page && employeeIddelete.length === dataTables.data.length
                    ? Number(page) - 1
                    : page;

            const queryParams = {
                page: String(updatePage),
            };
            const searchParams = new URLSearchParams(queryParams);
            navigate({
                pathname: '/employee',
                search: `${searchParams}`,
            });
            dispatch(deleteEmployeeEncode(employeeIddelete));
            setTimeout(() => {
                getDataEmployeeList(search, page);
            }, 250);
            setOpenFirstModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    // Search employee
    const getDataEmployeeList = useCallback(
        async (keywordSearch: string | null, currentPage: string | null) => {
            const resultAction = await dispatch(getEmployeeListSearch({ keywordSearch, currentPage }));
            unwrapResult(resultAction);
        },
        [dispatch],
    );

    useEffect(() => {
        setDataTables(employeeList);
    }, [employeeList]);

    useEffect(() => {
        (async () => {
            getDataEmployeeList(search, page);
        })();
    }, [search, page, getDataEmployeeList]);
    const handleSearchEmployee = debounce((keyword: string | '', page?: number) => {
        const queryParams: { search?: string; page: string } = keyword
            ? {
                  search: keyword,
                  page: '1',
              }
            : {
                  page: String(page ? page : dataTables.current_page),
              };

        const searchParams = new URLSearchParams(queryParams);
        navigate({
            pathname: '/employee',
            search: `${searchParams}`,
        });
    }, 500);

    return (
        <div className="mt-36 px-16">
            <div className="relative">
                <SubHeader category="General" title="Employee Management" subtitle={null} />
                <div className="search-employee absolute top-14 right-0">
                    <SearchEmployee search={search} onSearchEmployee={handleSearchEmployee} />
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
                                disabled={employeeIddelete.length ? false : true}
                                onClick={handleOpenFirstModal}
                                className={`flex items-center btn-employee ${
                                    employeeIddelete.length > 0 ? 'btn-e-delete' : ''
                                }`}
                            >
                                <MdDeleteOutline size={16} className=" -mt-1" />
                                <span className="ml-2">Delete</span>
                            </Button>
                        </div>
                    </div>
                    <EmployeeItem
                        employeeList={employeeList}
                        onChangePage={handleSearchEmployee}
                        currentPage={Number(page)}
                    />
                </div>
            </div>

            <Copyright />

            <div>
                <Modal
                    open={openFirstModal}
                    className={`${openFirstModal ? 'modalStyle' : ''}`}
                    onClose={handleCloseFirstModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className="modalITemStyleSecond">
                        <div className="flex items-center justify-between gap-3">
                            <span className=" text-center  font-semibold text-3xl">Delete</span>
                            <span onClick={handleCloseFirstModal} className="cursor-pointer">
                                <ClearIcon className="!h-8 !w-8 rounded-full font-semibold" />
                            </span>
                        </div>
                        <div className="w-full mt-4 font-semibold text-[#687076]">
                            <span>Are you sure you want to delete?</span>
                        </div>
                        <div className="mt-5 mb-2 flex gap-3">
                            <Button
                                onClick={handleCloseFirstModal}
                                className="button-signout-close  !text-[#11181c] w-[48%] !bg-[#f1f3f5]"
                            >
                                No
                            </Button>
                            <Button onClick={handleDeleteEmploy} className="button-signout w-[48%]">
                                Yes
                            </Button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
    );
};
export default EmployeeListPage;
