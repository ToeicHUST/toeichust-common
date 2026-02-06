import { INestApplication } from '@nestjs/common';
import { SWAGGER_DOCS_PATH } from 'src/constants/swagger.constant';
import { VaultService } from '../modules/vault/vault.service';

export function logAppBootstrap(app: INestApplication) {
  const vaultService = app.get(VaultService);

  const server = app.getHttpServer();
  const address = server.address();
  const port = typeof address === 'string' ? address : address.port;

  console.log(`ENVIRONMENT: ${process.env.NODE_ENV}`);
  console.log(`NAME: ${process.env.NAME_SERVICE}`);
  console.log(`PORT: ${port}`);
  console.log(
    `Application is running on: http://toeicHUST.local:${port}/${SWAGGER_DOCS_PATH}`,
  );

  console.log(
    `GOOGLE: ${vaultService.get<string>(
      'SUPABASE_URL',
    )}/auth/v1/authorize?provider=google`,
  );
}
