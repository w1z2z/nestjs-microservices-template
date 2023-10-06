import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'pong' })
  ping(_: any) {
    return of('pong (this message is sent by microservice B in response to a request from server A)').pipe(delay(2000));
  }

  @MessagePattern({ cmd: 'foo' })
  foo(_: any) {
    return of('bar (this message is sent by the microservice directly from the gateway)').pipe(delay(2000));
  }
}
