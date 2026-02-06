import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { VaultService } from '../../vault/vault.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(vaultService: VaultService) {
    const supabaseUrl = vaultService.get<string>('SUPABASE_URL');

    if (!supabaseUrl) {
      throw new Error('SUPABASE_URL not defined in Vault');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      audience: 'authenticated',
      issuer: `${supabaseUrl}/auth/v1`,
      algorithms: ['RS256', 'ES256'],

      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${supabaseUrl}/auth/v1/.well-known/jwks.json`,
      }),
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.app_metadata?.role || payload.role,
    };
  }
}
