import { Action as ActionPrisma } from '@cracha/prisma';
import { Validate } from 'class-validator';
import { UniqueValidator } from '../../../../validators/unique.validator';

export class ActionDto {
  id: number;
  @Validate(UniqueValidator, ['action', 'name'])
  name: string;
  createdAt: Date;
  updatedAt: Date;
  static fromPrisma(action: ActionPrisma): ActionDto {
    return {
      id: action.id,
      name: action.name,
      createdAt: action.createdAt,
      updatedAt: action.updatedAt,
    };
  }
}
