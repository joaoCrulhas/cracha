import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';

export * from './config-service.mock';

export function createExecutionCtx(authorization?: string): ExecutionContext {
  return createMock<ExecutionContext>({
    switchToHttp: () => ({
      getRequest: () => ({
        headers: {
          ...(authorization ? { authorization } : {}),
        },
      }),
    }),
  });
}
