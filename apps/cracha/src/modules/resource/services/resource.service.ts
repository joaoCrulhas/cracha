import { Injectable } from '@nestjs/common';
import { CreateResourceRequestDto } from '../dto';
import { DatabaseService } from '../../system/database/services';
import { ResourceResponseDto } from '../dto/response/resource-response.dto';

@Injectable()
export class ResourceService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(input: CreateResourceRequestDto): Promise<ResourceResponseDto> {
    const resourceCreated = await this.databaseService.client.resource.create({
      data: input,
    });
    return {
      id: resourceCreated.id,
      name: resourceCreated.name,
    };
  }
}
