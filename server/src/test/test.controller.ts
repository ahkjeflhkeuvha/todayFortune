import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  async generate(
    @Body() body: { name: string; birthday: string; time: string },
  ) {
    const message = await this.testService.generateMessage(body);
    return { result: message };
  }

  @Get()
  getData() {
    return this.testService.getData();
  }
}
