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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const coupons_module_1 = require("./coupons/coupons.module");
const customers_module_1 = require("./customers/customers.module");
const redemptions_module_1 = require("./redemptions/redemptions.module");
const withdrawals_module_1 = require("./withdrawals/withdrawals.module");
const typeorm_1 = require("@nestjs/typeorm");
const shared_module_1 = require("./shared/shared.module");
const auth_module_1 = require("./auth/auth.module");
const auth_service_1 = require("./auth/service/auth.service");
let AppModule = class AppModule {
    authService;
    constructor(authService) {
        this.authService = authService;
        this.authService.seedAdminUser().catch(err => console.error(err));
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'ep-nameless-wildflower-a4uspfnm-pooler.us-east-1.aws.neon.tech',
                port: 5432,
                username: 'neondb_owner',
                password: 'npg_ux14TCzsfQUg',
                database: 'neondb',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                "ssl": true,
                "extra": {
                    "ssl": {
                        "rejectUnauthorized": false
                    }
                },
                synchronize: true,
            }), coupons_module_1.CouponsModule, customers_module_1.CustomersModule, redemptions_module_1.RedemptionsModule, withdrawals_module_1.WithdrawalsModule, shared_module_1.SharedModule, auth_module_1.AuthModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AppModule);
//# sourceMappingURL=app.module.js.map