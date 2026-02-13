import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  SWAGGER_AUTH_KEY,
  SWAGGER_CUSTOM_FAVICON,
  SWAGGER_DESCRIPTION,
  SWAGGER_DOCS_PATH,
  SWAGGER_UI_CDN,
} from '../constants/swagger.constant';

// export interface SwaggerConfigOptions {
//   name: string;
// }

export function setupSwagger(
  app: INestApplication,
  // options: SwaggerConfigOptions,
) {
  const swaggerConfig = new DocumentBuilder()
    // .setTitle(process.env.NAME_SERVICE || 'Tên mặc định')
    // .setVersion(process.env.npm_package_version || '1.0.0')
    .setContact('vuvannghia.work@gmail.com', '', 'vuvannghia.work@gmail.com')
    .setDescription(SWAGGER_DESCRIPTION)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: SWAGGER_AUTH_KEY,
        description: 'Nhập token của bạn vào đây',
        in: 'header',
      },
      SWAGGER_AUTH_KEY,
    )
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);

  const isProduction = process.env.NODE_ENV !== 'development';

  // Các tùy chọn cơ bản dùng chung cho mọi môi trường
  const baseOptions = {
    jsonDocumentUrl: `${SWAGGER_DOCS_PATH}/json`,
    yamlDocumentUrl: `${SWAGGER_DOCS_PATH}/yaml`,
    customSiteTitle: process.env.NAME_SERVICE || 'Tên mặc định',
    customfavIcon: `${SWAGGER_CUSTOM_FAVICON}`,
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      // docExpansion: 'none', // Thu gọn tất cả các tag lại khi mới mở trang
    },
  };

  // Cấu hình đầy đủ dựa trên môi trường
  const swaggerConfigOptions = isProduction
    ? {
        ...baseOptions,
        customJs: [
          `${SWAGGER_UI_CDN}/swagger-ui-bundle.min.js`,
          `${SWAGGER_UI_CDN}/swagger-ui-standalone-preset.min.js`,
        ],
        customCssUrl: [
          `${SWAGGER_UI_CDN}/swagger-ui.min.css`,
          `${SWAGGER_UI_CDN}/swagger-ui.css`,
        ],
      }
    : baseOptions;

  SwaggerModule.setup(
    SWAGGER_DOCS_PATH,
    app,
    documentFactory,
    swaggerConfigOptions,
  );
}
