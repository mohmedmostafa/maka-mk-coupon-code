import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdatePointsDto } from '../dto/update-points.dto';
import { Customer } from '../entity/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async findByPhone(phone: string): Promise<Customer | null> {
    let customer=await this.customerRepository.findOne({ where: { phone } });
    console.log({customer});
    
    if(!customer){
      throw new BadRequestException()
    }
    return customer;
  }

  async findById(id: number): Promise<Customer> {
    let customer=await this.customerRepository.findOne({ where: { id } });
    console.log({customer});
    
    if(!customer){
      throw new BadRequestException()
    }
    return customer;
  }

  async createCustomer(dto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(dto);
    return this.customerRepository.save(customer);
  }

  async updatePoints(dto: UpdatePointsDto, manager?: EntityManager): Promise<Customer> {
    const repo = manager?.getRepository(Customer) ?? this.customerRepository;
  
    const customer = await this.findByPhone(dto.phone);
    if (!customer) throw new Error('Customer not found');
  
    customer.points += dto.points;
    return repo.save(customer);
  }
  


  async withdrawPoints(customerId: number, points: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id: customerId } });
    
    if (!customer) {
      throw new Error('Customer not found');
    }

    if (customer.points < points) {
      throw new Error('Insufficient points');
    }

    customer.points -= points;
    return this.customerRepository.save(customer);
  }
}