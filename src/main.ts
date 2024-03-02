import { NestFactory } from '@nestjs/core';
import { FormModule } from './form.module';

async function bootstrap() {
  const app = await NestFactory.create(FormModule);
  await app.listen(80);
}
bootstrap();
