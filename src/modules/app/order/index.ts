import { Module } from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '@src/modules/database/entities/order';
import { OrderController } from './controller';
import { CustomOrderRepository } from './repository';
import { OrderService } from './service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['kafka:9092']
          },
          consumer: {
            groupId: 'my-group-producer'
          }
        }
      }
    ])
  ],
  controllers: [OrderController],
  providers: [
    CustomOrderRepository,
    OrderService,
    {
      provide: 'KAFKA_PRODUCER',
      useFactory: async (kafkaService: ClientKafka) => {
        return kafkaService.connect();
      },
      inject: ['KAFKA_SERVICE']
    }
  ]
})
export class OrderModule {}
