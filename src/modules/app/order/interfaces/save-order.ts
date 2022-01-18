import { IOrder } from '@src/modules/database/interfaces/order';

export type SaveOrder = Omit<IOrder, 'id'>;
