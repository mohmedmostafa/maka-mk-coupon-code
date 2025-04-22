import { Redemption } from 'src/redemptions/entity/redemption.entity';
export declare class Coupon {
    id: number;
    code: string;
    points: number;
    isUsed: boolean;
    expiryDate: Date;
    redemptions: Redemption;
    createdAt: Date;
    updatedAt: Date;
}
