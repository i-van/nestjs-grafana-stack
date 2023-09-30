import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get('/')
  async getTimeout(): Promise<string> {
    const timeout = await this.service.getTimeout();
    return `Timeout: ${timeout}`;
  }

  @Get('/list')
  async getList(): Promise<number[]> {
    return this.service.getList();
  }
}
