import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TestSocketDto } from './dto/test-socket.dto';
import { SocketGateway } from './socket.gateway';

@ApiTags('Socket')
@Controller('socket')
export class SocketController {
  constructor(private readonly socketGateway: SocketGateway) {}
  @Post('test')
  async testEmitSocket(@Body() input: TestSocketDto): Promise<any> {
    this.socketGateway.emitTo({
      id: input.room,
      mEvent: input.mEvent,
      data: input.data,
    });
    return true;
  }
}
