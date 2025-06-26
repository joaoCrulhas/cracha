import instance from '../axios-client';
import { API_PATHS } from '../api-urls';
import { UserDto } from '@cracha/shared-types';

export const fetchUserApi = async (accessToken: string): Promise<UserDto> => {
  const response = await instance.get<UserDto>(API_PATHS.user.me, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
