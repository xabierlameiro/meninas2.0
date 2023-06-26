import Link from 'next/link';

const getSession = async (session_id: string) => {
    const res = await fetch(`http://localhost:3000/api/success?session_id=${session_id}`);
    return res.json();
};

const SuccessPage = async ({ searchParams }: any) => {
    const { session_id } = searchParams;

    const session = await getSession(session_id);

    return (
        <div>
            <h1> ¡ Gracias por tu compra, {session.customer_details.name} ! </h1>
            <h2> Tu pedido ha sido realizado con éxito </h2>
            <h3>
                Te hemos enviado un correo electronico a {session.customer_details.email} con los detalles de tu pedido{' '}
            </h3>
            <h3> Precio total: {session.amount_total} </h3>
            <h3> Precio subtotal: {session.amount_subtotal} </h3>
            <h3> Tu pedido será enviado a {session.shipping_details.address.line1} </h3>
            <h3> Tu pedido será enviado a {session.shipping_details.address.city} </h3>
            <h3> Tu pedido será enviado a {session.shipping_details.address.country} </h3>
            <h3> Tu pedido será enviado a {session.shipping_details.address.postal_code} </h3>
            <h3> Tu pedido será enviado a {session.shipping_details.address.state} </h3>
        </div>
    );
};

export default SuccessPage;
/* {
    id: 'cs_test_a14t5jl9227ueMxmZf5b5buLoIYXO9bi4g0RYz2Q3iih9Gy7sNgjetjmXO',
    object: 'checkout.session',
    after_expiration: null,
    allow_promotion_codes: null,
    amount_subtotal: 3500,
    amount_total: 4000,
    automatic_tax: { enabled: false, status: null },
    billing_address_collection: null,
    cancel_url: 'http://localhost:3000//cancel',
    client_reference_id: null,
    consent: null,
    consent_collection: null,
    created: 1687377632,
    currency: 'eur',
    currency_conversion: null,
    custom_fields: [
      {
        dropdown: null,
        key: 'Observaciones',
        label: [Object],
        numeric: null,
        optional: true,
        text: [Object],
        type: 'text'
      }
    ],
    custom_text: { shipping_address: null, submit: null },
    customer: null,
    customer_creation: 'if_required',
    customer_details: {
      address: {
        city: 'Moraña',
        country: 'ES',
        line1: 'As Cortiñas 6',
        line2: null,
        postal_code: '36660',
        state: 'PO'
      },
      email: 'xabier.lameiro@gmail.com',
      name: 'Xabier Lameiro Cardama',
      phone: '+34666666666',
      tax_exempt: 'none',
      tax_ids: []
    },
    customer_email: null,
    expires_at: 1687464032,
    invoice: null,
    invoice_creation: {
      enabled: false,
      invoice_data: {
        account_tax_ids: null,
        custom_fields: null,
        description: null,
        footer: null,
        metadata: {},
        rendering_options: null
      }
    },
    livemode: false,
    locale: 'es',
    metadata: {},
    mode: 'payment',
    payment_intent: 'pi_3NLXD2FROJ3QU6qT1nCYy8cU',
    payment_link: null,
    payment_method_collection: 'always',
    payment_method_options: {},
    payment_method_types: [ 'card' ],
    payment_status: 'paid',
    phone_number_collection: { enabled: true },
    recovered_from: null,
    setup_intent: null,
    shipping_address_collection: { allowed_countries: [ 'ES' ] },
    shipping_cost: {
      amount_subtotal: 500,
      amount_tax: 0,
      amount_total: 500,
      shipping_rate: 'shr_1NLXCeFROJ3QU6qTTO3wFG1p'
    },
    shipping_details: {
      address: {
        city: 'Moraña',
        country: 'ES',
        line1: 'As Cortiñas 6',
        line2: null,
        postal_code: '36660',
        state: 'PO'
      },
      name: 'Xabier Lameiro Cardama'
    },
    shipping_options: [
      {
        shipping_amount: 500,
        shipping_rate: 'shr_1NLXCeFROJ3QU6qTTO3wFG1p'
      }
    ],
    status: 'complete',
    submit_type: null,
    subscription: null,
    success_url: 'http://localhost:3000//success?session_id={CHECKOUT_SESSION_ID}',
    total_details: { amount_discount: 0, amount_shipping: 500, amount_tax: 0 },
    url: null
  } */
