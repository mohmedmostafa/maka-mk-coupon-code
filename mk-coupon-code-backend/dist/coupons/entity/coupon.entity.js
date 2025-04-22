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
exports.Coupon = void 0;
const redemption_entity_1 = require("../../redemptions/entity/redemption.entity");
const typeorm_1 = require("typeorm");
let Coupon = class Coupon {
    id;
    code;
    points;
    isUsed;
    expiryDate;
    redemptions;
    createdAt;
    updatedAt;
};
exports.Coupon = Coupon;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Coupon.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Coupon.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Coupon.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Coupon.prototype, "isUsed", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Coupon.prototype, "expiryDate", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => redemption_entity_1.Redemption, redemption => redemption.coupon),
    __metadata("design:type", redemption_entity_1.Redemption)
], Coupon.prototype, "redemptions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Coupon.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Coupon.prototype, "updatedAt", void 0);
exports.Coupon = Coupon = __decorate([
    (0, typeorm_1.Entity)()
], Coupon);
//# sourceMappingURL=coupon.entity.js.map