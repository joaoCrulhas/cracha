import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActionService } from '../services/action.service';
import { ActionDto, CreateActionDto } from '../dtos';

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
  async getById(id: number): Promise<ActionDto> {
    return await this.actionService.getById(id);
  }
}
