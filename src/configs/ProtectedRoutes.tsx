import { Navigate, Outlet } from 'react-router-dom';
import { ACCESS_TOKEN_KEY } from '../utils/contants';
import { ROUTES } from './router';
import Cookies from 'js-cookie';
const ProtectedRoutes = () => {
    const valueToken = localStorage.getItem('accessToken');
    return !valueToken ? <Outlet /> : <Navigate to={ROUTES.employee} replace />;
};

export default ProtectedRoutes;
