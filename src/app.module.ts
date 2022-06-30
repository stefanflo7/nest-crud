import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ObservationsModule } from './observations/observations.module';
import { UsersModule } from './users/users.module';
import { ImagesModule } from './images/images.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: +configService.get<number>('DB_PORT', 54321),
        username: configService.get('POSTGRES_USER', 'nest-crud-username'),
        password: configService.get('POSTGRES_PASSWORD', 'nest-crud-password'),
        database: configService.get('POSTGRES_DB', 'nest-crud-database'),
        entities: [__dirname + '/../**/*.entity.js'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ObservationsModule,
    UsersModule,
    ImagesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
