import { NestFactory } from '@nestjs/core';
import { Swagger } from './swagger/swagger.config';
import { useContainer } from 'class-validator';
import * as dotenv from 'dotenv';

import { AppModule } from './app.module';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';

dotenv.config();

(async () => {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalInterceptors(new ErrorsInterceptor());

  const swagger = new Swagger();
  swagger.init(app);

  await app.listen(process.env.PORT || 3000);
})();
