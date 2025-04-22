import { Redemption } from 'src/redemptions/entity/redemption.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  points: number;

  @Column({ default: false })
  isUsed: boolean;

  @Column({ nullable: true })
  expiryDate: Date;

  @OneToOne(() => Redemption, redemption => redemption.coupon)
  redemptions: Redemption;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}