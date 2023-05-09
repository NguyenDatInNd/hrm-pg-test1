import { createAsyncThunk } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import employeeSlice from './pages/Redux/employee.slice';
import companySlice from './pages/Redux/company.slice';

const store = configureStore({
    reducer: {
        employee: employeeSlice,
        company: companySlice,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
