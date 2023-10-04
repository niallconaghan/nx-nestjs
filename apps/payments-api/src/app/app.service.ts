import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';
import { CreateChargeDto } from '@nx-nestjs/common';

@Injectable()
export class AppService {
    private readonly stripe = new Stripe(
        this.configService.get('STRIPE_SECRET_KEY'),
        {
            apiVersion: '2023-08-16',
        }
    );

    constructor(private readonly configService: ConfigService) {}

    async createCharge({ amount }: CreateChargeDto) {
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: amount * 100,
            confirm: true,
            currency: 'gbp',
            payment_method: 'pm_card_visa',
            automatic_payment_methods: {
                allow_redirects: 'never',
                enabled: true,
            },
        });

        return paymentIntent;
    }
}
