import { Controller, Post, Body, Param, Patch } from '@nestjs/common';
import { CreateWithdrawalDto } from '../dto/create-withdrawal.dto';
import { WithdrawalService } from '../service/withdrawal.service';

@Controller('/api/withdrawals')
export class WithdrawalController {
  constructor(private readonly withdrawalService: WithdrawalService) {}

  @Post()
  async create(@Body() dto: CreateWithdrawalDto) {
    return await this.withdrawalService.createWithdrawal(dto);
  }

  // @Patch(':id/process')
  // async process(@Param('id') id: number) {
  //   return this.withdrawalService.processWithdrawal(id);
  // }
}