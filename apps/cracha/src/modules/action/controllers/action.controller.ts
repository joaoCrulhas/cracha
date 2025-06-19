import { Body, Controller, Post } from '@nestjs/common';
import { ActionService } from '../services/action.service';
import { ActionDto, CreateActionDto } from '../dtos';

@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}
  @Post()
  async create(@Body() input: CreateActionDto): Promise<ActionDto> {
    return await this.actionService.createAction(input);
  }
}
