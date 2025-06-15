import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const DashboardRedirect = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" replace />;

  const redirectPath =
    user.role === 'student'
      ? '/dashboard/student'
      : user.role === 'instructor'
      ? '/dashboard/instructor'
      : '/';

  return <Navigate to={redirectPath} replace />;
};

export default DashboardRedirect;
