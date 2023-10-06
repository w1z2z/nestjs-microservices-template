import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(
    @Inject('SERVICE_A') private readonly clientServiceA: ClientProxy,
    @Inject('SERVICE_B') private readonly clientServiceB: ClientProxy,
  ) {}

  pingServiceA() {
    // const pattern = { cmd: 'ping' };
    const payload = {};
    return this.clientServiceA.send({ cmd: 'ping' }, payload);
  }

  pingServiceB() {
    const payload = {};
    return this.clientServiceB.send({ cmd: 'foo' }, payload);

    // const startTs = Date.now();
    // const pattern = { cmd: 'ping' };
    // const payload = {};
    // return this.clientServiceB
    //   .send<string>('ping', payload)
    //   .pipe(
    //     map((message: string) => ({ message, duration: Date.now() - startTs })),
    //   );
  }
}
