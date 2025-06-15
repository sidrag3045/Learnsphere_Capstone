// src/routes/AppRouter.jsx
import { createBrowserRouter, Navigate } from 'react-router-dom';


import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';


import Profile from '../pages/common/Profile';
import Home from '../pages/common/Home';


import ProtectedRoute from './ProtectedRoute';


import Layout from '../components/layout/Layout';


import ExploreCourses from '../pages/dashboards/student/ExploreCourses';
import StudentDashboardHome from '../pages/dashboards/student/DashboardHome';
import Enrollments from '../pages/dashboards/student/Enrollments';


import InstructorDashboardHome from '../pages/dashboards/instructor/DashboardHome';
import ManageCourses from '../pages/dashboards/instructor/ManageCourses';
import UploadContent from '../pages/dashboards/instructor/UploadContent';


import DashboardRedirect from './DashboardRedirect';


import CourseDetail from '../pages/courses/CoursesDetail';
import LessonViewer from '../pages/courses/LessonsViewer';


const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/home" replace />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <DashboardRedirect />
      },
      {
        path: '/',
        element: <Layout />,
        children: [
          // Common
          { path: '/home', element: <Home /> },
          { path: '/profile', element: <Profile /> },
          { path: '/courses/:courseId', element: <CourseDetail /> },
          { path: '/lessons/:lessonId', element: <LessonViewer /> },

          // Student Dashboard
          {
            path: '/dashboard/student',
            element: <StudentDashboardHome />
          },
          {
            path: '/dashboard/student/explore',
            element: <ExploreCourses />
          },
          {
            path: '/dashboard/student/enrollments',
            element: <Enrollments />
          },

          // Instructor Dashboard
          {
            path: '/dashboard/instructor',
            element: <InstructorDashboardHome />
          },
          {
            path: '/dashboard/instructor/manage',
            element: <ManageCourses />
          },
          {
            path: '/dashboard/instructor/upload',
            element: <UploadContent />
          }
        ]
      }
    ]
  }
]);

export default AppRouter;