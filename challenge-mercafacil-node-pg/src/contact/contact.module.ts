import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { Contact } from './entities/contact.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Contact]),
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
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
