import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import './Search.scss';
import { useAppDispatch, useAppSelector } from '../../store';
import { changeValueSearchEmployee } from '../../pages/Redux/employee.slice';

export interface ISearchEmployeeProps {
    onSearchEmployee: (value: string) => void;
    search: string | null;
}

const SearchEmployee = ({ onSearchEmployee, search }: ISearchEmployeeProps) => {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState<string>(search || '');
    const { searchValue } = useAppSelector((state) => state.employee);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // const { value } = e.target;
        // setValue(value);
        // dispatch(changeValueSearchEmployee(value));
        const { value } = e.target;
        setValue(value);
        onSearchEmployee(value);
    };
    return (
        <div className="search-action">
            <div>
                <BiSearch size={17} />
            </div>
            <div className="ml-2">
                <input
                    value={value}
                    onChange={(e) => handleInputChange(e)}
                    type="text"
                    className=""
                    placeholder="Search..."
                />
            </div>
        </div>
    );
};

export default SearchEmployee;
