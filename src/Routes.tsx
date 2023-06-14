import { Suspense, lazy } from 'react';
import './App.css';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from './configs/router';
import { ACCESS_TOKEN_KEY } from './utils/contants';
import { useAppSelector } from './store';
import { ToastContainer } from 'react-toastify';
const LoginPage = lazy(() => import('./modules/page/loginPage'));
const EmployeePage = lazy(() => import('./pages/employee/EmployeeListPage'));
const CreateOrUpdateEmployee = lazy(() => import('./pages/employee/CreateEmployee'));
const Settings = lazy(() => import('./pages/Settings/Setting'));
const ForgotPassWord = lazy(() => import('./modules/page/ForgotPasswordPage'));
import 'react-toastify/dist/ReactToastify.css';
import { Header, SideBar } from './components/index';
import PrivateRoutes from './configs/PrivateRoutes';
import ProtectedRoutes from './configs/ProtectedRoutes';

export const RoutesConfig = () => {
    const { accessToken } = useAppSelector((state) => state.user);
    const valueCookie = Cookies.get(ACCESS_TOKEN_KEY);

    return (
        <>
            <div>
                <div className="flex relative flex-wrap ">
                    {valueCookie ? (
                        <div className="">
                            <div style={{ zIndex: '101' }} className="w-full sidebar fixed">
                                <Header />
                            </div>

                            <div
                                style={{ zIndex: '99' }}
                                className="w-[325px] mt-24 fixed sidebar  bg-white border-r border-[#c1c8cd3d] "
                            >
                                <SideBar />
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                    <div
                        className={`dark:bg-main-bg bg-main-bg min-h-screen w-full ${
                            valueCookie ? 'md:ml-[325px]' : ''
                        }`}
                    >
                        <Suspense fallback={<div>Loading.....</div>}>
                            <Routes>
                                {/* <Route path="/" Component={LoginPage} />
                                <Route path={ROUTES.login} Component={LoginPage} />
                                <Route path={ROUTES.home} Component={HomePage} />
                                <Route path={ROUTES.employee} Component={EmployeePage} />
                                <Route path={ROUTES.creatOrUpdate} Component={CreateOrUpdateEmployee} />
                                <Route path={ROUTES.createUpdateId} Component={CreateOrUpdateEmployee} />
                                <Route path={ROUTES.setting} Component={Settings} />
                                <Route path={ROUTES.forgotpassword} Component={ForgotPassWord} /> */}

                                <Route element={<PrivateRoutes />}>
                                    <Route path={ROUTES.employee} Component={EmployeePage} />
                                    <Route path={ROUTES.creatOrUpdate} Component={CreateOrUpdateEmployee} />
                                    <Route path={ROUTES.createUpdateId} Component={CreateOrUpdateEmployee} />
                                    <Route path={ROUTES.setting} Component={Settings} />
                                </Route>
                                <Route element={<ProtectedRoutes />}>
                                    <Route path={ROUTES.login} Component={LoginPage} />
                                    <Route path={ROUTES.forgotpassword} Component={ForgotPassWord} />
                                </Route>
                                <Route path={ROUTES.login} Component={LoginPage} />
                                <Route path="/" Component={LoginPage} />
                            </Routes>
                        </Suspense>
                    </div>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        </>
    );
};
