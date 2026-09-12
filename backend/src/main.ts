import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configuration } from './config';
import { setup } from './setup';

async function bootstrap() {
  const config = configuration();
  const app = await NestFactory.create(AppModule);
  setup(app);
  await app.listen(config.port);
}
bootstrap().catch((error) => { console.error(error); process.exitCode = 1; });
