import { PrismaClient } from '../src';

export async function resourceSeed(prisma: PrismaClient, amount = 5) {
  const reousrceIds: number[] = [];
  for (let i = 0; i <= amount; i++) {
    const { id } = await prisma.resource.create({
      data: {
        name: `resource-${i}`,
      },
    });
    reousrceIds.push(id);
  }
  return reousrceIds;
}
