import { OmitType } from '@nestjs/swagger';
import { ActionDto } from '../response/action';

export class CreateActionDto extends OmitType(ActionDto, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
