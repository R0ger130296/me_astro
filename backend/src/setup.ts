import { INestApplication, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { configuration } from './config';

export function setup(app: INestApplication) {
  app.setGlobalPrefix('api/v1');
  app.use(helmet());
  app.enableCors({ origin: configuration().origins, methods: ['GET', 'POST', 'PUT', 'DELETE'], allowedHeaders: ['Authorization', 'Content-Type'] });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true, validationError: { target: false, value: false } }));
  app.enableShutdownHooks();
}
