import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import english from '../../assets/English.svg';
import logo from '../../assets/HRM_Logo.svg';
import { ROUTES } from '../../configs/router';
import { logoutUser } from '../../pages/Redux/company.slice';
import { getUserDetails, logoutUserPost } from '../../pages/Redux/user.slice';
import { useAppDispatch, useAppSelector } from '../../store';
import './Header.scss';

interface Iprops {
    isActive?: boolean;
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Header = ({ isActive }: Iprops) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [openFirstModal, setOpenFirstModal] = useState(false);
    const [openSecondModal, setOpenSecondModal] = useState(false);
    const { user } = useAppSelector((state) => state.user);
    const logOut = async () => {
        await dispatch(logoutUserPost());
        await dispatch(logoutUser());
        navigate(ROUTES.login);
        setOpenSecondModal(false);
    };
    const handleOpenFirstModal = () => {
        setOpenFirstModal(true);
    };
    const handleCloseFirstModal = () => {
        setOpenFirstModal(false);
    };
    const handleOpenSecondModal = () => {
        setOpenSecondModal(true);
    };
    const handleCloseSecondModal = () => {
        setOpenSecondModal(false);
    };

    useEffect(() => {
        const promise = dispatch(getUserDetails());
        return () => {
            promise.abort();
        };
    }, [dispatch]);

    return (
        <div className={`w-full h-24 bg-white header-container  ${isActive && 'hidden'}`}>
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
                    <div className="relative">
                        <button
                            onClick={handleOpenFirstModal}
                            className="h-11 w-11 bg-gray-200 font-semibold text-[18px] text-white rounded-full"
                        >
                            T
                        </button>
                        <div>
                            <Modal
                                open={openFirstModal}
                                onClose={handleCloseFirstModal}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style} className="modalITemStyle">
                                    <div className="flex items-center gap-3">
                                        <div className="h-11 w-11 text-center bg-gray-200 font-semibold text-[18px] text-white rounded-full">
                                            t
                                        </div>
                                        <h3 className="font-semibold text-3xl font-family">{user?.username}</h3>
                                    </div>
                                    <div className="mt-5">
                                        <p>
                                            Staff ID: <span className="font-semibold text-lg">{user?.email}</span>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <Button onClick={handleOpenSecondModal} className="button-signout w-full">
                                            Sign Out
                                        </Button>
                                    </div>
                                    <div className="mt-3 font-semibold font-resetpass mb-3">
                                        <Link to="/settings">Reset Password</Link>
                                    </div>
                                </Box>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Modal
                    open={openSecondModal}
                    className={`${openSecondModal ? 'modalStyle' : ''}`}
                    onClose={handleCloseSecondModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className="modalITemStyleSecond">
                        <div className="flex items-center justify-between gap-3">
                            <span className=" text-center  font-semibold text-3xl">Do you wish to sign out?</span>
                            <span onClick={handleCloseSecondModal} className="cursor-pointer">
                                <ClearIcon className="!h-8 !w-8 rounded-full font-semibold" />
                            </span>
                        </div>
                        <div className="mt-5 mb-2 flex gap-3">
                            <Button
                                onClick={handleCloseSecondModal}
                                className="button-signout-close  !text-[#11181c] w-[48%] !bg-[#f1f3f5]"
                            >
                                No
                            </Button>
                            <Button onClick={logOut} className="button-signout w-[48%]">
                                Yes
                            </Button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
    );
};

export default Header;
