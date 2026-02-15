import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SWAGGER_DOCS_PATH } from '../constants/swagger.constant';

export function logAppBootstrap(app: INestApplication) {
  const configService = app.get(ConfigService);

  const server = app.getHttpServer();
  const address = server.address();
  const port = typeof address === 'string' ? address : address.port;

  console.log(`ENVIRONMENT: ${process.env.NODE_ENV}`);
  console.log(`NAME: ${process.env.NAME_SERVICE}`);
  console.log(`PORT: ${port}`);
  console.log(
    `Application is running on: http://toeicHUST.local:${port}/${SWAGGER_DOCS_PATH}`,
  );
  console.log(`DEV: https://dev-${process.env.NAME_SERVICE}.toeichust.me`);
  console.log(`PROD: https://${process.env.NAME_SERVICE}.toeichust.me`);

  console.log(
    `GOOGLE: ${configService.get<string>(
      'SUPABASE_URL',
    )}/auth/v1/authorize?provider=google`,
  );
}
