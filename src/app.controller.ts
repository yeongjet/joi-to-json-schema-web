import { Controller, Logger, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { convert } from '@yeongjet/joi-to-json-schema'
import * as Joi from '@hapi/joi'

const { alternatives, any, array, binary, boolean, link, number, string, symbol, object, date } = Joi.types();

// 此处仅仅是引用解析字符串所使用的joi简写变量，否则这些变量编译后会被删除，导致调用eval方式时报Unexpected number之类的错误
[alternatives, any, array, binary, boolean, link, number, string, symbol, object, date].toString().substr(0,0)

@Controller('schema')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  convertToJSONSchema(@Body() body: { input: string }): { code: number, message: string, data?: Object } {
    try {
      Joi.version // 此处要使用Joi这个变量，否则Joi不会引入
      const joiSchema = eval(body.input)
      const jsonSchema = convert(joiSchema)
      Logger.verbose(`解析成功:\n${JSON.stringify(jsonSchema)}`)
      return { code: 10000, message: '解析成功', data: { json_schema: jsonSchema }}
    } catch(e) {
      Logger.error(`解析错误:\n${body.input}`)
      return { code: 10001, message: '解析错误' }
    }
  }
}
