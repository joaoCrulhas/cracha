import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient, User } from '@cracha/prisma';

export class UserTestHelper {
  static createUserInput(
    input?: Partial<Prisma.UserCreateInput>
  ): Prisma.UserCreateInput {
    const fName = input?.firstName ?? faker.person.firstName();
    const lName = input?.lastName ?? faker.person.lastName();
    const uEmail =
      input?.email ??
      faker.internet.email({
        firstName: fName,
        lastName: lName,
      });
    return {
      applicationId: faker.string.uuid(),
      username: `${fName}_${lName}`,
      password: input?.password ?? faker.internet.password(),
      firstName: fName,
      lastName: lName,
      email: uEmail,
      hasDashboardAccess: input?.hasDashboardAccess ?? false,
    };
  }

  /**
   * Creates a user record in the database using the provided Prisma client.
   * If no input is provided, a default user input object is generated.
   *
   * @param {PrismaClient} prisma - The Prisma client instance used to interact with the database.
   * @param {Prisma.UserCreateInput} [input] - Optional user input data to create the user. If not provided, a default is used.
   * @returns {Promise<Prisma.User>} - A promise that resolves to the created user record.
   */
  static async createUser(
    prisma: PrismaClient,
    input?: Prisma.UserCreateInput
  ): Promise<User> {
    return prisma.user.create({
      data: input ?? UserTestHelper.createUserInput(input),
    });
  }

  /**
   * Assigns multiple roles to a user in the database.
   * If no role IDs are provided, it assigns all available roles.
   *
   * @param {PrismaClient} prisma - The Prisma client instance used to interact with the database.
   * @param {number} userId - The ID of the user to whom roles are being assigned.
   * @param {number[]} [roleIds] - Optional array of role IDs to assign. If not provided, all roles will be assigned.
   * @returns {Promise<Prisma.BatchPayload>} - A promise that resolves to the result of the createMany operation.
   */
  static async userRolesAssign(
    prisma: PrismaClient,
    userId: number,
    roleIds?: number[]
  ): Promise<Prisma.BatchPayload> {
    if (!roleIds) {
      const allRolesIds = await prisma.role.findMany({
        select: {
          id: true,
        },
      });
      roleIds = allRolesIds.map((role) => role.id);
    }
    const userRoles: Prisma.UserRolesCreateManyInput[] = [];
    for (const role of roleIds) {
      userRoles.push({
        userId,
        roleId: role,
      });
    }
    return prisma.userRoles.createMany({
      data: userRoles,
    });
  }
}
