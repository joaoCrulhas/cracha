import { Prisma, PrismaClient } from '../src';

export async function resourceSeed(prisma: PrismaClient) {
  const input: Prisma.ResourceCreateManyInput[] = [
    {
      name: 'users',
    },
    {
      name: 'files',
    },
    {
      name: 'emails',
    },
    {
      name: 'documents',
    },
  ];
  await prisma.resource.createMany({
    data: input,
  });
  const resources = await prisma.resource.findMany({
    select: {
      id: true,
    },
  });
  return resources.map((element) => element.id);
}
