import React from 'react';
import './Upload.scss';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';
import InputDatePicker from '../FormItem/InputDatePicker';
import InputComponent from '../FormItem/InputComponent';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface Column {
    id: 'No' | 'Contract Name' | 'Sign Date' | 'Action';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'No', label: 'No', minWidth: 50 },
    { id: 'Contract Name', label: 'Contract Name', minWidth: 140 },
    { id: 'Sign Date', label: 'Sign Date', minWidth: 140 },
    { id: 'Action', label: 'Action', minWidth: 250 },
];

const ContractUpload = () => {
    return (
        <div className="flex flex-col border border-[#dfe3e6] rounded-md">
            <span className="font-semibold text-lg bg-[#f1f3f5] text-[#687076] px-[18px] py-2">CONTRACT:</span>
            <p className="px-[18px] py-3 text-[#687076] text-xl">Please upload pdf, png, xlsx, docx file format!</p>
            <hr className="hr-border" />

            <div className="flex flex-wrap gap-5 py-5 px-[18px]">
                <div className="container-upload flex flex-col gap-11">
                    <InputDatePicker
                        type="date"
                        value={''}
                        name="contract_date"
                        onChange={() => {
                            return;
                        }}
                        label="Contract Date"
                        upload
                    />
                    <InputComponent
                        type="text"
                        value={''}
                        name="contract_name"
                        onChange={() => {
                            return;
                        }}
                        label="Contract Name"
                        upload
                    />

                    <div className="">
                        <div>
                            <Button
                                variant="contained"
                                component="label"
                                sx={{
                                    alignItems: 'center',
                                    color: 'rgb(0, 145, 255)',
                                    backgroundColor: 'rgb(237, 246, 255)',
                                    border: '1px dashed',
                                    boxShadow: 'none',
                                    minWidth: '195px',
                                    borderRadius: '6px',
                                    height: '48px',
                                    textTransform: 'none',
                                    '&:hover': {
                                        boxShadow: 'none',
                                        backgroundColor: 'rgba(0, 145, 255, 0.08)',
                                    },
                                }}
                            >
                                <FileUploadOutlinedIcon style={{ fontSize: 20 }} />
                                <span className="upload-file">Upload File</span>
                                <input accept="image/*,.pdf,.csv,.xlsx,.docx" type="file" hidden />
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Button className="button-upload-file">Add</Button>
                    </div>
                </div>
                <hr className="hr-hegiht" />
                <div>
                    <TableContainer className="">
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow className="table-upload">
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

                            <TableBody>{/* Content off here */}</TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
};

export default ContractUpload;
