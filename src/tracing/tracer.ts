import { trace } from '@opentelemetry/api';
import { NodeTracerProvider, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { Tracer } from '@opentelemetry/api/build/src/trace/tracer';
import { Span } from '@opentelemetry/api/build/src/trace/span';
import { Request } from 'express';
import { URL } from 'url';
import { Configuration } from '../config/configuration';

registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation({
      ignoreIncomingRequestHook: (request: Request) => {
        return request.url === '/metrics';
      },
      applyCustomAttributesOnSpan: (span: Span, request: Request) => {
        const base = `${request.protocol}://${request.headers.host}/`;
        const url = new URL(request.url, base);
        span.updateName(`${request.method} ${url.pathname}`);
      },
    }),
  ],
});

export const initTracer = (config: Configuration['tracing']): void => {
  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: config.serviceName,
    }),
  });

  const traceExporter = new OTLPTraceExporter({ url: config.tempoUrl });
  provider.addSpanProcessor(new SimpleSpanProcessor(traceExporter));
  provider.register();
};

export const getTracer = (name = 'default'): Tracer => {
  return trace.getTracer(name);
};
