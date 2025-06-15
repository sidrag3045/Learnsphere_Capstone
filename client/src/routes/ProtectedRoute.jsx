import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchUserThunk } from '../store/auth/test';

const ProtectedRoute = ({ allowedRoles }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        await dispatch(fetchUserThunk()).unwrap();
      } catch (err) {
        console.warn('User not authenticated');
      } finally {
        setChecked(true);
      }
    };
    verify();
  }, [dispatch]);

  if (!checked) {
    return <p className="pt-32 text-center text-gray-600">Checking authentication...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
