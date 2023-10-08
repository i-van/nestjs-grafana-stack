import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PinoLogger } from './pino-logger';
import { initTracer } from './tracing/tracer';

async function bootstrap() {
  initTracer();

  const logger = new PinoLogger();
  logger.overrideNestLogger();
  const app = await NestFactory.create(AppModule, { logger });
  await app.listen(3000);
}
void bootstrap();
