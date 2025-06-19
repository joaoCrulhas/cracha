import { Action, Prisma, PrismaClient } from '@cracha/prisma';
import { faker } from '@faker-js/faker';

export class ActionTestHelper {
  static createActionInput(
    input?: Prisma.ActionCreateInput
  ): Prisma.ActionCreateInput {
    return {
      name: input?.name ?? faker.airline.airline().name,
    };
  }

  static async createAction(
    prisma: PrismaClient,
    input?: Prisma.ActionCreateInput
  ): Promise<Action> {
    return prisma.action.create({
      data: input ?? ActionTestHelper.createActionInput(input),
    });
  }
}
