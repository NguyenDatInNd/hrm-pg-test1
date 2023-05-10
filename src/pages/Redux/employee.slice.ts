import { createSlice, PayloadAction, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { Employee, EmployeeList } from '../../Types/employee';
import { API_PATHS } from '../../configs/api';
import axios from 'axios';
import { ACCESS_TOKEN_KEY } from '../../utils/contants';
import Cookies from 'js-cookie';

// AsyncThunk
//một hành động không đồng bộ, thường gửi một hành động đang chờ xử lý,
// thực hiện một số logic không đồng bộ, sau đó gửi một hành động đã hoàn thành hoặc bị từ chối.
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

interface EmployeeState {
    employeeList: EmployeeList;
    loadingEmployee: boolean;
}

const initialState: EmployeeState = {
    employeeList: {
        current_page: 0,
        data: [],
        first_page_url: '',
        from: 0,
        last_page: 0,
        last_page_url: '',
        links: {
            url: '',
            label: '',
            active: false,
        },
        next_page_url: '',
        path: '',
        per_page: 0,
        prev_page_url: '',
        to: 0,
        total: 0,
    },
    loadingEmployee: false,
};

export const getEmployeeList = createAsyncThunk('employees/getEmployees', async () => {
    const response = await axios.get(API_PATHS.employee, {
        headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
    });
    const data = response.data.data;
    return data;
});
const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getEmployeeList.fulfilled, (state, action) => {
                state.employeeList = action.payload;
            })
            .addMatcher<PendingAction>(
                (action) => action.type.endsWith('/pending'),
                (state, action) => {
                    state.loadingEmployee = true;
                },
            )
            .addMatcher<RejectedAction>(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.loadingEmployee = false;
                },
            )
            .addMatcher<FulfilledAction>(
                (action) => action.type.endsWith('/fulfilled'),
                (state, action) => {
                    state.loadingEmployee = false;
                },
            );
    },
});

// export const {} = employeeSlice.actions;

export default employeeSlice.reducer;
