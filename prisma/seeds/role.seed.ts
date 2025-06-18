import { PrismaClient } from '../src/lib/generated';

export const seedRoles = ['admin', 'user', 'guest'];
export async function roleSeed(prisma: PrismaClient, userId: number) {
  const roleIds: number[] = [];
  console.log('Seeding Roles');
  for (const role of seedRoles) {
    const roleCreated = await prisma.role.create({
      data: {
        name: role,
        description: 'test',
        createrUser: {
          connect: {
            id: userId,
          },
        },
      },
    });
    roleIds.push(roleCreated.id);
  }

  console.log('Finished seed roles');
  return roleIds;
}
