import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '@src/modules/database/entities/order';
import { OrderController } from './controller';
import { CustomOrderRepository } from './repository';
import { OrderService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [CustomOrderRepository, OrderService]
})
export class OrderModule {}
