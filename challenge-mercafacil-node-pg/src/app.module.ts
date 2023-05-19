import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContactModule } from './contact/contact.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './contact/entities/contact.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    // Postgres
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('MAIN_DB_HOST'),
          port: parseInt(configService.get('MAIN_DB_PORT')),
          database: configService.get('MAIN_DB_DATABASE'),
          username: configService.get('MAIN_DB_USERNAME'),
          password: configService.get('MAIN_DB_PASSWORD'),
          entities: [Contact, User],
          synchronize: true,
        };
      },
    }),
    ContactModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
