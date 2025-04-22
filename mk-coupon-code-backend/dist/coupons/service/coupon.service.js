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
exports.CouponService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const coupon_entity_1 = require("../entity/coupon.entity");
const customer_service_1 = require("../../customers/service/customer.service");
const redemption_service_1 = require("../../redemptions/service/redemption.service");
let CouponService = class CouponService {
    dataSource;
    couponRepository;
    customerService;
    redemptionService;
    constructor(dataSource, couponRepository, customerService, redemptionService) {
        this.dataSource = dataSource;
        this.couponRepository = couponRepository;
        this.customerService = customerService;
        this.redemptionService = redemptionService;
    }
    async generateCoupons(dto) {
        const coupons = [];
        for (let i = 0; i < dto.count; i++) {
            const coupon = this.couponRepository.create({
                code: this.generateCouponCode(),
                points: dto.points,
                expiryDate: dto.expiryDate,
            });
            let savedCoupon = await this.couponRepository.save(coupon);
            coupons.push(savedCoupon);
        }
        return coupons;
    }
    async checkCoupon(code) {
        const coupon = await this.couponRepository.findOne({
            where: { code }
        });
        if (!coupon) {
            return {
                valid: false,
                message: 'Coupon not found'
            };
        }
        if (coupon.isUsed) {
            return {
                valid: false,
                code: coupon.code,
                message: 'Coupon already used'
            };
        }
        if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
            return {
                valid: false,
                code: coupon.code,
                points: coupon.points,
                expired: true,
                message: 'Coupon has expired'
            };
        }
        return {
            valid: true,
            code: coupon.code,
            points: coupon.points,
            message: 'Coupon is valid'
        };
    }
    async getAllCouponsWithStatus(page = 1, limit = 10, search = '') {
        const query = this.couponRepository
            .createQueryBuilder('coupon')
            .leftJoinAndSelect('coupon.redemptions', 'redemption')
            .leftJoinAndSelect('redemption.customer', 'customer')
            .select([
            'coupon.id',
            'coupon.code',
            'coupon.points',
            'coupon.isUsed',
            'coupon.createdAt',
            'coupon.expiryDate',
            'redemption.redeemedAt',
            'customer.id',
            'customer.name',
            'customer.phone',
            'customer.points'
        ])
            .orderBy('coupon.createdAt', 'DESC');
        if (search) {
            query.where('coupon.code LIKE :search', { search: `%${search}%` })
                .orWhere('customer.name LIKE :search', { search: `%${search}%` })
                .orWhere('customer.phone LIKE :search', { search: `%${search}%` });
        }
        const [data, total] = await query
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            }
        };
    }
    async redeemCouponTransaction(dto) {
        return this.dataSource.transaction(async (manager) => {
            const { coupon, customerPoints } = await this.redeemCoupon(dto, manager);
            const customer = await this.customerService.updatePoints({ phone: dto.customerPhone, points: customerPoints }, manager);
            await this.redemptionService.createRedemption(coupon, customer, manager);
            return { success: true };
        });
    }
    async redeemCoupon(dto, manager) {
        const repo = manager?.getRepository(coupon_entity_1.Coupon) ?? this.couponRepository;
        const coupon = await repo.findOne({ where: { code: dto.couponCode, isUsed: false } });
        if (!coupon)
            throw new Error('Invalid or already used coupon');
        coupon.isUsed = true;
        await repo.save(coupon);
        return {
            coupon,
            customerPoints: coupon.points,
        };
    }
    generateCouponCode() {
        return 'CPN-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    }
};
exports.CouponService = CouponService;
exports.CouponService = CouponService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __param(1, (0, typeorm_1.InjectRepository)(coupon_entity_1.Coupon)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository,
        customer_service_1.CustomerService,
        redemption_service_1.RedemptionService])
], CouponService);
//# sourceMappingURL=coupon.service.js.map