// config st -> 살짝 사전 세팅

import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [TestController],
  providers: [TestService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
})
export class TestModule {}
