import instance from '../axios-client';
import { API_PATHS } from '../api-urls';
import { UserRoles } from '@cracha/shared-types';

export const fetchPlatformUsersApi = async (
  accessToken: string
): Promise<UserRoles[]> => {
  const response = await instance.get<UserRoles[]>(API_PATHS.user.platform, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
