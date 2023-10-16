export type Configuration = {
  port: number;
  tracing: {
    serviceName: string;
    tempoUrl: string;
  };
};

export const configuration = (): Configuration => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  tracing: {
    serviceName: process.env.SERVICE_NAME || 'nestjs-grafana-stack',
    tempoUrl: process.env.TEMPO_URL || 'http://localhost:4317',
  },
});
