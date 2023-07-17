import 'bootstrap/dist/css/bootstrap.min.css';
import { Suspense, lazy, useMemo } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { Header, SideBar } from './components/index';
import PrivateRoutes from './configs/PrivateRoutes';
import ProtectedRoutes from './configs/ProtectedRoutes';
import { ROUTES } from './configs/router';
const Settings = lazy(() => import('./pages/Settings/Setting'));
const ForgotPassWord = lazy(() => import('./modules/page/ForgotPasswordPage'));
const LoginPage = lazy(() => import('./modules/page/loginPage'));
const EmployeePage = lazy(() => import('./pages/employee/EmployeeListPage'));
const CreateOrUpdateEmployee = lazy(() => import('./pages/employee/CreateEmployee'));

export const RoutesConfig = () => {
    const valueToken = localStorage.getItem('accessToken');
    let { pathname } = useLocation();
    pathname = pathname.replace('/', '');
    const miniSidebarClass = useMemo(() => {
        if (pathname === 'login') {
            return true;
        }
        return false;
    }, [pathname]);

    return (
        <>
            <div>
                <div className="flex relative flex-wrap ">
                    {valueToken ? (
                        <div className="">
                            <div style={{ zIndex: '101' }} className="w-full sidebar fixed">
                                <Header isActive={miniSidebarClass} />
                            </div>

                            <div
                                style={{ zIndex: '99' }}
                                className="w-[325px] mt-24 fixed sidebar  bg-white border-r border-[#c1c8cd3d] "
                            >
                                <SideBar isActive={miniSidebarClass} />
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                    <div
                        className={`dark:bg-main-bg bg-main-bg min-h-screen w-full ${
                            valueToken ? 'md:ml-[325px]' : ''
                        }`}
                    >
                        <Suspense fallback={<div>Loading.....</div>}>
                            <Routes>
                                <Route element={<PrivateRoutes />}>
                                    <Route path={ROUTES.employee} Component={EmployeePage} />
                                    <Route path={ROUTES.creatOrUpdate} Component={CreateOrUpdateEmployee} />
                                    <Route path={ROUTES.createUpdateId} Component={CreateOrUpdateEmployee} />
                                    <Route path={ROUTES.setting} Component={Settings} />
                                </Route>
                                <Route element={<ProtectedRoutes />}>
                                    <Route path={ROUTES.login} Component={LoginPage} />
                                    <Route path="/" Component={LoginPage} />
                                    <Route path={ROUTES.forgotpassword} Component={ForgotPassWord} />
                                </Route>
                                <Route path={ROUTES.login} Component={LoginPage} />
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
