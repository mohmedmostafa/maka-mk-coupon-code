"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const coupon_entity_1 = require("../coupons/entity/coupon.entity");
const customer_entity_1 = require("../customers/entity/customer.entity");
const redemption_entity_1 = require("../redemptions/entity/redemption.entity");
const withdrawal_entity_1 = require("../withdrawals/entity/withdrawal.entity");
let SharedModule = class SharedModule {
};
exports.SharedModule = SharedModule;
exports.SharedModule = SharedModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([coupon_entity_1.Coupon, customer_entity_1.Customer, redemption_entity_1.Redemption, withdrawal_entity_1.Withdrawal]),
        ],
        exports: [typeorm_1.TypeOrmModule],
    })
], SharedModule);
//# sourceMappingURL=shared.module.js.map