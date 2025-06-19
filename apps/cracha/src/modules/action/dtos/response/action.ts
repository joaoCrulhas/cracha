import { Action as ActionPrisma } from '@cracha/prisma';

export class Action {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  static fromPrisma(action: ActionPrisma): Action {
    return {
      id: action.id,
      name: action.name,
      createdAt: action.createdAt,
      updatedAt: action.updatedAt,
    };
  }
}
