import { Module } from '@nestjs/common';
import { AppModule } from './app';
import { DatabaseModule } from './database';

@Module({
  imports: [DatabaseModule, AppModule]
})
export class Modules {}
