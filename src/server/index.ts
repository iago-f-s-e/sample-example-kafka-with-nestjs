import { NestFactory } from '@nestjs/core';
import { Modules } from '@src/modules';

export async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(Modules);

  await app.listen(38080, () => {
    console.log('===============================');
    console.log('Server running on port: 38080 =');
    console.log('===============================');
  });
}
