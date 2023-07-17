import { createSlice, PayloadAction, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_PATHS } from '../../configs/api';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../utils/contants';
import { fetchApi } from '../../configs/fetchApi';
import { Contract, IsContractInfo } from '../../Types/employee';
import { RootState } from '../../store';

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
// { id, formData }: { id?: string; formData: IsContractInfo }
export const addDataContract = createAsyncThunk(
    'contact/addContact',
    async ({ formData }: { formData: IsContractInfo }, { getState }) => {
        const { employee } = getState() as RootState;
        const formdata = new FormData();
        formdata.append('employee_id', String(employee.employee.id));
        formData.names.forEach((name) => formdata.append('names[]', name));
        formData.contract_dates.forEach((date) => formdata.append('contract_dates[]', date));
        formData.documents.forEach((doc) => formdata.append('documents[]', doc, doc.name));
        formdata.append('modified_contracts[]', '');
        const response = await axios.post(`${API_PATHS.API_FIXER}/contract/save-multiple`, formdata, {
            headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
        });
        const data = response.data.data;
        return data;
    },
);

//get-employee-contracts
export const getIdEmployeeContract = createAsyncThunk('contract/getEmployeeContract', async (id: number) => {
    const response = await axios.get(`${API_PATHS.API_FIXER}/contract/get-employee-contracts?employee_id=${id}`, {
        headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
    });
    const data = response.data.data;
    return data;
});

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
                state.contractInfo.names.push(...names);
                state.contractInfo.contract_dates.push(...contract_dates);
                state.contractInfo.documents.push(...documents);
            }
        },
        addDataTableContract: (state, action: PayloadAction<Contract>) => {
            state.contractList.unshift(action.payload);
        },

        removeDataFormConTract: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            state.contractInfo.names.splice(id, 1);
            state.contractInfo.contract_dates.splice(id, 1);
            state.contractInfo.documents.splice(id, 1);
        },
        removeDataContractById: (state, action: PayloadAction<number>) => {
            const idContractUpload = action.payload;
            const deletePostIndex = state.contractList.findIndex((post) => post.id === idContractUpload);

            if (deletePostIndex !== -1) {
                state.contractList.splice(deletePostIndex, 1);
            }
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
    },
    extraReducers(builder) {
        builder
            .addCase(getIdEmployeeContract.fulfilled, (state, action) => {
                state.contractList = action.payload;
                // console.log('action', action.payload);
                // state.contractInfo = {
                //     employee_id: action.payload.employee_id,
                //     names: [],
                //     contract_dates: [],
                //     documents: [],
                //     modified_contracts: [],
                // };

                // action.payload.forEach((contract: any) => {
                //     state.contractInfo.employee_id = contract.employee_id;
                //     state.contractInfo.names.push(contract.name);
                //     state.contractInfo.contract_dates.push(contract.contract_date);
                //     state.contractInfo.documents.push(contract.document);
                // });
            })
            .addCase(addDataContract.fulfilled, (state) => {
                state.contractInfo = initialState.contractInfo;
                state.contractList = initialState.contractList;
            })
            .addCase(addDataContract.pending, (state) => {
                state.contractInfo = initialState.contractInfo;
                state.contractList = initialState.contractList;
            });

        // .addMatcher<PendingAction>(
        //     (action) => action.type.endsWith('/pending'),
        //     (state, action) => {
        //         state.contractInfo = initialState.contractInfo;
        //         state.contractList = initialState.contractList;
        //     },
        // );
    },
});

export const {
    addDataTableContract,
    mountDataContract,
    removeAllDataContract,
    removeAllDataFormConTract,
    removeDataContractById,
    removeDataFormConTract,
    addDataToForm,
} = contractUploadSlice.actions;

export default contractUploadSlice.reducer;
