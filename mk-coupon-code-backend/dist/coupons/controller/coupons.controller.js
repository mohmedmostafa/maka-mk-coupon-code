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
exports.CouponController = void 0;
const common_1 = require("@nestjs/common");
const coupon_service_1 = require("../service/coupon.service");
const generate_coupons_dto_1 = require("../dto/generate-coupons.dto");
const redeem_coupon_dto_1 = require("../dto/redeem-coupon.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
let CouponController = class CouponController {
    couponService;
    constructor(couponService) {
        this.couponService = couponService;
    }
    async generate(dto) {
        return this.couponService.generateCoupons(dto);
    }
    async redeem(dto) {
        return this.couponService.redeemCouponTransaction(dto);
    }
    async getAllCouponsWithStatus(page = 1, limit = 10, search = '') {
        return this.couponService.getAllCouponsWithStatus(page, limit, search);
    }
    async checkCoupon(code) {
        return this.couponService.checkCoupon(code);
    }
};
exports.CouponController = CouponController;
__decorate([
    (0, common_1.Post)('generate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_coupons_dto_1.GenerateCouponsDto]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "generate", null);
__decorate([
    (0, common_1.Post)('redeem'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [redeem_coupon_dto_1.RedeemCouponDto]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "redeem", null);
__decorate([
    (0, common_1.Get)('track/all'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "getAllCouponsWithStatus", null);
__decorate([
    (0, common_1.Get)('validate/:code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "checkCoupon", null);
exports.CouponController = CouponController = __decorate([
    (0, common_1.Controller)('/api/coupons'),
    __metadata("design:paramtypes", [coupon_service_1.CouponService])
], CouponController);
//# sourceMappingURL=coupons.controller.js.map