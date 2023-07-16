import { ChangeEvent, useState, useCallback, useEffect } from 'react';
import './Upload.scss';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import InputComponent from '../FormItem/InputComponent';
import { Box, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Contract, IsContractInfo } from '../../Types/employee';
import { useAppDispatch, useAppSelector } from '../../store';
import { MdDeleteOutline } from 'react-icons/md';
import { styled } from '@mui/material/styles';
import InputComponentDatePicker from '../FormItem/InputComponentDatePicker';
import { Link, useParams } from 'react-router-dom';
import {
    addDataTableContract,
    addDataToForm,
    getIdEmployeeContract,
    removeDataContractById,
    removeDataFormConTract,
} from '../../pages/Redux/contractUpload.slice';
import dowloadIcon from '../../assets/download.svg';
import moment from 'moment-timezone';

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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

// { contractList }: typeContractListInfo
const ContractUpload = () => {
    // eslint-disable-next-line no-empty-pattern
    const TableCellCustom = styled(TableCell)(({}) => ({
        border: '1px solid white',
        color: 'rgb(104, 112, 118)',
        fontSize: '12px',
        padding: '0 10px',
    }));
    const CustomTableRow = styled(TableRow)(({ theme, selected }) => ({
        cursor: 'pointer',
        height: '36px',
        backgroundColor: selected ? 'rgb(237 246 255) !important' : 'rgb(248, 249, 250) ',

        '&:hover': {
            backgroundColor: `rgb(237, 246, 255) !important ${theme && ''}`,
        },
        '&.MuiTableCell-root': {
            color: 'transparent',
        },
    }));

    const dispatch = useAppDispatch();
    const { idEmployee } = useParams();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [openFirstModal, setOpenFirstModal] = useState(false);
    const [formContract, setFormContract] = useState({ date: '', name: '' });
    const [idContract, setIdContract] = useState<number | null>(null);
    const { employee } = useAppSelector((state) => state.employee);

    const { contractList, contractInfo } = useAppSelector((state) => state.contractUpload);

    // Change when selected file
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];

        setSelectedFile(selectedFile || null);
    };
    const handleDeleteFile = () => {
        setSelectedFile(null);
    };

    // Change value form
    const changeContractName = (e: ChangeEvent<HTMLInputElement>) => {
        setFormContract((prevValues) => ({ ...prevValues, name: e.target.value }));
    };

    const handleChangeDate = (date: Date) => {
        setFormContract((prevValues) => ({ ...prevValues, date: String(date) }));
    };

    const handleDataContract = () => {
        if (selectedFile != null) {
            dispatch(
                addDataToForm({
                    employee_id: idEmployee ?? '0',
                    documents: [selectedFile],
                    names: [formContract.name],
                    contract_dates: [
                        moment(formContract.date).format('YYYY-MM-DD'),
                        // file.date
                    ],
                    modified_contracts: [],
                }),
            );
            dispatch(
                addDataTableContract({
                    id: selectedFile.lastModified,
                    employee_id: -1,
                    contract_date: formContract.date,
                    name: formContract.name,
                    document: '',
                    created_at: '',
                    updated_at: '',
                    deleted_at: '',
                }),
            );
        }
        setFormContract({ date: '', name: '' });
        setSelectedFile(null);
    };

    // handle open/close modal
    const handleOpenFirstModal = (idContract: number) => {
        setIdContract(idContract);
        setOpenFirstModal(true);
    };
    const handleCloseFirstModal = () => {
        setOpenFirstModal(false);
        setIdContract(null);
    };

    // delete contract upload
    const handleDeleteContractInfo = (index: number, rowId: number) => {
        dispatch(removeDataFormConTract(index));
        dispatch(removeDataContractById(rowId));
        setIdContract(null);
        setOpenFirstModal(false);
    };

    useEffect(() => {
        if (idEmployee) {
            dispatch(getIdEmployeeContract(Number(idEmployee)));
        }
    }, [idEmployee, dispatch]);

    return (
        <div className="flex flex-col border border-[#dfe3e6] rounded-md">
            <span className="font-semibold text-lg bg-[#f1f3f5] text-[#687076] px-[18px] py-2">CONTRACT:</span>
            <p className="px-[18px] py-3 text-[#687076] text-xl">Please upload pdf, png, xlsx, docx file format!</p>
            <hr className="hr-border" />

            <div className="flex flex-wrap gap-5 py-5 px-[18px]">
                <div className="container-upload flex flex-col gap-11">
                    <InputComponentDatePicker
                        onChange={handleChangeDate}
                        value={formContract.date}
                        name="contract_date"
                        label="Contract Date"
                        size="small"
                    />
                    <InputComponent
                        type="text"
                        onChange={changeContractName}
                        value={formContract.name}
                        name="name"
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
                                <input
                                    accept="image/*,.pdf,.csv,.xlsx,.docx"
                                    type="file"
                                    hidden
                                    onChange={handleFileChange}
                                />
                            </Button>
                        </div>
                    </div>
                    <div>
                        {/* onClick={handleAddContractUpload} */}
                        <Button onClick={handleDataContract} className="button-upload-file">
                            Add
                        </Button>
                    </div>
                    {selectedFile && (
                        <div className="-mt-4 ">
                            <div className="flex ">
                                <div className=" text-ellipsis overflow-hidden whitespace-nowrap bg-[#f1f3f5] px-3 py-3 text-xl  !max-w-[380px]">
                                    {selectedFile.name}
                                </div>
                                <button
                                    className=" mr-3 bg-[#f1f3f5] px-3 items-center pb-1"
                                    onClick={handleDeleteFile}
                                >
                                    <ClearIcon />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <hr className="hr-hegiht" />
                <div>
                    <TableContainer className="h-[36vh]">
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
                                {contractList &&
                                    contractList[0]?.id !== -1 &&
                                    contractList.map((row: Contract, index: number) => {
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
                                                    {row.name}
                                                </TableCellCustom>
                                                <TableCellCustom>
                                                    {moment(row.contract_date).format('YYYY/MM/DD')}
                                                </TableCellCustom>
                                                <TableCellCustom>
                                                    <div className="flex justify-center items-center gap-[6px]">
                                                        <span className="w-32">
                                                            {row.document != '' && (
                                                                <Link
                                                                    to={`https://api-training.hrm.div4.pgtest.co/storage/${row.document}`}
                                                                    className="flex gap-1 hover:bg-green-100 h-6 text-green bg-green-200 items-center rounded-lg py-[12px] px-4"
                                                                >
                                                                    <span className="text-ellipsis overflow-hidden whitespace-nowrap w-20">
                                                                        {row.document.split('/').pop()}
                                                                    </span>
                                                                    <img src={dowloadIcon} alt="" />
                                                                </Link>
                                                            )}
                                                        </span>
                                                        <Button
                                                            onClick={() => handleOpenFirstModal(row.id)}
                                                            className="button-contract-upload "
                                                        >
                                                            <MdDeleteOutline size={14} className="-mt-1" />
                                                            <span className="ml-2">Delete</span>
                                                        </Button>
                                                    </div>
                                                </TableCellCustom>
                                            </CustomTableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>

            {contractList.map((contract, index) => {
                if (contract.id === idContract) {
                    return (
                        <>
                            <Modal
                                open={openFirstModal}
                                className={`${openFirstModal ? 'modalStyle' : ''}`}
                                onClose={handleCloseFirstModal}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                key={index}
                            >
                                <Box sx={style} className="modalITemStyleSecond !w-[446px]">
                                    <div className="flex items-center justify-between gap-3">
                                        <span className=" text-center  font-semibold text-3xl">Delete</span>
                                        <span onClick={handleCloseFirstModal} className="cursor-pointer">
                                            <ClearIcon className="!h-8 !w-8 rounded-full font-semibold" />
                                        </span>
                                    </div>
                                    <div className="w-full mt-4 font-semibold text-[#687076]">
                                        <span>
                                            This will delete the {contract.name} record. Are you sure to continue?
                                        </span>
                                    </div>
                                    <div className="mt-5 mb-2 flex gap-3">
                                        <Button
                                            onClick={handleCloseFirstModal}
                                            className="button-signout-close  !text-[#11181c] w-[48%] !bg-[#f1f3f5]"
                                        >
                                            No
                                        </Button>
                                        <Button
                                            onClick={() => handleDeleteContractInfo(index, contract.id)}
                                            className="button-signout w-[48%]"
                                        >
                                            Yes
                                        </Button>
                                    </div>
                                </Box>
                            </Modal>
                        </>
                    );
                } else {
                    return;
                }
            })}
        </div>
    );
};

export default ContractUpload;
