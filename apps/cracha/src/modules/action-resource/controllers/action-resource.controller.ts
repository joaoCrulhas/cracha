import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ActionResourceService } from '../services';
import { AddResourceRequestDto } from '../dtos';

@Controller('action-resource')
export class ActionResourceController {
  constructor(private readonly actionResourceService: ActionResourceService) {}

  @Post()
  async addResourceAction(@Body() input: AddResourceRequestDto) {
    return await this.actionResourceService.addResourceAction(input);
  }

  @Get('/:resourceId')
  async getAllActions(@Param('resourceId', ParseIntPipe) resourceId: number) {
    return await this.actionResourceService.getAllActions(resourceId);
  }

  @Delete('/:actionId/:resourceId')
  async removeActionResource(
    @Param('actionId', ParseIntPipe) actionId: number,
    @Param('resourceId', ParseIntPipe) resourceId: number
  ) {
    return await this.actionResourceService.removeActionResource(
      actionId,
      resourceId
    );
  }
}
