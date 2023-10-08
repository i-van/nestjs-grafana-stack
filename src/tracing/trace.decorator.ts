import { getTracer } from './tracer';
import { SpanStatusCode } from '@opentelemetry/api/build/src/trace/status';

interface TraceOptions {
  operation?: string;
}

export const Trace = (options?: TraceOptions) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originMethod = descriptor.value;
    descriptor.value = async function(...args: any[]): Promise<any> {
      const operation = options?.operation ? options.operation : `${target.constructor.name}#${propertyKey}`;
      const span = getTracer().startSpan(operation);

      try {
        return await originMethod.apply(this, args);
      } catch (e) {
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: e.message,
        });
        span.recordException(e);
        throw e;
      } finally {
        span.end();
      }
    };
  };
};
