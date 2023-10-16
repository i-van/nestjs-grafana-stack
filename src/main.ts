import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { PinoLogger } from './pino-logger';
import { initTracer } from './tracing/tracer';
import { Configuration } from './config/configuration';

async function bootstrap() {
  const logger = new PinoLogger();
  logger.overrideNestLogger();
  const app = await NestFactory.create(AppModule, { logger });
  const config = app.get<ConfigService<Configuration>>(ConfigService);
  initTracer(config.get('tracing'));
  await app.listen(config.get('port'));
}
void bootstrap();
