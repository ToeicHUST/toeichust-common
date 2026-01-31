import { SWAGGER_DOCS_PATH } from 'src/constants/swagger.constant';

export function logAppBootstrap(port: number | string) {
  // console.log('='.repeat(80));

  console.log(`ENVIRONMENT: ${process.env.NODE_ENV}`);
  console.log(`NAME: ${process.env.NAME_SERVICE}`);
  console.log(`PORT: ${port}`);
  console.log(
    `Application is running on: http://toeicHUST.local:${port}/${SWAGGER_DOCS_PATH}`,
  );

  // console.log('='.repeat(80));
}
