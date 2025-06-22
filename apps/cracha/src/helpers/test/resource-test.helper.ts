import { Prisma, PrismaClient, Resource } from '@cracha/prisma';
import { faker } from '@faker-js/faker';

export class ResourceTestHelper {
  /**
   * Creates a default resource input object or merges the provided input with
   * default values.
   *
   * The default values are:
   * - `name`: a random food ingredient (e.g. "Basil")
   * - `description`: a random food ingredient (e.g. "Salt")
   *
   * If `input` is provided, it will be merged with the default values.
   *
   * @param {Partial<Prisma.ResourceCreateInput>} [input] - Optional resource input data to create the resource. If not provided, a default is used.
   * @returns {Prisma.ResourceCreateInput} - The created resource input object.
   */
  static createResourceInput(
    input?: Partial<Prisma.ResourceCreateInput>
  ): Prisma.ResourceCreateInput {
    return {
      name: input?.name ?? faker.food.ingredient(),
    };
  }

  /**
   * Creates a resource in the database using the provided Prisma client.
   * If no input is provided, a default resource input object is generated.
   *
   * @param {PrismaClient} prisma - The Prisma client instance used to interact with the database.
   * @param {Prisma.ResourceCreateInput} [input] - Optional resource input data to create the resource. If not provided, a default is used.
   * @returns {Promise<Prisma.Resource>} - A promise that resolves to the created resource.
   */
  static async createResource(
    prisma: PrismaClient,
    input?: Prisma.ResourceCreateInput
  ): Promise<Resource> {
    return prisma.resource.create({
      data: input ?? ResourceTestHelper.createResourceInput(input),
    });
  }
}
