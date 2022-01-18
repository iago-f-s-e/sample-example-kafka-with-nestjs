import { IOrder } from '@src/modules/database/interfaces/order';
import { SaveOrder } from '../../interfaces/save-order';

export type DeleteResponse = Promise<void>;

export interface OrderServiceDTO {
  delete: (id: string) => Promise<void>;
  findById: (id: string) => Promise<IOrder>;
  find: () => Promise<IOrder[]>;
  create: (data: SaveOrder) => Promise<IOrder>;
  update: (id: string, data: SaveOrder) => Promise<void>;
}
