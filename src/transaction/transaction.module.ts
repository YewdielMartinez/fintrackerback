import { TransactionService } from './transaction.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [TransactionService],
})
export class TransactionModule {}
