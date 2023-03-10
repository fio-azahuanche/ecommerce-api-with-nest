import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      ssl: {
        rejectUnauthorized: false,
      },
      extra: {
        max: 5,
        min: 1,
        idleTimeoutMillis: 5000,
        connectionTimeoutMillis: 2000,
      },
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: (process.env.DB_USERNAME),
      password: process.env.DB_PASSWORD,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,

    }),
    ProductsModule,
    CommonModule
  ],
})
export class AppModule {}
