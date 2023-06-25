import { NextResponse, NextRequest } from 'next/server';
import Stripe from 'stripe';
import { getURL } from '@helpers/navigation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
    apiVersion: '2022-11-15',
});

export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        const line_items = body.items.map((item: any) => {
            return {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: item.name,
                        images: [item.image.url],
                    },
                    unit_amount: item.priceWithDiscount * 100,
                    tax_behavior: 'inclusive',
                },
                quantity: item.quantity,
            };
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${getURL()}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${getURL()}/cancel`,
            currency: 'eur',
            locale: 'es',
            phone_number_collection: {
                enabled: true,
            },
            shipping_address_collection: {
                allowed_countries: ['ES'],
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 5 * 100,
                            currency: 'eur',
                        },
                        display_name: 'Envío estándar',
                    },
                },
            ],
            payment_method_types: ['card'],
            custom_fields: [
                {
                    key: 'Observaciones',
                    label: {
                        custom: 'Observaciones',
                        type: 'custom',
                    },
                    type: 'text',
                    optional: true,
                },
            ],
        });
        return NextResponse.json({ id: session.id }, { status: 200 });
    } catch (err) {
        return new Response('Error', {
            status: 409,
        });
    }
}
