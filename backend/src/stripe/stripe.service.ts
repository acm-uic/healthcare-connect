import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { User } from 'src/user/user.schema';
import { InsurancePlan } from 'src/insurance/insurance.schema';
import { Subscription } from 'rxjs';

@Injectable()
export class StripeService {
    private stripe: Stripe;

    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_API_KEY)
    }

    async createSetupIntent(customerId: string): Promise<Stripe.SetupIntent> {
      return await this.stripe.setupIntents.create({
        customer: customerId,
      });
    }

    async createSubscription(userId: string, insuranceId: string) {
        const insurance = await InsurancePlan.findById(insuranceId);
    
        if (!insurance) {
          throw new Error('Insurance not found');
        }

        const user = await User.findById(userId);
    
        // Create a customer if user doesn't have a Stripe ID
        if (!user.stripeCustomerId) {
          const customer = await this.stripe.customers.create({ email: user.email, });
          user.stripeCustomerId = customer.id;
          await user.save();
        }
        
        const stripeProduct = await this.stripe.products.create({ name: insurance.name });

        const stripePrice = await this.stripe.prices.create({
          product: stripeProduct.id,
          unit_amount: insurance.monthlyPremium * 100,
          currency: 'usd',
          recurring: {
            interval: 'month',
          },
        });

        const insurancePlan = await InsurancePlan.findByIdAndUpdate(insuranceId, { productId: stripeProduct.id, priceId: stripePrice.id }, { new: true });

        const subscription = await this.stripe.subscriptions.create({
          customer: user.stripeCustomerId,
          items: [{ price_data: { unit_amount: insurance.monthlyPremium * 100, currency: 'usd', product: insurancePlan.productId, recurring: { interval: 'month' } } }],
          expand: ['latest_invoice.payment_intent'],
        });
        
        await User.findByIdAndUpdate(userId, { $push: { subscriptions: subscription.id } }, { new: true });
        
        return subscription;
    }
    async cancelSubscription(subscriptionId: string)
    {
      const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);
      if(!subscription)
        {
          throw new Error('ID not found');
        }
      return this.stripe.subscriptions.cancel(subscriptionId);
    }
}

