import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthService } from './auth/service/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
   // Seed admin user
   const authService = app.get(AuthService);
   await authService.seedAdminUser();
   
  await app.listen(3000);
}
bootstrap();
