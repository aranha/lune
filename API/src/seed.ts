import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SeederModule } from './seeders/seeder.module';
import { Seeder } from './seeders/seeder';

async function bootstrap() {
  const app = await NestFactory.create(SeederModule);
  const logger = app.get(Logger);
  const seeder = app.get(Seeder);
  try {
    await seeder.seed()
    logger.debug('Seeding complete!');
  } catch (error) {
    logger.error('Seeding failed!', error);
  } finally {
    app.close();
  }
}
bootstrap();
