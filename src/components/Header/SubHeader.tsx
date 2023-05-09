import { MdKeyboardArrowRight } from 'react-icons/md';

type subHeader = {
    category: string;
    title: string;
};

const SubHeader = ({ category, title }: subHeader) => {
    return (
        <div className="mb-10">
            <div className="flex items-center text-center gap-2">
                <p className="text-gray-600 font-medium">{category}</p>
                <MdKeyboardArrowRight size={16} />
                <p className="text-2xl font-semibold tracking-tight ">{title}</p>
            </div>
            <div className="mt-4">
                <h3 className="text-5xl font-semibold">{title}</h3>
            </div>
        </div>
    );
};

export default SubHeader;
