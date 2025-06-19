import { OmitType } from '@nestjs/swagger';
import { UserDto } from '../response/user-response.dto';

export class CreateUserRequestDto extends OmitType(UserDto, ['id']) {}
