import './globals.css';
import { Inter } from 'next/font/google';
import Menu from '@components/Menu';
import BreadCrumb from '@/components/BreadCrumb';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Meninas Cambados',
    description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body className={inter.className}>
                {/* @ts-expect-error Server Component */}
                <Menu />
                <BreadCrumb />
                {children}
            </body>
        </html>
    );
}
