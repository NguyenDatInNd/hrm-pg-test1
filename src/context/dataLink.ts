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
            },
            {
                name: 'Leave Management',
                icon: leave,
            },
            {
                name: 'Payroll Management',
                icon: payroll,
            },
            {
                name: 'Employee Management',
                icon: employee,
            },
            {
                name: 'User Management',
                icon: user,
            },
            {
                name: 'Master Management',
                icon: master,
            },
        ],
    },
    {
        title: 'Advance',
        links: [
            {
                name: 'Global Settings',
                icon: global,
            },
            {
                name: 'Settings',
                icon: setting,
            },
        ],
    },
];
