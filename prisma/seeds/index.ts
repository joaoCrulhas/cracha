import { userSeed } from './user.seed';
import { prisma, PrismaClient } from '../src';
import { roleSeed } from './role.seed';
import { actionSeed } from './action.seed';
import { userRolesSeed } from './user-roles.seed';
import { resourceSeed } from './resource.seed';

const executeSeeds = async (prisma: PrismaClient) => {
  const userIds = await userSeed(prisma);
  const roleIds = await roleSeed(prisma, userIds[0]);
  const resourceIds = await resourceSeed(prisma, 10);
  const actions = await actionSeed(prisma);
  const userRolesIds = await userRolesSeed(prisma, userIds, roleIds);
};

(async () => {
  await executeSeeds(prisma);
})();
