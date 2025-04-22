"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const coupon_entity_1 = require("./entity/coupon.entity");
const shared_module_1 = require("../shared/shared.module");
const coupons_controller_1 = require("./controller/coupons.controller");
const coupon_service_1 = require("./service/coupon.service");
const customers_module_1 = require("../customers/customers.module");
const redemptions_module_1 = require("../redemptions/redemptions.module");
let CouponsModule = class CouponsModule {
};
exports.CouponsModule = CouponsModule;
exports.CouponsModule = CouponsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([coupon_entity_1.Coupon]),
            (0, common_1.forwardRef)(() => shared_module_1.SharedModule),
            (0, common_1.forwardRef)(() => customers_module_1.CustomersModule),
            (0, common_1.forwardRef)(() => redemptions_module_1.RedemptionsModule),
        ],
        controllers: [coupons_controller_1.CouponController],
        providers: [coupon_service_1.CouponService],
        exports: [coupon_service_1.CouponService]
    })
], CouponsModule);
//# sourceMappingURL=coupons.module.js.map