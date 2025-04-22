"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawalsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const shared_module_1 = require("../shared/shared.module");
const withdrawals_controller_1 = require("./controller/withdrawals.controller");
const withdrawal_entity_1 = require("./entity/withdrawal.entity");
const withdrawal_service_1 = require("./service/withdrawal.service");
const customers_module_1 = require("../customers/customers.module");
let WithdrawalsModule = class WithdrawalsModule {
};
exports.WithdrawalsModule = WithdrawalsModule;
exports.WithdrawalsModule = WithdrawalsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([withdrawal_entity_1.Withdrawal]),
            (0, common_1.forwardRef)(() => shared_module_1.SharedModule),
            (0, common_1.forwardRef)(() => customers_module_1.CustomersModule),
        ],
        controllers: [withdrawals_controller_1.WithdrawalController],
        providers: [withdrawal_service_1.WithdrawalService],
        exports: [withdrawal_service_1.WithdrawalService]
    })
], WithdrawalsModule);
//# sourceMappingURL=withdrawals.module.js.map