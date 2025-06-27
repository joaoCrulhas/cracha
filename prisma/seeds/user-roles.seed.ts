import { Prisma, PrismaClient } from '../src';

export async function userRolesSeed(
  prisma: PrismaClient,
  userIds: number[],
  roleIds: number[]
) {
  console.log(` 🤷‍♂️ Seeding userRoles`);
  const userRoles: Prisma.UserRolesCreateManyInput[] = [];
  for (const userId of userIds) {
    for (const roleId of roleIds) {
      userRoles.push({
        userId,
        roleId,
      });
    }
  }
  await prisma.userRoles.createMany({
    data: userRoles,
  });

  console.log('Finished seed userRoles');
}
