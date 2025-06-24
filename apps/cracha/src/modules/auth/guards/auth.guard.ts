import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.route';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IS_ADMIN_KEY } from './admin.route';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly jwtSecret: string;
  private readonly apiKey: string;
  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService,
    private reflector: Reflector
  ) {
    this.jwtSecret = this.configService.getOrThrow('jwtSecret');
    this.apiKey = this.configService.getOrThrow(
      'crachaAdminCredentials.apiKey'
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    if (this.isAdminRoute(context, request)) {
      return true;
    }

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      request['user'] = await this.jwtService.verifyAsync(token, {
        secret: this.jwtSecret,
      });
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private isAdminRoute(context: ExecutionContext, request: Request) {
    const [handler, classTarget] = [context.getHandler(), context.getClass()];
    const isAdmin = this.reflector.getAllAndOverride<boolean>(IS_ADMIN_KEY, [
      handler,
      classTarget,
    ]);
    if (!isAdmin) {
      return;
    }
    const apiKey = this.getHeader('x-api-key', request);

    if (!apiKey) {
      throw new UnauthorizedException(`Missing API key`);
    }
    if (apiKey !== this.apiKey) {
      throw new UnauthorizedException(`Invalid API key`);
    }
    return true;
  }
  private getHeader(header: string, request: Request) {
    return request.headers[header] || request.headers[header.toLowerCase()];
  }
}
