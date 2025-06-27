import { PrismaClient } from '../src';

const DEFAULT_ACTIONS = ['create', 'read', 'update', 'delete'];

export async function actionSeed(prisma: PrismaClient) {
  console.log('Seeding Actions');
  const actions: number[] = [];
  for (const action of DEFAULT_ACTIONS) {
    const actionCreated = await prisma.action.create({
      data: {
        name: action,
      },
    });
    actions.push(actionCreated.id);
  }
  console.log('Finished seed actions');

  return actions;
}
