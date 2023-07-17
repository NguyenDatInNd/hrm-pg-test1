import React, { ChangeEvent } from 'react';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store';
import { Link, useParams } from 'react-router-dom';
import dowloadIcon from '../../assets/download.svg';

import moment from 'moment-timezone';
import { MdDeleteOutline } from 'react-icons/md';
import { addDataTableDocument, addDataToDocument, removeDataTableDocument } from '../../pages/Redux/employee.slice';

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
    const CustomTableRow = styled(TableRow)(({ theme, selected }) => ({
        cursor: 'pointer',
        height: '36px',
        backgroundColor: selected ? 'rgb(237 246 255) !important' : 'rgb(248, 249, 250)',

        '&:hover': {
            backgroundColor: `rgb(237, 246, 255) !important ${theme && ''}`,
        },
        '&.MuiTableCell-root': {
            color: 'transparent',
        },
    }));
    // eslint-disable-next-line no-empty-pattern
    const TableCellCustom = styled(TableCell)(({}) => ({
        border: '1px solid white',
        color: 'rgb(104, 112, 118)',
        fontSize: '12px',
        padding: '0 10px',
    }));

    const dispatch = useAppDispatch();
    const { idEmployee } = useParams();
    const { documentList, documentInfo } = useAppSelector((state) => state.employee);

    const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files[0];

        if (selectedFile) {
            dispatch(
                addDataToDocument({
                    employee_id: idEmployee || '0',
                    documents: [selectedFile],
                }),
            );
            dispatch(
                addDataTableDocument({
                    id: selectedFile.lastModified,
                    employee_id: -1,
                    created_at: moment(selectedFile.lastModified).format('YYYY-MM-DD'),
                    document: selectedFile.name,
                    updated_at: '',
                }),
            );
        }
    };
    const handleDeleteFileDocument = (id: number, index: number) => {
        dispatch(removeDataTableDocument({ id, index }));
    };
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
                        <input accept="image/*,.pdf,.csv,.xlsx,.docx" type="file" hidden onChange={handleUploadFile} />
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

                        <TableBody>
                            {documentList &&
                                documentList.map((row: any, index: number) => {
                                    if (row.id != -1) {
                                        return (
                                            <CustomTableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row.id}
                                                sx={{
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <TableCellCustom>{index + 1}</TableCellCustom>
                                                <TableCellCustom style={{ minWidth: `50px` }}>
                                                    {row.document.split('/').pop()}
                                                </TableCellCustom>
                                                <TableCellCustom>
                                                    {moment(row.create_at).format('YYYY-MM-DD')}
                                                </TableCellCustom>
                                                <TableCellCustom>
                                                    <div className="flex justify-center items-center gap-1">
                                                        <span className="w-10">
                                                            {idEmployee && (
                                                                <Link
                                                                    to={row.document}
                                                                    target="#blank"
                                                                    className="flex gap-1 "
                                                                >
                                                                    <img src={dowloadIcon} className="" alt="" />
                                                                </Link>
                                                            )}
                                                        </span>
                                                        <Button
                                                            onClick={() => handleDeleteFileDocument(row.id, index)}
                                                            className="button-contract-upload "
                                                        >
                                                            <MdDeleteOutline size={14} className="-mt-1" />
                                                            <span className="ml-2">Delete</span>
                                                        </Button>
                                                    </div>
                                                </TableCellCustom>
                                            </CustomTableRow>
                                        );
                                    }
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};
export default OtherUpload;
