import { Role } from '../../../role/dtos';

export class UserRolesResponseDto {
  userId: number;
  roles: Array<Role>;
}
