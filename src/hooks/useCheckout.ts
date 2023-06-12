import useBoundStore from '@hooks/useBoundStore';

const useCheckout = () => {
    const cart = useBoundStore();

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
