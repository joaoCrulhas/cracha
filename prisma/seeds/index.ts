import { userSeed } from './user.seed';
import { prisma, PrismaClient } from '../src';
import { roleSeed, seedGuestRole } from './role.seed';
import { actionSeed } from './action.seed';
import { userRolesSeed } from './user-roles.seed';
import { resourceSeed } from './resource.seed';
import { actionResourceSeed } from './action-resource.seed';
import { roleActionResourceSeed } from './role-action-resource.seed';

const executeSeeds = async (prisma: PrismaClient) => {
  const userIds = await userSeed(prisma);
  const roleIds = await roleSeed(prisma, userIds[0]);
  const resourceIds = await resourceSeed(prisma);
  const actions = await actionSeed(prisma);
  // Add role for users
  await userRolesSeed(prisma, userIds, roleIds);
  const actionResourceIds = await actionResourceSeed(
    resourceIds,
    actions,
    prisma
  );
  await roleActionResourceSeed(actionResourceIds, roleIds, prisma);

  await seedGuestRole(prisma);
};

(async () => {
  await executeSeeds(prisma);
})();
