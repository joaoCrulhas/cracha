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
  /* <<<<<<<<<<<<<<  ✨ Windsurf Command ⭐ >>>>>>>>>>>>>>>> */
  /**
   * Update an action
   * @param id the id of the action to update
   * @param input the input with the new values
   * @returns the updated action
   */
  /* <<<<<<<<<<  40318af0-7b14-4e39-aea2-40e457125f49  >>>>>>>>>>> */
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: UpdateActionDto
  ): Promise<ActionDto> {
    return await this.actionService.updateAction(id, input);
  }
}
