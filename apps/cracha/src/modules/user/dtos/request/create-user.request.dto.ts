import { OmitType } from '@nestjs/swagger';
import { UserDto } from '@cracha/shared-types';

export class CreateUserRequestDto extends OmitType(UserDto, ['id']) {}
