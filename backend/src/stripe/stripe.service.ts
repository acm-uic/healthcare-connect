import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { User } from 'src/user/user.schema';
import { InsurancePlan } from 'src/insurance/insurance.schema';

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
        
        return subscription;
      }
    

    // async createSubscription(userId: string, planId: string) {
    //     const customer = await this.getOrCreateStripeCustomer(userId);

    //     const priceId = await this.getPriceIdFromPlan(planId); // Get the Stripe price_id for the plan

    //     const subscription = await this.stripe.subscriptions.create({
    //     customer: customer.id,
    //     items: [{ price: priceId }],
    //     });

    //     return subscription;
    // }

    // // Helper function to get or create a Stripe customer for the user
    // async getOrCreateStripeCustomer(userId: string) {
    //     // Query your database to see if the user already has a Stripe customerId
    //     const user = await User.findById(userId);
    //     if (user.stripeCustomerId !== null) {
    //     return await this.stripe.customers.retrieve(user.stripeCustomerId);
    //     }

    //     const customer = await this.stripe.customers.create({ email: user.email });

    //     // Save the customerId in your database
    //     await this.saveStripeCustomerId(userId, customer.id);

    //     return customer;
    // }

    // // Helper function to get Stripe price_id for the plan
    // async getPriceIdFromPlan(planId: string) {
    //     const plan = await InsurancePlan.findById(planId);
    //     return plan.stripePriceId; // Assuming the Stripe priceId is saved with the insurance plan
    // }
    
    // // Helper function to save the Stripe customerId in your database
    // async saveStripeCustomerId(userId: string, stripeCustomerId: string) {
    //     const user = await User.findByIdAndUpdate(userId, {stripeCustomerId: stripeCustomerId}, {new: true});
    //     return user;
    // }
}

