import { Validate } from 'class-validator';
import { UniqueValidator } from '../../../../validators/unique.validator';

export class CreateResourceRequestDto {
  @Validate(UniqueValidator, ['resource', 'name'])
  name: string;
}
