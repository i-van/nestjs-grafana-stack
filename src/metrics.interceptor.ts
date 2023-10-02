import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { URL } from 'url';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Histogram } from 'prom-client';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(
    @InjectMetric('http_request_duration_seconds')
    private readonly duration: Histogram<string>,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const url = new URL(req.url, req.protocol + '://' + req.headers.host + '/');
    if (url.pathname !== '/metrics') {
      const end = this.duration.startTimer();
      res.on('finish', () =>
        end({
          route: url.pathname,
          code: res.statusCode,
          method: req.method,
        }),
      );
    }

    return next.handle();
  }
}
