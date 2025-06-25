import instance from '../axios-client';
import { API_PATHS } from '../api-urls';
import { LoginRequestDto, LoginResponseDto } from '@cracha/shared-types';

export const loginUser = async (
  input: LoginRequestDto
): Promise<LoginResponseDto> => {
  const response = await instance.post(API_PATHS.login, {
    username: input.username,
    password: input.password,
  });
  return response.data;
};
