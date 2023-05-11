import { Suspense, lazy } from 'react';
import './App.css';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './configs/router';
import { ACCESS_TOKEN_KEY } from './utils/contants';
import { useAppSelector } from './store';

const LoginPage = lazy(() => import('./modules/page/loginPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const EmployeePage = lazy(() => import('./pages/employee/EmployeeList'));
const CreateOrUpdateEmployee = lazy(() => import('./pages/employee/CreateEmployee'));

import { Header, SideBar } from './components/index';

function App() {
    // const cookieValue = Cookies.get(ACCESS_TOKEN_KEY);
    // console.log(cookieValue);
    const loadingLogin = useAppSelector((state) => state.company.loadingLogin);

    return (
        <>
            <div>
                <div className="flex relative flex-wrap dark:bg-main-dark-bg">
                    {loadingLogin ? (
                        <div className="">
                            <div style={{ zIndex: '101' }} className="w-full sidebar fixed">
                                <Header />
                            </div>

                            <div
                                style={{ zIndex: '99' }}
                                className="w-[325px] mt-24  fixed sidebar dark:bg-secondary-dark-bg bg-white"
                            >
                                <SideBar />
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                    <div
                        className={`dark:bg-main-bg bg-main-bg min-h-screen w-full ${
                            loadingLogin ? 'md:ml-[325px]' : ''
                        }`}
                    >
                        <Suspense fallback={<div>Loading.....</div>}>
                            <Routes>
                                <Route path="/" Component={LoginPage} />
                                <Route path={ROUTES.login} Component={LoginPage} />
                                <Route path={ROUTES.home} Component={HomePage} />
                                <Route path={ROUTES.employee} Component={EmployeePage} />
                                <Route path={ROUTES.creatOrUpdate} Component={CreateOrUpdateEmployee} />
                            </Routes>
                        </Suspense>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
