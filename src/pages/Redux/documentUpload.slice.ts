import { createSlice, PayloadAction, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_PATHS } from '../../configs/api';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../utils/contants';
import { fetchApi } from '../../configs/fetchApi';
import { Contract, IsContractInfo, IsDocument, IsDocumentFormData } from '../../Types/employee';
import { RootState } from '../../store';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

interface contractUploadState {
    dataDocument: IsDocument[];
    dataFormDocument: IsDocumentFormData;
}

const initialState: contractUploadState = {
    dataDocument: [
        {
            id: -1,
            employee_id: -1,
            document: '',
            created_at: '',
            updated_at: null,
        },
    ],
    dataFormDocument: {
        employee_id: '',
        documents: [],
        deleted_ids: [],
    },
};

export const addDataDocument = createAsyncThunk(
    'contact/addContact',
    async ({ formData }: { formData: IsDocumentFormData }, { getState }) => {
        const { employee } = getState() as RootState;
        const formdata = new FormData();
        formdata.append('employee_id', String(employee.employee.id));
        formData.documents && formData.documents.forEach((doc) => formdata.append('documents[]', doc, doc.name));
        formData.deleted_ids && formData.deleted_ids.forEach((id) => formdata.append('deleted_ids[]', String(id)));

        const response = await axios.post(`${API_PATHS.API_FIXER}/employee-document/upload`, formdata, {
            headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
        });
        const data = response.data.data;
        return data;
    },
);

const documentUploadSlice = createSlice({
    name: 'documentUploadSlice',
    initialState,
    reducers: {
        addDataToDocument: (state, action: PayloadAction<IsDocumentFormData>) => {
            const { employee_id, documents, deleted_ids } = action.payload;
            state.dataFormDocument.employee_id = employee_id;
            state.dataFormDocument.documents && documents && state.dataFormDocument.documents.push(...documents);
            state.dataFormDocument.deleted_ids &&
                deleted_ids &&
                state.dataFormDocument.deleted_ids.push(...deleted_ids);
        },
        removeDataFormDocument: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            state.dataFormDocument.documents && state.dataFormDocument.documents.splice(id, 1);
        },
        removeDataDocument: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            state.dataDocument.splice(id, 1);
        },
        removeAllDataFromDocument: (state) => {
            state.dataFormDocument = initialState.dataFormDocument;
        },
        removeAllDataDocument: (state) => {
            state.dataDocument = [];
        },
        mountDataDocument: (state, action: PayloadAction<IsDocument[]>) => {
            state.dataDocument = action.payload;
        },
        addDataTableDocument: (state, action: PayloadAction<IsDocument>) => {
            state.dataDocument.unshift(action.payload);
        },
    },
});

export const {
    addDataToDocument,
    addDataTableDocument,
    mountDataDocument,
    removeDataDocument,
    removeAllDataDocument,
    removeAllDataFromDocument,
    removeDataFormDocument,
} = documentUploadSlice.actions;

export default documentUploadSlice.reducer;
