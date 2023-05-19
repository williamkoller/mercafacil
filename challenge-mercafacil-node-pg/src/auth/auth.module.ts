import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { BcryptAdapter } from 'src/shared/cryptography/bcrypt-adapter/bcrypt-adapter';
import { JwtAdapter } from 'src/shared/jwt/jwt-adapter/jwt-adapter';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        defaultStrategy: configService.get('DEFAULT_STRATEGY'),
        property: configService.get('PROPERTY_USER'),
        session: configService.get('SESSION'),
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfService: ConfigService) => ({
        secret: cfService.get('JWT_SECRET'),
        global: true,
        signOptions: {
          expiresIn: cfService.get('EXPIRES_IN'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [BcryptAdapter, JwtAdapter, AuthService, JwtStrategy],
})
export class AuthModule {}
