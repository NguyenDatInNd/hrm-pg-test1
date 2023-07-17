import { createSlice, PayloadAction, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import {
    Department,
    Employee,
    EmployeeList,
    IsBenefit,
    IsDocument,
    IsDocumentFormData,
    IsGrade,
    MarriageStatus,
    Position,
} from '../../Types/employee';
import { API_PATHS } from '../../configs/api';
import axios from 'axios';
import { ACCESS_TOKEN_KEY } from '../../utils/contants';
import Cookies from 'js-cookie';
import { fetchApi } from '../../configs/fetchApi';
import { RootState } from '../../store';
import { toast } from 'react-toastify';

// AsyncThunk
//một hành động không đồng bộ, thường gửi một hành động đang chờ xử lý,
// thực hiện một số logic không đồng bộ, sau đó gửi một hành động đã hoàn thành hoặc bị từ chối.
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

interface EmployeeState {
    employeeList: EmployeeList;
    employee: Employee;
    employeeIddelete: number[];
    marriageList: MarriageStatus[];
    department: Department[];
    position: Position[];
    loadingEmployee: boolean;
    gradeList: IsGrade[];
    benefitList: IsBenefit[];
    statusAdd: boolean;

    // upload document
    documentList: IsDocument[];
    documentInfo: IsDocumentFormData;
    errorsEmployee: any;
}

interface EmployeeListParams {
    keywordSearch?: string | null;
    currentPage?: string | null;
}

interface Value {
    name: string;
    value: string | number | number[] | IsGrade | IsBenefit[] | null;
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
    employee: {
        id: 0,
        old_staff_id: 0,
        staff_id: '',
        department_id: null,
        company_id: 1,
        manager_id: null,
        marriage_id: null,
        position_id: null,
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
        entitle_ot: 0,
        meal_allowance_paid: 0,
        operational_allowance_paid: 1,
        attendance_allowance_paid: 1,
        minimum_salary_used: '',
        shift: '',
        grade_id: null,
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
        documents: [],
        grade: [],
        benefits: [],

        name: '',
        gender: '',
        dob: '',
        ktp_no: '',
        nc_id: '',
        type: '',
        basic_salary: 0,
        audit_salary: 0,
        safety_insurance: 0,
        health_insurance: 0,
        meal_allowance: 0,
        contract_start_date: '',
    },

    employeeIddelete: [],
    marriageList: [],
    department: [],
    position: [],
    loadingEmployee: false,
    gradeList: [],
    benefitList: [],
    statusAdd: false,

    documentList: [],
    documentInfo: {
        employee_id: '',
        documents: [],
        deleted_ids: [],
    },
    errorsEmployee: {},
};

//get API employeeList
export const getEmployeeList = createAsyncThunk('employees/getEmployees', async () => {
    const response = await axios.get(`${API_PATHS.API_FIXER}/employee`, {
        headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
    });
    const data = response.data.data;
    return data;
});

export const getEmployeeListSearch = createAsyncThunk(
    'employees/getEmployeesSearch',
    async ({ keywordSearch = '', currentPage = '' }: EmployeeListParams) => {
        const response = await axios.get(`${API_PATHS.API_FIXER}/employee`, {
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

export const addEmployee = createAsyncThunk('employees/addEmployee', async (_, { getState }) => {
    const { employee } = getState() as RootState;
    const { benefits } = employee.employee;
    const benefitsId = benefits.map((benefit) => benefit.id);
    const newEmployee = { ...employee.employee, benefits: benefitsId };

    try {
        const response = await axios.post(`${API_PATHS.API_FIXER}/employee`, newEmployee, {
            headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
        });
        toast.success('Record added');
        const data = response.data.data;
        return data;
    } catch (error) {
        toast.error('Add Failed, Try It Again(check required fields in Contract Infomation)!');
    }
});

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

//update employee
export const updateEmployee = createAsyncThunk('employees/updateEmployee', async (idEmployee: number, { getState }) => {
    const { employee } = getState() as RootState;
    const { benefits } = employee.employee;
    const benefitsId = benefits.map((benefit) => benefit.id);
    const newEmployee = { ...employee.employee, benefits: benefitsId };
    const response = await axios.put(`${API_PATHS.API_FIXER}/employee/${idEmployee}`, newEmployee, {
        headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
    });
    toast.success('Change saved');
    const data = response.data.data;
    return data;
});

// get employee by Id when update employee

export const getIdEmployeeUpdate = createAsyncThunk('employees/getEmployeeId', async (id: number) => {
    const response = await axios.get(`${API_PATHS.API_FIXER}/employee/${id}`, {
        headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
    });
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

//get Grade
export const getGrade = createAsyncThunk('grades/getGrade', async () => {
    const res = await axios.get(`${API_PATHS.API_FIXER}/grade`, {
        headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
    });
    const data = res.data.data;
    return data;
});

// get getBenefit
export const getBenefit = createAsyncThunk('benefits/getBenefit', async () => {
    const res = await axios.get(`${API_PATHS.API_FIXER}/benefit`, {
        headers: { Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` },
    });
    const data = res.data.data;
    return data;
});

// Add data document (Upload)
export const addDataDocument = createAsyncThunk(
    'document/addDocument',
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

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        changeValueFormEmployeeInfo: (state, action: PayloadAction<Value>) => {
            const { name, value } = action.payload;
            state.employee[name] = value;
        },

        getIdEmployeeDelete: (state, action: PayloadAction<number[]>) => {
            state.employeeIddelete = action.payload;
        },
        changeValueEmployeeUpdate: (state, action: PayloadAction<number>) => {
            const idEmployee = action.payload;
            state.employeeList.data.find((employee) => {
                if (employee.id === idEmployee) {
                    state.employee = employee;
                }
            });
        },
        removeValueFormEmployeeInfo: (state) => {
            state.employee = initialState.employee;
        },

        setErrorsEmployee: (state, action) => {
            const errorFields = Object.keys(action.payload);

            errorFields.forEach((field) => {
                state.errorsEmployee[field] = action.payload[field].message;
            });
        },
        resetErorrsEmployee: (state) => {
            state.errorsEmployee = initialState.errorsEmployee;
        },
        // Document Upload
        addDataToDocument: (state, action: PayloadAction<IsDocumentFormData>) => {
            const { employee_id, documents, deleted_ids } = action.payload;
            state.documentInfo.employee_id = employee_id;
            state.documentInfo.documents && documents && state.documentInfo.documents.push(...documents);
            state.documentInfo.deleted_ids && deleted_ids && state.documentInfo.deleted_ids.push(...deleted_ids);
        },
        addDataTableDocument: (state, action: PayloadAction<IsDocument>) => {
            state.documentList.unshift(action.payload);
        },
        removeDataTableDocument: (state, action: PayloadAction<{ id: number; index: number }>) => {
            const idDocumentUpload = action.payload.id;
            const deletePostIndex = state.documentList.findIndex((post) => post.id === idDocumentUpload);
            if (deletePostIndex !== -1) {
                state.documentList.splice(deletePostIndex, 1);
            }

            state.documentInfo.documents?.splice(action.payload.index, 1);
        },
        removeAllDataTableDocument: (state) => {
            state.documentList = initialState.documentList;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getEmployeeList.fulfilled, (state, action) => {
                state.employeeList = action.payload;
                state.statusAdd = false;
            })
            .addCase(getEmployeeListSearch.fulfilled, (state, action) => {
                state.employeeList = action.payload;
            })
            .addCase(getIdEmployeeUpdate.fulfilled, (state, action) => {
                state.employee = action.payload;
                state.documentList = action.payload.contracts;
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                state.employeeList.data.push(action.payload);
                state.employee = action.payload;
                state.statusAdd = true;
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
            .addCase(getGrade.fulfilled, (state, action) => {
                state.gradeList = action.payload;
            })
            .addCase(getBenefit.fulfilled, (state, action) => {
                state.benefitList = action.payload;
            })

            .addMatcher<PendingAction>(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loadingEmployee = true;
                },
            )
            .addMatcher<RejectedAction>(
                (action) => action.type.endsWith('/rejected'),
                (state) => {
                    state.loadingEmployee = false;
                },
            )
            .addMatcher<FulfilledAction>(
                (action) => action.type.endsWith('/fulfilled'),
                (state) => {
                    state.loadingEmployee = false;
                },
            );
    },
});
export const {
    changeValueFormEmployeeInfo,
    getIdEmployeeDelete,
    changeValueEmployeeUpdate,
    removeValueFormEmployeeInfo,
    resetErorrsEmployee,
    setErrorsEmployee,
    addDataToDocument,
    addDataTableDocument,
    removeDataTableDocument,
    removeAllDataTableDocument,
} = employeeSlice.actions;

export default employeeSlice.reducer;
