import { CreateUserRequestDto } from '../../modules/user/dtos';
import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient, User } from '@cracha/prisma';

type CreatedInput = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  hasDashboardAccess?: boolean;
};

export class UserTestHelper {
  /**
   * Generates a `CreateUserRequestDto` object.
   * This function uses optional input values, and if any value is not provided,
   * it will be automatically generated using the `faker` library.
   *
   * @param {CreatedInput} [input] - Optional input values to override defaults.
   * @returns {CreateUserRequestDto} - The generated user input object.
   */
  static createUserInput(input?: CreatedInput): CreateUserRequestDto {
    const fName = input?.firstName ?? faker.person.firstName();
    const lName = input?.lastName ?? faker.person.lastName();
    const uEmail =
      input?.email ??
      faker.internet.email({
        firstName: fName,
        lastName: lName,
      });
    return {
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
      data: input ?? UserTestHelper.createUserInput(),
    });
  }
}
