import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ActionService } from '../services/action.service';
import { ActionDto, CreateActionDto, UpdateActionDto } from '../dtos';

@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}
  @Post()
  async create(@Body() input: CreateActionDto): Promise<ActionDto> {
    return await this.actionService.createAction(input);
  }

  @Get()
  async getAll(): Promise<ActionDto[]> {
    return await this.actionService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<ActionDto> {
    return await this.actionService.getById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: UpdateActionDto
  ): Promise<ActionDto> {
    return await this.actionService.updateAction(id, input);
  }
}
