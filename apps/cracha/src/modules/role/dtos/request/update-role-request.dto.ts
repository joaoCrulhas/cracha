import { PartialType } from '@nestjs/swagger';
import { CreateRoleRequestDto } from './create-role-request.dto';

export class UpdateRoleRequestDto extends PartialType(CreateRoleRequestDto) {}
