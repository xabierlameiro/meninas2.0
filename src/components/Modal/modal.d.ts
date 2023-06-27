type ModalProps = {
    isOpen: boolean;
    children: ReactNode;
    onClose: () => void;
    actions?: ReactNode;
};
