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
exports.Redemption = void 0;
const coupon_entity_1 = require("../../coupons/entity/coupon.entity");
const customer_entity_1 = require("../../customers/entity/customer.entity");
const typeorm_1 = require("typeorm");
let Redemption = class Redemption {
    id;
    coupon;
    customer;
    redeemedAt;
};
exports.Redemption = Redemption;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Redemption.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => coupon_entity_1.Coupon, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'coupon_id' }),
    __metadata("design:type", coupon_entity_1.Coupon)
], Redemption.prototype, "coupon", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id' }),
    __metadata("design:type", customer_entity_1.Customer)
], Redemption.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'redeemed_at'
    }),
    __metadata("design:type", Date)
], Redemption.prototype, "redeemedAt", void 0);
exports.Redemption = Redemption = __decorate([
    (0, typeorm_1.Entity)()
], Redemption);
//# sourceMappingURL=redemption.entity.js.map