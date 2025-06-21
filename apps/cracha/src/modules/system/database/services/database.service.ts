import { Injectable, OnModuleInit } from '@nestjs/common';
import { customPrismaClient, CustomPrismaClient, prisma } from '@cracha/prisma';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private customPrismaClient: CustomPrismaClient;
  get client(): CustomPrismaClient {
    if (!this.customPrismaClient)
      this.customPrismaClient = customPrismaClient(prisma);

    return this.customPrismaClient;
  }

  async onModuleInit() {
    await prisma.$connect();
  }

  getPrisma() {
    return prisma;
  }

  async onModuleDestroy() {
    await prisma.$disconnect();
  }
}
