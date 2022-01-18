import { OrderStatus } from '../entities/order';

export interface IOrder {
  id: string;
  amount: number;
  status: OrderStatus;
}
