import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Coupon } from '../entity/coupon.entity';
import { GenerateCouponsDto } from '../dto/generate-coupons.dto';
import { RedeemCouponDto } from '../dto/redeem-coupon.dto';
import { CustomerService } from 'src/customers/service/customer.service';
import { RedemptionService } from 'src/redemptions/service/redemption.service';

@Injectable()
export class CouponService {
  constructor(
    @InjectDataSource() 
    private readonly dataSource: DataSource,
    @InjectRepository(Coupon)
    private couponRepository: Repository<Coupon>,
    private customerService:CustomerService,
    private redemptionService:RedemptionService
  ) {}

  async generateCoupons(dto: GenerateCouponsDto): Promise<Coupon[]> {
    const coupons:Coupon[] = [];
    for (let i = 0; i < dto.count; i++) {
      const coupon = this.couponRepository.create({
        code: this.generateCouponCode(),
        points: dto.points,
        expiryDate: dto.expiryDate,
      });
      let savedCoupon=await this.couponRepository.save(coupon)
      coupons.push(savedCoupon);
    }
    return coupons;
  }


  async checkCoupon(code: string): Promise<{ 
    valid: boolean;
    code?: string;
    points?: number;
    expired?: boolean;
    message?: string;
  }> {
    const coupon = await this.couponRepository.findOne({ 
      where: { code } 
    });

    if (!coupon) {
      return {
        valid: false,
        message: 'Coupon not found'
      };
    }

    if (coupon.isUsed) {
      return {
        valid: false,
        code: coupon.code,
        message: 'Coupon already used'
      };
    }

    if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
      return {
        valid: false,
        code: coupon.code,
        points: coupon.points,
        expired: true,
        message: 'Coupon has expired'
      };
    }

    return {
      valid: true,
      code: coupon.code,
      points: coupon.points,
      message: 'Coupon is valid'
    };
  }

  async getAllCouponsWithStatus(
    page: number = 1,
    limit: number = 10,
    search: string = ''
  ) {
    const query = this.couponRepository
      .createQueryBuilder('coupon')
      .leftJoinAndSelect('coupon.redemptions', 'redemption')
      .leftJoinAndSelect('redemption.customer', 'customer')
      .select([
        'coupon.id',
        'coupon.code',
        'coupon.points',
        'coupon.isUsed',
        'coupon.createdAt',
        'coupon.expiryDate',
        'redemption.redeemedAt',
        'customer.id',
        'customer.name',
        'customer.phone',
        'customer.points'
      ])
      .orderBy('coupon.createdAt', 'DESC');
  
    if (search) {
      query.where('coupon.code LIKE :search', { search: `%${search}%` })
        .orWhere('customer.name LIKE :search', { search: `%${search}%` })
        .orWhere('customer.phone LIKE :search', { search: `%${search}%` });
    }
  
    const [data, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
  
    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      }
    };
  }

  async redeemCouponTransaction(dto: RedeemCouponDto): Promise<{ success: boolean }> {
    return this.dataSource.transaction(async (manager) => {
      // Step 1: Redeem coupon
      const { coupon, customerPoints } = await this.redeemCoupon(dto, manager);

      // Step 2: Update customer points
      const customer = await this.customerService.updatePoints(
        { phone: dto.customerPhone, points: customerPoints },
        manager,
      );

      // Step 3: Log redemption
      await this.redemptionService.createRedemption(coupon, customer, manager);

      return { success: true };
    });
  }
  
 private async redeemCoupon(
    dto: RedeemCouponDto,
    manager?: EntityManager,
  ): Promise<{ coupon: Coupon; customerPoints: number }> {
    const repo = manager?.getRepository(Coupon) ?? this.couponRepository;
  
    const coupon = await repo.findOne({ where: { code: dto.couponCode, isUsed: false } });
    if (!coupon) throw new Error('Invalid or already used coupon');
  
    coupon.isUsed = true;
    await repo.save(coupon);
  
    return {
      coupon,
      customerPoints: coupon.points,
    };
  }





  private generateCouponCode(): string {
    return 'CPN-' + Math.random().toString(36).substr(2, 8).toUpperCase();
  }
}