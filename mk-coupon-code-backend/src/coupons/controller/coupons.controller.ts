import { Controller, Post, Body, Get, Param, UseGuards, Query } from '@nestjs/common';
import { CouponService } from '../service/coupon.service';
import { GenerateCouponsDto } from '../dto/generate-coupons.dto';
import { RedeemCouponDto } from '../dto/redeem-coupon.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('/api/coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post('generate')
  async generate(@Body() dto: GenerateCouponsDto) {
    return this.couponService.generateCoupons(dto);
  }

  @Post('redeem')
  async redeem(@Body() dto: RedeemCouponDto) {
    return this.couponService.redeemCouponTransaction(dto);
  }

  @Get('track/all')
  @UseGuards(JwtAuthGuard)
  async getAllCouponsWithStatus(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = ''
  ) {
    return this.couponService.getAllCouponsWithStatus(page, limit, search);
  }
  
  @Get('validate/:code')
  async checkCoupon(@Param('code') code: string) {
    return this.couponService.checkCoupon(code);
  }
}