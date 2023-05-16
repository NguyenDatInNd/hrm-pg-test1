import React from 'react';
import { useAppDispatch } from '../../store';
import { loginSuccess } from '../Redux/company.slice';

const Setting = () => {
    const dispatch = useAppDispatch();
    dispatch(loginSuccess(true));
    return (
        <div className="mt-32">
            <div>This is Setting</div>
            <p>hehehheh</p>
        </div>
    );
};

export default Setting;
