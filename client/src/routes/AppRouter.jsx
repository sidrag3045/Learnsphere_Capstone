import {
  createBrowserRouter,
  Navigate
} from 'react-router-dom';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ExploreCourses from '../pages/student/ExploreCourses';
// import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/layout/Layout';
import Home from '../pages/common/Home';
import Profile from '../pages/common/Profile';


const AppRouter = createBrowserRouter([
  { path: '/', element: <Navigate to="/home" replace /> },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
  path: '/',
  element: <ProtectedRoute />,
  children: [
    {
      path: '/',
      element: <Layout />, // ✅ Mount Layout here so it's rendered
      children: [
        { path: 'home', element: <Home /> },
        { path: 'explore', element: <ExploreCourses /> },
        { path: 'profile', element: <Profile /> }
      ]
    }
  ]
}
  // { path: '*', element: <NotFound /> }
]);

export default AppRouter;
