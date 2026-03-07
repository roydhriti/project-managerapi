// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Enable CORS (important for your React frontend)
  app.enableCors();

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Project Manager API')
    .setDescription('API documentation for Project Manager')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Render dynamic port
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Application running on port ${port}`);
  // console.log(`📚 Swagger available at: http://localhost:3000/api`);
}

bootstrap();