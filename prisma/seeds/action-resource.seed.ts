import { PrismaClient } from '../src';

export async function actionResourceSeed(
  resourceIds: number[],
  actionIds: number[],
  prisma: PrismaClient
) {
  const actionResourceIds: number[] = [];
  console.log(`Seeding actionResources`);
  for (const resourceId of resourceIds) {
    for (const actionId of actionIds) {
      const actionResourceCreated = await prisma.actionResource.create({
        data: {
          resourceId,
          actionId,
        },
      });
      actionResourceIds.push(actionResourceCreated.id);
    }
  }

  console.log('Finished seed actionResources');
  return actionResourceIds;
}
