import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { IOrder } from '@src/modules/database/interfaces/order';
import { SaveOrder } from '../interfaces/save-order';
import { OrderService } from '../service';
import { OrderControllerDTO } from './dtos';

@Controller('orders')
export class OrderController implements OrderControllerDTO {
  constructor(private readonly service: OrderService) {}

  @Post()
  public async create(@Body() data: SaveOrder): Promise<IOrder> {
    const order = await this.service.create(data);

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
}
