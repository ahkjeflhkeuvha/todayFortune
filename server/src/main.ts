import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // React 앱이 실행되는 포트
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
