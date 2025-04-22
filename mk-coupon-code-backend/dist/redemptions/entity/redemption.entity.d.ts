import { Coupon } from 'src/coupons/entity/coupon.entity';
import { Customer } from 'src/customers/entity/customer.entity';
export declare class Redemption {
    id: number;
    coupon: Coupon;
    customer: Customer;
    redeemedAt: Date;
}
