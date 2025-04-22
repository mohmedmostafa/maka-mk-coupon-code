import { CreateWithdrawalDto } from '../dto/create-withdrawal.dto';
import { WithdrawalService } from '../service/withdrawal.service';
export declare class WithdrawalController {
    private readonly withdrawalService;
    constructor(withdrawalService: WithdrawalService);
    create(dto: CreateWithdrawalDto): Promise<import("../entity/withdrawal.entity").Withdrawal>;
}
