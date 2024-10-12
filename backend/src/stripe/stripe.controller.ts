import { Controller, Get } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Roles } from '../auth/roles.decorator';
import { Post, Param, Req } from '@nestjs/common';

@Controller('subscriptions')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Roles('user')
  @Post('subscribe/:planId')
  async subscribeToPlan(@Param('planId') planId: string, @Req() req) {
    const userId = req.user.sub;
    return this.stripeService.createSubscription(userId, planId);
  }
}