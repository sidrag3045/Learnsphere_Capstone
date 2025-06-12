import {
  createBrowserRouter,
  Navigate
} from 'react-router-dom';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
// import ExploreCourses from '../pages/student/ExploreCourses';
// import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRouter = createBrowserRouter([
  { path: '/', element: <Navigate to="/explore" /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  // {
  //   path: '/explore',
  //   element: (
  //     <ProtectedRoute allowedRoles={['student']}>
  //       <ExploreCourses />
  //     </ProtectedRoute>
  //   )
  // },
  // { path: '*', element: <NotFound /> }
]);

export default AppRouter;
