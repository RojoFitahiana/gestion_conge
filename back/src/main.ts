import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Active CORS pour Angular (http://localhost:4200) et autorise PATCH
  app.enableCors({
    origin: 'http://localhost:4200', // Autorise les requêtes depuis Angular
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS', // Ajout de PATCH et OPTIONS
    allowedHeaders: 'Content-Type, Authorization', // En-têtes autorisés
  });

  await app.listen(3000);
}
bootstrap();


