import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { CustomerController } from './controller/customers.controller';
import { Customer } from './entity/customer.entity';
import { CustomerService } from './service/customer.service';
@Module({
    imports: [
      TypeOrmModule.forFeature([Customer]),
      forwardRef(() => SharedModule),
    ],
    controllers: [CustomerController],
    providers: [CustomerService],
    exports: [CustomerService]
  })
export class CustomersModule {}
