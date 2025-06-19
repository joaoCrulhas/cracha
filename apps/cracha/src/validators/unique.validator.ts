import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DatabaseService } from '../modules/system/database/services/database.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'uniqueValidator', async: true })
@Injectable()
export class UniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly databaseService: DatabaseService) {}
  async validate(value: string, args: ValidationArguments) {
    const [tableName, field = 'name'] = args.constraints;
    const prismaModel =
      this.databaseService.client[
        tableName as keyof typeof this.databaseService.client
      ];

    const count: number = await (prismaModel as any).count({
      where: {
        [field]: value,
        ...(args.object['id'] && { id: { not: args.object['id'] } }),
      },
    });

    return count === 0;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} '${args.value}' is already taken`;
  }
}
