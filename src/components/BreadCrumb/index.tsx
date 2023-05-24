'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Breadcrumb = () => {
    const pathname = usePathname();
    const path = pathname.split('/').filter((p) => p !== '');

    const breadcrumb = path.map((p, i) => {
        const href = `/${path.slice(0, i + 1).join('/')}`;
        const name = p.replace(/-/g, ' ').toUpperCase();
        return (
            <Link key={href} href={href}>
                {name}
            </Link>
        );
    });

    return (
        <div>
            <Link href="/">HOME</Link>
            {breadcrumb}
        </div>
    );
};

export { Breadcrumb, Breadcrumb as default };
