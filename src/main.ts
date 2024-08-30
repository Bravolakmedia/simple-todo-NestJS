import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe())
  const config = new DocumentBuilder()
    .setTitle('Todo REST API')
    .setDescription("A REST API to list user's todos/tasks, authorization implemented using JWT token. The API is made using NestJs. ")
    .setVersion('1.0')
    .addTag('todos')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document, {
   customCssUrl:
   'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui 4.15.5/swagger-ui.min.css',
   customJs:[
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui 4.15.5/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui 4.15.5/swagger-ui-standalone-preset.js',
   ],
  });
  await app.listen(3000);
}
bootstrap();
