import { Injectable } from '@nestjs/common';
import { ActionDto, CreateActionDto, UpdateActionDto } from '../dtos';
import { DatabaseService } from '../../system/database/services/database.service';

@Injectable()
export class ActionService {
  constructor(private readonly databaseService: DatabaseService) {}
  async createAction(input: CreateActionDto): Promise<ActionDto> {
    const actionCreated = await this.databaseService.client.action.create({
      data: input,
    });
    return ActionDto.fromPrisma(actionCreated);
  }

  async deleteAction(id: number): Promise<ActionDto> {
    return await this.databaseService.client.action.delete({
      where: {
        id,
      },
    });
  }

  async updateAction(id: number, input: UpdateActionDto): Promise<ActionDto> {
    return await this.databaseService.client.action.update({
      data: input,
      where: {
        id,
      },
    });
  }
}
