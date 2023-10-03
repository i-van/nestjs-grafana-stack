import { Logger, LoggerService } from '@nestjs/common';
import pino from 'pino';

export class PinoLogger implements LoggerService {
  private logger = pino();

  verbose(message: any, context?: string, ...args: any[]) {
    this.logger.trace({ context }, message, ...args);
  }

  debug(message: any, context?: string, ...args: any[]) {
    this.logger.debug({ context }, message, ...args);
  }

  log(message: any, context?: string, ...args: any[]) {
    this.logger.info({ context }, message, ...args);
  }

  warn(message: any, context?: string, ...args: any[]) {
    this.logger.warn({ context }, message, ...args);
  }

  error(message: any, trace?: string, context?: string, ...args: any[]) {
    this.logger.error({ context, trace }, message, ...args);
  }

  overrideNestLogger() {
    Logger.verbose = (message: any, context?: string, ...args: any[]) =>
      this.verbose({ context }, message, ...args);
    Logger.debug = (message: any, context?: string, ...args: any[]) =>
      this.debug({ context }, message, ...args);
    Logger.log = (message: any, context?: string, ...args: any[]) =>
      this.log({ context }, message, ...args);
    Logger.warn = (message: any, context?: string, ...args: any[]) =>
      this.warn({ context }, message, ...args);
    Logger.error = (
      message: any,
      trace?: string,
      context?: string,
      ...args: any[]
    ) => this.error({ context, trace }, message, ...args);
  }
}
