import { MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

type subHeader = {
    category: string;
    title: string;
    subtitle: string | null;
};

const SubHeader = ({ category, title, subtitle }: subHeader) => {
    return (
        <div className="mb-10">
            <div className="flex items-center text-center gap-2">
                <p className="text-gray-600 font-medium">{category}</p>
                <MdKeyboardArrowRight size={16} />

                {subtitle ? (
                    <>
                        <Link to="/employee">
                            <p className="text-2xl text-gray-500 font-semibold tracking-tight ">{title}</p>
                        </Link>

                        <MdKeyboardArrowRight size={16} />
                        <p className="text-2xl font-semibold tracking-tight ">{subtitle}</p>
                    </>
                ) : (
                    <>
                        <p className="text-2xl font-semibold tracking-tight ">{title}</p>
                    </>
                )}
            </div>
            <div className="mt-4">
                <h3 className="text-5xl font-semibold">{title}</h3>
            </div>
        </div>
    );
};

export default SubHeader;
