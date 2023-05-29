import attendace from '../assets/attendace.svg';
import leave from '../assets/leave.svg';
import payroll from '../assets/payroll.svg';
import employee from '../assets/employee.svg';
import user from '../assets/use.svg';
import master from '../assets/master.svg';
import global from '../assets/global.svg';
import setting from '../assets/setting.svg';
export const links = [
    {
        title: 'General',
        links: [
            {
                name: 'Attendance Management',
                icon: attendace,
                nameLink: 'attendance',
            },
            {
                name: 'Leave Management',
                icon: leave,
                nameLink: 'leave',
            },
            {
                name: 'Payroll Management',
                icon: payroll,
                nameLink: 'payroll',
            },
            {
                name: 'Employee Management',
                icon: employee,
                nameLink: 'employee',
            },
            {
                name: 'User Management',
                icon: user,
                nameLink: 'user',
            },
            {
                name: 'Master Management',
                icon: master,
                nameLink: 'master',
            },
        ],
    },
    {
        title: 'Advance',
        links: [
            {
                name: 'Global Settings',
                icon: global,
                nameLink: 'global',
            },
            {
                name: 'Settings',
                icon: setting,
                nameLink: 'settings',
            },
        ],
    },
];

export const gender = [
    {
        id: 0,
        name: 'Male',
        value: 0,
    },
    {
        id: 1,
        name: 'Female',
        value: 1,
    },
];

// not use
export const marriage = [
    {
        id: 0,
        name: 'Married with one kid',
        value: 0,
    },
    {
        id: 1,
        name: 'Signle',
        value: 1,
    },

    {
        id: 2,
        name: 'Married',
        value: 2,
    },
];
// not use
export const employeeType = [
    {
        id: '0',
        name: 'Parmanent',
        code: 'MK01',
        company_id: 1,
        created_at: '2023-04-27T09:41:28.000000Z',
        updated_at: null,
    },
    {
        id: '1',
        name: 'Part-time',
        code: 'S01',
        company_id: 1,
        created_at: '2023-04-27T09:41:28.000000Z',
        updated_at: null,
    },
    {
        id: '2',
        name: 'Contract',
        code: 'M01',
        company_id: 1,
        created_at: '2023-04-27T09:41:28.000000Z',
        updated_at: null,
    },
];
