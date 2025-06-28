import React, { useEffect } from 'react';
import DashboardLayout from '../layout';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { fetchPlatformUsersApi } from '../../../api/user/fetchPlatformUsersApi';
import { UserRoles } from '@cracha/shared-types';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'roles', headerName: 'Roles', width: 130 },
];

const parseUsers = (users: UserRoles[]) => {
  return users.map((user) => {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      roles:
        user.roles.length > 0
          ? user.roles.map((role) => role.name).join(', ')
          : '',
    };
  });
};
const paginationModel = { page: 0, pageSize: 5 };

function UsersPage() {
  // make a request to get the users
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [users, setUsers] = React.useState<UserRoles[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return;
    }

    fetchPlatformUsersApi(token)
      .then((response) => {
        setUsers(response);
        setIsLoading(false);
      })
      .catch((_e) => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={parseUsers(users)}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </DashboardLayout>
  );
}

export default UsersPage;
