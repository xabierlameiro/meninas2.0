import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Success card : 4242 4242 4242 4242
// El pago requiere autorización : 4000 0025 0000 3155
// 4000 0000 0000 9995
// 1.5% + 0.25€ (españa)
// 3.25% + 0.25€ (non-eu)
// 2% snipcart fee 10$ min

export async function POST(request) {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
            apiVersion: '2022-11-15',
        });

        // get list of prorducts from request
        const products = request.body.products;

        const session = await stripe.checkout.sessions.create({
            line_items: [
                // required
                {
                    price_data: {
                        currency: 'eur', // required
                        product_data: {
                            name: 'wqeqwewwq',
                            description:
                                'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
                            images: ['https://i.imgur.com/EHyR2nP.png', 'https://imgur.com/76cdPt3'],
                            metadata: {}, // optional
                        },
                        unit_amount_decimal: 1000, // required
                        tax_behavior: 'inclusive',
                    },
                    quantity: 1,
                },
            ],
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

        return NextResponse.redirect(session.url, { status: 303 });
    } catch (err) {
        return new Response('Error', {
            status: 409,
        });
    }
}
