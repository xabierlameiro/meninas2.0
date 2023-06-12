'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './breadcrumb.module.css';

const BreadCrumb = () => {
    const pathname = usePathname();
    const path = pathname.split('/').filter((p) => p !== '');

    const breadcrumb = path.map((p, i) => {
        const href = `/${path.slice(0, i + 1).join('/')}`;
        const name = p.replace(/-/g, ' ').toUpperCase();
        return (
            <Link href={`${href}#${path[path.length - 1]}`} key={href} title={name}>
                {name}
            </Link>
        );
    });

    return (
        <div className={styles.breadcrumb}>
            <Link href={`/#${path[path.length - 1]}`} title="HOME">
                HOME
            </Link>
            {breadcrumb}
        </div>
    );
};

export default BreadCrumb;
