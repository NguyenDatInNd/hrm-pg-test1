import { createSlice, PayloadAction, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { Company } from '../../Types/company';
import axios from 'axios';
import { API_PATHS } from '../../configs/api';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../utils/contants';
import { fetchApi } from '../../configs/fetchApi';
import { User } from '../../Types/user';
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

interface CompanyState {
    user: User;
    loadingUser: boolean;
}

const initialState: CompanyState = {
    user: {
        id: 0,
        username: '',
        email: '',
        role_id: 0,
        employee_id: null,
        department_id: null,
        company_id: 0,
        register_token: '',
        email_verified_at: null,
        is_active: '',
        created_at: '',
        updated_at: '',
        deleted_at: '',
        department_name: '',
        position_name: '',
    },

    loadingUser: false,
};

export const getUserList = createAsyncThunk('users/getUser', async () => {
    const res = await axios.get(API_PATHS.user, {
        headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
    });
    const data = res.data.data;
    return data;
});

// get user details  `${API_PATHS.API_FIXER}/user/detail`
export const getUserDetails = createAsyncThunk('users/getUserDetails', async () => {
    const res = await axios.get(API_PATHS.useDetail, {
        headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
    });
    const data = res.data.data;
    return data;
});

export const logoutUserPost = createAsyncThunk('users/logOut', async (_, body) => {
    const res = await axios.post(API_PATHS.logout, body, {
        headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
    });
    const data = res.data.data;
    return data;
});

//
export const forgotPassword = createAsyncThunk('user/forgot-password', async (email: string) => {
    const payload = {
        email: email,
    };
    const res = await axios.post(API_PATHS.forgotPassword, payload, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = res.data.data;
    return data;
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(logoutUserPost.fulfilled, (state, action) => {
                // Cookies.remove(ACCESS_TOKEN_KEY);
            })
            .addMatcher<PendingAction>(
                (action) => action.type.endsWith('/pending'),
                (state, action) => {
                    state.loadingUser = true;
                },
            )
            .addMatcher<RejectedAction>(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.loadingUser = false;
                },
            )
            .addMatcher<FulfilledAction>(
                (action) => action.type.endsWith('/fulfilled'),
                (state, action) => {
                    state.loadingUser = false;
                },
            );
    },
});

// export const {} = userSlice.actions;

export default userSlice.reducer;
