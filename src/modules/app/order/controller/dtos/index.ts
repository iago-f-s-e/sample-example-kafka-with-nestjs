import { IOrder } from '@src/modules/database/interfaces/order';
import { SaveOrder } from '../../interfaces/save-order';

export interface OrderControllerDTO {
  create: (data: SaveOrder) => Promise<IOrder>;
  findAll: () => Promise<IOrder[]>;
  findOne: (id: string) => Promise<IOrder>;
  update: (id: string, data: SaveOrder) => Promise<void>;
  remove: (id: string) => Promise<void>;
}
