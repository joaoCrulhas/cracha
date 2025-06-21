import { Injectable, OnModuleInit } from '@nestjs/common';
import { ActionDto, CreateActionDto, UpdateActionDto } from '../dtos';
import { DatabaseService } from '../../system/database/services/database.service';
import { DEFAULT_ACTIONS } from '@cracha/constants';

@Injectable()
export class ActionService implements OnModuleInit {
  constructor(private readonly databaseService: DatabaseService) {}

  async onModuleInit() {
    for (const actionName of DEFAULT_ACTIONS) {
      const hasAction = await this.databaseService.client.action.count({
        where: {
          name: actionName,
        },
      });
      if (!hasAction) {
        await this.databaseService.client.action.create({
          data: {
            name: actionName,
          },
        });
      }
    }
  }

  async createAction(input: CreateActionDto): Promise<ActionDto> {
    const actionCreated = await this.databaseService.client.action.create({
      data: input,
    });
    return ActionDto.fromPrisma(actionCreated);
  }

  async deleteAction(id: number): Promise<ActionDto> {
    const actionDeleted = await this.databaseService.client.action.delete({
      where: {
        id,
      },
    });
    return ActionDto.fromPrisma(actionDeleted);
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
