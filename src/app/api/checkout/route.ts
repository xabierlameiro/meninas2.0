import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Success card : 4242 4242 4242 4242
// El pago requiere autorización : 4000 0025 0000 3155
// 4000 0000 0000 9995
// 1.5% + 0.25€ (españa)
// 3.25% + 0.25€ (non-eu)
// 2% snipcart fee 10$ min

export async function POST(req: Request) {
    const body = await req.json();

    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
            apiVersion: '2022-11-15',
        });

        const line_items = body.items.map((item: any) => {
            return {
                price_data: {
                    currency: 'eur', // required
                    product_data: {
                        name: item.name,
                        images: [item.image.url],
                        metadata: {}, // optional
                    },
                    unit_amount: item.priceWithDiscount * 100,
                    tax_behavior: 'inclusive',
                },
                quantity: item.quantity,
            };
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment', // payment, setup, subscription
            success_url: 'http://localhost:3000/success', // required
            cancel_url: 'http://localhost:3000/cancel', // optional
            currency: 'eur', // optional
            metadata: {}, // optional
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
