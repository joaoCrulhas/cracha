import { PrismaClient } from '../../generated';

class PrismaSingleton {
  private static instance: PrismaClient;

  public static getInstance(): PrismaClient {
    if (!PrismaSingleton.instance) {
      PrismaSingleton.instance = new PrismaClient();
    }

    return PrismaSingleton.instance;
  }
}

// Export a single instance
export const prisma = PrismaSingleton.getInstance();
