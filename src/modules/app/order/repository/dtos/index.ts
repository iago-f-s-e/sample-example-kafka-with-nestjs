import { IOrder } from '@src/modules/database/interfaces/order';
import { DeleteResult, UpdateResult } from 'typeorm';
import { SaveOrder } from '../../interfaces/save-order';

export interface OrderRepositoryDTO {
  delete: (id: string) => Promise<DeleteResult>;
  findById: (id: string) => Promise<IOrder | undefined>;
  find: () => Promise<IOrder[]>;
  insert: (data: SaveOrder) => Promise<IOrder>;
  update: (id: string, data: SaveOrder) => Promise<UpdateResult>;
}
