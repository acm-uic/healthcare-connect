import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import connectDB from './utils/database';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    methods: 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
  });
  await app.listen(process.env.PORT || 5000);
  console.log(`Application is running on: "http://localhost:${process.env.PORT || 5000}"`);
  await connectDB();
}
bootstrap();
