import { CreateUserRequestDto } from '../../src/modules/user/dtos';
import { faker } from '@faker-js/faker';

type CreatedInput = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  hasDashboardAccess?: boolean;
};

export class UserTestHelper {
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
}
