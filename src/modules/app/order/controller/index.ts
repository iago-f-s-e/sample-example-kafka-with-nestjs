import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Post, Put } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaMessage, Producer } from '@nestjs/microservices/external/kafka.interface';
import { OrderStatus } from '@src/modules/database/entities/order';
import { IOrder } from '@src/modules/database/interfaces/order';
import { SaveOrder } from '../interfaces/save-order';
import { OrderService } from '../service';
import { OrderControllerDTO } from './dtos';

@Controller('orders')
export class OrderController implements OrderControllerDTO {
  constructor(
    private readonly service: OrderService,
    @Inject('KAFKA_PRODUCER')
    private kafkaProducer: Producer
  ) {}

  @Post()
  public async create(@Body() data: SaveOrder): Promise<IOrder> {
    const order = await this.service.create(data);

    this.kafkaProducer.send({
      topic: 'payments',
      messages: [{ key: 'payments', value: JSON.stringify(order) }]
    });

    return order;
  }

  @Get()
  public findAll(): Promise<IOrder[]> {
    return this.service.find();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<IOrder> {
    return this.service.findById(id);
  }

  @Put('id')
  @HttpCode(204)
  public update(@Param('id') id: string, @Body() data: SaveOrder): Promise<void> {
    return this.service.update(id, data);
  }

  @Delete('id')
  @HttpCode(204)
  public remove(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }

  @MessagePattern('payments')
  public async consumerPerPayments(@Payload() message: KafkaMessage): Promise<void> {
    await this.kafkaProducer.send({
      topic: 'concluded-payment',
      messages: [
        {
          key: 'concluded-payment',
          value: JSON.stringify({
            ...message.value,
            status: OrderStatus.Approved
          })
        }
      ]
    });
    console.log(message.value);
  }

  @MessagePattern('concluded-payment')
  public async consumerPerConcludedPayment(@Payload() message: KafkaMessage): Promise<void> {
    const { id } = message.value as unknown as KafkaMessage & { id: string };

    await this.service.update(id, { status: OrderStatus.Approved });
    console.log(message.value);
  }
}
