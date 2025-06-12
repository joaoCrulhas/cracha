import { Injectable, OnModuleInit } from '@nestjs/common';
import { prisma } from '@cracha/prisma';

@Injectable()
export class DatabaseService implements OnModuleInit {
  get client() {
    return prisma;
  }

  async onModuleInit() {
    await prisma.$connect();
  }

  async onModuleDestroy() {
    await prisma.$disconnect();
  }
}
