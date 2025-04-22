import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWithdrawalDto } from '../dto/create-withdrawal.dto';
import { Withdrawal } from '../entity/withdrawal.entity';
import { CustomerService } from 'src/customers/service/customer.service';
import { Customer } from 'src/customers/entity/customer.entity';

@Injectable()
export class WithdrawalService {
  constructor(
    @InjectRepository(Withdrawal)
    private withdrawalRepository: Repository<Withdrawal>,
    private customerService:CustomerService
  ) {}

  async createWithdrawal(dto: CreateWithdrawalDto): Promise<Withdrawal> {
    const withdrawal = this.withdrawalRepository.create(dto);
    await this.withdrawalRepository.save(withdrawal);

    const customer:Customer=await this.customerService.findById(dto.customerId)

    await this.customerService.withdrawPoints(dto.customerId,dto.points)
    withdrawal.status = 'completed';
    withdrawal.customer=customer
    return this.withdrawalRepository.save(withdrawal);

  }

  async processWithdrawal(id: number): Promise<Withdrawal> {
    const withdrawal = await this.withdrawalRepository.findOne({ where: { id }, relations: ['customer'] });
    
    if (!withdrawal) {
      throw new Error('Withdrawal not found');
    }

    withdrawal.status = 'completed';
    return this.withdrawalRepository.save(withdrawal);
  }
}