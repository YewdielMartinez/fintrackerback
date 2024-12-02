import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TransactionType } from './transactiontype.entity';
import { TransactionTypeService } from './transactiontype.service';
import { TransactionTypeController } from './transactiontype.controller';

@Module({
    imports: [TypeOrmModule.forFeature([TransactionType])],
    controllers: [TransactionTypeController],
    providers: [
        TransactionTypeService],
    exports:[TypeOrmModule]
})
export class TransactiontypeModule {}
