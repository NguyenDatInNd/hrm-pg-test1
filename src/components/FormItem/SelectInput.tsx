import React, { useState, memo } from 'react';
import CustomInputSelect from './StyleSelectInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { PaperProps } from '@mui/material/Paper';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MarriageStatus } from '../../Types/employee';
import './Input.scss';
type PropsSelect = {
    label: string;
    placeholder?: string;
    isRequired?: boolean;
    value?: string | any;
    onChange?: (event: SelectChangeEvent) => void;
    name: string;
    isNa?: boolean;
    // eslint-disable-next-line @typescript-eslint/ban-types
    data: {}[];
    isType?: boolean;
};

const SelectInput = (props: PropsSelect) => {
    const { label, name, data, placeholder, isRequired, isNa, value, onChange, isType } = props;
    const [isValue, setIsValue] = useState(true);

    const customPaperProps: PaperProps = {
        sx: {
            marginTop: '2px',
            boxShadow: 'none',
            fontWeight: '400',
            fontSize: '16px',
            border: ' 1px solid rgb(223, 227, 230)',
            padding: '0 10px',
            '& .MuiMenuItem-root': {
                marginBottom: '2px',
                fontSize: '14px',
            },
            '& .Mui-focusVisible': {
                ...(isNa && {
                    color: 'rgb(48, 164, 108)',
                    borderRadius: '6px',
                    backgroundColor: 'rgb(233, 249, 238)',
                }),
                ...(!isNa && {
                    backgroundColor: '#fff !important',
                }),
            },
            '& .MuiMenuItem-root:hover': {
                color: 'rgb(48, 164, 108)',
                borderRadius: '6px',
                fontSize: '14px',
            },
            '& .MuiMenuItem-root.Mui-selected': {
                backgroundColor: 'rgb(233, 249, 238)',
                borderRadius: '6px',
                color: 'rgb(48, 164, 108)',
            },
        },
    };

    const handleSelectBlur = () => {
        if (value || value === 0) {
            setIsValue(true);
        } else {
            setIsValue(false);
        }
    };
    return (
        // <Box component="form" className="form" noValidate autoComplete="off">
        <div className="flex flex-col ">
            <div className="flex items-center h-12">
                <label htmlFor={label} className="font-normal !text-2xl min-w-[162px] flex">
                    {label}
                    {isRequired && <span className="text-required font-normal isRequired text-lg">* </span>}
                </label>
                <Select
                    displayEmpty
                    className={`select-type h-12 min-w-290 max-w-300 mb-2.5 ${isType ? 'select-type-2' : ''} ${
                        isRequired && !isValue && 'input-danger'
                    } `}
                    id={name}
                    input={<CustomInputSelect />}
                    MenuProps={{
                        PaperProps: customPaperProps,
                    }}
                    IconComponent={ExpandMoreIcon}
                    onChange={onChange}
                    name={name}
                    value={value == '' ? undefined : value}
                    defaultValue={isNa ? '' : undefined}
                    renderValue={(selected: any) => {
                        if (selected === '' || selected === undefined) {
                            return placeholder;
                        }
                        const selectedItem = data.find((item: any) => item?.id === selected) as MarriageStatus;

                        return selectedItem?.name;
                    }}
                    onBlur={handleSelectBlur}
                >
                    {isNa && <MenuItem value={''}>N/A</MenuItem>}
                    {data.map((item: any) => (
                        <MenuItem value={item.id} key={item.id}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </div>

            {isRequired && !isValue && (
                <span className={`text-danger mt-[12px] -mb-[10px] text-lg font-normal  ml-[172px]`}>
                    Please {name} is not empty
                </span>
            )}
        </div>
        // </Box>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(SelectInput);
