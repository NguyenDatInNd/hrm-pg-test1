export interface Employee {
    id: number;
    old_staff_id: number | null;
    staff_id: string;
    name: string;
    gender: number | string;
    department_id: number | null;
    company_id: number;
    manager_id: number | null;
    marriage_id: number | string | null;
    position_id: number | null;
    type: string;
    mother_name: string;
    dob: string;
    pob: string | number;
    ktp_no: string;
    nc_id: string;
    home_address_1: string;
    home_address_2: string | any;
    mobile_no: string | any;
    tel_no: string;
    bank_account_no: string;
    bank_name: string;
    card_number: string | any;
    family_card_number: string;
    health_insurance_no: string;
    safety_insurance_no: string;
    basic_salary: number;
    audit_salary: number;
    health_insurance: number;
    safety_insurance: number;
    meal_allowance: number;
    entitle_ot: number;
    meal_allowance_paid: number;
    operational_allowance_paid: number;
    attendance_allowance_paid: number;
    minimum_salary_used: string;
    contract_start_date: string;
    shift: string;
    grade_id: number | null;
    remark: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    department_name: string;
    marriage_code: string;
    position_name: string | null;
    grade_prefix: string;
    manager_name: string | null;
    contracts: Contract[];
    documents: IsDocument[];
    grade: IsGrade[];
    benefits: IsBenefit[];
    grade_name: string;
    [key: string]: any;
}

export interface EmployeeList {
    current_page: number;
    data: Employee[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string;
        label: string;
        active: boolean;
    };
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface Contract {
    id: number;
    employee_id: number;
    contract_date: string;
    name: string;
    document: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface MarriageStatus {
    id: number;
    name: string;
    code: string;
    company_id: number;
    created_at: string;
    updated_at: string | null;
}

export interface Department {
    id: number;
    company_id: number;
    code: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface Position {
    id: number;
    company_id: number;
    code: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface IsBenefit {
    id: number;
    name: string;
    code: string;
    type: number;
    value: string;
    company_id: number;
    created_at: string;
    updated_at: string;
}

export interface IsGrade {
    id: number;
    name: string;
    prefix: string;
    company_id: number;
    created_at: string;
    updated_at: string;
    benefits: IsBenefit[];
}

export interface IsContractInfo {
    employee_id: string;
    names: string[];
    contract_dates: string[];
    documents: File[];
    modified_contracts: string[];
}

export interface IsDocumentFormData {
    employee_id: string | null;
    documents?: File[];
    deleted_ids?: number[];
}

export interface IsDocument {
    id: number;
    employee_id: number;
    created_at: string;
    document: string;
    updated_at: string | null;
}
