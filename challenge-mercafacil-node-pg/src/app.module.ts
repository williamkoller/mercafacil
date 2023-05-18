import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContactModule } from './contact/contact.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './contact/entities/contact.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
          entities: [Contact],
          synchronize: true,
        };
      },
    }),

    ContactModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
