import { EntityManager, Repository } from 'typeorm';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdatePointsDto } from '../dto/update-points.dto';
import { Customer } from '../entity/customer.entity';
export declare class CustomerService {
    private customerRepository;
    constructor(customerRepository: Repository<Customer>);
    findByPhone(phone: string): Promise<Customer | null>;
    findById(id: number): Promise<Customer>;
    createCustomer(dto: CreateCustomerDto): Promise<Customer>;
    updatePoints(dto: UpdatePointsDto, manager?: EntityManager): Promise<Customer>;
    withdrawPoints(customerId: number, points: number): Promise<Customer>;
}
