import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Grupo Adriano')
    .setDescription('Documentação Grupo Adriano')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, // Configuração do Bearer
      'JWT-auth',
    )
    .build();

  const documents = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documents);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
