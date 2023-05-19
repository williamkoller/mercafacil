import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtSignInterface } from './interfaces/jwt-sign.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAdapter {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async sign(data: JwtSignInterface): Promise<string> {
    return await this.jwtService.signAsync(data);
  }

  async verify(token: string) {
    return await this.jwtService.verifyAsync(token, {
      secret: this.config.get('JWT_SECRET'),
    });
  }
}
