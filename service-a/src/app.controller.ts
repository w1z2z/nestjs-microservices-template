import {Controller} from '@nestjs/common';
import {ClientProxy, ClientProxyFactory, MessagePattern, Transport} from '@nestjs/microservices';

@Controller()
export class AppController {

  private readonly clientB: ClientProxy;

  constructor() {
    // Создаем клиентский прокси для микросервиса B
    this.clientB = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8889,
      },
    });
  }

  @MessagePattern({ cmd: 'ping' })
  async ping(_: any) {
    return await this.clientB.send({cmd: 'pong'}, {}).toPromise();
  }
}
