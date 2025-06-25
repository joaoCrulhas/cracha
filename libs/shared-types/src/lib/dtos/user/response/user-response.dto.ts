export class UserDto {
  id: number;
  applicationId: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  hasDashboardAccess: boolean;
  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
