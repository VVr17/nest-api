import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export class Swagger {
  public init(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Pet-support-project')
      .setDescription('Pet-support API description')
      .setVersion('1.0')
      .addBearerAuth() // Add the Authorization Bearer Token
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api', app, document);
  }
}
