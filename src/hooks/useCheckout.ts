const useCheckout = (cartItems: Products) => {
    const handleCheckout = async () => {
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                body: JSON.stringify({ items: cartItems }),
            });

            if (!response.ok) throw new Error('Error creating checkout session');

            const { loadStripe } = await import('@stripe/stripe-js');

            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

            if (!stripe) throw new Error('Stripe not loaded');

            const session = await response.json();

            await stripe.redirectToCheckout({
                sessionId: session.id,
            });
        } catch (error) {
            console.error(error);
            throw new Error(error as string);
        }
    };

    return { handleCheckout };
};

export default useCheckout;
