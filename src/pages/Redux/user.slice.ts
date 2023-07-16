import { createSlice, PayloadAction, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { Company } from '../../Types/company';
import axios from 'axios';
import { API_PATHS } from '../../configs/api';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../utils/contants';
import { fetchApi } from '../../configs/fetchApi';
import { User } from '../../Types/user';
import { IsLoginParam } from '../../Types/auth';
import { toast } from 'react-toastify';
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

interface CompanyState {
    user: User;
    accessToken: string;
    loadingUser: boolean;
    loadingLogin: boolean;
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
    accessToken: '',
    loadingUser: false,
    loadingLogin: false,
};

// Login Authentication / get Token
export const loginAuthentication = createAsyncThunk('login/loginAuthentication', async (body: IsLoginParam) => {
    try {
        const res = await axios.post(API_PATHS.signIn, body);
        Cookies.set(ACCESS_TOKEN_KEY, res.data.data.token);
        toast.success('Login Successfully');
        const data = res.data.data.token;
        return data;
    } catch (error) {
        toast.success('Login Failed');
    }
});

// get list User
export const getUserList = createAsyncThunk('users/getUser', async () => {
    const res = await axios.get(API_PATHS.user, {
        headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
    });
    const data = res.data.data;
    return data;
});

// get user details  `${API_PATHS.API_FIXER}/user/detail`
export const getUserDetails = createAsyncThunk('users/getUserDetails', async () => {
    const res = await axios.get(`${API_PATHS.API_FIXER}/user/detail`, {
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
            .addCase(loginAuthentication.fulfilled, (state, action) => {
                state.accessToken = action.payload;
                state.loadingLogin = true;
            })
            .addCase(logoutUserPost.fulfilled, (state) => {
                Cookies.remove(ACCESS_TOKEN_KEY);
                localStorage.setItem('accessToken', '');
                state.accessToken = '';
            })
            .addMatcher<PendingAction>(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loadingUser = true;
                },
            )
            .addMatcher<RejectedAction>(
                (action) => action.type.endsWith('/rejected'),
                (state) => {
                    state.loadingUser = false;
                },
            )
            .addMatcher<FulfilledAction>(
                (action) => action.type.endsWith('/fulfilled'),
                (state) => {
                    state.loadingUser = false;
                },
            );
    },
});

// export const {} = userSlice.actions;

export default userSlice.reducer;
