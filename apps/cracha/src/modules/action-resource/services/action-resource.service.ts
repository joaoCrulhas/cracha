import { Injectable } from '@nestjs/common';
import { AddResourceRequestDto } from '../dtos';
import { DatabaseService } from '../../system/database/services';
import { ActionResource, Prisma } from '@cracha/prisma';

@Injectable()
export class ActionResourceService {
  constructor(private readonly databaseService: DatabaseService) {}
  /**
   * Add a resource to an action.
   *
   * Creates a new row in the `action_resources` table, linking the given
   * `resourceId` to the given `actionId`.
   *
   * @param {{ resourceId: number, actionId: number }} dto - An object with
   * `resourceId` and `actionId` properties.
   * @returns {Promise<Prisma.ActionResource>} - The newly created row in the
   * `action_resources` table.
   */
  async addResource({
    resourceId,
    actionId,
  }: AddResourceRequestDto): Promise<ActionResource> {
    const input: Prisma.ActionResourceCreateInput = {
      resource: {
        connect: {
          id: resourceId,
        },
      },
      action: {
        connect: {
          id: actionId,
        },
      },
    };
    return await this.databaseService.client.actionResource.create({
      data: input,
    });
  }

  /**
   * Removes a resource from an action.
   *
   * Deletes all rows in the `action_resources` table that have the given
   * `actionId` and `resourceId`.
   *
   * @param {number} actionId - The ID of the action that the resource should be
   * removed from.
   * @param {number} resourceId - The ID of the resource to remove from the
   * action.
   * @returns {Promise<ActionResource>} - The result of the deletion
   * operation.
   */
  async removeResource(
    actionId: number,
    resourceId: number
  ): Promise<ActionResource> {
    const args: Prisma.ActionResourceDeleteArgs = {
      where: {
        actionId_resourceId: {
          actionId,
          resourceId,
        },
      },
    };
    return await this.databaseService.client.actionResource.delete(args);
  }
}
