import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import * as dotenv from 'dotenv';

import { AppModule } from './app.module';

dotenv.config();

(async () => {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // const swagger = new SwaggerHelper(); // Will be added later
  // swagger.init(app);
  await app.listen(process.env.PORT || 3000);
})();
