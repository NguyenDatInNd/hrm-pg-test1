import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { BsCheckLg } from 'react-icons/bs';
import { AiOutlineMinus } from 'react-icons/ai';
import { EmployeeList } from '../../Types/employee';
import './Employee.scss';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '@mui/material';
import { useAppDispatch } from '../../store';
import { getIdEmployeeDelete } from '../Redux/employee.slice';
interface EmployeddItemType {
    employeeList: EmployeeList;
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

const EmployeeItem = ({ employeeList }: EmployeddItemType) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(18);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    // handle change of page navigation
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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

    // select item rows when selected
    const isRowSelected = (id: number) => selectedRows.includes(id);
    return (
        <div className="w-min-table w-max-table overflow-auto mt-3">
            <Paper>
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
                                            checked={
                                                // selectedRows.length === employeeList.data.length &&
                                                // employeeList.data.length > 0
                                                selectedRows.length > 0
                                            }
                                        />
                                        <span className="absolute">
                                            {selectedRows.length === employeeList.data.length &&
                                            employeeList.data.length > 0 ? (
                                                <BsCheckLg size={18} className="icon-checked" />
                                            ) : (
                                                ''
                                            )}

                                            {selectedRows.length > 0 &&
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
                            {employeeList.data
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
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
                                                        checked={selectedRows.includes(row.id)}
                                                    />
                                                    <span className="absolute">
                                                        {selectedRows.includes(row.id) ? (
                                                            <BsCheckLg size={18} className="icon-checked" />
                                                        ) : (
                                                            ''
                                                        )}
                                                    </span>
                                                </div>

                                                {/* <input
                                                    type="checkbox"
                                                    onChange={() => handleRowSelect(row.id)}
                                                    checked={selectedRows.includes(row.id)}
                                                /> */}
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
                                            <TableCell>{row.department_id === 1 ? 'Permanent' : 'null'}</TableCell>
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
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[18, 25, 100]}
                    component="div"
                    count={employeeList.data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
};

export default EmployeeItem;
