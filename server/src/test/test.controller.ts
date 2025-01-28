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
  private openai: OpenAI;
  constructor(
    private readonly testService: TestService,
    private readonly configService: ConfigService,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
      dangerouslyAllowBrowser: true,
    });
  }

  async generateMessage(
    @Body() body: { name: string; birthday: string; time: string },
  ): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `이름: ${body.name} 생년월일: ${body.birthday} 태어난 시간: ${body.time}`,
          },
        ],
      });

      const message = response.choices?.[0]?.message?.content;
      if (!message) {
        throw new Error('응답 메시지가 없습니다.');
      }
      return message;
    } catch (error) {
      console.error('OpenAI API 호출 에러:', error.message || error);
      throw new Error('OpenAI API 호출에 실패했습니다.');
    }
  }

  @Post()
  async generate(
    @Body() body: { name: string; birthday: string; time: string },
  ) {
    const message = await this.generateMessage(body);
    return { result: message };
  }

  @Get()
  findAll() {
    return this.testService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(+id, updateTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testService.remove(+id);
  }
}
