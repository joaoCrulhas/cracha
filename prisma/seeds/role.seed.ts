import { Prisma, PrismaClient } from '../src';

export const seedRoles = ['admin', 'user'];
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

export async function seedGuestRole(prisma: PrismaClient) {
  const data: Prisma.RoleCreateInput = {
    name: 'guest',
    description: 'test',
    createrUser: {
      connect: {
        id: 1,
      },
    },
  };
  const roleCreated = await prisma.role.create({
    data,
  });
  return roleCreated.id;
}
