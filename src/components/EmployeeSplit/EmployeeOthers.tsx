import React, { ChangeEvent, useEffect, useState, useCallback } from 'react';
import SubTitleTable from '../Header/SubTitleTable';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useAppDispatch, useAppSelector } from '../../store';
import { changeValueFormEmployeeInfo, getBenefit, getGrade } from '../../pages/Redux/employee.slice';
import { Employee, IsBenefit } from '../../Types/employee';
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
    fontSize: '1.4rem',
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

type PropsFormDataEmployee = {
    employee: Employee;
};

const EmployeeOthers = ({ employee }: PropsFormDataEmployee) => {
    const dispatch = useAppDispatch();
    const { gradeList, benefitList } = useAppSelector((state) => state.employee);
    const [selectedOption, setSelectedOption] = useState<IsBenefit[]>([]);
    // get API Grade, Benefit
    useEffect(() => {
        const benefit = dispatch(getBenefit());
        const grade = dispatch(getGrade());
        return () => {
            benefit.abort();
            grade.abort();
        };
    }, [dispatch]);

    // handle change option benefit list
    const handleOptionChange = (event: any, newValue: IsBenefit[]) => {
        setSelectedOption(newValue ?? undefined);
        if (newValue) {
            const idBenefits = newValue.map((item) => item);
            dispatch(changeValueFormEmployeeInfo({ name: 'benefits', value: idBenefits }));
        }
    };

    const handleDeleteOption = (option: IsBenefit) => {
        const filteredBenefits = employee.benefits.filter((item) => item !== option);
        dispatch(changeValueFormEmployeeInfo({ name: 'benefits', value: filteredBenefits }));
        const updatedOptions = selectedOption.filter((item) => item !== option);
        setSelectedOption(updatedOptions);
    };

    // handle Change Remark
    const hanleChangeRemark = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            const { value, name } = e.target;
            dispatch(changeValueFormEmployeeInfo({ name: name, value }));
        },
        [dispatch],
    );

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
                        value={gradeList.find((item) => item.id === employee.grade_id) || null}
                        onChange={(event, newValue) => {
                            if (newValue === null) {
                                dispatch(changeValueFormEmployeeInfo({ name: 'grade', value: [] }));
                                dispatch(changeValueFormEmployeeInfo({ name: 'grade_id', value: null }));
                            } else {
                                dispatch(changeValueFormEmployeeInfo({ name: 'grade', value: newValue }));
                                dispatch(changeValueFormEmployeeInfo({ name: 'grade_id', value: newValue.id }));
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

                {employee.grade_id && (
                    <div className="flex items-center">
                        <span className="font-normal text-2xl min-w-[162px]"></span>
                        <div className="flex items-center flex-wrap  pb-2  max-w-[400px]">
                            {employee.grade_id &&
                                gradeList.map(
                                    (grade) =>
                                        grade.id === employee.grade_id &&
                                        grade.benefits.map((benefit) => (
                                            <div
                                                key={benefit.id}
                                                className="flex items-center font-medium text-[#687076] text-lg bg-[#e6e8eb] px-3 py-[4px] rounded-xl ml-3 mt-1"
                                            >
                                                {benefit.name}
                                            </div>
                                        )),
                                )}
                        </div>
                    </div>
                )}

                <div className="flex items-center">
                    <span className="font-normal text-2xl min-w-[162px]">Benefit</span>
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        options={benefitList}
                        getOptionLabel={(option) => option.name}
                        value={employee.benefits}
                        sx={autocompleteStyles}
                        onChange={handleOptionChange}
                        disableCloseOnSelect
                        clearIcon={<ClearIcon />}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                autoFocus
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
                                    label={option?.name}
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
                    <TextAreaStyle name="remark" onChange={hanleChangeRemark} value={employee.remark} />
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
                            return;
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

// benefitList = [
//     {
//         id: 130,
//         name: 'Cameron Brown',
//         code: 'B-980874',
//         type: 2,
//         value: '842',
//         company_id: 1,
//         created_at: '2023-04-27T09:41:29.000000Z',
//         updated_at: '2023-04-27T09:41:29.000000Z',
//     },
//     {
//         id: 129,
//         name: 'Mr. Arthur Aufderhar',
//         code: 'B-796990',
//         type: 2,
//         value: '489',
//         company_id: 1,
//         created_at: '2023-04-27T09:41:29.000000Z',
//         updated_at: '2023-04-27T09:41:29.000000Z',
//     },
//     {
//         id: 128,
//         name: 'Mr. Brown Herzog IV',
//         code: 'B-189512',
//         type: 2,
//         value: '180',
//         company_id: 1,
//         created_at: '2023-04-27T09:41:29.000000Z',
//         updated_at: '2023-04-27T09:41:29.000000Z',
//     },
//     {
//         id: 127,
//         name: 'Nicolas Wilderman',
//         code: 'B-335681',
//         type: 0,
//         value: '104',
//         company_id: 1,
//         created_at: '2023-04-27T09:41:29.000000Z',
//         updated_at: '2023-04-27T09:41:29.000000Z',
//     },
//     {
//         id: 126,
//         name: 'Aylin Langosh',
//         code: 'B-799767',
//         type: 2,
//         value: '600',
//         company_id: 1,
//         created_at: '2023-04-27T09:41:29.000000Z',
//         updated_at: '2023-04-27T09:41:29.000000Z',
//     },
//     {
//         id: 124,
//         name: 'Pinkie Ortiz PhD',
//         code: 'B-164389',
//         type: 2,
//         value: '380',
//         company_id: 1,
//         created_at: '2023-04-27T09:41:29.000000Z',
//         updated_at: '2023-04-27T09:41:29.000000Z',
//     },
//     {
//         id: 123,
//         name: 'Ms. Evangeline Halvorson',
//         code: 'B-63323',
//         type: 1,
//         value: '961',
//         company_id: 1,
//         created_at: '2023-04-27T09:41:29.000000Z',
//         updated_at: '2023-04-27T09:41:29.000000Z',
//     },
// ];

// employee.benefits = [
//     {
//         id: 128,
//         name: 'Mr. Brown Herzog IV',
//         code: 'B-189512',
//         type: 2,
//         value: '180',
//         company_id: 1,
//         created_at: '2023-04-27T09:41:29.000000Z',
//         updated_at: '2023-04-27T09:41:29.000000Z',
//     },
//     {
//         id: 127,
//         name: 'Nicolas Wilderman',
//         code: 'B-335681',
//         type: 0,
//         value: '104',
//         company_id: 1,
//         created_at: '2023-04-27T09:41:29.000000Z',
//         updated_at: '2023-04-27T09:41:29.000000Z',
//     },
//     {
//         id: 126,
//         name: 'Aylin Langosh',
//         code: 'B-799767',
//         type: 2,
//         value: '600',
//         company_id: 1,
//         created_at: '2023-04-27T09:41:29.000000Z',
//         updated_at: '2023-04-27T09:41:29.000000Z',
//     },
// ];
