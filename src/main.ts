import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // API prefix
  app.setGlobalPrefix(process.env.API_PREFIX || "api");

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle("Prototype NestJS & Clean Architecture")
    .setDescription(
      "A production-ready NestJS module implementing a Catalog system using Clean Architecture and DDD principles.",
    )
    .setVersion("1.0")
    .addTag("catalog")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  // CORS
  app.enableCors();

  const port = process.env.APP_PORT || 3000;
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/api/docs`);
}

bootstrap();
