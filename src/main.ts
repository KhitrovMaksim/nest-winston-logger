import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createLogger } from 'winston';
import { WinstonModule } from 'nest-winston';
import * as Winston from 'winston';

async function bootstrap() {
  const instance = createLogger({
    defaultMeta: { microservice: 'MyApp' },
    transports: [
      new Winston.transports.Console({
        format: Winston.format.json(),
      }),
    ],
  });
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance,
    }),
  });
  await app.listen(3000);
}
bootstrap();
