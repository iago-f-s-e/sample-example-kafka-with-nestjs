import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '@src/modules/database/entities/order';
import { IOrder } from '@src/modules/database/interfaces/order';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { SaveOrder } from '../interfaces/save-order';
import { OrderRepositoryDTO } from './dtos';

@Injectable()
export class CustomOrderRepository implements OrderRepositoryDTO {
  constructor(@InjectRepository(Order) private readonly repository: Repository<Order>) {}

  public findById(id: string): Promise<IOrder | undefined> {
    return this.repository.findOne({ where: { id } });
  }

  public find(): Promise<IOrder[]> {
    return this.repository.find();
  }

  public delete(id: string): Promise<DeleteResult> {
    return this.repository.delete({ id });
  }

  public insert(data: SaveOrder): Promise<IOrder> {
    return this.repository.save(this.repository.create(data));
  }

  public update(id: string, data: Partial<SaveOrder>): Promise<UpdateResult> {
    return this.repository.update({ id }, data);
  }
}
