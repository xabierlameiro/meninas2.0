import { Karla } from 'next/font/google';

export const karla = Karla({
    weight: ['200', '400', '700'],
    style: 'normal',
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-karla',
});

const Html = ({ children }: Children) => {
    return (
        <html lang="es" className={`${karla.variable}`}>
            {children}
        </html>
    );
};

export default Html;
