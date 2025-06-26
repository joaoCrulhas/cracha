import instance from '../axios-client';
import { API_PATHS } from '../api-urls';
import { LoginRequestDto, LoginResponseDto } from '@cracha/shared-types';

export const loginUser = async ({
  username,
  password,
}: LoginRequestDto): Promise<LoginResponseDto> => {
  const response = await instance.post<LoginResponseDto>(API_PATHS.login, {
    username,
    password,
  });
  return response.data;
};
