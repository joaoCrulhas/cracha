//export class CreateUserRequestDto extends OmitType(User, ['id']) {}
import { OmitType } from '@nestjs/swagger';
import { Role } from '../response/role.dto';

export class CreateRoleRequestDto extends OmitType(Role, [
  'id',
  'deletedAt',
  'createdAt',
  'updatedAt',
]) {}
