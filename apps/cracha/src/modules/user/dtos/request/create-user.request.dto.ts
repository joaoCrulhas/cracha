import { OmitType } from '@nestjs/swagger';
import { User } from '../response/user-response.dto';

export class CreateUserRequestDto extends OmitType(User, ['id']) {}
