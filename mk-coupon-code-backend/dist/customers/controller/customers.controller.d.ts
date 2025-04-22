import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CustomerService } from '../service/customer.service';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    findByPhone(phone: string): Promise<import("../entity/customer.entity").Customer | null>;
    create(dto: CreateCustomerDto): Promise<import("../entity/customer.entity").Customer>;
}
