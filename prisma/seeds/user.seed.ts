import { faker } from '@faker-js/faker';
import { PrismaClient } from '../src/lib/generated';

export async function userSeed(prisma: PrismaClient, amount = 5) {
  const userIds: number[] = [];
  console.log('🤷‍♂️ Seeding users');
  for (let i = 0; i <= amount; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const userCreated = await prisma.user.create({
      data: {
        email: faker.internet.email({
          firstName,
          lastName,
        }),
        lastName,
        firstName,
        password: faker.internet.password(),
      },
    });
    userIds.push(userCreated.id);
  }
  console.log('Finished seed users');
  return userIds;
}
