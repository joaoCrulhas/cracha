import { Prisma, PrismaClient } from './generated';

export const softDelete = Prisma.defineExtension({
  name: 'softDelete',
  model: {
    role: {
      async delete<M, A>(
        this: M,
        where: Prisma.Args<M, 'delete'>['where']
      ): Promise<Prisma.Result<M, A, 'update'>> {
        console.log(where);
        const context = Prisma.getExtensionContext(this);

        return (context as any).update({
          where,
          data: {
            deletedAt: new Date(),
          },
        });
      },
    },
  },
});
export const filterSoftDeleted = Prisma.defineExtension({
  name: 'filterSoftDeleted',
  query: {
    role: {
      async $allOperations({ operation, args, query }) {
        if (
          operation === 'findUnique' ||
          operation === 'findFirst' ||
          operation === 'findMany'
        ) {
          args.where = { ...args.where, deletedAt: null };
          return query(args);
        }
        return query(args);
      },
    },
  },
});

export type CustomPrismaClient = ReturnType<typeof customPrismaClient>;

export const customPrismaClient = (prismaClient: PrismaClient) => {
  return prismaClient.$extends(softDelete).$extends(filterSoftDeleted); //here we add our created extensions
};

export const prisma = new PrismaClient();
