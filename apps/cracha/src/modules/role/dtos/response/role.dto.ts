import { Validate } from 'class-validator';
import { UniqueValidator } from '../../../../validators/unique.validator';

export class Role {
  id: number;
  @Validate(UniqueValidator, ['role', 'name'])
  name: string;
  createdUserId: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
