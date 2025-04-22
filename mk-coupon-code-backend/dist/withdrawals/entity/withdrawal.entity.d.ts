import { Customer } from 'src/customers/entity/customer.entity';
export declare class Withdrawal {
    id: number;
    customer: Customer;
    points: number;
    status: string;
    createdAt: Date;
}
