import { Injectable } from '@nestjs/common';
import { Trace } from './observability';

@Injectable()
export class AppService {
  private list: number[] = [];

  @Trace()
  async getList(): Promise<number[]> {
    await this.delay(this.getRandomNumber(1000));
    return this.list;
  }

  @Trace()
  async getTimeout(): Promise<number> {
    const n = this.getRandomNumber(1000);
    this.list.push(n);
    await this.delay(n);
    return n;
  }

  private delay(timeout: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, timeout));
  }

  private getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
