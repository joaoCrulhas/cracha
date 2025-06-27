import { PrismaClient } from '../src';

const resourceNames = ['users', 'files', 'emails', 'documents'];

export async function resourceSeed(prisma: PrismaClient, amount = 5) {
  const reousrceIds: number[] = [];
  for (let i = 0; i <= amount; i++) {
    const { id } = await prisma.resource.create({
      data: {
        name: resourceNames[i],
      },
    });
    reousrceIds.push(id);
  }
  return reousrceIds;
}
