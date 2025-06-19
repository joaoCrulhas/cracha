import { OmitType } from '@nestjs/swagger';
import { Action } from '../response/action';

export class CreateActionDto extends OmitType(Action, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
