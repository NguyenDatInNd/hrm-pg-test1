import { createSlice, PayloadAction, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { Company } from '../../Types/company';
import axios from 'axios';
import { API_PATHS } from '../../configs/api';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../utils/contants';
import { fetchApi } from '../../configs/fetchApi';
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

const companyfixerLogin = 'https://api-training.hrm.div4.pgtest.co/api/v1';
interface CompanyState {
    companyList: Company[];
    loadingCompany: boolean;
    loadingLogin: boolean;
}

const initialState: CompanyState = {
    companyList: [],
    loadingCompany: false,
    loadingLogin: false,
};

export const getCompany = createAsyncThunk('companys/getCompany', async () => {
    const res = await axios.get(API_PATHS.company);
    const data = res.data.data;
    return data;
});

// fetchApi configuration
// export const getCompany = createAsyncThunk('companys/getCompany', async () => {
//     const res = await fetchApi(API_PATHS.company, 'get');
//     const data = res.data;
//     return data;
// });

export const getCompanyFixerLogin = createAsyncThunk('companysFixer/getCompanyFixer', async () => {
    const res = await axios.get(`${API_PATHS.API_FIXER}/company`);
    const data = res.data.data;
    return data;
});

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<boolean>) => {
            state.loadingLogin = action.payload;
        },
        loginFailed: (state, action: PayloadAction<boolean>) => {
            state.loadingLogin = action.payload;
        },
        logoutUser: () => {
            Cookies.remove(ACCESS_TOKEN_KEY);
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getCompany.fulfilled, (state, action) => {
                state.companyList = action.payload;
            })
            .addCase(getCompanyFixerLogin.fulfilled, (state, action) => {
                state.companyList = action.payload;
            })
            .addMatcher<PendingAction>(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loadingCompany = true;
                },
            )
            .addMatcher<RejectedAction>(
                (action) => action.type.endsWith('/rejected'),
                (state) => {
                    state.loadingCompany = false;
                },
            )
            .addMatcher<FulfilledAction>(
                (action) => action.type.endsWith('/fulfilled'),
                (state) => {
                    state.loadingCompany = false;
                },
            );
    },
});

export const { loginSuccess, loginFailed, logoutUser } = companySlice.actions;

export default companySlice.reducer;
