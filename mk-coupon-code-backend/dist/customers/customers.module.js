"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const shared_module_1 = require("../shared/shared.module");
const customers_controller_1 = require("./controller/customers.controller");
const customer_entity_1 = require("./entity/customer.entity");
const customer_service_1 = require("./service/customer.service");
let CustomersModule = class CustomersModule {
};
exports.CustomersModule = CustomersModule;
exports.CustomersModule = CustomersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([customer_entity_1.Customer]),
            (0, common_1.forwardRef)(() => shared_module_1.SharedModule),
        ],
        controllers: [customers_controller_1.CustomerController],
        providers: [customer_service_1.CustomerService],
        exports: [customer_service_1.CustomerService]
    })
], CustomersModule);
//# sourceMappingURL=customers.module.js.map