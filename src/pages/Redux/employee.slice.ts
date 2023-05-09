import { createSlice, PayloadAction, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';

// AsyncThunk
//một hành động không đồng bộ, thường gửi một hành động đang chờ xử lý,
// thực hiện một số logic không đồng bộ, sau đó gửi một hành động đã hoàn thành hoặc bị từ chối.
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

interface EmployeeState {
    employeeList: [];
}

const initialState: EmployeeState = {
    employeeList: [],
};

// export const getProductList = createAsyncThunk('products/getProducts', async () => {
//     const response = await axios.get(API_PATHS.product, {
//         headers: { Authorization: Cookies.get(ACCESS_TOKEN_KEY) },
//     });
//     const data = response.data.data;
//     return data;
// });

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {},
});

// export const {} = employeeSlice.actions;

export default employeeSlice.reducer;
