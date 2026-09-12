import { CanActivate, ExecutionContext, ForbiddenException, Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { configuration } from '../config';

export const Public = () => SetMetadata('public', true);

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly config = configuration();
  private readonly keys = createRemoteJWKSet(new URL(`${this.config.issuer}/protocol/openid-connect/certs`));
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.reflector.getAllAndOverride<boolean>('public', [context.getHandler(), context.getClass()])) return true;
    const authorization: unknown = context.switchToHttp().getRequest().headers.authorization;
    if (typeof authorization !== 'string' || !/^Bearer \S+$/i.test(authorization)) throw new UnauthorizedException();
    let payload;
    try {
      ({ payload } = await jwtVerify(authorization.slice(7), this.keys, {
        issuer: this.config.issuer, audience: this.config.audience, algorithms: ['RS256'], requiredClaims: ['exp', 'sub', 'iat'],
      }));
      if (payload.typ !== 'Bearer') throw new Error('Not an access token');
    } catch { throw new UnauthorizedException('Sesión inválida o vencida'); }
    const access = payload.resource_access as Record<string, { roles?: unknown }> | undefined;
    const roles = access?.[this.config.audience]?.roles;
    if (!Array.isArray(roles) || !roles.includes('portfolio-admin')) throw new ForbiddenException('Se requiere el rol portfolio-admin');
    return true;
  }
}
