import { Body, Controller, Post } from '@nestjs/common';
import { CreateResourceRequestDto } from '../dto';
import { ResourceService } from '../services';

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}
  @Post()
  /* <<<<<<<<<<<<<<  ✨ Windsurf Command ⭐ >>>>>>>>>>>>>>>> */
  /**
   * Creates a new resource.
   *
   * @param input - The resource input data to create.
   * @returns The created resource.
   */
  /* <<<<<<<<<<  fb37742b-ea9b-42db-be97-9916e03fe9bf  >>>>>>>>>>> */
  async create(@Body() input: CreateResourceRequestDto) {
    return await this.resourceService.create(input);
  }
}
