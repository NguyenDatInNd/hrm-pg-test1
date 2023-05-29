import { createSlice, PayloadAction, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { Company } from '../../Types/company';
import axios from 'axios';
import { API_PATHS } from '../../configs/api';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../utils/contants';
import { fetchApi } from '../../configs/fetchApi';
import { Contract, IsContractInfo } from '../../Types/employee';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

interface contractUploadState {
    contractList: Contract[];
    contractInfo: IsContractInfo;
}

const initialState: contractUploadState = {
    contractList: [],
    contractInfo: {
        employee_id: '',
        names: [],
        contract_dates: [],
        documents: [],
        modified_contracts: [],
    },
};

export const addDataContract = createAsyncThunk(
    'contact/addContact',
    async ({ id, formData }: { id?: string; formData: IsContractInfo }) => {
        const formdata = new FormData();
        console.log(formData.employee_id);
        formdata.append('employee_id', id || '');
        formData.names.forEach((name) => formdata.append('names[]', name));
        formData.contract_dates.forEach((date) => formdata.append('contract_dates[]', date));
        formData.documents.forEach((doc) => formdata.append('documents[]', doc, doc.name));
        formdata.append('modified_contracts[]', '');

        const response = await axios.post(`${API_PATHS.API_FIXER}/contract/save-multiple`, formData, {
            headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
        });
        const data = response.data.data;
        return data;
    },
);
const contractUploadSlice = createSlice({
    name: 'contractUpload',
    initialState,
    reducers: {
        addDataToForm: (state, action: PayloadAction<IsContractInfo>) => {
            const { employee_id, names, contract_dates, documents } = action.payload;
            if (employee_id !== '0') {
                state.contractInfo.employee_id = employee_id;
            }
            if (names[0] != '') {
                console.log(names);

                state.contractInfo.names.push(...names);
                state.contractInfo.contract_dates.push(...contract_dates);
                state.contractInfo.documents.push(...documents);
            }
        },
        removeDataFormConTtract: (state, action: PayloadAction<number>) => {
            const id = action.payload;

            state.contractInfo.names.splice(id, 1);
            state.contractInfo.contract_dates.splice(id, 1);
            state.contractInfo.documents.splice(id, 1);
        },
        removeDataContractById: (state, action: PayloadAction<number>) => {
            const idToRemove = action.payload;
            state.contractList = state.contractList.filter((contract) => contract.id !== idToRemove);
        },
        removeAllDataFormConTract: (state) => {
            state.contractInfo = initialState.contractInfo;
        },
        removeAllDataContract: (state) => {
            state.contractList = initialState.contractList;
        },
        mountDataContract: (state, action: PayloadAction<Contract[]>) => {
            state.contractList = action.payload;
        },
        addDataTableContract: (state, action: PayloadAction<Contract>) => {
            state.contractList.unshift(action.payload);
        },
    },
});

export const {
    addDataTableContract,
    mountDataContract,
    removeAllDataContract,
    removeAllDataFormConTract,
    removeDataContractById,
    removeDataFormConTtract,
    addDataToForm,
} = contractUploadSlice.actions;

export default contractUploadSlice.reducer;
