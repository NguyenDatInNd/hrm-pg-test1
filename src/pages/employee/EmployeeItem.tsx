import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Employee, EmployeeList } from '../../Types/employee';
import './Employee.scss';

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
    { id: 'Employee Type', label: 'Employee Type', minWidth: 150 },
    { id: 'Position', label: 'Position', minWidth: 150 },
    { id: 'O/T Paid', label: 'O/T Paid', minWidth: 100 },
    { id: 'Meal paid', label: 'Meal paid', minWidth: 100 },
    { id: 'Meal Rp.', label: 'Meal Rp.', minWidth: 100 },
    { id: 'Grading', label: 'Grading', minWidth: 100 },
];

interface Data {
    id: number;
    name: string;
    code: string;
    population: number;
    size: number;
    density: number;
    testing: string;
    aue: string;
}

function createData(
    id: number,
    name: string,
    code: string,
    population: number,
    size: number,
    testing: string,
    aue: string,
): Data {
    const density = population / size;
    return { id, name, code, population, size, density, testing, aue };
}

const EmployeeItem = ({ employeeList }: EmployeddItemType) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // load Api
    console.log(employeeList.data);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [selectedRows, setSelectedRows] = useState<number[]>([]);
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

    return (
        <div className="w-min-table w-max-table overflow-auto">
            <Paper>
                <TableContainer className=" h-[73vh]">
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">
                                    <input
                                        type="checkbox"
                                        onChange={handleHeaderSelect}
                                        checked={
                                            selectedRows.length === employeeList.data.length &&
                                            employeeList.data.length > 0
                                        }
                                    />
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
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell align="center">
                                                <input
                                                    type="checkbox"
                                                    onChange={() => handleRowSelect(row.id)}
                                                    checked={selectedRows.includes(row.id)}
                                                />
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
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={employeeList.data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            {/* <div>
                {employeeList.map((employee, index) => {
                    return <div key={index}>{employee.id}</div>;
                })}
            </div> */}
        </div>
    );
};

export default EmployeeItem;
