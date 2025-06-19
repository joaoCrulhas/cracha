import { User } from '@cracha/prisma';

export class UserDto {
  id: number;
  applicationId: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  hasDashboardAccess: boolean;
  static fromPrisma(input: User): UserDto {
    return {
      ...input,
    };
  }
}
