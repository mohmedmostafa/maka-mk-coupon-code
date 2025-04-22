"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedemptionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const shared_module_1 = require("../shared/shared.module");
const redemption_entity_1 = require("./entity/redemption.entity");
const redemption_service_1 = require("./service/redemption.service");
const coupons_module_1 = require("../coupons/coupons.module");
const customers_module_1 = require("../customers/customers.module");
let RedemptionsModule = class RedemptionsModule {
};
exports.RedemptionsModule = RedemptionsModule;
exports.RedemptionsModule = RedemptionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([redemption_entity_1.Redemption]),
            (0, common_1.forwardRef)(() => shared_module_1.SharedModule),
            (0, common_1.forwardRef)(() => coupons_module_1.CouponsModule),
            (0, common_1.forwardRef)(() => customers_module_1.CustomersModule),
        ],
        providers: [redemption_service_1.RedemptionService],
        exports: [redemption_service_1.RedemptionService]
    })
], RedemptionsModule);
//# sourceMappingURL=redemptions.module.js.map