import React, { useEffect, useState } from 'react';
import SubTitleTable from '../Header/SubTitleTable';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useAppDispatch, useAppSelector } from '../../store';
import { getBenefit, getGrade } from '../../pages/Redux/employee.slice';
import { IsBenefit } from '../../Types/employee';
import { styled } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import { Chip } from '@mui/material';
import OtherUpload from '../Upload/OtherUpload';

// eslint-disable-next-line react-refresh/only-export-components
export const autocompleteStyles = {
    width: '326px',
    maxHeight: '300px',
    backgroundColor: 'rgb(241, 243, 245)',
    borderRadius: '6px',
    fontSize: '0.8125rem',
    marginBottom: '4px',
    '& .MuiAutocomplete-inputRoot': {
        padding: '8px 12px 6px 12px',
        '& input': {
            fontSize: '14px',
            lineHeight: '16px',
        },
    },
    '& .MuiAutocomplete-listbox': {
        backgroundColor: 'red',
        '& .MuiAutocomplete-option': {
            backgroundColor: 'red',
        },
    },
    '& .MuiAutocomplete-tag': {
        color: 'rgb(0, 145, 255)',
        backgroundColor: '#fff',
        borderRadius: '6px',
        fontSize: '14px',
        lineHeight: '16px',
        margin: '2px',
        padding: '4px',
    },
    '.MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
    '& .MuiFormControl-root-MuiTextField-root': {
        marginTop: '0',
    },
};

const TextAreaStyle = styled('textarea')(({ theme }) => ({
    width: '314px',
    flexGrow: 1,
    boxSizing: 'border-box',
    height: '96px',
    borderRadius: 8,
    minWidth: 314,
    maxWidth: 326,
    backgroundColor: '#f1f3f5',
    resize: 'none',
    marginBottom: '4px',
    padding: 16,
    '&:hover': {
        border: `#f1f3f5`,
    },
    '&:focus': {
        border: `none`,
        outline: 'none',
    },
}));

const EmployeeOthers = () => {
    const dispatch = useAppDispatch();
    const { gradeList, benefitList } = useAppSelector((state) => state.employee);

    // get API Grade, Benefit
    useEffect(() => {
        const benefit = dispatch(getBenefit());
        const grade = dispatch(getGrade());
        return () => {
            benefit.abort();
            grade.abort();
        };
    }, [dispatch]);
    const [selectedGradeIndex, setSelectedGradeIndex] = useState(-1);

    const [selectedOption, setSelectedOption] = useState<IsBenefit[]>([]);

    const handleOptionChange = (event: any, newValue: IsBenefit[]) => {
        setSelectedOption(newValue);
    };

    const handleDeleteOption = (option: IsBenefit) => {
        const updatedOptions = selectedOption.filter((item) => item !== option);
        setSelectedOption(updatedOptions);
    };
    return (
        <div>
            <SubTitleTable category="Others" title="Required" />
            <div className="flex flex-col gap-2">
                <div className="flex items-center">
                    <span className="font-normal text-2xl min-w-[162px]">Grade</span>
                    <Autocomplete
                        className="autocomplete-select"
                        disablePortal
                        options={gradeList}
                        sx={autocompleteStyles}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} />}
                        onChange={(event, newValue) => {
                            if (newValue) {
                                const selectedIndex = gradeList.findIndex((item) => item.name === newValue.name);
                                setSelectedGradeIndex(selectedIndex);
                            } else {
                                setSelectedGradeIndex(-1);
                            }
                        }}
                        renderOption={(props, option, { selected }) => (
                            <li
                                {...props}
                                style={{
                                    backgroundColor: selected ? '#e9f9ee' : 'inherit',
                                    color: selected ? '#30a46c' : 'inherit',
                                    padding: '6px 16px',
                                    fontSize: '14px',
                                }}
                            >
                                {option.name}
                            </li>
                        )}
                    />
                </div>
                <div className="flex items-center">
                    <span className="font-normal text-2xl min-w-[162px]">Benefit</span>
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        options={benefitList}
                        getOptionLabel={(option) => option.name}
                        value={selectedOption ?? undefined}
                        sx={autocompleteStyles}
                        onChange={handleOptionChange}
                        disableCloseOnSelect
                        clearIcon={<ClearIcon />}
                        // popupIcon={<ClearIcon />}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                sx={{
                                    maxHeight: '150px',
                                    overflowY: 'auto',
                                    overflowX: 'hidden',
                                    marginTop: '5px',
                                }}
                            />
                        )}
                        renderOption={(props, option, { selected }) => (
                            <li
                                {...props}
                                style={{
                                    backgroundColor: selected ? '#e9f9ee' : 'inherit',
                                    color: selected ? '#30a46c' : 'inherit',
                                    padding: '6px 16px',
                                    fontSize: '14px',
                                }}
                            >
                                {option.name}
                            </li>
                        )}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip
                                    label={option.name}
                                    {...getTagProps({ index })}
                                    onDelete={() => handleDeleteOption(option)}
                                    deleteIcon={
                                        <ClearIcon
                                            onClick={() => handleDeleteOption(option)}
                                            style={{ fontSize: 16 }}
                                        />
                                    }
                                />
                            ))
                        }
                    />
                </div>
                <div className="flex items-center">
                    <span className="font-normal text-2xl min-w-[162px]">Remark</span>
                    <TextAreaStyle />
                </div>

                <div className="flex items-center">
                    <span className="font-normal text-2xl min-w-[162px]">HRM User Account</span>
                    <Autocomplete
                        disabled
                        disablePortal
                        options={gradeList}
                        sx={autocompleteStyles}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} />}
                        onChange={(event, newValue) => {
                            if (newValue) {
                                const selectedIndex = gradeList.findIndex((item) => item.name === newValue.name);
                                setSelectedGradeIndex(selectedIndex);
                            } else {
                                setSelectedGradeIndex(-1);
                            }
                        }}
                    />
                </div>
            </div>

            <div className="mt-3">
                <OtherUpload />
            </div>
        </div>
    );
};

export default EmployeeOthers;
