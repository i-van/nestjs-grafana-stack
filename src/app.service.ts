import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private list: number[] = [];

  getList(): number[] {
    return this.list;
  }

  async getTimeout(): Promise<number> {
    return new Promise<number>((resolve) => {
      const n = this.getRandomNumber(2000);
      this.list.push(n);
      setTimeout(resolve, n, n);
    });
  }

  private getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
