import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { WithdrawalController } from './controller/withdrawals.controller';
import { Withdrawal } from './entity/withdrawal.entity';
import { WithdrawalService } from './service/withdrawal.service';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
    imports: [
      TypeOrmModule.forFeature([Withdrawal]),
      forwardRef(() => SharedModule),
      forwardRef(() => CustomersModule), 
    ],
    controllers: [WithdrawalController],
    providers: [WithdrawalService],
    exports: [WithdrawalService]
  })
export class WithdrawalsModule {}
