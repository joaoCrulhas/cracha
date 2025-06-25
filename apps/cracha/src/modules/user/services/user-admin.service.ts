import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../system/database/services';
import { CreateUserRequestDto, UserDto } from '../dtos';
import { EncryptService } from '../../system/encrypt/services';

@Injectable()
export class UserAdminService {
  private hasDashboardAccess = true;
  constructor(
    private readonly encryptService: EncryptService,
    private readonly databaseService: DatabaseService
  ) {}

  /**
   * Creates a new admin user with dashboard access.
   * Encrypts the user's password and stores the user in the database.
   *
   * @param input - The data for creating the user.
   * @returns The created admin user as a UserDto.
   */
  async createUserAdmin(input: CreateUserRequestDto): Promise<UserDto> {
    const password = await this.encryptService.encrypt(input.password);
    const userCreated = await this.databaseService.client.user.create({
      data: {
        ...input,
        password,
        hasDashboardAccess: this.hasDashboardAccess,
      },
    });
    return UserDto.fromPrisma(userCreated);
  }

  /**
   * Retrieves an admin user by their ID.
   *
   * @param id - The ID of the user to retrieve.
   * @returns A promise that resolves to the user data as a UserDto object.
   * @throws An error if no user is found with the given ID.
   */
  async getAdminUser(id: number): Promise<UserDto> {
    const user = await this.databaseService.client.user.findFirstOrThrow({
      where: {
        id,
      },
    });
    return UserDto.fromPrisma(user);
  }
}
