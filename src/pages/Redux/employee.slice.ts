import { createSlice, PayloadAction, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { Department, Employee, EmployeeList, MarriageStatus, Position } from '../../Types/employee';
import { API_PATHS } from '../../configs/api';
import axios from 'axios';
import { ACCESS_TOKEN_KEY } from '../../utils/contants';
import Cookies from 'js-cookie';
import { fetchApi } from '../../configs/fetchApi';
import { RootState } from '../../store';
import { toast } from 'react-hot-toast';

// AsyncThunk
//một hành động không đồng bộ, thường gửi một hành động đang chờ xử lý,
// thực hiện một số logic không đồng bộ, sau đó gửi một hành động đã hoàn thành hoặc bị từ chối.
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

interface EmployeeState {
    employeeList: EmployeeList;
    employee: Employee[];
    employeeIddelete: number[];
    marriageList: MarriageStatus[];
    department: Department[];
    position: Position[];
    searchValue: string;
    loadingEmployee: boolean;
    employeeOriginal: EmployeeList;
}

interface EmployeeListParams {
    keywordSearch?: string | null;
    currentPage?: string | null;
}

interface Value {
    name: string;
    value: string | number;
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
    employee: [
        {
            id: 0,
            old_staff_id: 0,
            staff_id: '',
            department_id: 1,
            company_id: 1,
            manager_id: 1,
            marriage_id: 1,
            position_id: 1,
            mother_name: '',
            pob: '',
            home_address_1: '',
            home_address_2: '',
            mobile_no: '',
            tel_no: '',
            bank_account_no: '',
            bank_name: '',
            card_number: '',
            family_card_number: '',
            health_insurance_no: '',
            safety_insurance_no: '',
            entitle_ot: 1,
            meal_allowance_paid: 1,
            operational_allowance_paid: 1,
            attendance_allowance_paid: 1,
            minimum_salary_used: '',
            shift: '',
            grade_id: 1,
            remark: '',
            created_at: '',
            updated_at: '',
            deleted_at: '',
            department_name: '',
            marriage_code: '',
            position_name: '',
            grade_prefix: '',
            grade_name: '',
            manager_name: '',
            contracts: [],

            name: '',
            gender: 1,
            dob: '2024-09-09',
            ktp_no: '99999',
            nc_id: '9999',
            type: '0',
            basic_salary: 23,
            audit_salary: 123,
            safety_insurance: 123,
            health_insurance: 123,
            meal_allowance: 123,
            contract_start_date: '2023-01-03',
        },
    ],
    employeeIddelete: [],
    searchValue: '',
    marriageList: [],
    department: [],
    position: [],
    loadingEmployee: false,
    employeeOriginal: {
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
};

//get API employeeList
export const getEmployeeList = createAsyncThunk('employees/getEmployees', async () => {
    const response = await axios.get(API_PATHS.employee, {
        headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
    });
    const data = response.data.data;
    return data;
});

export const getEmployeeListSearch = createAsyncThunk(
    'employees/getEmployeesSearch',
    async ({ keywordSearch = '', currentPage = '' }: EmployeeListParams) => {
        const response = await axios.get(API_PATHS.employee, {
            params: {
                search: keywordSearch,
                page: currentPage,
            },
            headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
        });
        const data = response.data.data;
        return data;
    },
);

// fetchApi configuration
// export const getEmployeeList = createAsyncThunk('employees/getEmployees', async () => {
//     const response = await fetchApi(API_PATHS.employee, 'get');
//     const data = response.data;
//     return data;
// });

export const addEmployee = createAsyncThunk('employees/addEmployee', async (_, { getState }) => {
    const { employee } = getState() as RootState;
    console.log('employee', employee.employee);
    const response = await axios.post(`${API_PATHS.API_FIXER}/employee`, employee.employee[0], {
        headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
    });
    const data = response.data.data;
    return data;
});

// export const addEmployee = createAsyncThunk('employees/addEmployee', async (body: Employee) => {
//     const response = await axios.post(`${API_PATHS.API_FIXER}/employee`, body, {
//         headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
//     });
//     const data = response.data.data;
//     return data;
// });

// delete employee encode
export const deleteEmployeeEncode = createAsyncThunk('employees/deleteEmployee', async (record_ids: number[]) => {
    const encodedRecordIds = record_ids.map((id) => `record_ids%5B%5D=${encodeURIComponent(id)}`);
    const param = encodedRecordIds.join('&');
    const response = await axios.delete(`${API_PATHS.API_FIXER}/employee/multiple-delete?${param}`, {
        headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
    });
    toast.success(response.data?.message);
    const data = response.data.data;
    return data;
});

// get API Marriage
export const getMarriageList = createAsyncThunk('marriage/getMarriage', async () => {
    const response = await axios.get(`${API_PATHS.API_FIXER}/marriage`, {
        headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
    });
    const data = response.data.data;
    return data;
});

// get API Position
export const getPosition = createAsyncThunk('position/getPosition', async () => {
    const response = await axios.get(`${API_PATHS.API_FIXER}/position`, {
        headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
    });
    const data = response.data.data;
    return data;
});

// get API department
export const getDepartment = createAsyncThunk('department/getDepartment', async () => {
    const response = await axios.get(`${API_PATHS.API_FIXER}/department`, {
        headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
    });
    const data = response.data.data;
    return data;
});

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        changeValueFormEmployeeInfo: (state, action: PayloadAction<Value>) => {
            const { name, value } = action.payload;
            state.employee[0][name] = value;
        },
        ChangeValueDateFormEmployeeInfo: (state, action: PayloadAction<any>) => {
            state.employee[0].dob = action.payload;
        },
        changeValueFormContractDate: (state, action: PayloadAction<any>) => {
            state.employee[0].contract_start_date = action.payload;
        },

        getIdEmployeeDelete: (state, action: PayloadAction<number[]>) => {
            state.employeeIddelete = action.payload;
        },
        removeValueFormEmployeeInfo: (state) => {
            state.employee = [
                {
                    id: 0,
                    old_staff_id: 0,
                    staff_id: '',
                    department_id: 1,
                    company_id: 1,
                    manager_id: 1,
                    marriage_id: 1,
                    position_id: 1,
                    mother_name: '',
                    pob: '',
                    home_address_1: '',
                    home_address_2: '',
                    mobile_no: '',
                    tel_no: '',
                    bank_account_no: '',
                    bank_name: '',
                    card_number: '',
                    family_card_number: '',
                    health_insurance_no: '',
                    safety_insurance_no: '',
                    entitle_ot: 1,
                    meal_allowance_paid: 1,
                    operational_allowance_paid: 1,
                    attendance_allowance_paid: 1,
                    minimum_salary_used: '',
                    shift: '',
                    grade_id: 1,
                    remark: '',
                    created_at: '',
                    updated_at: '',
                    deleted_at: '',
                    department_name: '',
                    marriage_code: '',
                    position_name: '',
                    grade_prefix: '',
                    grade_name: '',
                    manager_name: '',
                    contracts: [],

                    name: '',
                    gender: 1,
                    dob: '2024-09-09',
                    ktp_no: '99999',
                    nc_id: '9999',
                    type: '0',
                    basic_salary: 23,
                    audit_salary: 123,
                    safety_insurance: 123,
                    health_insurance: 123,
                    meal_allowance: 123,
                    contract_start_date: '2023-01-03',
                },
            ];
        },

        // search filter
        changeValueSearchEmployee: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
            if (state.searchValue === '') {
                state.employeeList.data = state.employeeOriginal.data;
            } else {
                state.employeeList.data = state.employeeList.data.filter((employee) =>
                    employee.name.includes(state.searchValue),
                );
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getEmployeeList.fulfilled, (state, action) => {
                state.employeeList = action.payload;
                state.employeeOriginal = action.payload;
            })
            .addCase(getEmployeeListSearch.fulfilled, (state, action) => {
                state.employeeList = action.payload;
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                state.employeeList.data.push(action.payload);
            })
            .addCase(deleteEmployeeEncode.fulfilled, (state, action) => {
                const postIdArray = action.meta.arg;
                postIdArray.forEach((postId) => {
                    const deletePostIndex = state.employeeList.data.findIndex((post) => post.id === postId);

                    if (deletePostIndex !== -1) {
                        state.employeeList.data.splice(deletePostIndex, 1);
                    }
                });
                state.employeeIddelete = [];
            })
            .addCase(getMarriageList.fulfilled, (state, action) => {
                state.marriageList = action.payload;
            })
            .addCase(getDepartment.fulfilled, (state, action) => {
                state.department = action.payload;
            })
            .addCase(getPosition.fulfilled, (state, action) => {
                state.position = action.payload;
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

export const {
    changeValueFormEmployeeInfo,
    ChangeValueDateFormEmployeeInfo,
    getIdEmployeeDelete,
    changeValueFormContractDate,
    removeValueFormEmployeeInfo,
    changeValueSearchEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;
