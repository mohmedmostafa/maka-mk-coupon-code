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
exports.WithdrawalService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const withdrawal_entity_1 = require("../entity/withdrawal.entity");
const customer_service_1 = require("../../customers/service/customer.service");
let WithdrawalService = class WithdrawalService {
    withdrawalRepository;
    customerService;
    constructor(withdrawalRepository, customerService) {
        this.withdrawalRepository = withdrawalRepository;
        this.customerService = customerService;
    }
    async createWithdrawal(dto) {
        const withdrawal = this.withdrawalRepository.create(dto);
        await this.withdrawalRepository.save(withdrawal);
        const customer = await this.customerService.findById(dto.customerId);
        await this.customerService.withdrawPoints(dto.customerId, dto.points);
        withdrawal.status = 'completed';
        withdrawal.customer = customer;
        return this.withdrawalRepository.save(withdrawal);
    }
    async processWithdrawal(id) {
        const withdrawal = await this.withdrawalRepository.findOne({ where: { id }, relations: ['customer'] });
        if (!withdrawal) {
            throw new Error('Withdrawal not found');
        }
        withdrawal.status = 'completed';
        return this.withdrawalRepository.save(withdrawal);
    }
};
exports.WithdrawalService = WithdrawalService;
exports.WithdrawalService = WithdrawalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(withdrawal_entity_1.Withdrawal)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        customer_service_1.CustomerService])
], WithdrawalService);
//# sourceMappingURL=withdrawal.service.js.map