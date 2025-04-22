"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_entity_1 = require("../entity/customer.entity");
let CustomerService = class CustomerService {
    customerRepository;
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async findByPhone(phone) {
        let customer = await this.customerRepository.findOne({ where: { phone } });
        console.log({ customer });
        if (!customer) {
            throw new common_1.BadRequestException();
        }
        return customer;
    }
    async findById(id) {
        let customer = await this.customerRepository.findOne({ where: { id } });
        console.log({ customer });
        if (!customer) {
            throw new common_1.BadRequestException();
        }
        return customer;
    }
    async createCustomer(dto) {
        const customer = this.customerRepository.create(dto);
        return this.customerRepository.save(customer);
    }
    async updatePoints(dto, manager) {
        const repo = manager?.getRepository(customer_entity_1.Customer) ?? this.customerRepository;
        const customer = await this.findByPhone(dto.phone);
        if (!customer)
            throw new Error('Customer not found');
        customer.points += dto.points;
        return repo.save(customer);
    }
    async withdrawPoints(customerId, points) {
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
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomerService);
//# sourceMappingURL=customer.service.js.map