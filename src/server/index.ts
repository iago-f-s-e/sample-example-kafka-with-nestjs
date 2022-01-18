import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Modules } from '@src/modules';

export async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(Modules);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9092']
      }
    }
  });

  await app.startAllMicroservices();

  await app.listen(38080, () => {
    console.log('===============================');
    console.log('Server running on port: 38080 =');
    console.log('===============================');
  });
}
