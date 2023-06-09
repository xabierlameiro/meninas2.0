import useCart from '@/hooks/useCart';

const useCheckout = () => {
    const cart = useCart();

    const checkout = () =>
        fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });

    return { checkout };
};

export default useCheckout;
