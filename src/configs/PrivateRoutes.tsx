import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';
import { ACCESS_TOKEN_KEY } from '../utils/contants';
import { ROUTES } from './router';
const PrivateRoutes = () => {
    const valueCookie = Cookies.get(ACCESS_TOKEN_KEY);
    return valueCookie ? <Outlet /> : <Navigate to={ROUTES.login} replace />;
};

export default PrivateRoutes;
