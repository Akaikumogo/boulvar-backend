import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS ni yoqish
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Room API')
    .setDescription('The room API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // await app.listen(3000);
  await app.listen(1818, '0.0.0.0');
}
bootstrap();
