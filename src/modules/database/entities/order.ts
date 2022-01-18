import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { uuidGenerator } from '../helpers/uuid-generator';
import { IOrder } from '../interfaces/order';

export enum OrderStatus {
  Approved = 'approved',
  Pending = 'pending'
}

@Entity('order')
export class Order implements IOrder {
  @PrimaryColumn({ type: 'uuid' })
  public readonly id!: string;

  @Column({ type: 'float', precision: 10, scale: 2 })
  public readonly amount!: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Pending })
  public readonly status!: OrderStatus;

  @BeforeInsert()
  protected setId(): void {
    const id = uuidGenerator();

    Object.assign(this, { ...this, id });
  }
}
