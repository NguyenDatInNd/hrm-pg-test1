import { useAppDispatch } from '../../store';
import './Header.scss';
import { loginSuccess } from '../../pages/Redux/company.slice';
import logo from '../../assets/HRM_Logo.svg';
import english from '../../assets/English.svg';
import { MdKeyboardArrowDown } from 'react-icons/md';

const Header = () => {
    const dispatch = useAppDispatch();
    dispatch(loginSuccess(true));
    // const cookieValue = Cookies.get(ACCESS_TOKEN_KEY);
    // console.log(cookieValue);

    return (
        <div className="w-full h-24 bg-white header-container">
            <div className="flex py-3 px-12 justify-between items-center">
                <div className="">
                    <div className="flex justify-center items-center">
                        <img src={logo} className="header-logo" alt="" />
                        <h2 className="ml-7 font-semibold header-title">HR Management System</h2>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div>
                        <button className="button-select-language">
                            <div className="flex items-center gap-2">
                                <img src={english} className="h-5 w-6" alt="" />
                                <small className="font-semibold">EN</small>
                            </div>
                            <span>
                                <MdKeyboardArrowDown size={18} />
                            </span>
                        </button>
                    </div>
                    <div>
                        <button className="h-11 w-11 bg-gray-200 font-semibold text-[18px] text-white rounded-full">
                            T
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
