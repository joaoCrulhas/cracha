import instance from '../axios-client';
import { API_PATHS } from '../api-urls';

export const loginUser = async (username: string, password: string) => {
  const response = await instance.post(API_PATHS.login, {
    username,
    password,
  });

  return response.data;
};
