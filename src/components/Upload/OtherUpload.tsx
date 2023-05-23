import React from 'react';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface Column {
    id: 'No' | 'Document Name' | 'Created At' | 'Action';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'No', label: 'No', minWidth: 50 },
    { id: 'Document Name', label: 'Document Name', minWidth: 140 },
    { id: 'Created At', label: 'Created At', minWidth: 140 },
    { id: 'Action', label: 'Action', minWidth: 250 },
];

const OtherUpload = () => {
    return (
        <div className="flex flex-col border border-[#dfe3e6] rounded-md">
            <div className="flex items-center gap-32 mt-4 px-4">
                <span className="text-2xl">Document</span>
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
                            minWidth: '86px',
                            borderRadius: '6px',
                            height: '32px',
                            textTransform: 'none',
                            '&:hover': {
                                boxShadow: 'none',
                                backgroundColor: 'rgba(0, 145, 255, 0.08)',
                            },
                        }}
                    >
                        <FileUploadOutlinedIcon style={{ fontSize: 20 }} />
                        <span className="upload-file">Upload</span>
                        <input accept="image/*,.pdf,.csv,.xlsx,.docx" type="file" hidden />
                    </Button>
                </div>
            </div>
            <div className="py-4 px-4">
                <TableContainer style={{ height: '250px' }} className="">
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
    );
};

export default OtherUpload;
