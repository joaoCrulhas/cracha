import { OmitType } from '@nestjs/swagger';
import { User } from '../../entities/user.entity';

export class CreateUserRequestDto extends OmitType(User, ['id']) {}
