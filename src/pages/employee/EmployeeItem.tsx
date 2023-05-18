import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { BsCheckLg } from 'react-icons/bs';
import { AiOutlineMinus } from 'react-icons/ai';
import { EmployeeList } from '../../Types/employee';
import './Employee.scss';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { getIdEmployeeDelete } from '../Redux/employee.slice';
import IconNoData from '../../assets/nodata.svg';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
interface EmployeddItemType {
    employeeList: EmployeeList;
    onChangePage: (keyword: string | '', page: number) => void;
    currentPage: number;
}
interface Column {
    id:
        | 'NIK'
        | 'Name'
        | 'Gender'
        | 'Bank Card No.'
        | 'Bank Account No.'
        | 'Family Card No.'
        | 'Marriage Status'
        | 'Mother Name'
        | 'Place of birth'
        | 'Date of birth'
        | 'Home Address'
        | 'National Card ID No.'
        | 'Date Start'
        | 'First Contract'
        | 'Second Contract'
        | 'End Contract'
        | 'Department'
        | 'Employee Type'
        | 'Salary Rp.'
        | 'Position'
        | 'O/T Paid'
        | 'Meal paid'
        | 'Meal Rp.'
        | 'Grading';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'NIK', label: 'NIK', minWidth: 100 },
    { id: 'Name', label: 'Name', minWidth: 150 },
    { id: 'Gender', label: 'Gender', minWidth: 70 },
    { id: 'Bank Card No.', label: 'Bank Card No.', minWidth: 140 },
    { id: 'Bank Account No.', label: 'Bank Account No.', minWidth: 150 },
    { id: 'Family Card No.', label: 'Family Card No.', minWidth: 150 },
    { id: 'Marriage Status', label: 'Marriage Status', minWidth: 150 },
    { id: 'Mother Name', label: 'Mother Name', minWidth: 150 },
    { id: 'Place of birth', label: 'Place of birth', minWidth: 150 },
    { id: 'Date of birth', label: 'Date of birth', minWidth: 150 },
    { id: 'Home Address', label: 'Home Address', minWidth: 200 },
    { id: 'National Card ID No.', label: 'National Card ID No.', minWidth: 170 },
    { id: 'Date Start', label: 'Date Start', minWidth: 130 },
    { id: 'First Contract', label: 'First Contract', minWidth: 150 },
    { id: 'Second Contract', label: 'Second Contract', minWidth: 150 },
    { id: 'End Contract', label: 'End Contract', minWidth: 150 },
    { id: 'Department', label: 'Department', minWidth: 150 },
    { id: 'Employee Type', label: 'Employee Type', minWidth: 150 },
    { id: 'Salary Rp.', label: 'Salary Rp.', minWidth: 150 },
    { id: 'Position', label: 'Position', minWidth: 150 },
    { id: 'O/T Paid', label: 'O/T Paid', minWidth: 100 },
    { id: 'Meal paid', label: 'Meal paid', minWidth: 100 },
    { id: 'Meal Rp.', label: 'Meal Rp.', minWidth: 100 },
    { id: 'Grading', label: 'Grading', minWidth: 100 },
];

const EmployeeItem = ({ employeeList, onChangePage, currentPage }: EmployeddItemType) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { employeeIddelete } = useAppSelector((state) => state.employee);
    const [loadingSniper, setLoadingSniper] = useState(true);

    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    // select row
    const handleRowSelect = (id: number) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter((rowId: number) => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const handleHeaderSelect = () => {
        setSelectedRows(selectedRows.length === employeeList.data.length ? [] : employeeList.data.map((row) => row.id));
    };

    const handleClearSelection = () => {
        setSelectedRows([]);
    };

    // get list id Employee Deleted
    useEffect(() => {
        dispatch(getIdEmployeeDelete(selectedRows));
    }, [dispatch, selectedRows]);

    const handleChangePagePanigation = (event: unknown, newPage: number) => {
        onChangePage('', newPage);
        setLoadingSniper(true);
    };
    setTimeout(() => {
        setLoadingSniper(false);
    }, 500);

    // select item rows when selected
    const isRowSelected = (id: number) => selectedRows.includes(id);

    // handle change value employee_id
    const handleChangeValuEmployeeType = (value: string) => {
        if (value === '0') {
            return 'Parmanent';
        } else if (value === '1') {
            return 'Part-time';
        } else if (value === '2') {
            return 'Contract';
        }
        return 'Unknown';
    };

    return (
        <div className="w-min-table w-max-table overflow-auto mt-3">
            <Paper>
                <div className="relative">
                    <TableContainer className=" h-[73vh]">
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">
                                        <div
                                            onClick={handleHeaderSelect}
                                            className="relative flex items-center justify-center"
                                        >
                                            {/* <Checkbox
                                            color="primary"
                                            checked={
                                                selectedRows.length > 0 &&
                                                selectedRows.length === employeeList.data.length
                                            }
                                            indeterminate={
                                                selectedRows.length > 0 &&
                                                selectedRows.length < employeeList.data.length
                                            }
                                            onChange={handleHeaderSelect}
                                            inputProps={{
                                                'aria-label': 'select all desserts',
                                            }}
                                            className="checkbox-root-color"
                                        /> */}
                                            <input
                                                type="checkbox"
                                                onChange={handleHeaderSelect}
                                                checked={employeeIddelete.length > 0}
                                            />
                                            <span className="absolute">
                                                {employeeIddelete.length === employeeList.data.length &&
                                                employeeList.data.length > 0 ? (
                                                    <BsCheckLg size={18} className="icon-checked" />
                                                ) : (
                                                    ''
                                                )}
                                                {selectedRows.length > 0 &&
                                                employeeIddelete.length > 0 &&
                                                selectedRows.length < employeeList.data.length ? (
                                                    <AiOutlineMinus size={12} className="icon-checked" />
                                                ) : (
                                                    ''
                                                )}
                                            </span>
                                        </div>
                                    </TableCell>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {employeeList.data.map((row) => {
                                    console.log('Day la row', row.employee_id);
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isRowSelected(row.id)}
                                            onClick={() => handleRowSelect(row.id)}
                                            onDoubleClick={() => {
                                                console.log(row.id);
                                                navigate(`/employee/create-or-update/${row.id}`);
                                            }}
                                            className={`cursor-pointer row-start-select  ${
                                                isRowSelected(row.id) ? 'row-selected' : ''
                                            } `}
                                        >
                                            <TableCell align="center">
                                                <div
                                                    onClick={() => handleRowSelect(row.id)}
                                                    className="relative flex items-center justify-center"
                                                >
                                                    {/* <Checkbox
                                                        color="primary"
                                                        onChange={() => handleRowSelect(row.id)}
                                                        checked={selectedRows.includes(row.id)}
                                                        inputProps={{
                                                            'aria-label': 'select all desserts',
                                                        }}
                                                    /> */}

                                                    <input
                                                        type="checkbox"
                                                        onChange={() => handleRowSelect(row.id)}
                                                        checked={
                                                            selectedRows.includes(row.id) &&
                                                            employeeIddelete.includes(row.id)
                                                        }
                                                    />
                                                    <span className="absolute">
                                                        {selectedRows.includes(row.id) ? (
                                                            <BsCheckLg size={18} className="icon-checked" />
                                                        ) : (
                                                            ''
                                                        )}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{row.staff_id}</TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.gender === 1 ? 'Female' : 'Male'}</TableCell>
                                            <TableCell>{row.card_number}</TableCell>
                                            <TableCell>{row.bank_account_no}</TableCell>
                                            <TableCell>{row.family_card_number}</TableCell>
                                            <TableCell>{row.marriage_code}</TableCell>
                                            <TableCell>{row.mother_name}</TableCell>
                                            <TableCell>{row.pob}</TableCell>
                                            <TableCell>{row.dob}</TableCell>
                                            <TableCell>{row.home_address_1}</TableCell>
                                            <TableCell>{row.nc_id}</TableCell>
                                            <TableCell>{row.contract_start_date}</TableCell>
                                            <TableCell>{row.contract_start_date}</TableCell>
                                            <TableCell>{row.card_number}</TableCell>
                                            <TableCell>{row.card_number}</TableCell>
                                            <TableCell>{row.department_name}</TableCell>
                                            <TableCell>{handleChangeValuEmployeeType(row.type)}</TableCell>
                                            <TableCell>{row.audit_salary}</TableCell>
                                            <TableCell>{row.position_name}</TableCell>
                                            <TableCell>{row.attendance_allowance_paid === 1 ? 'Yes' : 'No'}</TableCell>
                                            <TableCell>{row.attendance_allowance_paid === 1 ? 'Yes' : 'No'}</TableCell>
                                            <TableCell>{row.health_insurance}</TableCell>
                                            <TableCell>{row.grade_name}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>

                        {employeeList.data.length === 0 ? (
                            <div className="w-full ">
                                <div className="flex flex-col table-without-data items-center justify-center ">
                                    <img src={IconNoData} className="w-40" alt="" />
                                    <h3 className="font-semibold text-2xl mt-4">No data</h3>
                                    <p className="text-2xl mt-2 text-[#687076] font-medium">
                                        Your record will be synced here once it ready
                                    </p>
                                </div>
                            </div>
                        ) : (
                            ''
                        )}
                    </TableContainer>

                    {loadingSniper ? (
                        <div className="absolute flex top-50 left-1/2 items-center justify-center">
                            <div className="w-12 h-12 border-2 border-blue-700 border-solid rounded-full  animate-spin border-t-transparent"></div>
                        </div>
                    ) : (
                        ''
                    )}
                </div>

                <div className="flex items-center mt-3  border-t border-gray-200 gap-3 Panigation-container">
                    <div className="mt-3 mb-3">
                        <Pagination
                            className="Mui-container-pagination"
                            page={currentPage}
                            onChange={handleChangePagePanigation}
                            size={'large'}
                            shape={'rounded'}
                            count={employeeList.last_page}
                            showFirstButton
                            showLastButton
                        />
                    </div>

                    {employeeList && (
                        <Typography className=" mt-3 mb-3">
                            {employeeList.from} - {employeeList.to} of {employeeList.total}
                        </Typography>
                    )}
                </div>
            </Paper>
        </div>
    );
};

export default EmployeeItem;
