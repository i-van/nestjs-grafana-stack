import { Logger, LoggerService } from '@nestjs/common';
import pino from 'pino';

export class PinoLogger implements LoggerService {
  private logger = pino();

  verbose(message: any, context?: string) {
    this.logger.trace({ context }, message);
  }

  debug(message: any, context?: string) {
    this.logger.debug({ context }, message);
  }

  log(message: any, context?: string) {
    this.logger.info({ context }, message);
  }

  warn(message: any, context?: string) {
    this.logger.warn({ context }, message);
  }

  error(message: any, trace?: string, context?: string) {
    this.logger.error({ context, trace }, message);
  }

  overrideNestLogger() {
    Logger.verbose = (message: any, context?: string) => this.verbose(message, context);
    Logger.debug = (message: any, context?: string) => this.debug(message, context);
    Logger.log = (message: any, context?: string) => this.log(message, context);
    Logger.warn = (message: any, context?: string) => this.warn(message, context);
    Logger.error = (message: any, trace?: string, context?: string) => this.error(message, trace, context);
  }
}
