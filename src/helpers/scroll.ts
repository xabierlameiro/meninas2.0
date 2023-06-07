export const toggleBodyOverflow = (isOpen: boolean) => {
    if (typeof window !== 'undefined') {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    }
};
