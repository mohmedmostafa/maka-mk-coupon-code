import { CouponService } from '../service/coupon.service';
import { GenerateCouponsDto } from '../dto/generate-coupons.dto';
import { RedeemCouponDto } from '../dto/redeem-coupon.dto';
export declare class CouponController {
    private readonly couponService;
    constructor(couponService: CouponService);
    generate(dto: GenerateCouponsDto): Promise<import("../entity/coupon.entity").Coupon[]>;
    redeem(dto: RedeemCouponDto): Promise<{
        success: boolean;
    }>;
    getAllCouponsWithStatus(page?: number, limit?: number, search?: string): Promise<{
        data: import("../entity/coupon.entity").Coupon[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    checkCoupon(code: string): Promise<{
        valid: boolean;
        code?: string;
        points?: number;
        expired?: boolean;
        message?: string;
    }>;
}
