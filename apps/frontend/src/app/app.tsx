// Uncomment this line to use CSS modules
// import styles from './app.module.scss';

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import ProtectedRoute from '../routes/ProtectedRoutes';
import { AuthProvider } from '../context/AuthContext';
import SignInPage from './auth/sign-in/page';
import DashboardIndex from './dashboard/page';
import UsersPage from './dashboard/users/usersPage';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      // { index: true, element: <Home /> },
      { path: 'login', element: <SignInPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'users', element: <UsersPage /> },
          { path: 'dashboard', element: <DashboardIndex /> },
        ],
      },
    ],
  },
]);

export function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
