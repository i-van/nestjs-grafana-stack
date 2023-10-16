import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const contextName = context.getClass().name;
    const { method, url } = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap(() => {
        if (url !== '/metrics') {
          Logger.log(`${method} ${url} ${Date.now() - now}ms`, contextName);
        }
      }),
    );
  }
}
