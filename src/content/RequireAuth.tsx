import { Children } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
    const { currentUser } = useAuth();
    const location = useLocation;

    /*if (!currentUser?.accessToken) {
        return <Navigate to={"/login"} replace />
    } else {
        return<><Outlet /></>
    }*/
    return (
        currentUser?.accessToken
        ? <Outlet />
        : <Navigate to="/login" state={{ from: location}} replace />
    );
}

export default RequireAuth;