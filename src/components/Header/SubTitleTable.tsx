import React from 'react';

type subTitleTable = {
    category: string | null;
    title: string | null;
};
const SubTitleTable = ({ category, title }: subTitleTable) => {
    console.log(category);

    return (
        <div className="mb-[18px]">
            <div className="flex items-center justify-between -mt-3 pb-3 border-b border-[#c1c8cd3d]">
                <div>
                    <h3 className="font-semibold text-[1.75rem] -ml-1">{category}</h3>
                </div>

                {title ? (
                    <div className="-mr-1">
                        <span className="font-medium text-[#687076] text-[1.35rem] ">{title}</span>
                        <span className="font-medium text-xl">
                            (<span className="text-[#E5484D] text-2xl">*</span>){' '}
                        </span>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default SubTitleTable;
