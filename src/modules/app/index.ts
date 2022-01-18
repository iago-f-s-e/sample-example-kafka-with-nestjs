import { Module } from '@nestjs/common';
import { OrderModule } from './order';

@Module({
  imports: [OrderModule]
})
export class AppModule {}
