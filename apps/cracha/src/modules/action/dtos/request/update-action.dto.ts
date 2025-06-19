import { OmitType } from '@nestjs/swagger';
import { Action } from '../response/action';

export class UpdateActionDto extends OmitType(Action, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
