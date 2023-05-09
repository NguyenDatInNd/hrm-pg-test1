import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
    id: 'name' | 'code' | 'population' | 'size' | 'density';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
];

interface Data {
    id: number;
    name: string;
    code: string;
    population: number;
    size: number;
    density: number;
}

function createData(id: number, name: string, code: string, population: number, size: number): Data {
    const density = population / size;
    return { id, name, code, population, size, density };
}

const rows = [
    createData(1, 'India', 'IN', 1324171354, 3287263),
    createData(1, 'China', 'CN', 1403500365, 9596961),
    createData(1, 'Italy', 'IT', 60483973, 301340),
    createData(1, 'United States', 'US', 327167434, 9833520),
    createData(2, 'Canada', 'CA', 37602103, 9984670),
    createData(3, 'Australia', 'AU', 25475400, 7692024),
    createData(4, 'Germany', 'DE', 83019200, 357578),
    createData(5, 'Ireland', 'IE', 4857000, 70273),
    createData(6, 'Mexico', 'MX', 126577691, 1972550),
    createData(7, 'Japan', 'JP', 126317000, 377973),
    createData(9, 'France', 'FR', 67022000, 640679),
    createData(10, 'United Kingdom', 'GB', 67545757, 242495),
    createData(11, 'Russia', 'RU', 146793744, 17098246),
    createData(12, 'Nigeria', 'NG', 200962417, 923768),
    createData(12, 'Brazil', 'BR', 210147125, 8515767),
];

const EmployeeItem: React.FC = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
        setSelectedRows(selectedRows.length === rows.length ? [] : rows.map((row) => row.id));
    };

    const handleClearSelection = () => {
        setSelectedRows([]);
    };

    return (
        <div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">
                                    <input
                                        type="checkbox"
                                        onChange={handleHeaderSelect}
                                        checked={selectedRows.length === rows.length && rows.length > 0}
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
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        <TableCell align="center">
                                            <input
                                                type="checkbox"
                                                onChange={() => handleRowSelect(row.id)}
                                                checked={selectedRows.includes(row.id)}
                                            />
                                        </TableCell>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
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
