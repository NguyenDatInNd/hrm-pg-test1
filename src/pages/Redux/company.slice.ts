import { createSlice, PayloadAction, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { Company } from '../../Types/company';
import axios from 'axios';
import { API_PATHS } from '../../configs/api';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

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

// export const getProductList = createAsyncThunk('products/getProducts', async () => {
//     const response = await axios.get(API_PATHS.product, {
//         headers: { Authorization: Cookies.get(ACCESS_TOKEN_KEY) },
//     });
//     const data = response.data.data;
//     return data;
// });

export const getCompany = createAsyncThunk('companys/getCompany', async () => {
    const res = await axios.get(API_PATHS.company);
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
    },
    extraReducers(builder) {
        builder
            .addCase(getCompany.fulfilled, (state, action) => {
                state.companyList = action.payload;
            })
            .addMatcher<PendingAction>(
                (action) => action.type.endsWith('/pending'),
                (state, action) => {
                    state.loadingCompany = true;
                },
            )
            .addMatcher<RejectedAction>(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.loadingCompany = false;
                },
            )
            .addMatcher<FulfilledAction>(
                (action) => action.type.endsWith('/fulfilled'),
                (state, action) => {
                    state.loadingCompany = false;
                },
            );
    },
});

export const { loginSuccess, loginFailed } = companySlice.actions;

export default companySlice.reducer;
