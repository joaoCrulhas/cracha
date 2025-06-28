import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { createExecutionCtx, mockedConfigService } from '../../../helpers/test';
import { ConfigService } from '@nestjs/config';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

describe('AuthGuard', () => {
  let jwtService: DeepMocked<JwtService>;
  let configService: ConfigService;
  let reflector: DeepMocked<Reflector>;
  let executionContext: DeepMocked<ExecutionContext>;

  beforeAll(() => {
    executionContext = createMock<ExecutionContext>();
    reflector = createMock<Reflector>();
    jwtService = createMock<JwtService>();
    configService = createMock<ConfigService>(mockedConfigService);
  });

  it('should be defined', () => {
    expect(new AuthGuard(configService, jwtService, reflector)).toBeDefined();
  });

  it('should return true if the request is public', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce(true);
    const guard = new AuthGuard(configService, jwtService, reflector);
    const result = await guard.canActivate(executionContext);
    expect(result).toBe(true);
  });

  it('should throw an UnauthorizedException if the token came without Bearer', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce(false);
    const guard = new AuthGuard(configService, jwtService, reflector);
    await expect(
      guard.canActivate(createExecutionCtx('token'))
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should return true if the token is provided', async () => {
    jwtService.verifyAsync.mockResolvedValueOnce({} as any);
    reflector.getAllAndOverride.mockReturnValueOnce(false);
    const guard = new AuthGuard(configService, jwtService, reflector);
    jest.spyOn(guard, 'isAdminRoute' as any).mockReturnValueOnce(false);
    const result = await guard.canActivate(createExecutionCtx('Bearer token'));
    expect(result).toEqual(true);
  });
});
