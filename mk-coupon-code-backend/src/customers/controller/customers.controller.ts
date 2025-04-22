import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CustomerService } from '../service/customer.service';
import { UpdatePointsDto } from '../dto/update-points.dto';


@Controller('/api/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('phone/:phone')
  async findByPhone(@Param('phone') phone: string) {
    return this.customerService.findByPhone(phone);
  }

  @Post()
  async create(@Body() dto: CreateCustomerDto) {
    return this.customerService.createCustomer(dto);
  }

//   @Post('points')
//   async updatePoints(@Body() dto: UpdatePointsDto) {
//     return this.customerService.updatePoints(dto);
//   }
}