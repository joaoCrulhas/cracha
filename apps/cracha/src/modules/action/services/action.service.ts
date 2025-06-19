import { Injectable } from '@nestjs/common';
import { Action, CreateActionDto, UpdateActionDto } from '../dtos';
import { DatabaseService } from '../../system/database/services/database.service';

@Injectable()
export class ActionService {
  constructor(private readonly databaseService: DatabaseService) {}
  async createAction(input: CreateActionDto): Promise<Action> {
    const actionCreated = await this.databaseService.client.action.create({
      data: input,
    });
    return Action.fromPrisma(actionCreated);
  }

  async deleteAction(id: number): Promise<Action> {
    return await this.databaseService.client.action.delete({
      where: {
        id,
      },
    });
  }

  async updateAction(id: number, input: UpdateActionDto): Promise<Action> {
    return await this.databaseService.client.action.update({
      data: input,
      where: {
        id,
      },
    });
  }
}
