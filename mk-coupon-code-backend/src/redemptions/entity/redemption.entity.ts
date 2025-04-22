import { Coupon } from 'src/coupons/entity/coupon.entity';
import { Customer } from 'src/customers/entity/customer.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity()
export class Redemption {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Coupon, { eager: true })
  @JoinColumn({ name: 'coupon_id' })
  coupon: Coupon;

  @ManyToOne(() => Customer, { eager: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'redeemed_at'
  })
  redeemedAt: Date;
}