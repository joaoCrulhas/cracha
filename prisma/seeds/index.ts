import { userSeed } from './user.seed';
import { PrismaClient } from '../src/lib/generated';
import { prisma } from '../src';
import { roleSeed } from './role.seed';

const executeSeeds = async (prisma: PrismaClient) => {
  const userIds = await userSeed(prisma);
  const roleIds = await roleSeed(prisma, userIds[0]);
};

(async () => {
  await executeSeeds(prisma);
})();
