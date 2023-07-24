import {useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

// eslint-disable-next-line react/prop-types
const RequireAuth = ({ allowPer }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return(
        // eslint-disable-next-line react/prop-types
        auth?.permissions?.find(per => allowPer?.includes(per))
            ? <Outlet/>
            : auth?.accessToken
                ? <Navigate to="/unauthorized" state={{from: location}} replace/>
                : <Navigate to="/login" state={{from: location}} replace/>
    )
}

export default RequireAuth;