import { UserDto } from '../user';

export class Role {
  id: number;
  name: string;
  createdUserId: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export type UserRoles = UserDto & { roles: Role[] };
