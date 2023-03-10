import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ssl: process.env.STAGE === 'prod',
      /* extra: {
        ssl: process.env.STAGE === 'prod' ? { rejectUnauthorized:false } : null
      }, */
      type: 'postgres',
      host: String(process.env.DB_HOST),
      port: Number(process.env.DB_PORT),
      database: String(process.env.DB_NAME),
      username: String(process.env.DB_USERNAME),
      password: String(process.env.DB_PASSWORD),
      autoLoadEntities: true,
      synchronize: false,

    }),
    ProductsModule,
    CommonModule
  ],
})
export class AppModule {}
