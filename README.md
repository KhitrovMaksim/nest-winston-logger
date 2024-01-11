# NestJS. Logging with Winston with JSON format
## With new project
#### 1. Create new project
```shell
nest new .
npm i nest-winston
```
#### 2. Change src/main.js
From:
```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

```
To:
```typescript
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

```
#### 3. Change src/app.service.ts
From:
```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

```
To:
```typescript
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger: Logger = new Logger(AppService.name);
  getHello(): string {
    this.logger.log('Hello World!');
    return 'Hello World!';
  }
}

```
#### 4. Output
```shell
{"context":"AppService","level":"info","message":"Hello World!","microservice":"MyApp"}
```

## With an existing project
#### 1. Install dependencies
```shell
npm i nest-winston
```
#### 2. Change src/main.js
Add imports:
```typescript
import { createLogger } from 'winston';
import { WinstonModule } from 'nest-winston';
import * as Winston from 'winston';
```
Change bootstrap function:
```typescript
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
```
#### 3. Change src/app.service.ts
Import Logger:
```typescript
import { Logger } from '@nestjs/common';
```
Use logger in your service:
```typescript
@Injectable()
export class AppService {
  private readonly logger: Logger = new Logger(AppService.name);
  
  getHello(): string {
    this.logger.log('Hello World!');
    return 'Hello World!';
  }
}
```
#### 4. Output
```shell
{"context":"AppService","level":"info","message":"Hello World!","microservice":"MyApp"}
```