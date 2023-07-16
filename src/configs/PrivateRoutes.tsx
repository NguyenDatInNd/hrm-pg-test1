import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from './router';
const PrivateRoutes = () => {
    const valueToken = localStorage.getItem('accessToken');
    return valueToken ? <Outlet /> : <Navigate to={ROUTES.login} replace />;
};

export default PrivateRoutes;
