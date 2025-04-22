import { Customer } from 'src/customers/entity/customer.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Withdrawal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, { eager: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column()
  points: number;

  @Column({
    type: 'enum',
    enum: ['pending', 'completed', 'rejected'],
    default: 'pending'
  })
  status: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at'
  })
  createdAt: Date;
}