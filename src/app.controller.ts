import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get('/')
  async getTimeout(): Promise<string> {
    const timeout1 = await this.service.getTimeout();
    const timeout2 = await this.service.getTimeout();
    return `Timeout: ${timeout1 + timeout2}`;
  }

  @Get('/list')
  async getList(): Promise<number[]> {
    return this.service.getList();
  }

  @Get('/health')
  healthCheck() {
    return { status: 'ok' };
  }
}
