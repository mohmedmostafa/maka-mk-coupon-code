import { Repository } from 'typeorm';
import { CreateWithdrawalDto } from '../dto/create-withdrawal.dto';
import { Withdrawal } from '../entity/withdrawal.entity';
import { CustomerService } from 'src/customers/service/customer.service';
export declare class WithdrawalService {
    private withdrawalRepository;
    private customerService;
    constructor(withdrawalRepository: Repository<Withdrawal>, customerService: CustomerService);
    createWithdrawal(dto: CreateWithdrawalDto): Promise<Withdrawal>;
    processWithdrawal(id: number): Promise<Withdrawal>;
}
