import { Coupon } from 'src/coupons/entity/coupon.entity';
import { Customer } from 'src/customers/entity/customer.entity';
import { EntityManager, Repository } from 'typeorm';
import { Redemption } from '../entity/redemption.entity';
export declare class RedemptionService {
    private redemptionRepository;
    constructor(redemptionRepository: Repository<Redemption>);
    createRedemption(coupon: Coupon, customer: Customer, manager?: EntityManager): Promise<Redemption>;
}
