import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from 'src/coupons/entity/coupon.entity';
import { Customer } from 'src/customers/entity/customer.entity';
import { EntityManager, Repository } from 'typeorm';
import { Redemption } from '../entity/redemption.entity';
 

@Injectable()
export class RedemptionService {
  constructor(
    @InjectRepository(Redemption)
    private redemptionRepository: Repository<Redemption>,
  ) {}

  async createRedemption(coupon: Coupon, customer: Customer,manager?: EntityManager): Promise<Redemption> {
    const repo = manager?.getRepository(Redemption) ?? this.redemptionRepository;

    const redemption = repo.create({ coupon, customer });
    return repo.save(redemption);
  }
}