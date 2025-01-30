import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TestService {
  private openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
      dangerouslyAllowBrowser: true,
    });
  }

  async generateMessage(body: {
    name: string;
    birthday: string;
    time: string;
  }): Promise<string> {
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

  getData() {
    return 'Hello World';
  }
}
