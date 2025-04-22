import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthService } from './auth/service/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3001', 'http://65.108.157.163:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE','HEAD'],
    credentials: true,
  });
   // Seed admin user
   const authService = app.get(AuthService);
   await authService.seedAdminUser();
   
  await app.listen(3000);
}
bootstrap();
