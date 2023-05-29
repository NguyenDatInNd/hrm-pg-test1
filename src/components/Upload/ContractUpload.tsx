import { ChangeEvent, useState, useCallback } from 'react';
import './Upload.scss';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import InputComponent from '../FormItem/InputComponent';
import { Box, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { IsContractInfo } from '../../Types/employee';
import { useAppDispatch, useAppSelector } from '../../store';
import { MdDeleteOutline } from 'react-icons/md';
import InputComponentDatePicker from '../FormItem/InputComponentDatePicker';
import { useParams } from 'react-router-dom';
import {
    addDataTableContract,
    addDataToForm,
    removeDataContractById,
    removeDataFormConTtract,
} from '../../pages/Redux/contractUpload.slice';
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

// interface typeContractListInfo {
//     contractList: IsListContractInfo;
// }

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
    const dispatch = useAppDispatch();
    const { idEmployee } = useParams();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [openFirstModal, setOpenFirstModal] = useState(false);
    const [formContract, setFormContract] = useState({ date: '', name: '' });

    const { contractList, contractInfo } = useAppSelector((state) => state.contractUpload);

    console.log('contractList', contractList);
    console.log('contractInfo', contractInfo);

    // Change when selected file
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        setSelectedFile(selectedFile || null);
    };
    const handleDeleteFile = () => {
        setSelectedFile(null);
    };

    const changeContractName = (e: ChangeEvent<HTMLInputElement>) => {
        setFormContract((prevValues) => ({ ...prevValues, name: e.target.value }));
    };
    const handleChangeDate = (date: Date, event: ChangeEvent<HTMLInputElement>) => {
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
    };

    // handle open/close modal
    const handleOpenFirstModal = () => {
        setOpenFirstModal(true);
    };
    const handleCloseFirstModal = () => {
        setOpenFirstModal(false);
    };

    // delete contract upload
    const handleDeleteContractInfo = (index: number, rowId: number) => {
        dispatch(removeDataFormConTtract(index));
        dispatch(removeDataContractById(rowId));
        setOpenFirstModal(false);
    };

    return (
        <div className="flex flex-col border border-[#dfe3e6] rounded-md">
            <span className="font-semibold text-lg bg-[#f1f3f5] text-[#687076] px-[18px] py-2">CONTRACT:</span>
            <p className="px-[18px] py-3 text-[#687076] text-xl">Please upload pdf, png, xlsx, docx file format!</p>
            <hr className="hr-border" />

            <div className="flex flex-wrap gap-5 py-5 px-[18px]">
                <div className="container-upload flex flex-col gap-11">
                    <InputComponentDatePicker
                        // value={formContractInfo.contract_dates}
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
                        // onChange={handleAddContractInfo}
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
                        <div className="-mt-4">
                            <span className="px-3 py-3 text-xl max-w-full bg-[#f1f3f5]">
                                {selectedFile.name}
                                <button className="ml-4 mr-3" onClick={handleDeleteFile}>
                                    X
                                </button>
                            </span>
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
                                    contractList.map((row: any, index: number) => {
                                        return (
                                            <>
                                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{row.name}</TableCell>
                                                    <TableCell>
                                                        {moment(row.contract_date).format('YYYY/MM/DD')}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            onClick={handleOpenFirstModal}
                                                            className="button-contract-upload "
                                                        >
                                                            <MdDeleteOutline size={14} className="-mt-1" />
                                                            <span className="ml-2">Delete</span>
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                                <div>
                                                    <Modal
                                                        open={openFirstModal}
                                                        className={`${openFirstModal ? 'modalStyle' : ''}`}
                                                        onClose={handleCloseFirstModal}
                                                        aria-labelledby="modal-modal-title"
                                                        aria-describedby="modal-modal-description"
                                                    >
                                                        <Box sx={style} className="modalITemStyleSecond !w-[446px]">
                                                            <div className="flex items-center justify-between gap-3">
                                                                <span className=" text-center  font-semibold text-3xl">
                                                                    Delete
                                                                </span>
                                                                <span
                                                                    onClick={handleCloseFirstModal}
                                                                    className="cursor-pointer"
                                                                >
                                                                    <ClearIcon className="!h-8 !w-8 rounded-full font-semibold" />
                                                                </span>
                                                            </div>
                                                            <div className="w-full mt-4 font-semibold text-[#687076]">
                                                                <span>
                                                                    This will delete the {row.names} record. Are you
                                                                    sure to continue?
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
                                                                    onClick={() =>
                                                                        handleDeleteContractInfo(index, row.id)
                                                                    }
                                                                    className="button-signout w-[48%]"
                                                                >
                                                                    Yes
                                                                </Button>
                                                            </div>
                                                        </Box>
                                                    </Modal>
                                                </div>
                                            </>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
};

export default ContractUpload;

// const [formContractInfo, setFormContractInfo] = useState<IsContractInfo>({
//     names: '',
//     contract_dates: '',
//     modified_contracts: '',
//     documents: '',
// });

// const handleAddContractInfo = useCallback(
//     (e: ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormContractInfo((prevValues) => ({ ...prevValues, [name]: value }));
//         dispatch(ChangeValueContractUpload({ name, value }));
//     },
//     [dispatch],
// );

// const handleAddContractUpload = () => {
//     dispatch(addContractInfo(contractInfo));
//     setFormContractInfo({
//         names: '',
//         contract_dates: '',
//         modified_contracts: '',
//         documents: '',
//     });
// };
