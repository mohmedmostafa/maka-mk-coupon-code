import { DataSource, Repository } from 'typeorm';
import { Coupon } from '../entity/coupon.entity';
import { GenerateCouponsDto } from '../dto/generate-coupons.dto';
import { RedeemCouponDto } from '../dto/redeem-coupon.dto';
import { CustomerService } from 'src/customers/service/customer.service';
import { RedemptionService } from 'src/redemptions/service/redemption.service';
export declare class CouponService {
    private readonly dataSource;
    private couponRepository;
    private customerService;
    private redemptionService;
    constructor(dataSource: DataSource, couponRepository: Repository<Coupon>, customerService: CustomerService, redemptionService: RedemptionService);
    generateCoupons(dto: GenerateCouponsDto): Promise<Coupon[]>;
    checkCoupon(code: string): Promise<{
        valid: boolean;
        code?: string;
        points?: number;
        expired?: boolean;
        message?: string;
    }>;
    getAllCouponsWithStatus(page?: number, limit?: number, search?: string): Promise<{
        data: Coupon[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    redeemCouponTransaction(dto: RedeemCouponDto): Promise<{
        success: boolean;
    }>;
    private redeemCoupon;
    private generateCouponCode;
}
