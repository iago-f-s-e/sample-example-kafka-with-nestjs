import { Injectable, NotFoundException } from '@nestjs/common';
import { IOrder } from '@src/modules/database/interfaces/order';
import { SaveOrder } from '../interfaces/save-order';
import { CustomOrderRepository } from '../repository';
import { OrderServiceDTO } from './dtos';

@Injectable()
export class OrderService implements OrderServiceDTO {
  constructor(private readonly repository: CustomOrderRepository) {}

  public create(data: SaveOrder): Promise<IOrder> {
    return this.repository.insert(data);
  }

  public async delete(id: string): Promise<void> {
    const order = await this.repository.findById(id);

    if (!order) throw new NotFoundException('Order is not found');

    await this.repository.delete(id);
  }

  public find(): Promise<IOrder[]> {
    return this.repository.find();
  }

  public async findById(id: string): Promise<IOrder> {
    const order = await this.repository.findById(id);

    if (!order) throw new NotFoundException('Order is not found');

    return order;
  }
  public async update(id: string, data: SaveOrder): Promise<void> {
    const order = await this.repository.findById(id);

    if (!order) throw new NotFoundException('Order is not found');

    await this.repository.update(id, data);
  }
}
