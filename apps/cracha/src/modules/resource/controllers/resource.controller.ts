import { Body, Controller, Post } from '@nestjs/common';
import { CreateResourceRequestDto } from '../dto';
import { ResourceService } from '../services';

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}
  @Post()
  async create(@Body() input: CreateResourceRequestDto) {
    return await this.resourceService.create(input);
  }
}
