import { PrismaClient } from '../src';

export async function roleActionResourceSeed(
  actionResourceIds: number[],
  roleIds: number[],
  prisma: PrismaClient
) {
  for (const actionResourceId of actionResourceIds) {
    for (const roleId of roleIds) {
      await prisma.rolePermission.create({
        data: {
          actionResourceId,
          roleId,
        },
      });
    }
  }
}
