import { NestFactory } from '@nestjs/core';

import * as serveStatic from 'serve-static';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import * as path from 'path';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  app.use('/', serveStatic(path.join(__dirname, '../public')))
  await app.listen(9300, '127.0.0.1');
}
bootstrap();
