import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import './Search.scss';
import { useAppDispatch } from '../../store';
export interface ISearchEmployeeProps {
    onSearchEmployee: (value: string) => void;
    search: string | null;
}

const SearchEmployee = ({ onSearchEmployee, search }: ISearchEmployeeProps) => {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState<string>(search || '');
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setValue(value);
        onSearchEmployee(value);
    };
    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        setIsFocused(false);
    };
    return (
        <div className={`search-action  ${isFocused && 'search-focus'}`}>
            <div>
                <BiSearch size={17} />
            </div>
            <div className="ml-2">
                <input
                    value={value}
                    onChange={(e) => handleInputChange(e)}
                    type="text"
                    className="input_search"
                    placeholder="Search..."
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                />
            </div>
        </div>
    );
};

export default SearchEmployee;
