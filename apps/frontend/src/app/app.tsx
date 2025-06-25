// Uncomment this line to use CSS modules
// import styles from './app.module.scss';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage } from '../routes';
import ProtectedRoute from '../routes/ProtectedRoutes';
import { AuthProvider } from '../context/AuthContext';
import { Dashboard } from '../routes/dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      // { index: true, element: <Home /> },
      { path: 'login', element: <LoginPage /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: 'dashboard', element: <Dashboard /> }],
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
