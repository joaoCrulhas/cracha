import { Injectable, OnModuleInit } from '@nestjs/common';
import { prisma, PrismaClient } from '@cracha/prisma';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  prisma: PrismaClient;
  constructor() {
    super();
    this.prisma = prisma;
  }
  async onModuleInit() {
    await this.prisma.$connect();
  }
}
