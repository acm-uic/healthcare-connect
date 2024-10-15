import { Controller, Get } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Roles } from '../auth/roles.decorator';
import { Post, Param, Req, Body, Delete } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtGuard)
@Controller('subscriptions')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-setup-intent')
  async createSetupIntent(@Body() body: { customerId: string }) {
    const setupIntent = await this.stripeService.createSetupIntent(body.customerId);
    return { clientSecret: setupIntent.client_secret };
  }

  @Post('subscribe/:planId')
  async subscribeToPlan(@Param('planId') planId: string, @Req() req) {
    const userId = req.user.sub;
    return this.stripeService.createSubscription(userId, planId);
  }

  @Delete('cancel-subscription/:subscriptionId')
  async cancelSubscription(@Param('subscriptionId') subscriptionId: string) {
    return this.stripeService.cancelSubscription(subscriptionId);
  }
}