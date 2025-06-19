import { OmitType } from '@nestjs/swagger';
import { ActionDto } from '../response/action';

export class UpdateActionDto extends OmitType(ActionDto, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
