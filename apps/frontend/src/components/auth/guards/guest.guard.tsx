import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

export interface GuestGuardProps {
  children: React.ReactNode;
}

function GuestGuard({ children }: GuestGuardProps): React.JSX.Element | null {
  const { user, isLoading, fetchUser } = useAuth();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkPermissions = async (): Promise<void> => {
    if (isLoading) {
      return;
    }
    const token = localStorage.getItem('accessToken');

    if (!token) {
      setIsChecking(false);
      return;
    }

    if (user) {
      // should verify if the user can access the dashboard
      await fetchUser(token);
      setIsChecking(false);
      navigate('/dashboard');
      return;
    }
    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions().catch(() => {
      setHasError(true);
    });
  }, [user, isLoading, checkPermissions]);

  if (isChecking) {
    return null;
  }

  if (hasError) {
    return <Alert color="error">Error to check UserPermission</Alert>;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <React.Fragment>{children}</React.Fragment>;
}
export default GuestGuard;
